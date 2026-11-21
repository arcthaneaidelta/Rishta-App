import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DemoBar } from './components/common/DemoBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { JoinPage } from './pages/JoinPage';
import { BrowsePage } from './pages/BrowsePage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';
import { MessagesPage } from './pages/MessagesPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { PersonalityQuizPage } from './pages/PersonalityQuizPage';
import { MembershipPage } from './pages/MembershipPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDemoPage } from './pages/AdminDemoPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  // Check if initial intro has been seen this session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('sakeena_intro_viewed');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('sakeena_intro_viewed', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4EA] text-[#2B2118]">
      {showIntro && <LoadingScreen onComplete={handleIntroComplete} />}

      <DemoBar onReplayIntro={handleReplayIntro} />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/personality-quiz" element={<PersonalityQuizPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/demo-admin" element={<AdminDemoPage />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
