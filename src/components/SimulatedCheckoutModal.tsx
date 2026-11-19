import React, { useState } from 'react';
import { Modal } from './Modal';
import { Tournament } from '../types';
import { useAppStore } from '../store';
import { CreditCard, ShieldCheck, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimulatedCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament;
}

export const SimulatedCheckoutModal: React.FC<SimulatedCheckoutModalProps> = ({
  isOpen,
  onClose,
  tournament
}) => {
  const { currentUser, joinTournament } = useAppStore();
  const [method, setMethod] = useState<'Credit Card' | 'PayPal'>('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      joinTournament(tournament.id, method);
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2200);
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isProcessing) onClose();
      }}
      title="Tournament Registration Checkout"
      description="Secure federation entry processing (Simulated)"
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 bg-forest-100 text-forest-700 rounded-full mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-display text-xl font-bold text-charcoal">
            Registration Confirmed!
          </h4>
          <p className="text-xs text-charcoal-muted max-w-xs mx-auto">
            You are officially locked in for {tournament.name}. Good luck on the pitch!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Tournament Summary Card */}
          <div className="bg-stone-50 border border-stone-200/90 rounded-card p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-forest-700">
                  {tournament.type}
                </span>
                <h4 className="font-display font-bold text-charcoal">
                  {tournament.name}
                </h4>
              </div>
              <span className="font-display font-extrabold text-xl text-forest-800 tabular-nums">
                ${tournament.entryFee.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-charcoal-muted pt-2 border-t border-stone-200/60">
              <span>Competitor: <strong className="text-charcoal">{currentUser.displayName}</strong></span>
              <span>Slots: {tournament.participants.length}/{tournament.maxParticipants}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('Credit Card')}
                className={`flex items-center justify-center gap-2 p-3 rounded-card border text-xs font-semibold transition-all ${
                  method === 'Credit Card'
                    ? 'border-forest-600 bg-forest-50/70 text-forest-800 ring-1 ring-forest-600'
                    : 'border-stone-200 bg-surface text-charcoal hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Credit Card (Demo)
              </button>

              <button
                type="button"
                onClick={() => setMethod('PayPal')}
                className={`flex items-center justify-center gap-2 p-3 rounded-card border text-xs font-semibold transition-all ${
                  method === 'PayPal'
                    ? 'border-forest-600 bg-forest-50/70 text-forest-800 ring-1 ring-forest-600'
                    : 'border-stone-200 bg-surface text-charcoal hover:border-stone-300'
                }`}
              >
                <span className="font-bold text-blue-700 italic">P</span>
                PayPal (Demo)
              </button>
            </div>
          </div>

          {/* Simulated Card Fields */}
          {method === 'Credit Card' && (
            <div className="space-y-3 bg-warm-bg p-3.5 rounded-card border border-stone-200/80">
              <div>
                <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                  Card Number (Pre-filled Demo)
                </label>
                <input
                  type="text"
                  readOnly
                  value="4242 •••• •••• 4242"
                  className="w-full text-xs font-mono bg-surface border border-stone-200 rounded-lg px-3 py-2 text-charcoal cursor-not-allowed"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                    Expires
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="12 / 28"
                    className="w-full text-xs font-mono bg-surface border border-stone-200 rounded-lg px-3 py-2 text-charcoal cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="•••"
                    className="w-full text-xs font-mono bg-surface border border-stone-200 rounded-lg px-3 py-2 text-charcoal cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Demo Disclaimer notice */}
          <div className="flex items-start gap-2 text-[11px] text-charcoal-muted bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
            <Lock className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
            <span>
              Simulated demonstration sandbox. No real funds or sensitive card data are charged or transmitted.
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePayment}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface font-semibold text-sm shadow-subtle transition-all disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating Payment Gateway Handshake...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Pay ${tournament.entryFee.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      )}
    </Modal>
  );
};
