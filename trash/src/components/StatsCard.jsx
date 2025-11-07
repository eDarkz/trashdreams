import React from 'react';
import './StatsCard.css';

const icons = {
  recycle: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 19v-6h10v6h2V7H5v12h2zm0-8h10V9H7v2zm-4 8V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2z"/>
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  ),
  tree: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 12c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.47.63 2.79 1.63 3.72L12 21l3.37-5.28C16.37 14.79 17 13.47 17 12zm-5-3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
    </svg>
  ),
  water: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L5.5 7 9 7.5 3 13l3.5.5L2 19l7-2.5L12 21l3-4.5 7 2.5-4.5-5.5L21 13l-6-5.5L18.5 7 12 2z"/>
    </svg>
  ),
  'arrow-up': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14l5-5 5 5H7z"/>
    </svg>
  ),
  'arrow-down': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5H7z"/>
    </svg>
  ),
  'chart-line': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 18.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.5-4-4L3 16.5v2z"/>
    </svg>
  ),
};

const StatsCard = ({ title, value, description, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icons[icon]}</div>
      <div className="stats-content">
        <h4>{title}</h4>
        <div className="stats-value">{value}</div>
        <div className="stats-description">{description}</div>
      </div>
    </div>
  );
};

export default StatsCard;