import { RecommendationType } from './types';

export const usabilityRecommendations: Record<RecommendationType, string[]> = {
  interface: [
    'Implement clear visual feedback for critical user interactions (IEC 62366-1)',
    'Ensure consistent placement and behavior of UI elements across all screens',
    'Use color coding that accounts for color-blind users and follows IEC 62366-1 guidelines',
    'Provide clear status indicators for system state and process progress',
    'Implement error-prevention mechanisms in the user interface',
    'Design touch targets with appropriate size and spacing for medical contexts',
    'Use consistent and clear typography for critical information display',
    'Implement appropriate contrast ratios for medical environment lighting conditions'
  ],
  workflow: [
    'Minimize the number of steps required for critical tasks (AAMI HE75)',
    'Implement undo/redo functionality for reversible actions',
    'Add confirmation dialogs for irreversible or critical actions',
    'Provide clear progress indicators for multi-step processes',
    'Design workflows that minimize cognitive load during critical procedures',
    'Implement context-aware task sequences that adapt to user roles',
    'Provide clear error recovery paths in workflows',
    'Design workflows that accommodate emergency scenarios'
  ],
  documentation: [
    'Create clear, step-by-step user instructions with visual aids',
    'Include comprehensive troubleshooting guides',
    'Provide context-sensitive help throughout the interface',
    'Document all error messages and recovery procedures',
    'Maintain detailed audit trails for regulatory compliance',
    'Create role-specific quick reference guides',
    'Include clear warnings and precautions in user documentation',
    'Provide multilingual support for international deployment'
  ],
  training: [
    'Develop interactive tutorials for complex features',
    'Include practice scenarios for critical tasks',
    'Provide immediate feedback during training exercises',
    'Create role-specific training modules',
    'Implement competency assessment tools',
    'Design scenario-based training for emergency procedures',
    'Include regulatory compliance training modules',
    'Provide refresher training materials for periodic review'
  ]
};