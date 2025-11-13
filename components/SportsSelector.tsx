import React from 'react';
import { Sport } from '../constants';

interface SportsSelectorProps {
  sports: Sport[];
  selectedSports: Set<string>;
  onSelectionChange: (sportKey: string) => void;
}

export const SportsSelector: React.FC<SportsSelectorProps> = ({ sports, selectedSports, onSelectionChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sports.map((sport) => (
        <label
          key={sport.key}
          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedSports.has(sport.key)
              ? 'border-brand-primary bg-indigo-900/50'
              : 'border-brand-bg hover:border-brand-secondary/50'
          }`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={selectedSports.has(sport.key)}
            onChange={() => onSelectionChange(sport.key)}
          />
          <div className={`text-3xl mb-2 ${selectedSports.has(sport.key) ? 'text-brand-secondary' : 'text-brand-text-secondary'}`}>
            {sport.icon}
          </div>
          <span className="text-center font-semibold text-sm">{sport.name}</span>
          <span className="text-center font-normal text-xs text-brand-text-secondary">{sport.key}</span>
        </label>
      ))}
    </div>
  );
};
