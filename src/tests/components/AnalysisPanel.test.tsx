import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnalysisPanel from '../../components/AnalysisPanel';

describe('AnalysisPanel', () => {
  const mockAnalyses = [
    {
      id: '1',
      recommendation: 'Test recommendation',
      priority: 'high',
      category: 'safety',
      standards: ['IEC 62366-1:2015'],
      timestamp: Date.now()
    }
  ];

  it('should render analyses correctly', () => {
    render(<AnalysisPanel analyses={mockAnalyses} />);

    expect(screen.getByText('Test recommendation')).toBeInTheDocument();
    expect(screen.getByText('high priority')).toBeInTheDocument();
    expect(screen.getByText('IEC 62366-1:2015')).toBeInTheDocument();
  });

  it('should show empty state when no analyses', () => {
    render(<AnalysisPanel analyses={[]} />);

    expect(screen.getByText(/no analysis yet/i)).toBeInTheDocument();
  });
});