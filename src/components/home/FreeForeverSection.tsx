import React from 'react';
import { UserPlus, Search, Heart, MessageCircleReply, ShieldCheck } from 'lucide-react';

export const FreeForeverSection: React.FC = () => {
  const points = [
    {
      icon: <UserPlus className="w-5 h-5 text-[#C99A2E]" />,
      title: 'Free to join',
      description: 'Register with just six basic details. No hidden fees or surprise barriers.',
    },
    {
      icon: <Search className="w-5 h-5 text-[#A34D28]" />,
      title: 'Free to browse',
      description: 'Discover Muslim university students across the US, GCC, Canada, and SE Asia.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C99A2E]" />,
      title: 'Free to send likes',
      description: 'Express genuine interest in profiles that inspire you without payment.',
    },
    {
      icon: <MessageCircleReply className="w-5 h-5 text-[#A34D28]" />,
      title: 'Free to reply',
      description: 'Always free to read and reply when a Silver, Gold, or Elite member contacts you.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF4EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC3]/60 text-[#2B2118] text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
            Transparent & Honest
          </div>
          <h2
            className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Good connections shouldn't start with a credit card.
          </h2>
          <p className="mt-3 text-sm text-[#756353]">
            Sakeena puts sincerity and campus community first. No credit card required at signup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white/80 border border-[#E8DCC3] rounded-2xl p-6 transition-all hover:border-[#C99A2E]/60 hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF4EA] border border-[#E8DCC3] flex items-center justify-center mb-4">
                  {pt.icon}
                </div>
                <h3 className="font-semibold text-base text-[#2B2118] mb-1.5">
                  {pt.title}
                </h3>
                <p className="text-xs text-[#756353] leading-relaxed">
                  {pt.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#FAF4EA] text-[11px] font-medium text-[#A34D28]">
                Included Free Forever
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
