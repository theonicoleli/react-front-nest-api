import React, { useEffect } from 'react';
import '../styles/Notification.css';

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose} className="close-button">&times;</button>
    </div>
  );
}

export default Notification;
