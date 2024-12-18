# Contributing Guide

## Development Setup

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

## Testing

Run tests:
```bash
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:ui        # Run tests with UI
```

### Writing Tests
- Place tests in `src/tests` directory
- Follow naming convention: `*.test.ts` or `*.test.tsx`
- Use Vitest and Testing Library
- Include unit tests for all new features
- Maintain minimum 80% coverage

## Code Style
- Use TypeScript
- Follow ESLint configuration
- Use Prettier for formatting
- Follow component structure guidelines
- Document all public APIs

## Pull Request Process
1. Create feature branch
2. Add tests
3. Update documentation
4. Submit PR with description
5. Address review feedback
6. Maintain clean commit history

## Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release PR
4. Tag release after merge