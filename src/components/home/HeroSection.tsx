import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EA] via-[#FAF4EA] to-[#F3EBDD] pt-8 pb-16 md:py-20 border-b border-[#E8DCC3]">
      {/* Background ambient warmth */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E8DCC3]/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Hero Container with flanking photos and clear center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Young Adult Muslim Man (Left Flank) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center animate-fade-in">
            <div className="relative group w-full max-w-[280px]">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DCC3] shadow-md bg-[#FAF4EA] p-2 transition-transform duration-500 hover:-translate-y-1">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Young adult Muslim university student"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gentle gradient overlay at bottom for card tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold tracking-wide">Zayd, 23</p>
                    <p className="text-[11px] text-[#E8DCC3]">King Saud University • Architecture</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-[11px] text-[#756353] tracking-wide uppercase font-medium">
                  GCC & Global Campus Network
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Open Visual Space for Brand, Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-4 z-10">
            {/* Sakeena Brand Label & Free Forever Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC3]/80 border border-[#D4C3A3] text-[#2B2118] text-xs font-medium tracking-wide">
                <span className="font-serif font-semibold text-sm">Sakeena</span>
                <span className="w-1 h-1 rounded-full bg-[#C99A2E]" />
                <span className="text-[#A34D28]">University Edition</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#C99A2E] text-[#2B2118] text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
                Free Forever
              </span>
            </div>

            {/* Exact Required Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#2B2118] leading-[1.12] tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              All colleges and universities — have college friends worldwide.
            </h1>

            {/* Supporting message */}
            <p className="text-base sm:text-lg text-[#756353] leading-relaxed max-w-xl mb-8 font-normal">
              Meet Muslim college students, discover meaningful connections and make friends across universities around the world.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-6">
              <Link
                to="/join"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Join Free</span>
                <ArrowRight className="w-4 h-4 text-[#C99A2E] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/browse"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FAF4EA] hover:bg-[#E8DCC3] border border-[#E8DCC3] text-[#2B2118] font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#A34D28]" />
                <span>Explore Community</span>
              </Link>
            </div>

            {/* Supporting reassurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#756353]">
              <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
              <span>Free to join. Free to browse. No credit card required.</span>
            </div>

            {/* Mobile-only flanking preview: Side-by-side portraits on smaller screens so faces remain completely unobstructed */}
            <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md lg:hidden">
              <div className="rounded-2xl overflow-hidden border border-[#E8DCC3] bg-white p-1.5 shadow-xs">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                    alt="Male Student"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 text-white text-[11px] font-semibold drop-shadow">
                    Zayd, 23 (GCC)
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#E8DCC3] bg-white p-1.5 shadow-xs">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80"
                    alt="Female Student"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 left-2 text-white text-[11px] font-semibold drop-shadow">
                    Maryam, 21 (USA)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Young Adult Muslim Woman wearing Cream/Sand Hijab (Right Flank) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center animate-fade-in">
            <div className="relative group w-full max-w-[280px]">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DCC3] shadow-md bg-[#FAF4EA] p-2 transition-transform duration-500 hover:-translate-y-1">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80"
                    alt="Young adult Muslim university student in cream hijab"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gentle gradient overlay at bottom for card tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold tracking-wide">Maryam, 21</p>
                    <p className="text-[11px] text-[#E8DCC3]">Columbia University • Pre-Med</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-[11px] text-[#756353] tracking-wide uppercase font-medium">
                  USA & North American Network
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
