import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  Player, Match, Tournament, League, Challenge, Payment, AppNotification, ActivityLog,
  MatchType, MatchResult
} from '../types';
import { 
  INITIAL_PLAYERS, INITIAL_MATCHES, INITIAL_TOURNAMENTS, INITIAL_LEAGUE, 
  INITIAL_CHALLENGES, INITIAL_PAYMENTS, INITIAL_NOTIFICATIONS 
} from './demoData';
import { calculateElo } from '../utils/elo';

interface AppState {
  currentUser: Player;
  isAuthenticated: boolean;
  isAdmin: boolean;
  players: Player[];
  matches: Match[];
  tournaments: Tournament[];
  league: League;
  challenges: Challenge[];
  payments: Payment[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];
  
  // Auth Actions
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  register: (data: { username: string; email: string; country: string }) => Player;
  switchUser: (playerId: string) => void;
  toggleAdmin: (force?: boolean) => void;

  // Challenge Actions
  createChallenge: (receiverId: string, matchType: MatchType) => Challenge;
  respondToChallenge: (challengeId: string, action: 'accept' | 'decline') => string | null;

  // Match Actions
  createMatch: (match: Partial<Match>) => Match;
  completeMatch: (matchId: string, scoreA: number, scoreB: number) => { match: Match; ratingChangeA: number; ratingChangeB: number };

  // Tournament Actions
  joinTournament: (tournamentId: string, paymentMethod?: 'Credit Card' | 'PayPal') => boolean;
  advanceTournamentMatch: (tournamentId: string, matchIndex: number, scoreA: number, scoreB: number) => void;

  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Admin Actions
  suspendUser: (playerId: string) => void;
  reactivateUser: (playerId: string) => void;
  adminCreateTournament: (data: Partial<Tournament>) => Tournament;
  adminUpdatePaymentStatus: (paymentId: string, status: Payment['status']) => void;
  adminCorrectMatch: (matchId: string, newScoreA: number, newScoreB: number) => void;

  // Demo state reset
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: INITIAL_PLAYERS[0], // Alex Morgan
      isAuthenticated: true,
      isAdmin: false,
      players: INITIAL_PLAYERS,
      matches: INITIAL_MATCHES,
      tournaments: INITIAL_TOURNAMENTS,
      league: INITIAL_LEAGUE,
      challenges: INITIAL_CHALLENGES,
      payments: INITIAL_PAYMENTS,
      notifications: INITIAL_NOTIFICATIONS,
      activityLogs: [
        {
          id: 'log-1',
          userId: 'player-alex-morgan',
          type: 'match',
          description: 'Defeated Daniel Carter 2–1 in Division 1 Match',
          timestamp: 'Yesterday at 20:45'
        },
        {
          id: 'log-2',
          userId: 'player-alex-morgan',
          type: 'rating',
          description: 'Rating increased by +18 to 1,485',
          timestamp: 'Yesterday at 20:46'
        },
        {
          id: 'log-3',
          userId: 'player-alex-morgan',
          type: 'tournament',
          description: 'Advanced to World Cup Quarter-Finals',
          timestamp: '2 days ago'
        }
      ],

      // Auth
      login: (username: string) => {
        const found = get().players.find(
          p => p.username.toLowerCase() === username.toLowerCase() || p.email.toLowerCase() === username.toLowerCase()
        );
        if (found) {
          set({ currentUser: found, isAuthenticated: true });
          return true;
        }
        // Fallback to Alex Morgan for demo convenience
        set({ currentUser: get().players[0], isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ isAuthenticated: false, isAdmin: false });
      },

