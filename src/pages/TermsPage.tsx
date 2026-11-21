import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
              <BookOpen className="w-4 h-4 text-[#C99A2E]" />
              Terms of Service
            </div>

            <h1
              className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Terms and Conditions
            </h1>

            <p className="text-xs text-[#756353] mt-2">
              Demonstration Draft for Olympia Enterprises LLC — Pending Final Legal Review.
            </p>
          </div>

          <div className="prose prose-sm text-[#756353] space-y-6 text-xs sm:text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                1. Eligibility & University Community
              </h2>
              <p>
                Sakeena is dedicated to adult college, university, and graduate students who identify with Islamic ethical values. You must be at least 18 years of age to register or participate on this platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                2. Sincerity and Profile Accuracy
              </h2>
              <p>
                All members agree to provide authentic biographical details and genuine photographic portraits representing themselves. Impersonation, stock photography, or fraudulent identity representation violates our community charter and results in immediate profile termination.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                3. Acceptable Behavior & Community Respect
              </h2>
              <p>
                Sakeena is intentionally designed to be tranquil and respectful. Members are expected to communicate with courtesy, patience, and dignity.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No vulgar, offensive, or sexually explicit communication</li>
                <li>No commercial advertising, financial solicitation, or product promotion</li>
                <li>No harassment, abusive conduct, or persistent unreciprocated messaging</li>
                <li>Respect when an individual chooses to decline interest or discontinue a conversation</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                4. Free Forever & Optional Memberships
              </h2>
              <p>
                Registration and profile exploration are fundamentally free. Sakeena will never mandate credit cards to browse or send basic likes. Premium tiers (Silver, Gold, Elite) provide additional communication flexibility and priority search features in accordance with our transparent pricing structure.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#2B2118]">
                5. Safety Enforcement & Moderation
              </h2>
              <p>
                Sakeena reserves the right to suspend or remove profiles that violate community standards, receive substantiated member reports, or attempt to circumvent safety rules.
              </p>
            </section>

            <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#E8DCC3] text-xs">
              <p className="font-semibold text-[#2B2118] mb-1">
                Olympia Enterprises LLC Draft Statement
              </p>
              <p className="text-[#756353]">
                © 2026 Sakeena. All rights reserved. Sakeena is a product of Olympia Enterprises LLC. This terms demonstration is provided for frontend prototype evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
