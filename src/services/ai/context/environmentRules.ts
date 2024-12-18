import { ContextRule } from '../recommendations/types';

export const environmentRules: ContextRule[] = [
  {
    condition: (context) => context.useEnvironment === 'operating-room',
    priority: 'high',
    weight: 1.6,
    recommendations: [
      'Ensure sterile interface interaction capabilities',
      'Provide clear visibility in varying lighting conditions',
      'Implement quick-access emergency protocols'
    ]
  },
  {
    condition: (context) => context.useEnvironment === 'icu',
    priority: 'high',
    weight: 1.5,
    recommendations: [
      'Support multi-parameter monitoring integration',
      'Enable quick alarm management',
      'Provide clear status visibility from distance'
    ]
  },
  {
    condition: (context) => context.useEnvironment === 'ambulatory',
    priority: 'high',
    weight: 1.4,
    recommendations: [
      'Design for use in motion',
      'Implement robust error prevention',
      'Provide clear battery status indicators'
    ]
  }
];