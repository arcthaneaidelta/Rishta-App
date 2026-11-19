import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAppStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-warm-bg/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <BrandLogo size="md" />

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
          <Link to="/" className="hover:text-forest-600 transition-colors">
            Home
          </Link>
          <a href="/#about" className="hover:text-forest-600 transition-colors">
            About
          </a>
          <a href="/#how-it-works" className="hover:text-forest-600 transition-colors">
            How It Works
          </a>
          <a href="/#competitions" className="hover:text-forest-600 transition-colors">
            Competitions
          </a>
          <Link to="/tutorial" className="hover:text-forest-600 transition-colors">
            Tutorial
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all"
            >
              <span>Enter Federation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-charcoal hover:text-forest-600 px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all"
              >
                <span>Join Federation</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-charcoal hover:bg-stone-200/60 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-charcoal" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-charcoal">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-forest-600"
            >
              Home
            </Link>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-forest-600"
            >
              About
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-forest-600"
            >
              How It Works
            </a>
            <a
              href="/#competitions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-forest-600"
            >
              Competitions
            </a>
            <Link
              to="/tutorial"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-forest-600"
            >
              Tutorial & Strategy
            </Link>
          </nav>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-forest-600 text-surface font-semibold text-sm"
              >
                <span>Enter Federation ({currentUser.displayName})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl border border-stone-200 font-semibold text-charcoal text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-forest-600 text-surface font-semibold text-sm"
                >
                  Join Federation
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
