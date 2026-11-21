import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Heart,
  Bookmark,
  MapPin,
  GraduationCap,
  ChevronDown,
  X,
} from 'lucide-react';

export const BrowsePage: React.FC = () => {
  const {
    profiles,
    blockedUserIds,
    favoriteUserIds,
    sentInterestIds,
    toggleFavorite,
    toggleInterest,
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDenomination, setSelectedDenomination] = useState<string>('All');
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(30);
  const [sortBy, setSortBy] = useState<'best_matches' | 'shared_interests' | 'recently_joined'>('best_matches');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedRegion !== 'All') count++;
    if (selectedDenomination !== 'All') count++;
    if (minAge > 18 || maxAge < 30) count++;
    return count;
  }, [searchQuery, selectedRegion, selectedDenomination, minAge, maxAge]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedDenomination('All');
    setMinAge(18);
    setMaxAge(30);
    setSortBy('best_matches');
  };

  // Filtered and sorted profiles (excluding any blocked profiles)
  const visibleProfiles = useMemo(() => {
    return profiles
      .filter((p) => !blockedUserIds.includes(p.id))
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchUni = p.university.toLowerCase().includes(q);
          const matchCity = p.city.toLowerCase().includes(q);
          const matchMajor = p.major.toLowerCase().includes(q);
          const matchInterests = p.interests.some((i) => i.toLowerCase().includes(q));
          if (!matchName && !matchUni && !matchCity && !matchMajor && !matchInterests) {
            return false;
          }
        }

        // Region
        if (selectedRegion !== 'All' && p.region !== selectedRegion) {
          return false;
        }

        // Denomination
        if (selectedDenomination !== 'All' && p.denomination !== selectedDenomination) {
          return false;
        }

        // Age
        if (p.age < minAge || p.age > maxAge) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'best_matches') {
          return b.compatibility - a.compatibility;
        }
        if (sortBy === 'shared_interests') {
          return b.interests.length - a.interests.length;
        }
        if (sortBy === 'recently_joined') {
          return b.id.localeCompare(a.id);
        }
        return 0;
      });
  }, [profiles, blockedUserIds, searchQuery, selectedRegion, selectedDenomination, minAge, maxAge, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E8DCC3]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#A34D28] font-semibold">
                Explore students across 4 regions
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C99A2E]" />
              <span className="text-[11px] text-[#756353]">USA • GCC • SE Asia • Canada</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Discover Your Community
            </h1>
            <p className="text-xs text-[#756353] mt-1">
              Meet Muslim students from universities around the world.
            </p>
          </div>

          {/* Quick Sort Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#756353] hidden sm:inline">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none text-xs font-medium px-3.5 py-2 pr-8 rounded-xl border border-[#E8DCC3] bg-white text-[#2B2118] focus:outline-none focus:border-[#C99A2E] cursor-pointer"
              >
                <option value="best_matches">Best Matches (Compatibility)</option>
                <option value="shared_interests">Shared Interests</option>
                <option value="recently_joined">Recently Joined</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#756353] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-3 py-2 rounded-xl border border-[#E8DCC3] bg-white text-xs font-medium text-[#2B2118] flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A34D28]" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Layout: Filters Sidebar on Desktop + Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Panel */}
          <aside className="hidden md:block md:col-span-3 bg-white rounded-2xl border border-[#E8DCC3] p-5 shadow-xs sticky top-28">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#FAF4EA]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#A34D28]" />
                <h3 className="font-serif font-semibold text-base text-[#2B2118]">
                  Refine Search
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#A34D28] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-5">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#756353] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="University, city, major..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/30 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756353] hover:text-[#2B2118]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1.5">
                  Region
                </label>
                <div className="space-y-1">
                  {['All', 'USA', 'GCC', 'Southeast Asia', 'Canada'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedRegion === reg
                          ? 'bg-[#E8DCC3] text-[#2B2118] font-semibold'
                          : 'text-[#756353] hover:bg-[#FAF4EA]'
                      }`}
                    >
                      <span>{reg === 'All' ? 'All Regions' : reg}</span>
                      {selectedRegion === reg && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A34D28]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Denomination Filter */}
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1.5">
                  Denomination
                </label>
                <select
                  value={selectedDenomination}
                  onChange={(e) => setSelectedDenomination(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/30 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                >
                  <option value="All">All Denominations</option>
                  <option value="Sunni">Sunni</option>
                  <option value="Shia">Shia</option>
                  <option value="Just Muslim">Just Muslim</option>
                  <option value="Independent">Independent</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#2B2118] mb-1.5">
                  <span>Age Range</span>
                  <span className="text-[#A34D28] font-normal">{minAge} – {maxAge} yrs</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[#756353]">Min</span>
                    <input
                      type="number"
                      min={18}
                      max={maxAge}
                      value={minAge}
                      onChange={(e) => setMinAge(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#E8DCC3] bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#756353]">Max</span>
                    <input
                      type="number"
                      min={minAge}
                      max={45}
                      value={maxAge}
                      onChange={(e) => setMaxAge(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#E8DCC3] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="p-3 rounded-xl bg-[#FAF4EA] border border-[#E8DCC3] text-[11px] text-[#756353] leading-relaxed">
                <span className="font-semibold text-[#2B2118] block mb-0.5">Free Browsing Guarantee</span>
                Browse unlimited student profiles across all four participating regions without credit card.
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
              <div className="bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8DCC3]">
                  <h3 className="font-serif font-semibold text-lg text-[#2B2118]">
                    Filter Students
                  </h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="w-5 h-5 text-[#756353]" />
                  </button>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DCC3]"
                  >
                    <option value="All">All Regions</option>
                    <option value="USA">USA</option>
                    <option value="GCC">GCC</option>
                    <option value="Southeast Asia">Southeast Asia</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                {/* Denomination */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                    Denomination
                  </label>
                  <select
                    value={selectedDenomination}
                    onChange={(e) => setSelectedDenomination(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DCC3]"
                  >
                    <option value="All">All Denominations</option>
                    <option value="Sunni">Sunni</option>
                    <option value="Shia">Shia</option>
                    <option value="Just Muslim">Just Muslim</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-2 rounded-xl border border-[#E8DCC3] text-xs font-medium text-[#756353]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-2 rounded-xl bg-[#2B2118] text-[#FAF4EA] text-xs font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profiles Grid */}
          <main className="md:col-span-9">
            {/* Results Count Bar */}
            <div className="flex items-center justify-between mb-4 text-xs text-[#756353]">
              <p>
                Showing <span className="font-semibold text-[#2B2118]">{visibleProfiles.length}</span> students
                {selectedRegion !== 'All' ? ` in ${selectedRegion}` : ''}
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[#A34D28] hover:underline"
                >
                  Clear filters ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Empty State */}
            {visibleProfiles.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E8DCC3] p-12 text-center max-w-lg mx-auto my-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF4EA] text-[#A34D28] flex items-center justify-center mx-auto border border-[#E8DCC3]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#2B2118]">
                  No matches found just yet.
                </h3>
                <p className="text-xs text-[#756353] leading-relaxed">
                  Try adjusting your filters to discover more students across other universities or regions.
                </p>
                <div>
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-medium transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              /* Profile Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProfiles.map((member) => {
                  const hasSentInterest = sentInterestIds.includes(member.id);
                  const isFavorite = favoriteUserIds.includes(member.id);

                  return (
                    <div
                      key={member.id}
                      className="group bg-white rounded-2xl border border-[#E8DCC3] overflow-hidden shadow-xs hover:shadow-md hover:border-[#C99A2E]/60 transition-all flex flex-col justify-between"
                    >
                      {/* Photo Section with Labels */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Link to={`/profile/${member.id}`} className="block w-full h-full">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Top-Left: STRICTLY MANDATORY SAMPLE BADGE */}
                        <div className="absolute top-3 left-3 bg-[#2B2118]/85 backdrop-blur-xs text-[#FAF4EA] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase border border-[#FAF4EA]/20">
                          SAMPLE PROFILE
                        </div>

                        {/* Top-Right: Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(member.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#2B2118] hover:text-[#A34D28] flex items-center justify-center border border-[#E8DCC3] shadow-xs transition-colors"
                          title={isFavorite ? 'Remove from saved' : 'Save profile'}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isFavorite ? 'fill-[#A34D28] text-[#A34D28]' : ''}`}
                          />
                        </button>

                        {/* Bottom Photo Overlay: Name, Age, University */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2118]/85 via-[#2B2118]/30 to-transparent p-4 text-white">
                          <div className="flex items-center justify-between mb-0.5">
                            <h3 className="font-serif text-xl font-medium tracking-wide">
                              {member.name.split(' ')[0]}, {member.age}
                            </h3>
                            <div className="bg-[#FAF4EA]/90 text-[#2B2118] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#C99A2E]" />
                              <span>{member.compatibility}% Match</span>
                            </div>
                          </div>

                          <p className="text-xs text-[#E8DCC3] flex items-center gap-1 truncate">
                            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{member.university}</span>
                          </p>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Location & Denomination */}
                          <div className="flex items-center justify-between text-[11px] text-[#756353] mb-2">
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-[#A34D28] shrink-0" />
                              <span className="truncate">{member.city}, {member.country}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#FAF4EA] text-[10px] font-medium border border-[#E8DCC3]">
                              {member.denomination}
                            </span>
                          </div>

                          {/* Short Bio */}
                          <p className="text-xs text-[#756353] line-clamp-2 leading-relaxed mb-3">
                            {member.bio}
                          </p>

                          {/* Interests Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {member.interests.slice(0, 3).map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-[#FAF4EA] text-[10px] text-[#756353] border border-[#E8DCC3]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-3 border-t border-[#FAF4EA] flex items-center gap-2">
                          <button
                            onClick={() => toggleInterest(member.id)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                              hasSentInterest
                                ? 'bg-[#E8DCC3] text-[#A34D28] font-semibold'
                                : 'bg-[#2B2118] text-[#FAF4EA] hover:bg-[#4A3B2C]'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${hasSentInterest ? 'fill-[#A34D28] text-[#A34D28]' : ''}`} />
                            <span>{hasSentInterest ? 'Interest Sent' : 'Send Interest'}</span>
                          </button>

                          <Link
                            to={`/profile/${member.id}`}
                            className="px-3.5 py-2 rounded-xl border border-[#E8DCC3] text-xs font-medium text-[#2B2118] hover:bg-[#FAF4EA] transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
