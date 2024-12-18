import { DeviceRecommendation } from '../types';

export const ventilatorRules: DeviceRecommendation[] = [
  {
    type: 'interface',
    rules: [
      {
        condition: 'ventilation-mode',
        recommendation: 'Implement clear mode selection with visual confirmation of active mode',
        priority: 'high',
        standard: 'IEC 62366-1:2015'
      },
      {
        condition: 'parameter-adjustment',
        recommendation: 'Design intuitive controls for tidal volume and pressure settings',
        priority: 'high',
        standard: 'ISO 14971:2019'
      },
      {
        condition: 'alarm-display',
        recommendation: 'Use distinct audio-visual alarms for different severity levels',
        priority: 'high',
        standard: 'IEC 60601-1-8'
      }
    ]
  },
  {
    type: 'workflow',
    rules: [
      {
        condition: 'patient-assessment',
        recommendation: 'Implement automated patient parameter monitoring with trend analysis',
        priority: 'high',
        standard: 'IEC 62366-1:2015'
      },
      {
        condition: 'emergency-response',
        recommendation: 'Design quick-access emergency protocols with single-action activation',
        priority: 'high',
        standard: 'AAMI HE75'
      }
    ]
  }
];