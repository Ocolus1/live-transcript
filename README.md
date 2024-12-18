# Medical Device Usability AI Assistant

An AI-powered assistant that serves as a real-time usability engineering expert for medical devices, capable of listening to conversations, processing visual information, and providing expert guidance based on regulatory standards and best practices.

## Features

- Real-time speech-to-text transcription
- AI-powered usability analysis
- Context-aware recommendations
- Image analysis support
- Standards compliance checking
- Session management and history
- Data export capabilities

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   VITE_AZURE_SPEECH_KEY=your_key
   VITE_AZURE_SPEECH_REGION=your_region
   VITE_OPENAI_API_KEY=your_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Documentation

- [API Documentation](src/docs/API.md)
- [Contributing Guide](src/docs/CONTRIBUTING.md)

## Testing

```bash
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:ui        # Run tests with UI
```

## License

MIT