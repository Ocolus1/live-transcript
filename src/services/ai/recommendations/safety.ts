import { RecommendationType } from './types';

export const safetyRecommendations: Record<RecommendationType, string[]> = {
  interface: [
    'Implement distinct warning signals for critical conditions (IEC 60601-1)',
    'Use clear visual indicators for different risk levels',
    'Ensure emergency controls are easily accessible and distinguishable',
    'Provide unambiguous confirmation for safety-critical actions',
    'Implement fail-safe interface behaviors',
    'Design clear visual hierarchies for safety information',
    'Use standardized safety symbols and indicators',
    'Implement redundant feedback for critical actions'
  ],
  workflow: [
    'Add safety interlocks for dangerous operations (ISO 14971)',
    'Implement two-step verification for critical actions',
    'Provide clear escape paths from dangerous operations',
    'Include automatic safety checks in workflows',
    'Design fault-tolerant operational sequences',
    'Implement emergency stop procedures',
    'Create clear escalation paths for safety issues',
    'Design workflows with built-in safety validations'
  ],
  documentation: [
    'Document all safety procedures with clear illustrations',
    'Include comprehensive emergency response procedures',
    'Provide clear safety warnings and precautions',
    'Document risk mitigation strategies',
    'Create detailed incident reporting procedures',
    'Include safety compliance checklists',
    'Provide clear maintenance safety guidelines',
    'Document safety verification procedures'
  ],
  training: [
    'Create comprehensive safety training modules',
    'Include hands-on emergency response training',
    'Provide scenario-based safety practice exercises',
    'Document safety certification requirements',
    'Implement safety awareness programs',
    'Create role-specific safety training',
    'Include periodic safety refresher courses',
    'Provide training for new safety features'
  ]
};