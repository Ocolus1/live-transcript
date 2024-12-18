import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextAnalysis from '../../components/TextAnalysis';

describe('TextAnalysis', () => {
  it('should render text input and analyze button', () => {
    render(<TextAnalysis />);
    
    expect(screen.getByPlaceholderText(/enter text for analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/analyze/i)).toBeInTheDocument();
  });

  it('should show context settings when toggled', async () => {
    render(<TextAnalysis />);
    
    const settingsButton = screen.getByText(/context settings/i);
    await userEvent.click(settingsButton);
    
    expect(screen.getByText(/core settings/i)).toBeInTheDocument();
    expect(screen.getByText(/device type/i)).toBeInTheDocument();
  });

  it('should disable analyze button when text is empty', () => {
    render(<TextAnalysis />);
    
    const analyzeButton = screen.getByText(/analyze/i);
    expect(analyzeButton).toBeDisabled();
  });

  it('should enable analyze button when text is entered', async () => {
    render(<TextAnalysis />);
    
    const textInput = screen.getByPlaceholderText(/enter text for analysis/i);
    await userEvent.type(textInput, 'Test analysis text');
    
    const analyzeButton = screen.getByText(/analyze/i);
    expect(analyzeButton).toBeEnabled();
  });
});