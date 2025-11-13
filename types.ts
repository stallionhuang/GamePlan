export enum GameStatus {
  Upcoming = 'UPCOMING',
  Live = 'LIVE',
  Final = 'FINAL',
}

export interface Team {
  name: string;
  abbreviation: string;
}

export interface Game {
  sport: string;
  league: string;
  startTime: string; // ISO 8601 format
  status: GameStatus;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  broadcast: string;
}
