import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  variant?: 'toast' | 'inline';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  onDismiss,
  variant = 'inline'
}) => {
  if (variant === 'toast') {
    return (
      <div className="fixed top-4 right-4 z-50 animate-slideIn">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{title}</p>
                <p className="text-sm text-red-700 mt-1">{message}</p>
              </div>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="ml-4 text-red-500 hover:text-red-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{title}</p>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;