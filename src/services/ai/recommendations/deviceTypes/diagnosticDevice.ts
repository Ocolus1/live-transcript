import { DeviceRecommendation } from '../types';

export const diagnosticDeviceRules: DeviceRecommendation[] = [
  {
    type: 'interface',
    rules: [
      {
        condition: 'result-display',
        recommendation: 'Present diagnostic results with clear visual hierarchy and interpretation guide',
        priority: 'high',
        standard: 'IEC 62366-1:2015'
      },
      {
        condition: 'data-input',
        recommendation: 'Implement structured data entry with validation and error prevention',
        priority: 'medium',
        standard: 'AAMI HE75'
      }
    ]
  },
  {
    type: 'workflow',
    rules: [
      {
        condition: 'calibration',
        recommendation: 'Design guided calibration workflow with verification steps',
        priority: 'high',
        standard: 'ISO 14971:2019'
      },
      {
        condition: 'result-management',
        recommendation: 'Implement secure data management with audit trail capabilities',
        priority: 'medium',
        standard: 'MDR 2017/745'
      }
    ]
  }
];