      register: ({ username, email, country }) => {
        const newPlayer: Player = {
          id: `player-${Date.now()}`,
          username: username.trim(),
          displayName: username.trim(),
          email: email.trim(),
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80`,
          country: country || 'United Kingdom',
          countryCode: 'GB',
          rating: 1000,
          rank: get().players.length + 1,
          matchesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          winRate: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          memberSince: 'Today',
          tacticalStyle: 'Standard Adaptive',
          bio: 'Newly registered Federation contender ready to climb the ladder.',
          status: 'active',
          isDemoUser: true,
        };

        const updatedPlayers = [...get().players, newPlayer];
        set({
          players: updatedPlayers,
          currentUser: newPlayer,
          isAuthenticated: true,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: newPlayer.id,
              type: 'system',
              title: 'Welcome to FUTBOLIÑO Federation',
              message: 'Your official player profile is active. Challenge players or enter tournaments to establish your ranking.',
              date: 'Just now',
              isRead: false,
              link: '/play'
            },
            ...get().notifications
          ]
        });

        return newPlayer;
      },

      switchUser: (playerId: string) => {
        const player = get().players.find(p => p.id === playerId);
        if (player) {
          set({ currentUser: player, isAuthenticated: true });
        }
      },

      toggleAdmin: (force?: boolean) => {
        set(state => ({ isAdmin: force !== undefined ? force : !state.isAdmin }));
      },

      // Challenges
      createChallenge: (receiverId: string, matchType: MatchType) => {
        const sender = get().currentUser;
        const receiver = get().players.find(p => p.id === receiverId) || get().players[1];

        const newChallenge: Challenge = {
          id: `chal-${Date.now()}`,
          senderId: sender.id,
          receiverId: receiver.id,
          sender,
          receiver,
          matchType,
          status: 'pending',
          createdAt: 'Just now'
        };

        const newNotification: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: receiver.id,
          type: 'challenge',
          title: 'Incoming Challenge',
          message: `${sender.displayName} challenged you to a ${matchType} match.`,
          date: 'Just now',
          isRead: false,
          challengeId: newChallenge.id,
          link: '/challenges'
        };

        set(state => ({
          challenges: [newChallenge, ...state.challenges],
          notifications: [newNotification, ...state.notifications],
          activityLogs: [
            {
              id: `log-${Date.now()}`,
              userId: sender.id,
              type: 'challenge',
              description: `Challenged ${receiver.displayName} to a ${matchType} match`,
              timestamp: 'Just now'
            },
            ...state.activityLogs
          ]
        }));

        return newChallenge;
      },

      respondToChallenge: (challengeId: string, action: 'accept' | 'decline') => {
        const challenge = get().challenges.find(c => c.id === challengeId);
        if (!challenge) return null;

        if (action === 'decline') {
          set(state => ({
            challenges: state.challenges.map(c => 
              c.id === challengeId ? { ...c, status: 'declined' } : c
            )
          }));
          return null;
        }

        // Accept challenge: create a match!
        const matchId = `FTB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newMatch: Match = {
          id: matchId,
          type: challenge.matchType,
          competitionName: challenge.matchType === 'ranked' ? 'Federation Global Ladder' : 'Friendly Match',
          playerAId: challenge.senderId,
          playerBId: challenge.receiverId,
          playerA: challenge.sender,
          playerB: challenge.receiver,
          scoreA: 0,
          scoreB: 0,
          status: 'scheduled',
          result: 'pending',
          ratingChangeA: 0,
          ratingChangeB: 0,
          date: new Date().toISOString().split('T')[0],
          duration: '15:00',
          stage: challenge.matchType === 'ranked' ? 'Ranked Duel' : 'Friendly Duel',
          unitySessionToken: `ses_${matchId}_${Math.random().toString(36).substring(7)}`,
          unityMatchId: `unity_${matchId}`
        };

        set(state => ({
          challenges: state.challenges.map(c => 
            c.id === challengeId ? { ...c, status: 'accepted', matchId } : c
          ),
          matches: [newMatch, ...state.matches],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: challenge.senderId,
              type: 'match_result',
              title: 'Challenge Accepted!',
              message: `${challenge.receiver.displayName} accepted your challenge. Match ${matchId} is ready to launch.`,
              date: 'Just now',
              isRead: false,
              matchId,
              link: `/matches/${matchId}`
            },
            ...state.notifications
          ]
        }));

