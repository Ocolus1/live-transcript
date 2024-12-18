import { DeviceRecommendation } from '../types';

export const patientMonitorRules: DeviceRecommendation[] = [
  {
    type: 'interface',
    rules: [
      {
        condition: 'vital-signs-display',
        recommendation: 'Ensure critical vital signs are prominently displayed with clear color coding',
        priority: 'high',
        standard: 'IEC 62366-1:2015'
      },
      {
        condition: 'waveform-display',
        recommendation: 'Implement auto-scaling waveforms with clear grid lines and time markers',
        priority: 'medium',
        standard: 'IEC 60601-2-27'
      }
    ]
  },
  {
    type: 'workflow',
    rules: [
      {
        condition: 'alarm-management',
        recommendation: 'Design intuitive alarm management workflow with customizable thresholds',
        priority: 'high',
        standard: 'IEC 60601-1-8'
      }
    ]
  }
];