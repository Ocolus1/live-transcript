export interface AnalysisContext {
  deviceType: string;
  useEnvironment: string;
  userType: string;
  riskLevel: string;
  workflow?: string;
  specialization?: string;
  experience?: string;
  trainingLevel?: string;
  // Additional context parameters
  taskComplexity?: string;
  timeConstraints?: string;
  regulatoryRegion?: string;
  interfaceType?: string;
  userDiversity?: string;
  safetyLevel?: string;
  maintenanceAccess?: string;
}

export const contextOptions = {
  // ... (previous options remain the same)

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

  regulatoryRegion: [
    { value: 'us', label: 'USA (FDA)' },
    { value: 'eu', label: 'European Union (MDR)' },
    { value: 'uk', label: 'United Kingdom (MHRA)' },
    { value: 'japan', label: 'Japan (PMDA)' },
    { value: 'global', label: 'Global (Multiple regions)' }
  ],

  interfaceType: [
    { value: 'touch', label: 'Touchscreen Interface' },
    { value: 'physical', label: 'Physical Controls' },
    { value: 'hybrid', label: 'Hybrid (Touch + Physical)' },
    { value: 'voice', label: 'Voice-Controlled' },
    { value: 'automated', label: 'Automated System' }
  ],

  userDiversity: [
    { value: 'homogeneous', label: 'Homogeneous (Single user type)' },
    { value: 'moderate', label: 'Moderate Diversity' },
    { value: 'high', label: 'High Diversity' },
    { value: 'specialized', label: 'Specialized Teams' }
  ],

  safetyLevel: [
    { value: 'basic', label: 'Basic Safety Requirements' },
    { value: 'medium', label: 'Medium Safety Requirements' },
    { value: 'high', label: 'High Safety Requirements' },
    { value: 'critical', label: 'Critical Safety Requirements' }
  ],

  maintenanceAccess: [
    { value: 'user', label: 'User Maintainable' },
    { value: 'technician', label: 'Technician Required' },
    { value: 'specialist', label: 'Specialist Required' },
    { value: 'manufacturer', label: 'Manufacturer Only' }
  ]
} as const;

export const contextTooltips = {
  deviceType: 'Select the specific medical device type for targeted analysis',
  useEnvironment: 'Specify the operational environment where the device is used',
  userType: 'Identify the primary user role interacting with the device',
  workflow: 'Define the main workflow or procedure being analyzed',
  specialization: 'Indicate the medical specialization relevant to the device',
  experience: 'Specify the expected user experience level',
  trainingLevel: 'Indicate required training level for device operation',
  taskComplexity: 'Define the complexity level of tasks performed with the device',
  timeConstraints: 'Specify typical time pressure in device operation',
  regulatoryRegion: 'Select applicable regulatory frameworks',
  interfaceType: 'Specify the primary user interface type',
  userDiversity: 'Indicate the diversity of user types and roles',
  safetyLevel: 'Specify the required safety level for the device',
  maintenanceAccess: 'Define who can perform device maintenance'
} as const;