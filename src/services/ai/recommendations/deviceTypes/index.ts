import { DeviceType } from '../types';
import { infusionPumpRules } from './infusionPump';
import { patientMonitorRules } from './patientMonitor';
import { ventilatorRules } from './ventilator';
import { diagnosticDeviceRules } from './diagnosticDevice';

export const deviceTypeRules: Record<DeviceType, typeof infusionPumpRules> = {
  'infusion-pump': infusionPumpRules,
  'patient-monitor': patientMonitorRules,
  'ventilator': ventilatorRules,
  'diagnostic-device': diagnosticDeviceRules
};