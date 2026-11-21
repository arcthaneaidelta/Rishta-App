import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Send, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const { addToast } = useApp();

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setShowContactModal(false);
      setContactSubject('');
      setContactMessage('');
      addToast('Message Received', 'Thank you! Your demonstration inquiry has been recorded.', 'success');
    }, 1200);
  };

  return (
    <footer className="bg-[#2B2118] text-[#FAF4EA] border-t border-[#4A3B2C] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#4A3B2C]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-baseline gap-1">
              <span
                className="text-3xl font-serif font-medium tracking-tight text-[#FAF4EA]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Sakeena
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99A2E] mb-1" />
            </Link>
            <p className="text-xs text-[#E8DCC3]/80 leading-relaxed">
              Tranquil, dignified matchmaking created specifically for Muslim college and university students worldwide. Meet, chat and match — free.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#4A3B2C]/70 text-[#C99A2E] text-[11px] font-medium border border-[#C99A2E]/30">
                <Sparkles className="w-3 h-3" />
                meetsakeena.com
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C99A2E] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCC3]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Discover Students
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/personality-quiz" className="hover:text-white transition-colors">
                  Compatibility Quiz
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-white transition-colors">
                  Membership & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C99A2E] mb-4">
              Safety & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCC3]">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/demo-admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#C99A2E]" />
                  Admin Demonstration
                </Link>
              </li>
              <li>
                <span className="text-[#E8DCC3]/60 italic">
                  No credit card required at signup
                </span>
              </li>
            </ul>
          </div>

          {/* Community & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C99A2E] mb-4">
              Get in Touch
            </h4>
            <p className="text-xs text-[#E8DCC3]/80 leading-relaxed mb-4">
              Have questions regarding student matchmaking or campus partnerships?
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full py-2 px-3 rounded-lg bg-[#4A3B2C] hover:bg-[#A34D28] text-[#FAF4EA] text-xs font-medium transition-colors text-center"
              >
                Demonstration Contact Form
              </button>
              <Link
                to="/join"
                className="block w-full py-2 px-3 rounded-lg bg-[#C99A2E] hover:bg-[#B28624] text-[#2B2118] text-xs font-semibold transition-colors text-center"
              >
                Join Free in 2 Minutes
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar with mandatory company statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8DCC3]/70 gap-4">
          <p>
            © 2026 Sakeena. All rights reserved. <span className="font-semibold text-[#FAF4EA]">Sakeena is a product of Olympia Enterprises LLC.</span>
          </p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>USA • GCC • SE Asia • Canada</span>
            <span>•</span>
            <span className="text-[#C99A2E]">Client Demonstration</span>
          </div>
        </div>
      </div>

      {/* Demonstration Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] text-[#2B2118] rounded-2xl max-w-md w-full p-6 border border-[#E8DCC3] shadow-2xl relative">
            <h3 className="text-2xl font-serif font-medium text-[#2B2118] mb-1">
              Contact Sakeena Team
            </h3>
            <p className="text-xs text-[#756353] mb-4">
              Demonstration Contact for Olympia Enterprises LLC review.
            </p>

            {sentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E8DCC3] text-[#A34D28] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#2B2118]">
                  Thank you! Your simulated message has been recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B2118] mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Campus Ambassador Program"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#E8DCC3] bg-white focus:outline-none focus:border-[#C99A2E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2B2118] mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Share your feedback or questions..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#E8DCC3] bg-white focus:outline-none focus:border-[#C99A2E]"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 text-xs rounded-lg text-[#756353] hover:text-[#2B2118]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] font-medium flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Demo Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
