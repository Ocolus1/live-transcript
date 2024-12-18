import * as tf from '@tensorflow/tfjs';
import { ort } from 'onnxruntime-web';

export class LocalAIModel {
  private model: tf.LayersModel | null = null;
  private session: ort.InferenceSession | null = null;
  
  async initialize() {
    // Load lightweight ONNX model for initial fast analysis
    const modelUrl = '/models/initial-analyzer.onnx';
    this.session = await ort.InferenceSession.create(modelUrl);
    
    // Load TensorFlow.js model for detailed analysis
    this.model = await tf.loadLayersModel('/models/detailed-analyzer/model.json');
  }

  async quickAnalyze(text: string): Promise<{
    category: string;
    confidence: number;
    priority: string;
  }> {
    if (!this.session) throw new Error('Model not initialized');

    const tensor = new ort.Tensor('string', [text], [1]);
    const results = await this.session.run({ input: tensor });
    
    return {
      category: results.category.data[0],
      confidence: results.confidence.data[0],
      priority: results.priority.data[0]
    };
  }

  async detailedAnalyze(text: string, context: any): Promise<{
    recommendation: string;
    standards: string[];
    riskLevel: number;
  }> {
    if (!this.model) throw new Error('Model not initialized');

    const prediction = await this.model.predict(tf.tensor([text]));
    return this.processDetailedResults(prediction);
  }

  private processDetailedResults(prediction: tf.Tensor | tf.Tensor[]): any {
    // Process and format detailed analysis results
    return {
      recommendation: 'Processed recommendation',
      standards: ['IEC 62366-1:2015'],
      riskLevel: 0.8
    };
  }
}