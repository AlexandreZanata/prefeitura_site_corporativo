import React from 'react';
import './StatusAlert.css';

/**
 * StatusAlert
 * A simple, accessible alert component for success, error and info messages.
 */
export default function StatusAlert({ type = 'info', children }) {
  const iconClass = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  }[type] || 'fa-info-circle';

  return (
    <div className={`status-alert ${type}`} role="alert" aria-live="polite">
      <i className={`fas ${iconClass}`} aria-hidden="true"></i>
      <div className="status-text">{children}</div>
    </div>
  );
}
