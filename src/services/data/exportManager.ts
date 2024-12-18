import { Session } from './sessionManager';

export class ExportManager {
  exportToJSON(session: Session): string {
    return JSON.stringify(session, null, 2);
  }

  exportToCSV(session: Session): string {
    const headers = ['Timestamp', 'Type', 'Content', 'Category', 'Priority'];
    const rows = [
      ...session.transcripts.map(t => ([
        new Date(t.timestamp).toISOString(),
        'Transcript',
        t.text,
        '',
        ''
      ])),
      ...session.analyses.map(a => ([
        new Date(a.timestamp || Date.now()).toISOString(),
        'Analysis',
        a.recommendation,
        a.category,
        a.priority
      ]))
    ];

    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
  }

  async exportToPDF(session: Session): Promise<Blob> {
    // Implementation for PDF export would go here
    // For now, return a simple text blob
    const content = this.exportToJSON(session);
    return new Blob([content], { type: 'application/pdf' });
  }
}

export const exportManager = new ExportManager();