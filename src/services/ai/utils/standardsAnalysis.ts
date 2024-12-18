import { MEDICAL_DEVICE_STANDARDS } from '../standards';
import { AnalysisResult } from '../types';

export function findRelevantStandards(
  category: AnalysisResult['category'],
  keywords: string[]
): string[] {
  const baseStandards = getBaseStandards(category);
  return filterStandardsByKeywords(baseStandards, keywords);
}

function getBaseStandards(category: AnalysisResult['category']): string[] {
  switch (category) {
    case 'usability':
      return MEDICAL_DEVICE_STANDARDS.USABILITY;
    case 'safety':
      return MEDICAL_DEVICE_STANDARDS.SAFETY;
    case 'regulatory':
      return MEDICAL_DEVICE_STANDARDS.REGULATORY;
    default:
      return [];
  }
}

function filterStandardsByKeywords(standards: string[], keywords: string[]): string[] {
  if (keywords.length === 0) return standards;
  
  const standardKeywords = {
    'IEC 62366-1': ['usability', 'interface', 'user'],
    'AAMI HE75': ['human', 'ergonomic', 'design'],
    'IEC 60601-1-6': ['usability', 'safety', 'medical'],
    'ISO 14971': ['risk', 'safety', 'management'],
    'MDR 2017/745': ['regulatory', 'compliance', 'european'],
    '21 CFR Part 820': ['quality', 'system', 'regulation']
  };
  
  return standards.filter(standard => {
    const baseStandard = Object.keys(standardKeywords).find(key => 
      standard.includes(key)
    );
    
    if (!baseStandard) return false;
    
    return keywords.some(keyword =>
      standardKeywords[baseStandard].includes(keyword.toLowerCase())
    );
  });
}