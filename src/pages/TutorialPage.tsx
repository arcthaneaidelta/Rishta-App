import React, { useState } from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { Play, Clock, BookOpen, ChevronRight, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface TutorialItem {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  keyTactics: string[];
}

const TUTORIALS: TutorialItem[] = [
  {
    id: 'tut-1',
    category: 'How to Play',
    title: 'Federation Fundamentals & Game Loop',
    description: 'Learn the core turn-based strategy loop: action allocation, positioning phases, and territorial leverage.',
    duration: '4:15',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Action Point budget', 'Grid positioning', 'Turn timer management']
  },
  {
    id: 'tut-2',
    category: 'Movement',
    title: 'Positional Rotations & Overload Dynamics',
    description: 'Mastering wing overloads and off-ball runs to disrupt opponent low-block defensive formations.',
    duration: '5:40',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Underlapping fullbacks', 'Half-space infiltration', 'Staggered defensive lines']
  },
  {
    id: 'tut-3',
    category: 'Passing',
    title: 'Precision Through-Balls & Angle Geometry',
    description: 'Techniques for penetrating deep lines using diagonal ground passes and aerial switches of play.',
    duration: '6:10',
    thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Weight-of-pass calibration', 'Third-man runs', 'Blind-side cutbacks']
  },
  {
    id: 'tut-4',
    category: 'Defence',
    title: 'Gegenpress Traps & Compact Rest-Defense',
    description: 'How to set pressing traps in the middle third and recover possession without exposing central channels.',
    duration: '5:02',
    thumbnail: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Cover shadow angles', 'Tackle success probabilities', 'Offside trap timing']
  },
  {
    id: 'tut-5',
    category: 'Shooting',
    title: 'Box Conversion & Expected Goals (xG) Optimization',
    description: 'Maximizing conversion rates on 1v1 breakaways, finesse curls from the edge, and set-piece headers.',
    duration: '4:45',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Goalkeeper angle narrowing', 'First-time volleys', 'Near-post deflection']
  },
  {
    id: 'tut-6',
    category: 'Tournaments',
    title: 'Knockout Bracket Management & Mental Stamina',
    description: 'Strategic adjustments across multi-leg knockout competitions and handling high-pressure penalty shootouts.',
    duration: '7:20',
    thumbnail: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
    keyTactics: ['Tactical substitutions', 'Extra-time stamina preservation', 'Opponent scouting']
  }
];

export const TutorialPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<TutorialItem | null>(null);

  const categories = ['All', 'How to Play', 'Movement', 'Passing', 'Defence', 'Shooting', 'Tournaments'];

  const filteredTutorials = selectedCategory === 'All'
    ? TUTORIALS
    : TUTORIALS.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-warm-bg text-charcoal flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            Official Federation Academy
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
            Tutorial & Tactical Playbook
          </h1>
          <p className="text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            Master the core strategic principles of FUTBOLIÑO. From fundamental movement geometry to grandmaster tournament management.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-600 text-surface shadow-subtle'
                  : 'bg-surface border border-stone-200/90 text-charcoal hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tutorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => (
            <div
              key={tut.id}
              onClick={() => setActiveVideo(tut)}
              className="group bg-surface rounded-panel overflow-hidden border border-stone-200/90 shadow-card hover:border-forest-300 hover:shadow-elevated transition-all cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative h-44 bg-stone-900 overflow-hidden">
                <img
                  src={tut.thumbnail}
                  alt={tut.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-charcoal/80 backdrop-blur-sm text-surface text-[11px] font-mono font-medium px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>{tut.duration}</span>
                </div>

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-surface/90 text-forest-700 shadow-modal flex items-center justify-center group-hover:scale-110 group-hover:bg-forest-600 group-hover:text-surface transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 bg-forest-900/80 backdrop-blur-sm text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {tut.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base text-charcoal group-hover:text-forest-700 transition-colors">
                    {tut.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
                    {tut.description}
                  </p>
                </div>

                {/* Key Tactics tags */}
                <div className="pt-3 border-t border-stone-100 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                    Key Tactical Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tut.keyTactics.map((tactic) => (
                      <span
                        key={tactic}
                        className="text-[10px] bg-warm-bg border border-stone-200/80 text-charcoal px-2 py-0.5 rounded font-medium"
                      >
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface rounded-panel max-w-2xl w-full overflow-hidden border border-stone-200 shadow-modal">
            {/* Header */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700">
                  {activeVideo.category} • {activeVideo.duration}
                </span>
                <h3 className="font-display font-bold text-base text-charcoal">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-charcoal hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-charcoal flex flex-col items-center justify-center text-surface p-6 text-center select-none">
              <div className="w-16 h-16 rounded-full bg-forest-600/90 text-gold flex items-center justify-center shadow-elevated mb-3 animate-pulse">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <span className="font-display font-bold text-lg">Federation Interactive Masterclass</span>
              <p className="text-xs text-stone-300 max-w-md mt-1">
                Simulated video stream for: <strong className="text-gold">{activeVideo.title}</strong>
              </p>
              <div className="mt-4 px-3 py-1 rounded bg-stone-800 text-[11px] text-stone-400 border border-stone-700 font-mono">
                Playback duration: {activeVideo.duration} • 1080p 60fps
              </div>
            </div>

            {/* Video Info footer */}
            <div className="p-5 space-y-3">
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {activeVideo.description}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-forest-700">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Sanctioned Federation Academy Curriculum</span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-1.5 rounded-xl bg-forest-600 text-surface text-xs font-semibold"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
};
