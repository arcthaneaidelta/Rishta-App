import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Globe, Trophy, Mail } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-stone-300 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-forest-900/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" className="[&_span]:text-stone-100" />
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              FUTBOLIÑO is the premier competitive gaming federation for strategic football.
              Uniting players worldwide through verified tournaments, ranked ladders, and sovereign competition.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Official Federation Interactive Demonstration</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-stone-100 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="hover:text-stone-100 transition-colors">
                  Tournaments & Cups
                </Link>
              </li>
              <li>
                <Link to="/league" className="hover:text-stone-100 transition-colors">
                  Premier League
                </Link>
              </li>
              <li>
                <Link to="/rankings" className="hover:text-stone-100 transition-colors">
                  Global Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/tutorial" className="hover:text-stone-100 transition-colors">
                  Tutorial & Playbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Federation Rules */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-200 mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <span className="hover:text-stone-100 cursor-pointer">
                  Fair Play Standard
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 cursor-pointer">
                  Elo Rating System (K=32)
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 cursor-pointer">
                  Anti-Cheat Telemetry
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 cursor-pointer">
                  Tournament Bylaws
                </span>
              </li>
              <li>
                <span className="hover:text-stone-100 cursor-pointer">
                  Federation Code of Conduct
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Inquiries */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-200 mb-4">
              Contact & Inquiries
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              For federation inquiries, sanctioned events, and platform integrations:
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-300 mb-4">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>contact@futbolino-fed.org</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Globe className="w-4 h-4 text-stone-500 shrink-0" />
              <span>Global Federation Headquarters</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} FUTBOLIÑO Gaming Federation. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
