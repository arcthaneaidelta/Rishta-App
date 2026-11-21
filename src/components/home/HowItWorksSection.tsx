import React from 'react';
import { UserCheck, Compass, MessageSquareHeart } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      desc: 'Join in less than two minutes with six basic details. No lengthy interrogation; just your authentic student self.',
      icon: <UserCheck className="w-6 h-6 text-[#A34D28]" />,
    },
    {
      num: '02',
      title: 'Discover Your Community',
      desc: 'Explore Muslim students across universities and regions — USA, GCC, Canada, and Southeast Asia.',
      icon: <Compass className="w-6 h-6 text-[#C99A2E]" />,
    },
    {
      num: '03',
      title: 'Connect Naturally',
      desc: 'Send interests and start conversations through our thoughtful membership features with peace and privacy.',
      icon: <MessageSquareHeart className="w-6 h-6 text-[#A34D28]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F3EBDD]/50 border-y border-[#E8DCC3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#A34D28] font-semibold">
            Simple & Dignified
          </span>
          <h2
            className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118] mt-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            How Sakeena Works
          </h2>
          <p className="mt-3 text-sm text-[#756353]">
            Engineered to remove friction and restore peace to university matchmaking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-[#FAF4EA] border border-[#E8DCC3] rounded-2xl p-8 relative flex flex-col justify-between shadow-xs hover:border-[#C99A2E]/70 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-[#E8DCC3] tracking-tighter">
                    {st.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8DCC3] flex items-center justify-center">
                    {st.icon}
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-[#2B2118] mb-2.5">
                  {st.title}
                </h3>
                <p className="text-xs text-[#756353] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DCC3]/60 flex items-center justify-between text-[11px] text-[#A34D28] font-medium">
                <span>Step {idx + 1} of 3</span>
                <span>Self-Paced</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
