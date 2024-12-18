import { get, set, del } from 'idb-keyval';
import { AnalysisResult } from '../ai/types';
import { Transcript } from '../../types';

export interface Session {
  id: string;
  startTime: number;
  endTime?: number;
  transcripts: Transcript[];
  analyses: AnalysisResult[];
  context: any;
}

export class SessionManager {
  private currentSession: Session | null = null;
  private prefix = 'medical-device-ai:session:';

  startSession(context: any): Session {
    this.currentSession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      transcripts: [],
      analyses: [],
      context
    };
    return this.currentSession;
  }

  async endSession(): Promise<void> {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now();
      await this.saveSession(this.currentSession);
      this.currentSession = null;
    }
  }

  async saveSession(session: Session): Promise<void> {
    const key = this.prefix + session.id;
    await set(key, session);
  }

  async getSessions(): Promise<Session[]> {
    const keys = await this.getSessionKeys();
    const sessions = await Promise.all(
      keys.map(key => get(key))
    );
    return sessions.filter(Boolean);
  }

  async getSession(id: string): Promise<Session | null> {
    const key = this.prefix + id;
    return get(key);
  }

  private async getSessionKeys(): Promise<string[]> {
    // Implementation to get all session keys
    return [];
  }

  async deleteSession(id: string): Promise<void> {
    const key = this.prefix + id;
    await del(key);
  }

  async addTranscript(transcript: Transcript): Promise<void> {
    if (this.currentSession) {
      this.currentSession.transcripts.push(transcript);
      await this.saveSession(this.currentSession);
    }
  }

  async addAnalysis(analysis: AnalysisResult): Promise<void> {
    if (this.currentSession) {
      this.currentSession.analyses.push(analysis);
      await this.saveSession(this.currentSession);
    }
  }
}

export const sessionManager = new SessionManager();