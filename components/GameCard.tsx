import React from 'react';
import { Game, GameStatus } from '../types';

interface GameCardProps {
  game: Game;
}

const TeamDisplay: React.FC<{ team: Game['homeTeam']; score: number | null }> = ({ team, score }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center font-bold text-brand-secondary">
        {team.abbreviation}
      </div>
      <span className="font-semibold text-base sm:text-lg text-brand-text-primary">{team.name}</span>
    </div>
    <span className="font-bold text-xl text-brand-text-primary">{score !== null ? score : '-'}</span>
  </div>
);

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider";
  const statusConfig = {
    [GameStatus.Live]: { text: "Live", classes: "bg-red-500 text-white animate-pulse" },
    [GameStatus.Final]: { text: "Final", classes: "bg-gray-700 text-brand-text-secondary" },
    [GameStatus.Upcoming]: { text: "Upcoming", classes: "bg-blue-500 text-white" },
  };
  const config = statusConfig[status];
  return <div className={`${baseClasses} ${config.classes}`}>{config.text}</div>;
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const gameTime = new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-brand-surface rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-brand-secondary">{game.league}</span>
          </div>
          <StatusBadge status={game.status} />
        </div>

        <div className="space-y-4">
          <TeamDisplay team={game.awayTeam} score={game.awayScore} />
          <TeamDisplay team={game.homeTeam} score={game.homeScore} />
        </div>
      </div>
      <div className="bg-brand-bg px-5 py-3 flex justify-between items-center text-sm">
        <span className="font-medium text-brand-text-secondary">
          {game.status === GameStatus.Upcoming ? gameTime : 'Broadcast'}
        </span>
        <span className="font-bold text-brand-primary">{game.broadcast}</span>
      </div>
    </div>
  );
};
