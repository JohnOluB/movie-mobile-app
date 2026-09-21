export type MatchPeriod = '1H' | '2H' | 'HT' | 'FT' | 'ET' | 'P' | 'Upcoming';

export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
  team: 'home' | 'away';
  player: string;
  assist?: string;
  detail?: string;
}

export interface MatchStat {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
}

export interface Player {
  number: number;
  name: string;
  pos: string;
  isCaptain?: boolean;
}

export interface MatchLineups {
  homeFormation: string;
  awayFormation: string;
  homeStarting: Player[];
  awayStarting: Player[];
}

export interface Match {
  id: string;
  time: string;
  period: string;
  leagueId: string;
  leagueName: string;
  leagueFlag: string;
  leagueCountry: string;
  home: string;
  away: string;
  homeEmoji: string;
  awayEmoji: string;
  homeScore: number;
  awayScore: number;
  bookmarked: boolean;
  live: boolean;
  status: MatchStatus;
  stadium: string;
  referee: string;
  stats: MatchStat[];
  events: MatchEvent[];
  lineups: MatchLineups;
}

export interface BetSlip {
  id: string;
  matchTitle: string;
  pick: string;
  odds: number;
  stake: number;
  payout: number;
  status: 'won' | 'lost' | 'pending';
  date: string;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payout' | 'stake';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
