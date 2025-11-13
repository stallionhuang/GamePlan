import React from 'react';

interface InfoPanelProps {
  title: string;
  message: string;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ title, message }) => (
  <div className="text-center py-12 px-6 bg-brand-surface rounded-lg shadow-lg animate-fade-in">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-brand-text-primary">{title}</h3>
    <p className="mt-2 text-base text-brand-text-secondary">
      {message}
    </p>
  </div>
);
