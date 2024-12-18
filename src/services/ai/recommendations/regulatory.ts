import { RecommendationType } from './types';

export const regulatoryRecommendations: Record<RecommendationType, string[]> = {
  interface: [
    'Ensure compliance with IEC 62366-1 usability engineering requirements',
    'Implement required safety features as per IEC 60601-1',
    'Follow FDA guidelines for medical device interfaces',
    'Maintain audit trails for user interactions',
    'Implement required access controls and authentication',
    'Design interfaces that support regulatory documentation',
    'Include required regulatory symbols and markings',
    'Implement compliant data entry validation'
  ],
  workflow: [
    'Implement workflow validation as per ISO 14971',
    'Follow FDA Quality System Regulation requirements',
    'Ensure MDR 2017/745 compliance for processes',
    'Maintain regulatory documentation for workflows',
    'Implement compliant change control procedures',
    'Design workflows that support audit requirements',
    'Include required verification steps',
    'Maintain process validation documentation'
  ],
  documentation: [
    'Create documentation compliant with 21 CFR Part 820',
    'Include required regulatory statements and warnings',
    'Maintain technical documentation for MDR compliance',
    'Document risk management procedures',
    'Create compliant labeling and instructions for use',
    'Maintain design history documentation',
    'Include post-market surveillance procedures',
    'Document validation and verification processes'
  ],
  training: [
    'Develop training programs meeting regulatory requirements',
    'Include compliance training modules',
    'Document training completion and competency',
    'Maintain training records for regulatory compliance',
    'Implement required competency assessments',
    'Create regulatory awareness training',
    'Include updates for regulatory changes',
    'Document training effectiveness evaluation'
  ]
};