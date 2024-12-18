import { AnalysisContext } from './analysisTypes';

export const contextOptions = {
  deviceTypes: [
    { value: 'qiasymphony', label: 'QIAsymphony Sample Prep' },
    { value: 'infusion-pump', label: 'Infusion Pump' },
    { value: 'patient-monitor', label: 'Patient Monitor' },
    { value: 'ventilator', label: 'Ventilator' },
    { value: 'diagnostic-device', label: 'Diagnostic Device' }
  ],

  environments: [
    { value: 'clinical-lab', label: 'Clinical Laboratory' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'emergency', label: 'Emergency Room' },
    { value: 'operating-room', label: 'Operating Room' },
    { value: 'ambulatory', label: 'Ambulatory Care' }
  ],

  userTypes: [
    { value: 'lab-technician', label: 'Lab Technician' },
    { value: 'lab-assistant', label: 'Lab Assistant' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'physician', label: 'Physician' },
    { value: 'specialist', label: 'Medical Specialist' }
  ],

  taskComplexity: [
    { value: 'simple', label: 'Simple (Single step operations)' },
    { value: 'moderate', label: 'Moderate (Multi-step procedures)' },
    { value: 'complex', label: 'Complex (Branching workflows)' },
    { value: 'critical', label: 'Critical (Emergency procedures)' }
  ],

  timeConstraints: [
    { value: 'relaxed', label: 'Relaxed (No time pressure)' },
    { value: 'normal', label: 'Normal (Standard operations)' },
    { value: 'urgent', label: 'Urgent (Time-sensitive)' },
    { value: 'emergency', label: 'Emergency (Immediate action required)' }
  ],

  userDiversity: [
    { value: 'homogeneous', label: 'Single User Type' },
    { value: 'moderate', label: 'Moderate Diversity' },
    { value: 'high', label: 'High Diversity' },
    { value: 'specialized', label: 'Specialized Teams' }
  ],

  trainingLevels: [
    { value: 'basic', label: 'Basic Training' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert Level' }
  ],

  safetyLevel: [
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'critical', label: 'Critical Safety Requirements' }
  ],

  regulatoryRegion: [
    { value: 'us', label: 'USA (FDA)' },
    { value: 'eu', label: 'European Union (MDR)' },
    { value: 'uk', label: 'United Kingdom (MHRA)' },
    { value: 'global', label: 'Global (Multiple regions)' }
  ]
} as const;

export const contextTooltips = {
  deviceType: 'Select the specific medical device type for targeted analysis',
  useEnvironment: 'Specify the operational environment where the device is used',
  userType: 'Identify the primary user role interacting with the device',
  taskComplexity: 'Define the complexity level of tasks performed',
  timeConstraints: 'Specify typical time pressure in operations',
  userDiversity: 'Indicate the diversity of user types and roles',
  trainingLevel: 'Specify required training level for operation',
  safetyLevel: 'Indicate the safety requirements level',
  regulatoryRegion: 'Select applicable regulatory frameworks'
} as const;