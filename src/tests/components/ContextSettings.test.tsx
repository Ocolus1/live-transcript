import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContextSettings from '../../components/ContextSettings';

describe('ContextSettings', () => {
  const mockContext = {
    deviceType: 'qiasymphony',
    useEnvironment: 'clinical-lab',
    userType: 'lab-technician',
    riskLevel: 'medium',
    workflow: 'sample-prep',
    specialization: 'molecular',
    experience: 'intermediate',
    trainingLevel: 'basic'
  };

  const mockSetContext = vi.fn();
  const mockSetShowContext = vi.fn();

  it('should render all context options', () => {
    render(
      <ContextSettings
        context={mockContext}
        setContext={mockSetContext}
        showContext={true}
        setShowContext={mockSetShowContext}
      />
    );

    expect(screen.getByText('Core Settings')).toBeInTheDocument();
    expect(screen.getByText('Device Type')).toBeInTheDocument();
    expect(screen.getByText('Environment')).toBeInTheDocument();
    expect(screen.getByText('User Type')).toBeInTheDocument();
  });

  it('should update context when selections change', () => {
    render(
      <ContextSettings
        context={mockContext}
        setContext={mockSetContext}
        showContext={true}
        setShowContext={mockSetShowContext}
      />
    );

    const deviceTypeSelect = screen.getByLabelText('Device Type');
    fireEvent.change(deviceTypeSelect, { target: { value: 'infusion-pump' } });

    expect(mockSetContext).toHaveBeenCalledWith(expect.objectContaining({
      deviceType: 'infusion-pump'
    }));
  });

  it('should reset to defaults when reset button clicked', () => {
    render(
      <ContextSettings
        context={mockContext}
        setContext={mockSetContext}
        showContext={true}
        setShowContext={mockSetShowContext}
      />
    );

    const resetButton = screen.getByText('Reset to Defaults');
    fireEvent.click(resetButton);

    expect(mockSetContext).toHaveBeenCalledWith(expect.objectContaining({
      deviceType: 'qiasymphony',
      useEnvironment: 'clinical-lab',
      userType: 'lab-technician'
    }));
  });
});