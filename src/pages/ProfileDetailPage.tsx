import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Flag,
  Ban,
  ArrowLeft,
  Sparkles,
  MapPin,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  Send,
  AlertTriangle,
} from 'lucide-react';

export const ProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    profiles,
    currentUser,
    sentInterestIds,
    favoriteUserIds,
    toggleInterest,
    toggleFavorite,
    blockUser,
    submitReport,
    addToast,
  } = useApp();

  const profile = profiles.find((p) => p.id === id);

  // Active photo gallery index
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Modal states
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate content or photo');
  const [reportNotes, setReportNotes] = useState('');

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FAF4EA] py-16 px-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-medium text-[#2B2118] mb-2">
          Profile Not Found
        </h2>
        <p className="text-xs text-[#756353] mb-6">
          This sample profile may have been hidden or removed during this session.
        </p>
        <Link
          to="/browse"
          className="px-5 py-2.5 rounded-xl bg-[#2B2118] text-[#FAF4EA] text-xs font-semibold"
        >
          Return to Browse
        </Link>
      </div>
    );
  }

  const hasSentInterest = sentInterestIds.includes(profile.id);
  const isFavorite = favoriteUserIds.includes(profile.id);

  const handleMessageClick = () => {
    // Check membership rules
    if (!currentUser) {
      addToast('Please Log In', 'You must be logged in to start conversations.', 'warning');
      return;
    }

    if (currentUser.gender === 'man' && currentUser.tier === 'Free') {
      setShowUpgradeModal(true);
      return;
    }

    navigate('/messages');
  };

  const handleConfirmBlock = () => {
    blockUser(profile.id);
    setShowBlockModal(false);
    navigate('/browse');
  };

  const handleConfirmReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(profile.id, profile.name, reportReason, reportNotes);
    setShowReportModal(false);
    setReportNotes('');
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#756353] hover:text-[#2B2118] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </Link>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#E8DCC3] shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left: Photo Gallery */}
            <div className="md:col-span-5 bg-[#FAF4EA] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DCC3]">
              <div className="space-y-4">
                {/* Main Photo */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8DCC3] shadow-xs">
                  <img
                    src={profile.photos[activePhotoIdx] || profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Strictly Mandatory Sample Badge */}
                  <div className="absolute top-3 left-3 bg-[#2B2118]/85 backdrop-blur-xs text-[#FAF4EA] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase border border-[#FAF4EA]/20">
                    SAMPLE PROFILE
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    onClick={() => toggleFavorite(profile.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#2B2118] hover:text-[#A34D28] flex items-center justify-center border border-[#E8DCC3] shadow-xs transition-colors"
                    title={isFavorite ? 'Remove from saved' : 'Save profile'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isFavorite ? 'fill-[#A34D28] text-[#A34D28]' : ''}`}
                    />
                  </button>
                </div>

                {/* Thumbnails */}
                {profile.photos.length > 1 && (
                  <div className="flex gap-2">
                    {profile.photos.map((ph, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          activePhotoIdx === idx
                            ? 'border-[#C99A2E] ring-1 ring-[#C99A2E]'
                            : 'border-[#E8DCC3] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={ph} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Trust Indicators (displayed only where supported!) */}
              <div className="mt-4 pt-4 border-t border-[#E8DCC3] flex flex-wrap items-center gap-2 text-[11px]">
                {profile.emailVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[#2B2118] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                    Email Verified
                  </span>
                )}
                {profile.photoChecked && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[#2B2118] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A34D28]" />
                    Photo Checked
                  </span>
                )}
              </div>
            </div>

            {/* Right: Profile Details & Compatibility */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Title line */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-baseline gap-2">
                    <h1
                      className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {profile.name}
                    </h1>
                    <span className="text-lg font-serif text-[#756353]">
                      {profile.age}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-[#FAF4EA] text-xs font-semibold text-[#A34D28] border border-[#E8DCC3]">
                    {profile.denomination}
                  </span>
                </div>

                {/* University and Location */}
                <div className="space-y-1.5 text-xs text-[#756353] mb-6">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#2B2118]">
                    <GraduationCap className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>{profile.university}</span>
                    <span className="text-xs text-[#756353] font-normal">
                      • {profile.major}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A34D28] shrink-0" />
                    <span>{profile.city}, {profile.country} ({profile.region})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#756353]">
                    <Calendar className="w-3.5 h-3.5 text-[#756353] shrink-0" />
                    <span>Member since {profile.joinedDate}</span>
                  </div>
                </div>

                {/* Compatibility Indicator (Section 9.3) */}
                <div className="mb-6 p-4 rounded-2xl bg-[#FAF4EA] border border-[#E8DCC3]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C99A2E]" />
                      <span className="font-semibold text-xs text-[#2B2118] uppercase tracking-wide">
                        Compatibility Snapshot
                      </span>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#2B2118]">
                      {profile.compatibility}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E8DCC3] h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-[#C99A2E] to-[#A34D28] h-full rounded-full transition-all duration-500"
                      style={{ width: `${profile.compatibility}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#756353] leading-relaxed">
                    You share several university preferences, lifestyle traits, and communication priorities. (Demonstration compatibility metric).
                  </p>
                </div>

                {/* About Me */}
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-base text-[#2B2118] mb-2">
                    About Me
                  </h3>
                  <p className="text-xs text-[#756353] leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Interests Tags */}
                <div className="mb-6">
                  <h3 className="font-serif font-semibold text-base text-[#2B2118] mb-2">
                    Interests & Campus Life
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.interests.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#FAF4EA] text-xs text-[#2B2118] border border-[#E8DCC3]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#FAF4EA] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  {/* Send Interest */}
                  <button
                    onClick={() => toggleInterest(profile.id)}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs ${
                      hasSentInterest
                        ? 'bg-[#E8DCC3] text-[#A34D28]'
                        : 'bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasSentInterest ? 'fill-[#A34D28] text-[#A34D28]' : ''}`} />
                    <span>{hasSentInterest ? 'Interest Sent' : 'Send Interest (Free)'}</span>
                  </button>

                  {/* Message */}
                  <button
                    onClick={handleMessageClick}
                    className="flex-1 py-3 px-4 rounded-xl border border-[#E8DCC3] bg-white hover:bg-[#FAF4EA] text-xs font-semibold text-[#2B2118] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#A34D28]" />
                    <span>Send Message</span>
                  </button>
                </div>

                {/* Report and Block Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="p-2.5 rounded-xl text-[#756353] hover:text-[#A34D28] hover:bg-[#FAF4EA] transition-colors"
                    title="Report profile"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowBlockModal(true)}
                    className="p-2.5 rounded-xl text-[#756353] hover:text-[#A34D28] hover:bg-[#FAF4EA] transition-colors"
                    title="Block profile"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-2xl max-w-md w-full p-6 border border-[#E8DCC3] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC3] mb-4">
              <div className="flex items-center gap-2 text-[#A34D28]">
                <Flag className="w-4 h-4" />
                <h3 className="font-serif font-medium text-lg text-[#2B2118]">
                  Report Profile
                </h3>
              </div>
              <button onClick={() => setShowReportModal(false)}>
                <X className="w-4 h-4 text-[#756353]" />
              </button>
            </div>

            <p className="text-xs text-[#756353] mb-4">
              Help maintain a peaceful, respectful campus community for {profile.name}.
            </p>

            <form onSubmit={handleConfirmReport} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Reason for reporting:
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-white text-[#2B2118]"
                >
                  <option value="Inappropriate content or photo">Inappropriate content or photo</option>
                  <option value="Spam, advertising, or commercial solicitation">Spam, advertising, or commercial solicitation</option>
                  <option value="Fake or impersonated profile">Fake or impersonated profile</option>
                  <option value="Harassment or disrespectful language">Harassment or disrespectful language</option>
                  <option value="Other concern">Other concern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Additional Notes (Optional):
                </label>
                <textarea
                  rows={3}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Provide context for the moderation team..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-white text-[#2B2118]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-[#756353] hover:text-[#2B2118]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#A34D28] text-white text-xs font-semibold hover:bg-[#8D3F1E] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOCK MODAL */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-2xl max-w-sm w-full p-6 border border-[#E8DCC3] shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EA] border border-[#A34D28]/40 text-[#A34D28] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-medium text-xl text-[#2B2118] mb-1">
              Block {profile.name}?
            </h3>

            <p className="text-xs text-[#756353] leading-relaxed mb-6">
              This profile will be hidden from your demonstration browsing session and cannot send you messages.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowBlockModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DCC3] text-xs font-medium text-[#756353] hover:text-[#2B2118]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBlock}
                className="flex-1 py-2.5 rounded-xl bg-[#A34D28] text-white text-xs font-semibold hover:bg-[#8D3F1E]"
              >
                Confirm Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBERSHIP RESTRICTION UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8DCC3] shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-full bg-white border border-[#C99A2E] text-[#C99A2E] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="font-serif font-medium text-2xl text-[#2B2118] mb-2">
              A little more room to connect.
            </h3>

            <p className="text-xs text-[#756353] leading-relaxed mb-6">
              As a free male member, you can send unlimited likes and reply whenever someone contacts you. Upgrade your membership to initiate direct conversations.
            </p>

            <div className="p-3 bg-white rounded-xl border border-[#E8DCC3] text-left text-xs mb-6 space-y-1.5">
              <div className="font-semibold text-[#2B2118]">
                Silver Membership ($5.50 /mo basic) includes:
              </div>
              <ul className="text-[11px] text-[#756353] space-y-1 list-disc pl-4">
                <li>Start a message with anyone</li>
                <li>See who liked your profile</li>
                <li>Read receipts & profile boost</li>
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
