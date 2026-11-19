export type MatchType = 'friendly' | 'ranked' | 'tournament' | 'league';
export type MatchStatus = 'scheduled' | 'connecting' | 'in_progress' | 'completed' | 'cancelled';
export type MatchResult = 'playerA_win' | 'playerB_win' | 'draw' | 'pending';
export type UserStatus = 'active' | 'suspended';

export interface Player {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  country: string;
  countryCode: string;
  rating: number; // Elo rating
  rank: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number; // percentage
  goalsFor: number;
  goalsAgainst: number;
  memberSince: string;
  tacticalStyle?: string;
  bio?: string;
  status: UserStatus;
  isDemoUser?: boolean;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'save' | 'yellow_card' | 'tactical_shift' | 'corner';
  player: string;
  description: string;
}

export interface Match {
  id: string; // e.g. FTB-2026-8821
  type: MatchType;
  competitionId?: string;
  competitionName: string;
  playerAId: string;
  playerBId: string;
  playerA: Player;
  playerB: Player;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  result: MatchResult;
  ratingChangeA: number;
  ratingChangeB: number;
  date: string;
  duration: string;
  stage?: string;
  events?: MatchEvent[];
  unitySessionToken?: string;
  unityMatchId?: string;
  tournamentId?: string;
  leagueId?: string;
  roundNumber?: number;
}

export interface Challenge {
  id: string;
  senderId: string;
  receiverId: string;
  sender: Player;
  receiver: Player;
  matchType: MatchType;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  matchId?: string;
}

export interface BracketMatch {
  id: string;
  round: number; // 1 = Quarter-finals, 2 = Semi-finals, 3 = Final
  roundName: string;
  matchIndex: number;
  playerA?: Player;
  playerB?: Player;
  scoreA?: number;
  scoreB?: number;
  winnerId?: string;
  matchId?: string;
  isCompleted: boolean;
  nextMatchIndex?: number; // Pointer to next round slot
  nextMatchSlot?: 'A' | 'B';
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  type: 'Knockout 8' | 'Knockout 16' | 'Round Robin';
  status: 'upcoming' | 'registration_open' | 'active' | 'completed';
  entryFee: number; // 0 for free
  prizePool: number;
  maxParticipants: number;
  participants: Player[];
  startDate: string;
  registrationDeadline: string;
  description: string;
  bannerImage: string;
  championId?: string;
  champion?: Player;
  bracket: BracketMatch[];
}

export interface LeagueTeamStats {
  playerId: string;
  player: Player;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface LeagueFixture {
  id: string;
  round: number;
  playerAId: string;
  playerBId: string;
  playerA: Player;
  playerB: Player;
  scoreA?: number;
  scoreB?: number;
  isCompleted: boolean;
  matchId?: string;
  date: string;
}

export interface League {
  id: string;
  name: string;
  season: string;
  description: string;
  currentLeaderId: string;
  teams: LeagueTeamStats[];
  fixtures: LeagueFixture[];
}

export interface Payment {
  id: string;
  transactionId: string;
  playerId: string;
  playerUsername: string;
  tournamentId: string;
  tournamentName: string;
  amount: number;
  currency: string;
  method: 'Credit Card' | 'PayPal' | 'Federation Credits';
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'challenge' | 'match_result' | 'tournament' | 'system' | 'rating';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  link?: string;
  challengeId?: string;
  matchId?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: 'match' | 'rating' | 'tournament' | 'challenge';
  description: string;
  timestamp: string;
}
