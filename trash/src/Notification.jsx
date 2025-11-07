import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-backdrop"></div>
      <div className="notification-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
