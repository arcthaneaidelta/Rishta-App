import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { useAppStore } from '../store';
import { PlayerAvatar } from '../components/PlayerAvatar';
import {
  Trophy,
  Swords,
  Users,
  Globe,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Play,
  Flame,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { tournaments, players } = useAppStore();
  const navigate = useNavigate();

  // Animated demonstration counters
  const [counts, setCounts] = useState({
    players: 11800,
    matches: 82000,
    competitions: 20,
    countries: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounts((prev) => ({
        players: prev.players < 12480 ? prev.players + 68 : 12480,
        matches: prev.matches < 86240 ? prev.matches + 424 : 86240,
        competitions: prev.competitions < 24 ? prev.competitions + 1 : 24,
        countries: prev.countries < 47 ? prev.countries + 1 : 47
      }));
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const topPlayers = [...players].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="min-h-screen bg-warm-bg text-charcoal flex flex-col selection:bg-forest-100">
      {/* Public Navbar */}
      <PublicNavbar />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest-950 text-surface">
        {/* Atmospheric Football Stadium Visual Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=85"
            alt="Futbolino Stadium Pitch"
            className="w-full h-full object-cover object-center opacity-30 transform scale-105 animate-in fade-in duration-1000"
          />
          {/* Subtle dark gradient overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/80" />
          {/* Subtle noise/tactical grid texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#B69A60_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-gold/30 text-gold text-xs uppercase font-extrabold tracking-widest shadow-subtle animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>THE FUTBOLIÑO FEDERATION</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-surface max-w-4xl mx-auto leading-[1.08]">
            Football Strategy. <br />
            <span className="text-gold">Real Competition.</span> <br />
            One Federation.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Enter the world of FUTBOLIÑO. Challenge players, compete in sanctioned tournaments, climb the global rankings and build your strategic legacy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest-500 hover:bg-forest-400 text-surface font-display font-bold text-sm tracking-wide shadow-elevated transition-all flex items-center justify-center gap-2.5 active:scale-98"
            >
              <span>JOIN THE FEDERATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#competitions"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface/10 hover:bg-surface/15 text-stone-200 border border-white/20 font-display font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>EXPLORE COMPETITIONS</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-10 flex flex-col items-center justify-center text-stone-400 gap-1.5 text-xs opacity-75">
            <span>Scroll to discover</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Live Federation Statistics Section */}
      <section className="bg-surface border-y border-stone-200/90 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-stone-200/70">
            <div className="pt-4 lg:pt-0">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-forest-800 tabular-nums">
                {counts.players.toLocaleString()}
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted mt-1">
                Registered Players
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-forest-800 tabular-nums">
                {counts.matches.toLocaleString()}
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted mt-1">
                Matches Played
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-forest-800 tabular-nums">
                {counts.competitions}
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted mt-1">
                Active Competitions
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-forest-800 tabular-nums">
                {counts.countries}
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted mt-1">
                Countries Represented
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About FUTBOLIÑO Split Section */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Strategic Football Sovereignty
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal leading-tight">
              More Than a Match. <br />
              <span className="text-forest-700">A Competitive Community.</span>
            </h2>

            <p className="text-base text-charcoal-muted leading-relaxed">
              FUTBOLIÑO brings players together through strategic football gameplay, challenges, and sanctioned tournaments.
              Every match tests tactical foresight, positioning, and decision-making on the pitch.
            </p>

            <p className="text-base text-charcoal-muted leading-relaxed">
              Powered by an authoritative Elo rating engine (K=32) and seamless Unity match engine integration,
              the Federation establishes a fair, transparent, and enduring competitive hierarchy.
            </p>

            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all"
              >
                <span>Create Your Player Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="relative">
            <div className="relative rounded-panel overflow-hidden border border-stone-200 shadow-elevated bg-stone-100 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
                alt="Tactical Match Arena"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-card bg-surface/90 backdrop-blur-md border border-stone-200/80 shadow-card flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-forest-700">
                    Grand Championship
                  </div>
                  <div className="font-display font-bold text-sm text-charcoal">
                    FUTBOLIÑO World Cup Bracket
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-100 text-forest-700">
                  Live Stage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Simple Steps) */}
      <section id="how-it-works" className="py-20 bg-soft-bg border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-forest-700">
              The Path to Glory
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
              How the Federation Operates
            </h2>
            <p className="text-sm text-charcoal-muted">
              Four structured milestones from your initial registration to hoisting Federation silverware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4 hover:border-forest-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black text-gold">01</span>
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Create Your Profile
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Establish your Federation credentials, claim your tactical playstyle, and receive your 1,000 starting Elo rating.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4 hover:border-forest-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black text-gold">02</span>
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <Swords className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Challenge Opponents
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Issue friendly duels or enter ranked challenges against verified players in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4 hover:border-forest-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black text-gold">03</span>
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Compete in Tournaments
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Join single-elimination knockout brackets or season-long league divisions for prestige and prize pools.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-surface rounded-panel p-6 border border-stone-200/90 shadow-card space-y-4 hover:border-forest-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-black text-gold">04</span>
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-charcoal">
                Climb the Rankings
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Gain verified rating points with every triumph. Ascend from Division Contender to Grandmaster status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions Section */}
      <section id="competitions" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-forest-700">
              Sanctioned Tournaments
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal mt-1">
              Featured Competitions
            </h2>
          </div>

          <Link
            to="/tournaments"
            className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1.5"
          >
            <span>View All Competitions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tournaments.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/tournaments/${t.id}`)}
              className="group bg-surface rounded-panel overflow-hidden border border-stone-200/90 shadow-card hover:border-forest-300 hover:shadow-elevated transition-all cursor-pointer flex flex-col"
            >
              {/* Competition Banner Image */}
              <div className="relative h-48 bg-stone-900 overflow-hidden">
                <img
                  src={t.bannerImage}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface/90 text-charcoal backdrop-blur-sm">
                    {t.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest">
                    {t.type}
                  </span>
                  <h3 className="font-display font-bold text-lg text-surface">
                    {t.name}
                  </h3>
                </div>
              </div>

              {/* Competition Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                  {t.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-charcoal-muted block text-[10px] uppercase">Entry</span>
                    <strong className="text-charcoal font-semibold">
                      {t.entryFee === 0 ? 'Free Entry' : `$${t.entryFee.toFixed(2)}`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-charcoal-muted block text-[10px] uppercase">Participants</span>
                    <strong className="text-charcoal font-semibold">
                      {t.participants.length} / {t.maxParticipants}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-charcoal-muted block text-[10px] uppercase">Prize Pool</span>
                    <strong className="text-forest-700 font-bold">
                      ${t.prizePool.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full py-2.5 rounded-xl bg-forest-50 text-forest-700 group-hover:bg-forest-600 group-hover:text-surface font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <span>View Competition Bracket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Rankings Preview (Top 5 Leaderboard) */}
      <section className="py-20 bg-soft-bg border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-forest-700">
                Official Leaderboard
              </span>
              <h2 className="font-display font-extrabold text-3xl text-charcoal mt-1">
                Global Elo Standings
              </h2>
            </div>

            <Link
              to="/rankings"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1.5"
            >
              <span>View Full Worldwide Rankings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-surface rounded-panel border border-stone-200/90 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-4 w-14 text-center">Rank</th>
                    <th className="py-3 px-4">Player</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4 text-center">Rating (Elo)</th>
                    <th className="py-3 px-4 text-center">Matches</th>
                    <th className="py-3 px-4 text-right">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {topPlayers.map((player, idx) => (
                    <tr
                      key={player.id}
                      onClick={() => navigate(`/players/${player.id}`)}
                      className="hover:bg-forest-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-display font-bold text-charcoal">
                        {idx === 0 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold-dark font-extrabold text-xs">
                            1
                          </span>
                        ) : (
                          `#${idx + 1}`
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-charcoal">
                        <div className="flex items-center gap-2.5">
                          <PlayerAvatar name={player.displayName} avatarUrl={player.avatar} size="xs" />
                          <span>{player.displayName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-charcoal-muted">
                        {player.country}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-forest-800 text-sm tabular-nums">
                        {player.rating}
                      </td>
                      <td className="py-3.5 px-4 text-center tabular-nums text-charcoal">
                        {player.matchesPlayed}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-charcoal tabular-nums">
                        {player.winRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-forest-900 text-surface relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold">
            Sanctioned Competition Awaits
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Your Next Victory Starts Here.
          </h2>
          <p className="text-base text-stone-300 max-w-xl mx-auto font-normal leading-relaxed">
            Join the Federation, challenge the global competition, and make your mark in strategic football history.
          </p>
          <div className="pt-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-forest-950 font-display font-bold text-sm tracking-wide shadow-elevated transition-all"
            >
              <span>CREATE YOUR ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <PublicFooter />
    </div>
  );
};
