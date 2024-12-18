import { z } from 'zod';

const envSchema = z.object({
  AZURE_SPEECH_KEY: z.string().min(1),
  AZURE_SPEECH_REGION: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const env = envSchema.parse({
  AZURE_SPEECH_KEY: import.meta.env.VITE_AZURE_SPEECH_KEY,
  AZURE_SPEECH_REGION: import.meta.env.VITE_AZURE_SPEECH_REGION,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  NODE_ENV: import.meta.env.MODE,
});