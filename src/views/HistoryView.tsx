import React, { useState, useEffect } from 'react';
import { History, Calendar, Search, Download, Filter, ChevronDown } from 'lucide-react';
import { sessionManager } from '../services/data/sessionManager';
import { exportManager } from '../services/data/exportManager';
import { Session } from '../services/data/sessionManager';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useLoadingState } from '../hooks/useLoadingState';

const HistoryView: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { isLoading, error, startLoading, stopLoading, setLoadingError } = useLoadingState();
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    startLoading();
    try {
      const loadedSessions = await sessionManager.getSessions();
      setSessions(loadedSessions);
    } catch (err) {
      setLoadingError('Failed to load sessions');
    } finally {
      stopLoading();
    }
  };

  const handleExport = async (session: Session, format: 'json' | 'csv' | 'pdf') => {
    try {
      let content: string | Blob;
      let filename: string;
      let type: string;

      switch (format) {
        case 'json':
          content = exportManager.exportToJSON(session);
          filename = `session-${session.id}.json`;
          type = 'application/json';
          break;
        case 'csv':
          content = exportManager.exportToCSV(session);
          filename = `session-${session.id}.csv`;
          type = 'text/csv';
          break;
        case 'pdf':
          content = await exportManager.exportToPDF(session);
          filename = `session-${session.id}.pdf`;
          type = 'application/pdf';
          break;
      }

      const blob = content instanceof Blob ? content : new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const filteredSessions = sessions
    .filter(session => {
      const matchesSearch = 
        session.transcripts.some(t => 
          t.text.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        session.analyses.some(a => 
          a.recommendation.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const date = new Date(session.startTime);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          return matchesSearch && date.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return matchesSearch && date >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return matchesSearch && date >= monthAgo;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => b.startTime - a.startTime);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold">Session History</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setLoadingError('')}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Session {session.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(session.startTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSession(
                      selectedSession?.id === session.id ? null : session
                    )}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ChevronDown className={`w-5 h-5 transform transition-transform ${
                      selectedSession?.id === session.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="py-1">
                        <button
                          onClick={() => handleExport(session, 'json')}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Export as JSON
                        </button>
                        <button
                          onClick={() => handleExport(session, 'csv')}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => handleExport(session, 'pdf')}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSession?.id === session.id && (
                <div className="mt-4 space-y-4 animate-slideIn">
                  <div>
                    <h4 className="font-medium mb-2">Transcripts</h4>
                    <div className="space-y-2">
                      {session.transcripts.map((transcript, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
                          <p className="text-sm text-gray-500">
                            {new Date(transcript.timestamp).toLocaleTimeString()}
                          </p>
                          <p className="mt-1">{transcript.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Analyses</h4>
                    <div className="space-y-2">
                      {session.analyses.map((analysis, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              analysis.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : analysis.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {analysis.priority} priority
                            </span>
                            <span className="text-sm text-gray-500">
                              {analysis.category}
                            </span>
                          </div>
                          <p>{analysis.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sessions found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryView;