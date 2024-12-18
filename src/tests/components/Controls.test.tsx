import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Controls from '../../components/Controls';

describe('Controls', () => {
  const mockStartRecording = vi.fn();
  const mockStopRecording = vi.fn();

  it('should render start recording button when not recording', () => {
    render(
      <Controls
        isRecording={false}
        onStartRecording={mockStartRecording}
        onStopRecording={mockStopRecording}
      />
    );

    const button = screen.getByRole('button', { name: /start recording/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockStartRecording).toHaveBeenCalled();
  });

  it('should render stop recording button when recording', () => {
    render(
      <Controls
        isRecording={true}
        onStartRecording={mockStartRecording}
        onStopRecording={mockStopRecording}
      />
    );

    const button = screen.getByRole('button', { name: /stop recording/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockStopRecording).toHaveBeenCalled();
  });
});