import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft, Check, Camera, X, ShieldCheck } from 'lucide-react';

export const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerUser } = useApp();

  // Pick up any initial selections from the hero quick signup
  const locationState = location.state as { initialGender?: 'man' | 'woman'; initialLookingFor?: 'woman' | 'man' } | null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 is success
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>(21);
  const [gender, setGender] = useState<'man' | 'woman'>(locationState?.initialGender || 'man');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample quick photos for instant demo test if user doesn't want to browse file
  const presetPhotos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size must be under 5MB.');
      return;
    }

    setErrorMsg('');
    setIsUploading(true);
    setUploadProgress(20);

    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => setUploadProgress(60), 200);
      setTimeout(() => {
        setUploadProgress(100);
        setPhotoPreview(reader.result as string);
        setIsUploading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid university or personal email address.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || age < 18) {
      setErrorMsg('You must be at least 18 years old to join Sakeena.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setErrorMsg('Please enter your city.');
      return;
    }
    if (!university.trim()) {
      setErrorMsg('Please enter your college or university.');
      return;
    }
    if (!photoPreview) {
      setErrorMsg('Please provide one photograph to complete your profile.');
      return;
    }

    // Determine region based on country
    let region: 'USA' | 'GCC' | 'Southeast Asia' | 'Canada' = 'USA';
    if (['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].includes(country)) {
      region = 'GCC';
    } else if (['Malaysia', 'Indonesia', 'Singapore'].includes(country)) {
      region = 'Southeast Asia';
    } else if (country === 'Canada') {
      region = 'Canada';
    }

    registerUser({
      name,
      age: Number(age),
      gender,
      country,
      city,
      university,
      region,
      avatar: photoPreview,
      photos: [photoPreview],
    });

    setStep(4); // Success view
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Brand Heading */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-baseline gap-1 mb-2">
          <span
            className="text-4xl font-serif font-medium text-[#2B2118]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sakeena
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99A2E] mb-1" />
        </Link>
        <p className="text-xs text-[#756353]">
          Six basic details. Under two minutes. Always free to browse.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8DCC3] shadow-lg p-6 sm:p-8 relative">
        {step < 4 && (
          <div className="mb-6">
            {/* Step progress bar */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#756353] uppercase tracking-wider mb-2">
              <span>Stage {step} of 3</span>
              <span className="text-[#A34D28]">
                {step === 1 && 'Basic Identity'}
                {step === 2 && 'Age & Gender'}
                {step === 3 && 'Campus & Photo'}
              </span>
            </div>
            <div className="w-full bg-[#FAF4EA] h-1.5 rounded-full overflow-hidden border border-[#E8DCC3]">
              <div
                className="bg-[#C99A2E] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#FAF4EA] border border-[#A34D28]/30 text-xs text-[#A34D28]">
            {errorMsg}
          </div>
        )}

        {/* STAGE 1: Name and Email */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-serif font-medium text-[#2B2118]">
                Welcome. What is your name?
              </h2>
              <p className="text-xs text-[#756353] mt-1">
                Your first name is displayed on your university profile.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCC3] text-sm text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCC3] text-sm text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
              />
              <p className="text-[11px] text-[#756353] mt-1">
                We respect your privacy. No spam or third-party sharing.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
              </button>
            </div>
          </form>
        )}

        {/* STAGE 2: Age and Gender */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5">
            <div>
              <h2 className="text-2xl font-serif font-medium text-[#2B2118]">
                A bit more about you
              </h2>
              <p className="text-xs text-[#756353] mt-1">
                Helps show appropriate student matches.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1.5">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('man')}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    gender === 'man'
                      ? 'border-[#2B2118] bg-[#2B2118] text-[#FAF4EA]'
                      : 'border-[#E8DCC3] bg-white text-[#756353] hover:border-[#2B2118]'
                  }`}
                >
                  Man
                </button>
                <button
                  type="button"
                  onClick={() => setGender('woman')}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    gender === 'woman'
                      ? 'border-[#2B2118] bg-[#2B2118] text-[#FAF4EA]'
                      : 'border-[#E8DCC3] bg-white text-[#756353] hover:border-[#2B2118]'
                  }`}
                >
                  Woman
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                Age
              </label>
              <input
                type="number"
                min={18}
                max={45}
                required
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCC3] text-sm text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
              />
              <p className="text-[11px] text-[#756353] mt-1">
                Must be an adult university or graduate student (18+).
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-[#E8DCC3] text-sm text-[#756353] hover:text-[#2B2118] flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
              </button>
            </div>
          </form>
        )}

        {/* STAGE 3: Location and Photograph */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-serif font-medium text-[#2B2118]">
                Your campus & photo
              </h2>
              <p className="text-xs text-[#756353] mt-1">
                The final details to join your university community.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCC3] text-sm text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Saudi Arabia">Saudi Arabia (GCC)</option>
                <option value="UAE">United Arab Emirates (GCC)</option>
                <option value="Qatar">Qatar (GCC)</option>
                <option value="Kuwait">Kuwait (GCC)</option>
                <option value="Singapore">Singapore (SE Asia)</option>
                <option value="Malaysia">Malaysia (SE Asia)</option>
                <option value="Indonesia">Indonesia (SE Asia)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New York, Riyadh"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DCC3] text-xs text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. Columbia University"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8DCC3] text-xs text-[#2B2118] bg-[#FAF4EA]/40 focus:bg-white focus:outline-none focus:border-[#C99A2E]"
                />
              </div>
            </div>

            {/* Photo Upload Simulation */}
            <div>
              <label className="block text-xs font-semibold text-[#2B2118] mb-1">
                One Photograph (Portrait)
              </label>

              {photoPreview ? (
                <div className="relative rounded-2xl border border-[#E8DCC3] overflow-hidden bg-[#FAF4EA] p-2 flex items-center gap-3">
                  <img
                    src={photoPreview}
                    alt="Upload Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-[#E8DCC3]"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-[#2B2118]">Photo ready</p>
                    <p className="text-[11px] text-[#756353]">Pending demonstration review</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="p-1.5 rounded-lg text-[#756353] hover:text-[#A34D28]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#E8DCC3] hover:border-[#C99A2E] rounded-2xl p-4 text-center bg-[#FAF4EA]/30 transition-colors">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer block">
                    <Camera className="w-8 h-8 text-[#A34D28] mx-auto mb-1" />
                    <p className="text-xs font-medium text-[#2B2118]">
                      Click to choose or drop a photo
                    </p>
                    <p className="text-[10px] text-[#756353] mt-0.5">
                      JPG, PNG, WebP up to 5MB (Simulation)
                    </p>
                  </label>

                  {isUploading && (
                    <div className="mt-2 w-full bg-[#E8DCC3] h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C99A2E] h-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Quick preset selector for fast review */}
                  <div className="mt-3 pt-2 border-t border-[#E8DCC3]/60 text-[10px] text-[#756353]">
                    <span>Or click a demo sample photo:</span>
                    <div className="flex items-center justify-center gap-2 mt-1.5">
                      {presetPhotos.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPhotoPreview(p)}
                          className="w-8 h-8 rounded-lg overflow-hidden border border-[#E8DCC3] hover:border-[#C99A2E]"
                        >
                          <img src={p} alt="Preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl border border-[#E8DCC3] text-sm text-[#756353] hover:text-[#2B2118] flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Complete Registration</span>
                <Check className="w-4 h-4 text-[#C99A2E]" />
              </button>
            </div>
          </form>
        )}

        {/* STAGE 4: Success View */}
        {step === 4 && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF4EA] border border-[#C99A2E] text-[#A34D28] flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-[#C99A2E]" />
            </div>

            <h2 className="text-3xl font-serif font-medium text-[#2B2118]">
              Welcome to Sakeena, {name.split(' ')[0]}!
            </h2>

            <p className="text-xs text-[#756353] leading-relaxed max-w-sm mx-auto">
              Your profile has been created with all six basic details. No credit card required. You can now discover Muslim students across universities.
            </p>

            <div className="p-3 bg-[#FAF4EA] rounded-xl border border-[#E8DCC3] text-xs text-[#2B2118] text-left space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                <span>Membership Status: Free Forever</span>
              </p>
              <p className="text-[11px] text-[#756353]">
                {gender === 'woman'
                  ? 'As a female student, you also receive Complimentary Silver features.'
                  : 'Free male membership: free to browse, search, and send likes.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/browse')}
                className="w-full py-3.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Discover Students</span>
                <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
