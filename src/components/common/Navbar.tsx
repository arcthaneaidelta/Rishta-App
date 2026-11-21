import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Menu, X, Sparkles, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, unreadTotal, loginAsDemo } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-[29px] z-40 bg-[#FAF4EA]/95 backdrop-blur-sm border-b border-[#E8DCC3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-baseline gap-1 group">
          <span
            className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#2B2118] group-hover:text-[#A34D28] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sakeena
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99A2E] mb-1" />
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
          <Link
            to="/browse"
            className={`transition-colors ${
              isActive('/browse') ? 'text-[#A34D28] font-semibold' : 'text-[#2B2118] hover:text-[#A34D28]'
            }`}
          >
            Explore
          </Link>
          <a
            href="/#how-it-works"
            className="text-[#2B2118] hover:text-[#A34D28] transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#community"
            className="text-[#2B2118] hover:text-[#A34D28] transition-colors"
          >
            Our Community
          </a>
          <Link
            to="/personality-quiz"
            className={`transition-colors flex items-center gap-1.5 ${
              isActive('/personality-quiz') ? 'text-[#A34D28] font-semibold' : 'text-[#2B2118] hover:text-[#A34D28]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
            Compatibility Quiz
          </Link>
          <Link
            to="/membership"
            className={`transition-colors ${
              isActive('/membership') ? 'text-[#A34D28] font-semibold' : 'text-[#2B2118] hover:text-[#A34D28]'
            }`}
          >
            Membership
          </Link>
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              {/* Messages Link */}
              <Link
                to="/messages"
                className={`relative p-2 rounded-lg text-[#2B2118] hover:bg-[#E8DCC3]/50 transition-colors ${
                  isActive('/messages') ? 'bg-[#E8DCC3]/60 text-[#A34D28]' : ''
                }`}
                title="Conversations"
              >
                <MessageSquare className="w-5 h-5 text-[#2B2118]" />
                {unreadTotal > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#A34D28] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadTotal}
                  </span>
                )}
              </Link>

              {/* My Profile Button */}
              <Link
                to="/my-profile"
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E8DCC3] hover:border-[#C99A2E] bg-white transition-all text-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#E8DCC3]"
                />
                <div className="text-left leading-tight hidden lg:block">
                  <div className="font-semibold text-[#2B2118] truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-[#A34D28] font-medium">
                    {currentUser.tier}
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => loginAsDemo('tariq_male_free')}
                className="text-sm font-medium text-[#2B2118] hover:text-[#A34D28] transition-colors px-2 py-1"
              >
                Log In
              </button>
              <Link
                to="/join"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2B2118] text-[#FAF4EA] text-sm font-medium hover:bg-[#4A3B2C] shadow-sm transition-all"
              >
                Join Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          {currentUser && (
            <Link
              to="/messages"
              className="relative p-2 rounded-lg text-[#2B2118] hover:bg-[#E8DCC3]/50"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A34D28] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadTotal}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2B2118] hover:bg-[#E8DCC3]/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DCC3] bg-[#FAF4EA] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              to="/browse"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118]"
            >
              Explore Members
            </Link>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118]"
            >
              How It Works
            </a>
            <a
              href="/#community"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118]"
            >
              Our Community
            </a>
            <Link
              to="/personality-quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C99A2E]" />
              Compatibility Quiz
            </Link>
            <Link
              to="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118]"
            >
              Membership & Pricing
            </Link>
            <Link
              to="/demo-admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#E8DCC3]/50 text-[#2B2118] flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#C99A2E]" />
              Admin Demo Panel
            </Link>
          </div>

          <div className="pt-3 border-t border-[#E8DCC3] flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <Link
                  to="/my-profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-[#2B2118]"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E8DCC3]"
                  />
                  <div>
                    <div className="font-semibold">{currentUser.name}</div>
                    <div className="text-xs text-[#A34D28]">{currentUser.tier}</div>
                  </div>
                </Link>
                <Link
                  to="/my-profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#E8DCC3] text-[#2B2118]"
                >
                  Edit Profile
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    loginAsDemo('tariq_male_free');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-medium rounded-lg border border-[#E8DCC3] text-[#2B2118]"
                >
                  Log In Demo
                </button>
                <Link
                  to="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-sm font-medium rounded-lg bg-[#2B2118] text-[#FAF4EA]"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
