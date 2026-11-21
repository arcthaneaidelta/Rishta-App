import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF4EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#756353] hover:text-[#2B2118]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8DCC3] shadow-md p-6 sm:p-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-xs font-semibold text-[#A34D28] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
              Client Review Document
            </div>

            <h1
              className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Privacy Policy & Data Principles
            </h1>

            <p className="text-xs text-[#756353] mt-2">
              Demonstration Draft for Olympia Enterprises LLC — Pending Final Legal Review.
            </p>
          </div>

          <div className="prose prose-sm text-[#756353] space-y-6 text-xs sm:text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                1. Purpose & Student Tranquility
              </h2>
              <p>
                Sakeena (“Sakina” — peace and tranquility) is designed to cultivate meaningful, dignified connections among Muslim university students across the United States, GCC countries, Southeast Asia, and Canada. Privacy, discretion, and mutual respect are foundational to every layer of our platform design.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                2. Information Collected
              </h2>
              <p>
                To provide simple and safe matchmaking, Sakeena only requires six basic details during registration:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full Name (first name displayed publicly on campus profile)</li>
                <li>University or personal email address (never publicly exposed)</li>
                <li>Age and Gender verification</li>
                <li>Location (Country, City, College/University)</li>
                <li>One authentic portrait photograph</li>
              </ul>
              <p>
                Optional details including denomination, major, interests, and additional photos may be added or modified at any time within your profile management area.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                3. Photographs & Content Integrity
              </h2>
              <p>
                All photographs uploaded to Sakeena are intended to reflect authentic university students. In our production specification, photos undergo moderation before public presentation. No automated public scraping or third-party syndication is permitted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                4. Account Visibility & Control
              </h2>
              <p>
                Members have full control over their visibility settings:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Option to toggle university visibility in global browse search</li>
                <li>Option to show or hide denomination badges</li>
                <li>Ability to block any member immediately, hiding both parties permanently</li>
                <li>Report mechanisms monitored by our administration team</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                5. Complete Account Deletion
              </h2>
              <p>
                Members retain the unconditional right to erase their account and all associated profile records at any time. When an account is deleted, all stored profile details, photos, and conversation history are cleared.
              </p>
            </section>

            <section className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#E8DCC3] text-xs">
              <p className="font-semibold text-[#2B2118] mb-1">
                Olympia Enterprises LLC Compliance Notice
              </p>
              <p className="text-[#756353]">
                This demonstration page is provided to exhibit the privacy architecture and client data handling policies. It does not constitute formal legal counsel.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
