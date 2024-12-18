import { DeviceRecommendation } from '../types';

export const infusionPumpRules: DeviceRecommendation[] = [
  {
    type: 'interface',
    rules: [
      {
        condition: 'flow-rate-input',
        recommendation: 'Implement clear numeric keypad for flow rate input with unit display (mL/hr)',
        priority: 'high',
        standard: 'IEC 62366-1:2015'
      },
      {
        condition: 'alarm-settings',
        recommendation: 'Provide distinct visual and auditory indicators for different alarm priorities',
        priority: 'high',
        standard: 'IEC 60601-1-8'
      }
    ]
  },
  {
    type: 'workflow',
    rules: [
      {
        condition: 'medication-setup',
        recommendation: 'Implement drug library with soft and hard limits for medication concentrations',
        priority: 'high',
        standard: 'AAMI HE75'
      },
      {
        condition: 'maintenance',
        recommendation: 'Design clear maintenance workflows with calibration checkpoints',
        priority: 'medium',
        standard: 'ISO 14971:2019'
      }
    ]
  }
];