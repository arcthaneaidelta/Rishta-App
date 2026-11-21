import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, MapPin, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export const CommunityPreview: React.FC = () => {
  const { profiles, sentInterestIds, toggleInterest } = useApp();

  // Show first 4 sample profiles
  const previewProfiles = profiles.slice(0, 4);

  return (
    <section id="community" className="py-20 bg-[#FAF4EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A34D28] font-semibold">
              Global Campus Circle
            </span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118] mt-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Meet your university community.
            </h2>
            <p className="mt-2 text-sm text-[#756353]">
              Discover students and make connections beyond your campus.
            </p>
          </div>

          <Link
            to="/browse"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B2118] hover:text-[#A34D28] transition-colors"
          >
            <span>Explore All Members</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewProfiles.map((member) => {
            const hasSentInterest = sentInterestIds.includes(member.id);

            return (
              <div
                key={member.id}
                className="group bg-white rounded-2xl border border-[#E8DCC3] overflow-hidden shadow-xs hover:shadow-md hover:border-[#C99A2E]/60 transition-all flex flex-col justify-between"
              >
                {/* Photo & Sample Label */}
                <Link to={`/profile/${member.id}`} className="block relative aspect-[4/5] overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Strictly Mandatory Sample Badge */}
                  <div className="absolute top-3 left-3 bg-[#2B2118]/85 backdrop-blur-xs text-[#FAF4EA] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase border border-[#FAF4EA]/20">
                    SAMPLE PROFILE
                  </div>

                  {/* Compatibility Badge */}
                  <div className="absolute top-3 right-3 bg-[#FAF4EA]/90 backdrop-blur-xs text-[#2B2118] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#E8DCC3] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C99A2E]" />
                    <span>{member.compatibility}%</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2118]/80 via-transparent to-transparent p-4 text-white">
                    <h3 className="font-serif text-lg font-medium leading-snug">
                      {member.name.split(' ')[0]}, {member.age}
                    </h3>
                    <p className="text-xs text-[#E8DCC3] flex items-center gap-1 truncate mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{member.university}</span>
                    </p>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-[11px] text-[#756353] gap-1 mb-2.5">
                      <MapPin className="w-3 h-3 text-[#A34D28] shrink-0" />
                      <span className="truncate">{member.city}, {member.country}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.interests.slice(0, 2).map((interest, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#FAF4EA] text-[11px] text-[#756353] border border-[#E8DCC3]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#FAF4EA] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleInterest(member.id)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                        hasSentInterest
                          ? 'bg-[#E8DCC3] text-[#A34D28]'
                          : 'bg-[#2B2118] text-[#FAF4EA] hover:bg-[#4A3B2C]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasSentInterest ? 'fill-[#A34D28] text-[#A34D28]' : ''}`} />
                      <span>{hasSentInterest ? 'Interest Sent' : 'Send Interest'}</span>
                    </button>

                    <Link
                      to={`/profile/${member.id}`}
                      className="px-2.5 py-1.5 rounded-lg border border-[#E8DCC3] text-xs text-[#2B2118] hover:bg-[#FAF4EA] transition-colors"
                      title="View full profile"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
