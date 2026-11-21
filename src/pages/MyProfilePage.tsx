import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Camera,
  Trash2,
  Plus,
  Check,
  AlertTriangle,
  Clock,
  X,
} from 'lucide-react';

export const MyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser, deleteAccount, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'photos' | 'settings'>('profile');

  // Form states
  const [name, setName] = useState(currentUser?.name || '');
  const [age, setAge] = useState(currentUser?.age || 22);
  const [university, setUniversity] = useState(currentUser?.university || '');
  const [major, setMajor] = useState(currentUser?.major || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [country, setCountry] = useState(currentUser?.country || 'United States');
  const [denomination, setDenomination] = useState(currentUser?.denomination || 'Sunni');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [interests, setInterests] = useState<string[]>(currentUser?.interests || []);
  const [newInterestInput, setNewInterestInput] = useState('');

  // Photos state
  const [photos, setPhotos] = useState<string[]>(currentUser?.photos || []);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF4EA] py-16 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-serif font-medium text-[#2B2118] mb-2">
          No Logged-In Account
        </h2>
        <p className="text-xs text-[#756353] mb-6">
          Please log in via the demo bar at the top or register a new demonstration account.
        </p>
        <button
          onClick={() => navigate('/join')}
          className="px-5 py-2.5 rounded-xl bg-[#2B2118] text-[#FAF4EA] text-xs font-semibold"
        >
          Join Free
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      age: Number(age),
      university,
      major,
      city,
      country,
      denomination: denomination as any,
      bio,
      interests,
    });
  };

  const handleAddInterest = () => {
    if (newInterestInput.trim() && !interests.includes(newInterestInput.trim())) {
      setInterests([...interests, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleSimulateAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPendingPhoto(reader.result as string);
      addToast(
        'Photo Uploaded (Simulation)',
        'Your photo is in "Pending Approval" review state. Demonstrating the moderation flow.',
        'info'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleApproveSimulatedPhoto = () => {
    if (pendingPhoto) {
      const updatedPhotos = [...photos, pendingPhoto];
      setPhotos(updatedPhotos);
      updateCurrentUser({ photos: updatedPhotos });
      setPendingPhoto(null);
      addToast('Photo Approved', 'The simulated photo is now active on your profile.', 'success');
    }
  };

  const handleSetPrimaryPhoto = (photoUrl: string) => {
    const reordered = [photoUrl, ...photos.filter((p) => p !== photoUrl)];
    setPhotos(reordered);
    updateCurrentUser({ avatar: photoUrl, photos: reordered });
    addToast('Primary Photo Set', 'Your main profile avatar has been updated.', 'success');
  };

  const handleRemovePhoto = (photoUrl: string) => {
    if (photos.length <= 1) {
      addToast('Cannot Remove', 'Your profile must have at least one photograph.', 'warning');
      return;
    }
    const filtered = photos.filter((p) => p !== photoUrl);
    setPhotos(filtered);
    updateCurrentUser({ avatar: filtered[0], photos: filtered });
    addToast('Photo Removed', 'Photograph removed from your profile.', 'info');
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    deleteAccount();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E8DCC3] gap-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#E8DCC3]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="text-2xl sm:text-3xl font-serif font-medium text-[#2B2118]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[10px] font-semibold text-[#A34D28]">
                  {currentUser.tier}
                </span>
              </div>
              <p className="text-xs text-[#756353]">
                {currentUser.university} • {currentUser.city}, {currentUser.country}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white rounded-xl p-1 border border-[#E8DCC3]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'photos'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              Account & Privacy
            </button>
          </div>
        </div>

        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-1">
                Edit Member Details
              </h3>
              <p className="text-xs text-[#756353]">
                Update the information visible to Muslim students across campuses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min={18}
                  max={45}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  College or University
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Academic Major / Study
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g. Computer Engineering"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  Denomination
                </label>
                <select
                  value={denomination}
                  onChange={(e) => setDenomination(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                >
                  <option value="Sunni">Sunni</option>
                  <option value="Shia">Shia</option>
                  <option value="Just Muslim">Just Muslim</option>
                  <option value="Independent">Independent</option>
                </select>
              </div>
            </div>

            {/* About Me Bio */}
            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                About Me / Biography
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your values, campus lifestyle, and what you seek in a partner..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DCC3] bg-[#FAF4EA]/20 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
              />
            </div>

            {/* Interests Management */}
            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1.5">
                Interests & Activities
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF4EA] text-xs text-[#2B2118] border border-[#E8DCC3]"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      className="text-[#756353] hover:text-[#A34D28]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  value={newInterestInput}
                  onChange={(e) => setNewInterestInput(e.target.value)}
                  placeholder="e.g. Campus MSA, Coffee, Hiking"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#E8DCC3]"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF4EA] border border-[#E8DCC3] hover:bg-[#E8DCC3] text-xs font-medium text-[#2B2118] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FAF4EA] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 text-[#C99A2E]" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Photo Gallery & Moderation Simulation */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-1">
                Manage Photographs
              </h3>
              <p className="text-xs text-[#756353]">
                Your first photo is your main portrait. You can set any photo as primary or upload additional shots.
              </p>
            </div>

            {/* Existing Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((ph, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border border-[#E8DCC3] group bg-[#FAF4EA]"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={ph} alt="User" className="w-full h-full object-cover" />
                  </div>

                  {idx === 0 && (
                    <div className="absolute top-2 left-2 bg-[#2B2118] text-[#FAF4EA] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      Primary
                    </div>
                  )}

                  <div className="p-2 bg-white flex items-center justify-between gap-1 text-[11px]">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryPhoto(ph)}
                        className="text-[#2B2118] hover:text-[#A34D28] font-medium"
                      >
                        Make Primary
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(ph)}
                      className="text-[#756353] hover:text-[#A34D28] p-1 ml-auto"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Card */}
              <div className="border-2 border-dashed border-[#E8DCC3] hover:border-[#C99A2E] rounded-2xl aspect-[4/5] flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors relative bg-[#FAF4EA]/30">
                <input
                  type="file"
                  id="profile-gallery-upload"
                  accept="image/*"
                  onChange={handleSimulateAddPhoto}
                  className="hidden"
                />
                <label htmlFor="profile-gallery-upload" className="cursor-pointer block">
                  <Camera className="w-8 h-8 text-[#A34D28] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#2B2118]">Add Photo</p>
                  <p className="text-[10px] text-[#756353] mt-0.5">Click to simulate upload</p>
                </label>
              </div>
            </div>

            {/* Pending Approval Demonstration Notice (PRD Section 12.3) */}
            {pendingPhoto && (
              <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#C99A2E]/50 flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#E8DCC3] shrink-0">
                  <img src={pendingPhoto} alt="Pending" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[#A34D28] font-semibold mb-0.5">
                    <Clock className="w-4 h-4" />
                    <span>Photo Status: Pending Demonstration Review</span>
                  </div>
                  <p className="text-[#756353] leading-relaxed mb-2">
                    In the production version of Sakeena, photos are reviewed to ensure authentic campus compliance. You can simulate instant admin approval right here:
                  </p>
                  <button
                    onClick={handleApproveSimulatedPhoto}
                    className="px-3 py-1.5 rounded-lg bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-[11px] font-semibold"
                  >
                    Simulate Admin Approval & Add to Gallery
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Account & Privacy Settings + Deletion (PRD Section 14.5) */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-1">
                Account & Privacy Preferences
              </h3>
              <p className="text-xs text-[#756353]">
                Manage visibility settings, notifications, and demonstration account status.
              </p>
            </div>

            <div className="space-y-4 text-xs divide-y divide-[#FAF4EA]">
              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="font-semibold text-[#2B2118]">Show University in Browse Grid</p>
                  <p className="text-[11px] text-[#756353]">Allow other students to see your campus.</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#C99A2E] w-4 h-4" />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="font-semibold text-[#2B2118]">Show Denomination Badge</p>
                  <p className="text-[11px] text-[#756353]">Display Sunni, Shia, or Just Muslim label.</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#C99A2E] w-4 h-4" />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="font-semibold text-[#2B2118]">Message Read Receipts</p>
                  <p className="text-[11px] text-[#756353]">Let conversation partners know when messages are read.</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-[#C99A2E] w-4 h-4" />
              </div>
            </div>

            {/* Danger Zone: Account Deletion */}
            <div className="mt-8 pt-6 border-t border-[#E8DCC3] p-4 rounded-2xl bg-[#FAF4EA]/50 border border-[#A34D28]/30">
              <h4 className="font-serif font-semibold text-sm text-[#A34D28] mb-1">
                Demonstration Account Deletion (PRD Section 14.5)
              </h4>
              <p className="text-xs text-[#756353] leading-relaxed mb-4">
                Clearing your demonstration account removes all local demo profile details and session messages. This is an interactive simulation of account cancellation.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-xl bg-white border border-[#A34D28] text-[#A34D28] hover:bg-[#A34D28] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Account (Simulation)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CONFIRM DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF4EA] rounded-3xl max-sm w-full p-6 border border-[#E8DCC3] shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EA] border border-[#A34D28]/40 text-[#A34D28] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-medium text-xl text-[#2B2118] mb-1">
              Delete Demo Account?
            </h3>

            <p className="text-xs text-[#756353] leading-relaxed mb-6">
              This will clear your local demonstration profile and return you to the homepage. (Local frontend simulation).
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DCC3] text-xs font-medium text-[#756353] hover:text-[#2B2118]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-[#A34D28] text-white text-xs font-semibold hover:bg-[#8D3F1E]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
