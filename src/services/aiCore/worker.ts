import * as Comlink from 'comlink';
import { LocalAIModel } from './localModel';

const model = new LocalAIModel();

const api = {
  async initialize() {
    await model.initialize();
  },

  async analyze(text: string, context: any) {
    // Quick local analysis (< 116ms)
    const quickResults = await model.quickAnalyze(text);
    
    // If confidence is high enough, return immediately
    if (quickResults.confidence > 0.85) {
      return {
        type: 'quick',
        ...quickResults
      };
    }

    // Otherwise, perform detailed analysis
    const detailedResults = await model.detailedAnalyze(text, context);
    return {
      type: 'detailed',
      ...detailedResults
    };
  }
};

Comlink.expose(api);