        return matchId;
      },

      // Create a match
      createMatch: (matchData: Partial<Match>) => {
        const matchId = matchData.id || `FTB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const playerA = matchData.playerA || get().currentUser;
        const playerB = matchData.playerB || get().players[1];

        const match: Match = {
          id: matchId,
          type: matchData.type || 'friendly',
          competitionId: matchData.competitionId,
          competitionName: matchData.competitionName || 'Federation Exhibition',
          playerAId: playerA.id,
          playerBId: playerB.id,
          playerA,
          playerB,
          scoreA: 0,
          scoreB: 0,
          status: 'scheduled',
          result: 'pending',
          ratingChangeA: 0,
          ratingChangeB: 0,
          date: new Date().toISOString().split('T')[0],
          duration: '15:00',
          stage: matchData.stage || 'Exhibition Match',
          unitySessionToken: `ses_${matchId}_token`,
          unityMatchId: `unity_${matchId}`,
          tournamentId: matchData.tournamentId,
          leagueId: matchData.leagueId,
          roundNumber: matchData.roundNumber,
          events: []
        };

        set(state => ({
          matches: [match, ...state.matches]
        }));

        return match;
      },

      // Complete Match & Synchronize All State
      completeMatch: (matchId: string, scoreA: number, scoreB: number) => {
        const state = get();
        const existingMatch = state.matches.find(m => m.id === matchId);
        
        const playerA = state.players.find(p => p.id === (existingMatch?.playerAId || state.currentUser.id)) || state.players[0];
        const playerB = state.players.find(p => p.id === (existingMatch?.playerBId || state.players[1].id)) || state.players[1];
        const matchType = existingMatch?.type || 'friendly';

        let ratingChangeA = 0;
        let ratingChangeB = 0;
        let result: MatchResult = 'draw';

        if (scoreA > scoreB) result = 'playerA_win';
        else if (scoreB > scoreA) result = 'playerB_win';

        // PRD Section 13.3 & 9.5: Rating updates ONLY for ranked, tournament, or league matches (Friendly unranked)
        const isRanked = matchType === 'ranked' || matchType === 'tournament' || matchType === 'league';
        if (isRanked) {
          const actualScoreA = scoreA > scoreB ? 1 : scoreA === scoreB ? 0.5 : 0;
          const actualScoreB = scoreB > scoreA ? 1 : scoreA === scoreB ? 0.5 : 0;
          const eloCalc = calculateElo(playerA.rating, playerB.rating, actualScoreA, actualScoreB);
          ratingChangeA = eloCalc.playerAChange;
          ratingChangeB = eloCalc.playerBChange;
        }

        // Generate simulated dynamic match events
        const simulatedEvents = [
          { minute: 14, type: 'tactical_shift' as const, player: playerA.displayName, description: 'Shifted offensive width to exploit high defensive line.' },
          { minute: 28, type: 'goal' as const, player: scoreA > 0 ? playerA.displayName : playerB.displayName, description: 'Clinical finish into bottom corner after rapid build-up.' },
          ...(scoreA + scoreB > 1 ? [{ minute: 67, type: 'goal' as const, player: scoreB > 0 ? playerB.displayName : playerA.displayName, description: 'Powerful strike following a rebound.' }] : []),
          ...(scoreA + scoreB > 2 ? [{ minute: 84, type: 'goal' as const, player: scoreA > scoreB ? playerA.displayName : playerB.displayName, description: 'Decisive tactical conversion inside the six-yard box.' }] : []),
        ];

        const updatedMatch: Match = {
          id: matchId,
          type: matchType,
          competitionId: existingMatch?.competitionId,
          competitionName: existingMatch?.competitionName || 'Federation Match',
          playerAId: playerA.id,
          playerBId: playerB.id,
          playerA,
          playerB,
          scoreA,
          scoreB,
          status: 'completed',
          result,
          ratingChangeA,
          ratingChangeB,
          date: new Date().toISOString().split('T')[0],
          duration: '15:20',
          stage: existingMatch?.stage || 'Competitive Match',
          events: simulatedEvents,
          unitySessionToken: existingMatch?.unitySessionToken || `ses_${matchId}`,
          unityMatchId: existingMatch?.unityMatchId || `unity_${matchId}`,
          tournamentId: existingMatch?.tournamentId,
          leagueId: existingMatch?.leagueId,
          roundNumber: existingMatch?.roundNumber
        };

        // Update player stats
        const updatedPlayers = state.players.map(p => {
          if (p.id === playerA.id) {
            const matchesPlayed = p.matchesPlayed + 1;
            const wins = scoreA > scoreB ? p.wins + 1 : p.wins;
            const draws = scoreA === scoreB ? p.draws + 1 : p.draws;
            const losses = scoreA < scoreB ? p.losses + 1 : p.losses;
            const winRate = Number(((wins / matchesPlayed) * 100).toFixed(1));
            return {
              ...p,
              rating: isRanked ? Math.max(100, p.rating + ratingChangeA) : p.rating,
              matchesPlayed,
              wins,
              draws,
              losses,
              winRate,
              goalsFor: p.goalsFor + scoreA,
              goalsAgainst: p.goalsAgainst + scoreB,
            };
          }
          if (p.id === playerB.id) {
            const matchesPlayed = p.matchesPlayed + 1;
            const wins = scoreB > scoreA ? p.wins + 1 : p.wins;
            const draws = scoreA === scoreB ? p.draws + 1 : p.draws;
            const losses = scoreB < scoreA ? p.losses + 1 : p.losses;
            const winRate = Number(((wins / matchesPlayed) * 100).toFixed(1));
            return {
              ...p,
              rating: isRanked ? Math.max(100, p.rating + ratingChangeB) : p.rating,
              matchesPlayed,
              wins,
              draws,
              losses,
              winRate,
              goalsFor: p.goalsFor + scoreB,
              goalsAgainst: p.goalsAgainst + scoreA,
            };
          }
          return p;
        });

        // Recalculate ranks across all players by rating descending
        const sortedRanks = [...updatedPlayers].sort((a, b) => b.rating - a.rating);
        const rankedPlayers = updatedPlayers.map(p => ({
          ...p,
          rank: sortedRanks.findIndex(r => r.id === p.id) + 1
        }));

        // Synchronize current user reference if updated
        const updatedCurrentUser = rankedPlayers.find(p => p.id === state.currentUser.id) || state.currentUser;

        // If Tournament Match: Advance Tournament Bracket
        let updatedTournaments = state.tournaments;
        if (existingMatch?.tournamentId) {
          const tId = existingMatch.tournamentId;
          const tourney = state.tournaments.find(t => t.id === tId);
          if (tourney) {
            const winner = scoreA > scoreB ? playerA : scoreB > scoreA ? playerB : playerA; // in knockout, higher or playerA advances
            const updatedBracket = tourney.bracket.map(bm => {
              if (bm.matchId === matchId || (bm.playerA?.id === playerA.id && bm.playerB?.id === playerB.id)) {
                return {
                  ...bm,
                  scoreA,
                  scoreB,
                  winnerId: winner.id,
                  isCompleted: true,
                };
              }
              return bm;
            });

            // Find current bracket match
            const currentBracketMatch = tourney.bracket.find(
              bm => bm.matchId === matchId || (bm.playerA?.id === playerA.id && bm.playerB?.id === playerB.id)
            );

            if (currentBracketMatch && currentBracketMatch.nextMatchIndex !== undefined) {
              const targetIdx = currentBracketMatch.nextMatchIndex;
              const slot = currentBracketMatch.nextMatchSlot || 'A';
              const targetMatch = updatedBracket[targetIdx];
              if (targetMatch) {
                if (slot === 'A') targetMatch.playerA = winner;
                else targetMatch.playerB = winner;
              }
            }

            // Check if final was completed
            const finalMatch = updatedBracket.find(bm => bm.round === 3);
            let championId = tourney.championId;
            let champion = tourney.champion;
            let status = tourney.status;

            if (finalMatch && finalMatch.isCompleted && finalMatch.winnerId) {
              championId = finalMatch.winnerId;
              champion = rankedPlayers.find(p => p.id === championId);
              status = 'completed';
            }

            updatedTournaments = state.tournaments.map(t => 
              t.id === tId ? { ...t, bracket: updatedBracket, championId, champion, status } : t
            );
          }
        }

        // If League Match: Recalculate League Standings
        let updatedLeague = state.league;
        if (existingMatch?.leagueId || matchType === 'league') {
          const teamAStats = state.league.teams.find(t => t.playerId === playerA.id);
          const teamBStats = state.league.teams.find(t => t.playerId === playerB.id);

          const newTeams = state.league.teams.map(t => {
            if (t.playerId === playerA.id) {
              const played = t.played + 1;
              const won = scoreA > scoreB ? t.won + 1 : t.won;
              const drawn = scoreA === scoreB ? t.drawn + 1 : t.drawn;
              const lost = scoreA < scoreB ? t.lost + 1 : t.lost;
              const gf = t.goalsFor + scoreA;
              const ga = t.goalsAgainst + scoreB;
              const gd = gf - ga;
              const pts = won * 3 + drawn * 1;
              const formChar: 'W' | 'D' | 'L' = scoreA > scoreB ? 'W' : scoreA === scoreB ? 'D' : 'L';
              return {
                ...t,
                played,
                won,
                drawn,
                lost,
                goalsFor: gf,
                goalsAgainst: ga,
                goalDifference: gd,
                points: pts,
                form: [formChar, ...t.form.slice(0, 4)]
              };
            }
            if (t.playerId === playerB.id) {
              const played = t.played + 1;
              const won = scoreB > scoreA ? t.won + 1 : t.won;
              const drawn = scoreA === scoreB ? t.drawn + 1 : t.drawn;
              const lost = scoreB < scoreA ? t.lost + 1 : t.lost;
              const gf = t.goalsFor + scoreB;
              const ga = t.goalsAgainst + scoreA;
              const gd = gf - ga;
              const pts = won * 3 + drawn * 1;
              const formChar: 'W' | 'D' | 'L' = scoreB > scoreA ? 'W' : scoreA === scoreB ? 'D' : 'L';
              return {
                ...t,
                played,
                won,
                drawn,
                lost,
                goalsFor: gf,
                goalsAgainst: ga,
                goalDifference: gd,
                points: pts,
                form: [formChar, ...t.form.slice(0, 4)]
              };
            }
            return t;
          });

          // Sort league table: 1. Points, 2. GD, 3. GF
          newTeams.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            return b.goalsFor - a.goalsFor;
          });

          // Update fixture
          const updatedFixtures = state.league.fixtures.map(f => {
            if (
              (f.playerAId === playerA.id && f.playerBId === playerB.id) ||
              (f.playerAId === playerB.id && f.playerBId === playerA.id)
            ) {
              return { ...f, scoreA, scoreB, isCompleted: true, matchId };
            }
            return f;
          });

          updatedLeague = {
            ...state.league,
            currentLeaderId: newTeams[0]?.playerId || state.league.currentLeaderId,
            teams: newTeams,
            fixtures: updatedFixtures
          };
        }

        // Add Match to history, or replace if was pending
        const existingIdx = state.matches.findIndex(m => m.id === matchId);
        const updatedMatches = existingIdx >= 0 
          ? state.matches.map((m, i) => i === existingIdx ? updatedMatch : m)
          : [updatedMatch, ...state.matches];

        // Notifications & logs
        const matchWinnerName = scoreA > scoreB ? playerA.displayName : scoreB > scoreA ? playerB.displayName : 'Draw';
        const userWon = (state.currentUser.id === playerA.id && scoreA > scoreB) || (state.currentUser.id === playerB.id && scoreB > scoreA);
        const userDelta = state.currentUser.id === playerA.id ? ratingChangeA : state.currentUser.id === playerB.id ? ratingChangeB : 0;

        const newNotification: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: state.currentUser.id,
          type: 'match_result',
          title: `Match ${matchId} Concluded`,
          message: `${playerA.displayName} ${scoreA} – ${scoreB} ${playerB.displayName}. ${isRanked ? `Rating delta: ${userDelta >= 0 ? `+${userDelta}` : userDelta}` : 'Result archived.'}`,
          date: 'Just now',
          isRead: false,
          matchId,
          link: `/matches/${matchId}`
        };

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          userId: state.currentUser.id,
          type: 'match',
          description: `Finished match vs ${state.currentUser.id === playerA.id ? playerB.displayName : playerA.displayName} (${scoreA}–${scoreB})`,
          timestamp: 'Just now'
        };

        set({
          matches: updatedMatches,
          players: rankedPlayers,
          currentUser: updatedCurrentUser,
          tournaments: updatedTournaments,
          league: updatedLeague,
          notifications: [newNotification, ...state.notifications],
          activityLogs: [newLog, ...state.activityLogs]
        });

        return { match: updatedMatch, ratingChangeA, ratingChangeB };
      },

      // Join Tournament & Simulate Checkout
      joinTournament: (tournamentId: string, paymentMethod: 'Credit Card' | 'PayPal' = 'Credit Card') => {
        const state = get();
        const tournament = state.tournaments.find(t => t.id === tournamentId);
        if (!tournament) return false;

        // Check if already registered
        if (tournament.participants.some(p => p.id === state.currentUser.id)) {
          return false;
        }

        // Check capacity
        if (tournament.participants.length >= tournament.maxParticipants) {
          return false;
        }

        const updatedParticipants = [...tournament.participants, state.currentUser];
        const updatedTournaments = state.tournaments.map(t => 
          t.id === tournamentId ? { ...t, participants: updatedParticipants } : t
        );

        let newPayment: Payment | null = null;
        if (tournament.entryFee > 0) {
          newPayment = {
            id: `pay-${Date.now()}`,
            transactionId: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}-FTB`,
            playerId: state.currentUser.id,
            playerUsername: state.currentUser.username,
            tournamentId: tournament.id,
            tournamentName: tournament.name,
            amount: tournament.entryFee,
            currency: 'USD',
            method: paymentMethod,
            status: 'Paid',
            date: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
        }

        const newNotification: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: state.currentUser.id,
          type: 'tournament',
          title: 'Tournament Registration Confirmed',
          message: `You are officially registered for ${tournament.name}. Good luck on the pitch!`,
          date: 'Just now',
          isRead: false,
          link: `/tournaments/${tournament.id}`
        };

        set({
          tournaments: updatedTournaments,
          payments: newPayment ? [newPayment, ...state.payments] : state.payments,
          notifications: [newNotification, ...state.notifications],
          activityLogs: [
            {
              id: `log-${Date.now()}`,
              userId: state.currentUser.id,
              type: 'tournament',
              description: `Registered for ${tournament.name}`,
              timestamp: 'Just now'
            },
            ...state.activityLogs
          ]
        });

        return true;
      },

      // Advance Tournament Match Directly
      advanceTournamentMatch: (tournamentId: string, matchIndex: number, scoreA: number, scoreB: number) => {
        const state = get();
        const tournament = state.tournaments.find(t => t.id === tournamentId);
        if (!tournament || !tournament.bracket[matchIndex]) return;

        const currentBm = tournament.bracket[matchIndex];
        if (!currentBm.playerA || !currentBm.playerB) return;

        const winner = scoreA > scoreB ? currentBm.playerA : currentBm.playerB;
        const updatedBracket = [...tournament.bracket];

        updatedBracket[matchIndex] = {
          ...currentBm,
          scoreA,
          scoreB,
          winnerId: winner.id,
          isCompleted: true
        };

        // If target slot exists in next round
        if (currentBm.nextMatchIndex !== undefined) {
          const nextBm = updatedBracket[currentBm.nextMatchIndex];
          if (nextBm) {
            if (currentBm.nextMatchSlot === 'A') {
              nextBm.playerA = winner;
            } else {
              nextBm.playerB = winner;
            }
          }
        }

        // Check if final was completed
        let champion = tournament.champion;
        let championId = tournament.championId;
        let status = tournament.status;

        if (currentBm.round === 3) {
          champion = winner;
          championId = winner.id;
          status = 'completed';
        }

        set({
          tournaments: state.tournaments.map(t => 
            t.id === tournamentId ? { ...t, bracket: updatedBracket, champion, championId, status } : t
          )
        });
      },

      // Notifications
      markNotificationRead: (id: string) => {
        set(state => ({
          notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
        }));
      },

      markAllNotificationsRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true }))
        }));
      },

      // Admin Actions
      suspendUser: (playerId: string) => {
        set(state => ({
          players: state.players.map(p => p.id === playerId ? { ...p, status: 'suspended' } : p)
        }));
      },

      reactivateUser: (playerId: string) => {
        set(state => ({
          players: state.players.map(p => p.id === playerId ? { ...p, status: 'active' } : p)
        }));
      },

      adminCreateTournament: (data: Partial<Tournament>) => {
        const newTourn: Tournament = {
          id: `tourn-${Date.now()}`,
          name: data.name || 'New Federation Tournament',
          slug: (data.name || 'tournament').toLowerCase().replace(/\s+/g, '-'),
          type: data.type || 'Knockout 8',
          status: data.status || 'registration_open',
          entryFee: data.entryFee || 0,
          prizePool: data.prizePool || 500,
          maxParticipants: 8,
          participants: [get().currentUser],
          startDate: data.startDate || '2026-12-01',
          registrationDeadline: data.registrationDeadline || '2026-11-30',
          description: data.description || 'Admin created strategic football tournament.',
          bannerImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
          bracket: []
        };

        set(state => ({
          tournaments: [newTourn, ...state.tournaments]
        }));

        return newTourn;
      },

      adminUpdatePaymentStatus: (paymentId: string, status: Payment['status']) => {
        set(state => ({
          payments: state.payments.map(p => p.id === paymentId ? { ...p, status } : p)
        }));
      },

      adminCorrectMatch: (matchId: string, newScoreA: number, newScoreB: number) => {
        const state = get();
        const match = state.matches.find(m => m.id === matchId);
        if (!match) return;

        const updatedMatches = state.matches.map(m => {
          if (m.id === matchId) {
            const result: MatchResult = newScoreA > newScoreB ? 'playerA_win' : newScoreA < newScoreB ? 'playerB_win' : 'draw';
            return {
              ...m,
              scoreA: newScoreA,
              scoreB: newScoreB,
              result
            };
          }
          return m;
        });

        set({ matches: updatedMatches });
      },

      // Reset Demo Data to Pristine Initial State
      resetDemoData: () => {
        set({
          currentUser: INITIAL_PLAYERS[0],
          isAuthenticated: true,
          isAdmin: false,
          players: INITIAL_PLAYERS,
          matches: INITIAL_MATCHES,
          tournaments: INITIAL_TOURNAMENTS,
          league: INITIAL_LEAGUE,
          challenges: INITIAL_CHALLENGES,
          payments: INITIAL_PAYMENTS,
          notifications: INITIAL_NOTIFICATIONS,
          activityLogs: [
            {
              id: 'log-1',
              userId: 'player-alex-morgan',
              type: 'match',
              description: 'Defeated Daniel Carter 2–1 in Division 1 Match',
              timestamp: 'Yesterday at 20:45'
            },
            {
              id: 'log-2',
              userId: 'player-alex-morgan',
              type: 'rating',
              description: 'Rating increased by +18 to 1,485',
              timestamp: 'Yesterday at 20:46'
            }
          ]
        });
      }
    }),
    {
      name: 'futbolino_demo_state_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
