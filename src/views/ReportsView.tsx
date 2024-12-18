import React, { useState, useEffect } from 'react';
import { BarChart2, Download, Filter, Calendar, PieChart, TrendingUp } from 'lucide-react';
import { sessionManager } from '../services/data/sessionManager';
import { Session } from '../services/data/sessionManager';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useLoadingState } from '../hooks/useLoadingState';

const ReportsView: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { isLoading, error, startLoading, stopLoading, setLoadingError } = useLoadingState();
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    startLoading();
    try {
      const loadedSessions = await sessionManager.getSessions();
      setSessions(loadedSessions);
    } catch (err) {
      setLoadingError('Failed to load session data');
    } finally {
      stopLoading();
    }
  };

  const calculateMetrics = () => {
    const now = new Date();
    const filteredSessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      switch (dateRange) {
        case 'week':
          return sessionDate >= new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return sessionDate >= new Date(now.setMonth(now.getMonth() - 1));
        case 'year':
          return sessionDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      }
    });

    const totalSessions = filteredSessions.length;
    const totalTranscripts = filteredSessions.reduce(
      (sum, session) => sum + session.transcripts.length, 0
    );
    const totalAnalyses = filteredSessions.reduce(
      (sum, session) => sum + session.analyses.length, 0
    );

    const priorityDistribution = filteredSessions.reduce((acc, session) => {
      session.analyses.forEach(analysis => {
        acc[analysis.priority] = (acc[analysis.priority] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const categoryDistribution = filteredSessions.reduce((acc, session) => {
      session.analyses.forEach(analysis => {
        acc[analysis.category] = (acc[analysis.category] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSessions,
      totalTranscripts,
      totalAnalyses,
      priorityDistribution,
      categoryDistribution
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Sessions</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {metrics.totalSessions}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total sessions</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Analysis</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {metrics.totalAnalyses}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total analyses</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="space-y-2">
              {Object.entries(metrics.categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{category}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Priority Distribution</h2>
            <div className="flex items-center gap-4">
              {Object.entries(metrics.priorityDistribution).map(([priority, count]) => (
                <div
                  key={priority}
                  className={`flex-1 p-4 rounded-lg ${
                    priority === 'high'
                      ? 'bg-red-50'
                      : priority === 'medium'
                      ? 'bg-yellow-50'
                      : 'bg-green-50'
                  }`}
                >
                  <p className="text-sm text-gray-600 capitalize">{priority} Priority</p>
                  <p className="text-2xl font-bold mt-1">{count}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {((count / metrics.totalAnalyses) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;