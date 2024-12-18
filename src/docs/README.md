# Medical Device Usability AI Assistant Documentation

## Overview
This application provides real-time usability engineering analysis for medical devices, leveraging AI to offer expert recommendations based on speech and text input.

## Key Features
- Real-time speech-to-text transcription
- AI-powered usability analysis
- Context-aware recommendations
- Image analysis support
- Standards compliance checking
- Session management and history
- Data export capabilities

## Architecture
The application follows a modular architecture with these key components:
- AI Analysis Engine
- Speech Recognition Service
- Storage Service
- Performance Optimization Layer
- UI Components

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   VITE_AZURE_SPEECH_KEY=your_key
   VITE_AZURE_SPEECH_REGION=your_region
   VITE_OPENAI_API_KEY=your_key
   ```
4. Start development server: `npm run dev`

## Testing
Run tests with:
```bash
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:ui        # Run tests with UI
```

## Contributing
Please see CONTRIBUTING.md for guidelines.