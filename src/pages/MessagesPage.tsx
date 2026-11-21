import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  ArrowLeft,
  CheckCheck,
  ShieldCheck,
  GraduationCap,
  Lock,
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const {
    currentUser,
    profiles,
    conversations,
    sendMessage,
    markConversationAsRead,
  } = useApp();

  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [restrictionReason, setRestrictionReason] = useState<string>('');

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const activeParticipant = activeConv
    ? profiles.find((p) => p.id === activeConv.participantId)
    : null;

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    markConversationAsRead(id);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeParticipant) return;

    const result = sendMessage(activeParticipant.id, inputText);
    if (result.success) {
      setInputText('');
    } else {
      if (result.errorReason === 'male_free_restriction') {
        setRestrictionReason(
          'Free male members can read and reply to members who contact them first, but cannot initiate new conversations without Silver membership.'
        );
        setShowUpgradeModal(true);
      } else if (result.errorReason === 'female_silver_cap') {
        setRestrictionReason(
          'Complimentary Silver includes a capped message quota. Upgrade to Gold or Elite to unlock unlimited messaging.'
        );
        setShowUpgradeModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#E8DCC3] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#A34D28] font-semibold">
                Direct University Conversations
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C99A2E]" />
              <span className="text-[11px] text-[#756353]">
                Logged in as: {currentUser?.name || 'Guest'} ({currentUser?.tier || 'Free'})
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-serif font-medium text-[#2B2118]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Messages
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#756353]">
            <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
            <span>Encrypted frontend demonstration</span>
          </div>
        </div>

        {/* Messaging Layout */}
        <div className="bg-white rounded-3xl border border-[#E8DCC3] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Left Column: Conversation List */}
          <div
            className={`md:col-span-4 border-r border-[#E8DCC3] bg-[#FAF4EA]/40 flex flex-col ${
              activeConvId ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="p-4 border-b border-[#E8DCC3] flex items-center justify-between">
              <span className="font-serif font-semibold text-base text-[#2B2118]">
                Conversations ({conversations.length})
              </span>
              <span className="text-[11px] text-[#756353]">All Campuses</span>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-[#E8DCC3]/60">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#756353]">
                  No active conversations yet. Explore member profiles and send an interest to start.
                </div>
              ) : (
                conversations.map((conv) => {
                  const participant = profiles.find(
                    (p) => p.id === conv.participantId
                  );
                  const isSelected = conv.id === activeConvId;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConv(conv.id)}
                      className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#E8DCC3]/80'
                          : 'hover:bg-[#FAF4EA] bg-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={participant?.avatar}
                          alt={participant?.name || 'Member'}
                          className="w-12 h-12 rounded-full object-cover border border-[#E8DCC3]"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#C99A2E] border-2 border-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="text-xs font-semibold text-[#2B2118] truncate">
                            {participant?.name || 'Member'}
                          </h4>
                          <span className="text-[10px] text-[#756353] shrink-0 ml-1">
                            {conv.lastTimestamp}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#756353] truncate leading-tight">
                          {conv.lastMessage}
                        </p>

                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-[#A34D28] font-medium truncate">
                            {participant?.university}
                          </span>
                          {conv.unreadCount > 0 && (
                            <span className="bg-[#A34D28] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Quick Membership Rule Notice in Left Column */}
            <div className="p-3 bg-[#FAF4EA] border-t border-[#E8DCC3] text-[11px] text-[#756353] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#C99A2E] shrink-0" />
              <span>
                {currentUser?.gender === 'man' && currentUser.tier === 'Free'
                  ? 'Free Male: reply allowed when contacted.'
                  : currentUser?.tier === 'Complimentary Silver'
                  ? 'Complimentary Silver: 5-message demo cap.'
                  : 'Gold/Elite: Unlimited direct messaging.'}
              </span>
            </div>
          </div>

          {/* Right Column: Active Conversation */}
          <div
            className={`md:col-span-8 flex flex-col justify-between bg-white ${
              !activeConvId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {activeParticipant && activeConv ? (
              <>
                {/* Chat Top Bar */}
                <div className="p-4 border-b border-[#E8DCC3] flex items-center justify-between bg-[#FAF4EA]/40">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveConvId('')}
                      className="md:hidden p-1.5 rounded-lg text-[#756353] hover:text-[#2B2118]"
                      title="Back to conversations list"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <Link to={`/profile/${activeParticipant.id}`} className="flex items-center gap-3 group">
                      <img
                        src={activeParticipant.avatar}
                        alt={activeParticipant.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E8DCC3]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-semibold text-base text-[#2B2118] group-hover:text-[#A34D28] transition-colors">
                            {activeParticipant.name}
                          </h3>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#FAF4EA] text-[#A34D28] border border-[#E8DCC3]">
                            SAMPLE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#756353] flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-[#C99A2E]" />
                          <span>{activeParticipant.university}</span>
                        </p>
                      </div>
                    </Link>
                  </div>

                  <Link
                    to={`/profile/${activeParticipant.id}`}
                    className="text-xs px-3 py-1.5 rounded-xl border border-[#E8DCC3] hover:bg-[#FAF4EA] text-[#2B2118] font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Messages Bubbles Area */}
                <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FAF4EA]/20 to-white">
                  <div className="text-center my-2">
                    <span className="text-[10px] tracking-wider uppercase text-[#756353] bg-[#FAF4EA] border border-[#E8DCC3] px-3 py-1 rounded-full">
                      Demonstration Conversation • Sample Member
                    </span>
                  </div>

                  {activeConv.messages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id || msg.senderId === 'current-user';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                            isMe
                              ? 'bg-[#2B2118] text-[#FAF4EA] rounded-br-xs'
                              : 'bg-[#FAF4EA] border border-[#E8DCC3] text-[#2B2118] rounded-bl-xs'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#756353] px-1">
                          <span>{msg.timestamp}</span>
                          {isMe && (
                            <CheckCheck className="w-3.5 h-3.5 text-[#C99A2E]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleSend}
                  className="p-4 border-t border-[#E8DCC3] bg-[#FAF4EA]/30 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${activeParticipant.name.split(' ')[0]}...`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8DCC3] bg-white text-xs text-[#2B2118] focus:outline-none focus:border-[#C99A2E]"
                  />

                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] transition-all flex items-center justify-center shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4 text-[#C99A2E]" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[#A34D28] flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#2B2118] mb-1">
                  Select a Conversation
                </h3>
                <p className="text-xs text-[#756353]">
                  Choose a student from the list on the left to start viewing messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MEMBERSHIP LOCKED ACTION UPGRADE MODAL (PRD Section 10.6) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8DCC3] shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-full bg-white border border-[#C99A2E] text-[#C99A2E] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="font-serif font-medium text-2xl text-[#2B2118] mb-2">
              A little more room to connect.
            </h3>

            <p className="text-xs text-[#756353] leading-relaxed mb-4">
              {restrictionReason ||
                'Upgrade your membership to unlock unlimited messaging and additional features.'}
            </p>

            <div className="p-3 bg-white rounded-xl border border-[#E8DCC3] text-left text-xs mb-6 space-y-1.5">
              <div className="font-semibold text-[#2B2118]">
                Silver Membership ($5.50 /mo basic) includes:
              </div>
              <ul className="text-[11px] text-[#756353] space-y-1 list-disc pl-4">
                <li>Start a message with anyone</li>
                <li>See who liked you</li>
                <li>Read receipts & profile boost</li>
                <li>Additional photo slots</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DCC3] text-xs font-medium text-[#756353] hover:text-[#2B2118]"
              >
                Maybe Later
              </button>
              <Link
                to="/membership"
                className="flex-1 py-2.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold text-center flex items-center justify-center"
              >
                Explore Memberships
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
