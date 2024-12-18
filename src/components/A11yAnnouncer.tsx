import React, { useEffect, useState } from 'react';

interface A11yAnnouncerProps {
  message: string;
  assertive?: boolean;
}

const A11yAnnouncer: React.FC<A11yAnnouncerProps> = ({ 
  message, 
  assertive = false 
}) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      const timer = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};

export default A11yAnnouncer;