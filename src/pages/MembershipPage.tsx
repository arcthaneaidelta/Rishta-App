import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ShieldCheck,
  Zap,
  Crown,
  Lock,
  X,
} from 'lucide-react';

export const MembershipPage: React.FC = () => {
  // Billing periods: 1 month, 3 months, 12 months
  const [billingPeriod, setBillingPeriod] = useState<'1' | '3' | '12'>('3');

  // Modal simulation state
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  // Exact pricing figures per brief (Section 13.2) - NO SAVINGS PERCENTAGES!
  const pricingData = {
    Silver: {
      '1': '$7.50 / mo',
      '3': '$5.50 / mo',
      '12': '$4.50 / mo',
      billedNote: billingPeriod === '1' ? 'Billed 1 month' : billingPeriod === '3' ? 'Billed $16.50 every 3 months' : 'Billed $54.00 every 12 months',
      tag: 'Silver — Best Value',
    },
    Gold: {
      '1': '$14.50 / mo',
      '3': '$9.50 / mo',
      '12': '$6.50 / mo',
      billedNote: billingPeriod === '1' ? 'Billed 1 month' : billingPeriod === '3' ? 'Billed $28.50 every 3 months' : 'Billed $78.00 every 12 months',
      tag: 'Gold — Best Buy',
    },
    Elite: {
      '1': '$16.50 / mo',
      '3': '$12.50 / mo',
      '12': '$7.50 / mo',
      billedNote: billingPeriod === '1' ? 'Billed 1 month' : billingPeriod === '3' ? 'Billed $37.50 every 3 months' : 'Billed $90.00 every 12 months',
      tag: 'Elite — Best Tech',
    },
  };

  const silverFeatures = [
    'Start a message with anyone',
    'See who liked you',
    'No ads',
    'Read receipts',
    'More photos',
    'Hide profile and photos',
    'Profile boost',
  ];

  const goldFeatures = [
    'Everything in Silver, plus:',
    'Priority in search',
    'Unlimited likes',
    'Exclusive search',
    'Location and lifestyle filtering',
    'Denomination filtering',
    'Intention filtering',
    'Better mutual and reverse matching',
  ];

  const eliteFeatures = [
    'Everything in Gold, plus:',
    'Rank above all members',
    'Priority messaging',
    'Profile highlighting',
    'Premium support',
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanModal(planName);
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Intro Section (PRD Section 13.1) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A34D28]">
            Transparent University Memberships
          </span>

          <h1
            className="text-3xl sm:text-5xl font-serif font-medium text-[#2B2118] mt-2 mb-4 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            More ways to connect, whenever you're ready.
          </h1>

          <p className="text-sm text-[#756353] max-w-xl mx-auto mb-6 leading-relaxed">
            Joining and browsing Sakeena is free. Choose additional features only when you need them.
          </p>

          {/* EXACT REQUIRED BOLD LINE (Strictly No word "Monthly"!) */}
          <div className="inline-block px-5 py-2.5 rounded-2xl bg-white border border-[#E8DCC3] shadow-xs">
            <p className="text-xs sm:text-sm font-bold text-[#2B2118] tracking-wide">
              Silver $5.50 basic • Gold $9.50 per month • Elite $12.50 per month
            </p>
          </div>
        </div>

        {/* Period Selector Tabs (1 Month, 3 Months, 12 Months) */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-1.5 border border-[#E8DCC3] shadow-xs">
            <button
              onClick={() => setBillingPeriod('1')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingPeriod === '1'
                  ? 'bg-[#2B2118] text-[#FAF4EA] shadow-xs'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              1 Month
            </button>
            <button
              onClick={() => setBillingPeriod('3')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingPeriod === '3'
                  ? 'bg-[#2B2118] text-[#FAF4EA] shadow-xs'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              3 Months
            </button>
            <button
              onClick={() => setBillingPeriod('12')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingPeriod === '12'
                  ? 'bg-[#2B2118] text-[#FAF4EA] shadow-xs'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              12 Months
            </button>
          </div>
        </div>

        {/* Three Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* SILVER TIER */}
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#C99A2E]/70 transition-all relative">
            <div>
              {/* Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[11px] font-semibold text-[#756353] mb-4">
                {pricingData.Silver.tag}
              </div>

              <h3 className="text-2xl font-serif font-medium text-[#2B2118] mb-1">
                Silver
              </h3>
              <p className="text-xs text-[#756353] mb-4">
                Essential messaging freedom to start direct conversations with anyone.
              </p>

              {/* Price display */}
              <div className="mb-6 pb-6 border-b border-[#FAF4EA]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold text-[#2B2118]">
                    {pricingData.Silver[billingPeriod]}
                  </span>
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  {pricingData.Silver.billedNote}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-xs text-[#2B2118] mb-8">
                {silverFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Silver')}
              className="w-full py-3 rounded-xl border border-[#2B2118] text-[#2B2118] hover:bg-[#FAF4EA] font-semibold text-xs transition-colors"
            >
              Select Silver (Demo)
            </button>
          </div>

          {/* GOLD TIER (Featured) */}
          <div className="bg-[#FAF4EA] rounded-3xl border-2 border-[#C99A2E] p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative">
            {/* Best Buy ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C99A2E] text-[#FAF4EA] text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-xs">
              {pricingData.Gold.tag}
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#C99A2E]/50 text-[11px] font-semibold text-[#A34D28] mb-4 mt-2">
                Most Popular on Campuses
              </div>

              <h3 className="text-2xl font-serif font-medium text-[#2B2118] mb-1">
                Gold
              </h3>
              <p className="text-xs text-[#756353] mb-4">
                Full search filters, unlimited likes, and search priority.
              </p>

              {/* Price display */}
              <div className="mb-6 pb-6 border-b border-[#E8DCC3]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold text-[#2B2118]">
                    {pricingData.Gold[billingPeriod]}
                  </span>
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  {pricingData.Gold.billedNote}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-xs text-[#2B2118] mb-8">
                {goldFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#A34D28] shrink-0 mt-0.5" />
                    <span className={i === 0 ? 'font-semibold text-[#A34D28]' : ''}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Gold')}
              className="w-full py-3.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#C99A2E]" />
              <span>Select Gold (Demo)</span>
            </button>
          </div>

          {/* ELITE TIER */}
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#C99A2E]/70 transition-all relative">
            <div>
              {/* Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[11px] font-semibold text-[#756353] mb-4">
                {pricingData.Elite.tag}
              </div>

              <h3 className="text-2xl font-serif font-medium text-[#2B2118] mb-1">
                Elite
              </h3>
              <p className="text-xs text-[#756353] mb-4">
                Maximum visibility, priority placement, and profile highlighting.
              </p>

              {/* Price display */}
              <div className="mb-6 pb-6 border-b border-[#FAF4EA]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold text-[#2B2118]">
                    {pricingData.Elite[billingPeriod]}
                  </span>
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  {pricingData.Elite.billedNote}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-xs text-[#2B2118] mb-8">
                {eliteFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                    <span className={i === 0 ? 'font-semibold text-[#A34D28]' : ''}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Elite')}
              className="w-full py-3 rounded-xl border border-[#2B2118] text-[#2B2118] hover:bg-[#FAF4EA] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-[#C99A2E]" />
              <span>Select Elite (Demo)</span>
            </button>
          </div>
        </div>

        {/* WOMEN'S COMPLIMENTARY SILVER SPECIFICATION (PRD Section 13.6) */}
        <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-10 mb-12 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[11px] font-semibold text-[#A34D28] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C99A2E]" />
              Platform Policy Detail
            </div>

            <h2
              className="text-2xl sm:text-3xl font-serif font-medium text-[#2B2118] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Women's Complimentary Silver Explained
            </h2>

            <p className="text-xs sm:text-sm text-[#756353] leading-relaxed mb-6">
              Women receive Silver membership features free with no expiry. To maintain platform balance and safety, certain extended features are reserved for full Gold or Elite tiers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#FAF4EA]">
              {/* Free Forever for Women */}
              <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#E8DCC3]">
                <h4 className="font-semibold text-xs text-[#2B2118] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#C99A2E]" />
                  Included Free with No Expiry:
                </h4>
                <ul className="space-y-2 text-xs text-[#756353]">
                  <li>• Free to join and browse without payment</li>
                  <li>• Unlimited searches across all universities</li>
                  <li>• Limited direct messaging and replies</li>
                  <li>• Viewing profile visitors and views</li>
                  <li>• Message read receipts</li>
                </ul>
              </div>

              {/* Requires Upgrade */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8DCC3]">
                <h4 className="font-semibold text-xs text-[#A34D28] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#A34D28]" />
                  Features Requiring Gold or Elite:
                </h4>
                <ul className="space-y-2 text-xs text-[#756353]">
                  <li>• Unlimited messaging beyond demonstration quota</li>
                  <li>• Seeing who liked your profile</li>
                  <li>• Completely ad-free browsing</li>
                  <li>• Additional photo upload slots</li>
                  <li>• Hiding profile and photos</li>
                  <li>• Profile visibility boosts</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DCC3]/60 text-xs text-[#756353] flex flex-wrap items-center gap-4">
              <span>• Women may purchase full Silver at the standard listed price.</span>
              <span>• No automatic charges.</span>
              <span>• No credit card requested at registration.</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATED UPGRADE CONFIRMATION MODAL (PRD Section 13.7) */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8DCC3] shadow-2xl relative text-center">
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="absolute top-4 right-4 text-[#756353] hover:text-[#2B2118]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-white border border-[#C99A2E] text-[#C99A2E] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="font-serif font-medium text-2xl text-[#2B2118] mb-2">
              {selectedPlanModal} Membership Selected
            </h3>

            {/* MANDATORY PRD NOTICE */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DCC3] mb-6">
              <p className="text-sm font-semibold text-[#2B2118] mb-1">
                This is a demonstration. Payments are not enabled.
              </p>
              <p className="text-xs text-[#756353] leading-relaxed">
                As specified in the PRD for Olympia Enterprises LLC, real payment gateways and subscription billing are disabled in this interactive demonstration.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlanModal(null)}
                className="w-full py-3 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold"
              >
                Understood — Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
