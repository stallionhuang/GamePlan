import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
        Today's Game Plan
      </span>
    </h1>
    <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
      Your daily dashboard for live scores, final results, and upcoming matchups across your favorite sports leagues.
    </p>
  </header>
);
