import React, { useState, useCallback, useMemo } from 'react';
import { Game, GameStatus } from './types';
import { fetchSportsData } from './services/geminiService';
import { SPORTS, Sport } from './constants';
import { GameCard } from './components/GameCard';
import { SportsSelector } from './components/SportsSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Header } from './components/Header';
import { InfoPanel } from './components/InfoPanel';

const App: React.FC = () => {
  const [selectedSports, setSelectedSports] = useState<Set<string>>(
    new Set(['NBA', 'NFL', 'MLB', 'Premier League'])
  );
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSelectionChange = (sportKey: string) => {
    setSelectedSports(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(sportKey)) {
        newSelection.delete(sportKey);
      } else {
        newSelection.add(sportKey);
      }
      return newSelection;
    });
  };

  const getSchedule = useCallback(async () => {
    if (selectedSports.size === 0) {
      setError('Please select at least one sport.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const sportNames = Array.from(selectedSports);
      const data = await fetchSportsData(sportNames);
      const sortedData = data.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      setGames(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSports]);

  const groupedGames = useMemo(() => {
    if (!games.length) return {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return games.reduce((acc, game) => {
      const gameDate = new Date(game.startTime);
      gameDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.round((gameDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      let dayLabel: string;

      if (diffDays === 0) {
        dayLabel = 'Today';
      } else if (diffDays === -1) {
        dayLabel = 'Yesterday';
      } else if (diffDays === 1) {
        dayLabel = 'Tomorrow';
      } else {
        dayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(gameDate);
      }
      
      if (!acc[dayLabel]) {
        acc[dayLabel] = [];
      }
      acc[dayLabel].push(game);
      return acc;
    }, {} as Record<string, Game[]>);
  }, [games]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-brand-surface rounded-lg shadow-xl p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-4">Select Your Favorite Sports</h2>
            <SportsSelector 
              sports={SPORTS} 
              selectedSports={selectedSports} 
              onSelectionChange={handleSelectionChange} 
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={getSchedule}
                disabled={isLoading || selectedSports.size === 0}
                className="bg-brand-primary hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50"
              >
                {isLoading ? 'Loading...' : "Get Today's Game Plan"}
              </button>
            </div>
          </div>

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            {!isLoading && !error && hasSearched && games.length === 0 && (
              <InfoPanel
                title="No Games Found"
                message="No recent, current, or upcoming games were found for the selected sports. Please try selecting different sports or check back later."
              />
            )}
            {!isLoading && !error && Object.keys(groupedGames).length > 0 && (
              <div className="space-y-12">
                {Object.entries(groupedGames).map(([day, dayGames]) => (
                  <div key={day} className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-secondary mb-6 border-b-2 border-brand-surface pb-3">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {dayGames.map((game, index) => (
                        <GameCard key={`${game.homeTeam.abbreviation}-${game.awayTeam.abbreviation}-${index}`} game={game} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isLoading && !error && !hasSearched && (
               <InfoPanel
                title="Welcome to Today's Game Plan"
                message="Select your favorite sports above and click 'Get Today's Game Plan' to see the latest scores and schedules."
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
