import React from 'react';
import { Settings } from 'lucide-react';
import { contextOptions, contextTooltips } from '../services/ai/types/contextOptions';
import type { AnalysisContext } from '../services/ai/types/analysisTypes';
import Tooltip from './Tooltip';

interface ContextSettingsProps {
  context: AnalysisContext;
  setContext: (context: AnalysisContext) => void;
  showContext: boolean;
  setShowContext: (show: boolean) => void;
}

const ContextSettings: React.FC<ContextSettingsProps> = ({
  context,
  setContext,
  showContext,
  setShowContext,
}) => {
  const renderSelect = (
    label: string,
    value: string,
    options: Array<{ value: string; label: string }>,
    onChange: (value: string) => void,
    tooltip?: string
  ) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {tooltip ? (
          <Tooltip content={tooltip}>
            <label className="block text-sm font-medium text-gray-600">
              {label}
            </label>
          </Tooltip>
        ) : (
          <label className="block text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-700">Context Settings</h3>
        </div>
        <button
          onClick={() => setContext({
            deviceType: 'qiasymphony',
            useEnvironment: 'clinical-lab',
            userType: 'lab-technician',
            riskLevel: 'medium',
            workflow: 'sample-prep',
            specialization: 'molecular',
            experience: 'intermediate',
            trainingLevel: 'basic'
          })}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="space-y-6">
        {/* Core Settings */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-4">Core Settings</h4>
          <div className="grid grid-cols-1 gap-4">
            {renderSelect(
              'Device Type',
              context.deviceType,
              contextOptions.deviceTypes,
              (value) => setContext({ ...context, deviceType: value }),
              contextTooltips.deviceType
            )}
            
            {renderSelect(
              'Environment',
              context.useEnvironment,
              contextOptions.environments,
              (value) => setContext({ ...context, useEnvironment: value }),
              contextTooltips.useEnvironment
            )}
            
            {renderSelect(
              'User Type',
              context.userType,
              contextOptions.userTypes,
              (value) => setContext({ ...context, userType: value }),
              contextTooltips.userType
            )}
          </div>
        </div>

        {/* Additional Settings in a 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task & Workflow */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Task & Workflow</h4>
            {renderSelect(
              'Task Complexity',
              context.taskComplexity || 'moderate',
              contextOptions.taskComplexity,
              (value) => setContext({ ...context, taskComplexity: value }),
              contextTooltips.taskComplexity
            )}
            
            {renderSelect(
              'Time Constraints',
              context.timeConstraints || 'normal',
              contextOptions.timeConstraints,
              (value) => setContext({ ...context, timeConstraints: value }),
              contextTooltips.timeConstraints
            )}
          </div>

          {/* User & Training */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">User & Training</h4>
            {renderSelect(
              'User Diversity',
              context.userDiversity || 'moderate',
              contextOptions.userDiversity,
              (value) => setContext({ ...context, userDiversity: value }),
              contextTooltips.userDiversity
            )}
            
            {renderSelect(
              'Training Level',
              context.trainingLevel || 'basic',
              contextOptions.trainingLevels,
              (value) => setContext({ ...context, trainingLevel: value }),
              contextTooltips.trainingLevel
            )}
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Safety & Compliance</h4>
            {renderSelect(
              'Safety Level',
              context.safetyLevel || 'high',
              contextOptions.safetyLevel,
              (value) => setContext({ ...context, safetyLevel: value }),
              contextTooltips.safetyLevel
            )}
            
            {renderSelect(
              'Regulatory Region',
              context.regulatoryRegion || 'global',
              contextOptions.regulatoryRegion,
              (value) => setContext({ ...context, regulatoryRegion: value }),
              contextTooltips.regulatoryRegion
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextSettings;