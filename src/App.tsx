import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { LoadingScreen } from './components/LoadingScreen';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TutorialPage } from './pages/TutorialPage';

// Authenticated Pages
import { DashboardPage } from './pages/DashboardPage';
import { FriendlyMatchPage } from './pages/FriendlyMatchPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { MatchLaunchPage } from './pages/MatchLaunchPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { TournamentDetailPage } from './pages/TournamentDetailPage';
import { LeaguePage } from './pages/LeaguePage';
import { MatchHistoryPage } from './pages/MatchHistoryPage';
import { RankingsPage } from './pages/RankingsPage';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminMatchesPage } from './pages/admin/AdminMatchesPage';
import { AdminTournamentsPage } from './pages/admin/AdminTournamentsPage';
import { AdminLeaguesPage } from './pages/admin/AdminLeaguesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 404 Not Found Page
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center p-6 text-center text-charcoal">
      <div className="max-w-md space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
          Error 404 • Dossier Unfound
        </span>
        <h1 className="font-display font-extrabold text-3xl text-charcoal">
          Tactical Route Not Registered
        </h1>
        <p className="text-xs text-charcoal-muted leading-relaxed">
          The requested Federation terminal or tournament sector could not be located in our ledger.
        </p>
        <div className="pt-2">
          <a
            href="/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-surface text-xs font-semibold shadow-subtle transition-all"
          >
            Return to Federation Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  // Show premium loading experience on initial boot
  if (initialLoading) {
    return <LoadingScreen onComplete={() => setInitialLoading(false)} duration={700} />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />

        {/* Authenticated Platform Routes (Enclosed in AppShell) */}
        <Route
          path="/dashboard"
          element={
            <AppShell>
              <DashboardPage />
            </AppShell>
          }
        />
        <Route
          path="/play"
          element={
            <AppShell>
              <FriendlyMatchPage />
            </AppShell>
          }
        />
        <Route
          path="/challenges"
          element={
            <AppShell>
              <ChallengesPage />
            </AppShell>
          }
        />
        <Route
          path="/challenges/incoming"
          element={
            <AppShell>
              <ChallengesPage />
            </AppShell>
          }
        />
        <Route
          path="/matches/:id"
          element={
            <AppShell>
              <MatchLaunchPage />
            </AppShell>
          }
        />
        <Route
          path="/tournaments"
          element={
            <AppShell>
              <TournamentsPage />
            </AppShell>
          }
        />
        <Route
          path="/tournaments/:id"
          element={
            <AppShell>
              <TournamentDetailPage />
            </AppShell>
          }
        />
        <Route
          path="/league"
          element={
            <AppShell>
              <LeaguePage />
            </AppShell>
          }
        />
        <Route
          path="/history"
          element={
            <AppShell>
              <MatchHistoryPage />
            </AppShell>
          }
        />
        <Route
          path="/rankings"
          element={
            <AppShell>
              <RankingsPage />
            </AppShell>
          }
        />
        <Route
          path="/players/:id"
          element={
            <AppShell>
              <PlayerProfilePage />
            </AppShell>
          }
        />
        <Route
          path="/profile"
          element={
            <AppShell>
              <PlayerProfilePage />
            </AppShell>
          }
        />
        <Route
          path="/notifications"
          element={
            <AppShell>
              <NotificationsPage />
            </AppShell>
          }
        />

        {/* Admin Console Routes (Enclosed in AppShell) */}
        <Route
          path="/admin"
          element={
            <AppShell>
              <AdminDashboardPage />
            </AppShell>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AppShell>
              <AdminUsersPage />
            </AppShell>
          }
        />
        <Route
          path="/admin/matches"
          element={
            <AppShell>
              <AdminMatchesPage />
            </AppShell>
          }
        />
        <Route
          path="/admin/tournaments"
          element={
            <AppShell>
              <AdminTournamentsPage />
            </AppShell>
          }
        />
        <Route
          path="/admin/leagues"
          element={
            <AppShell>
              <AdminLeaguesPage />
            </AppShell>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AppShell>
              <AdminPaymentsPage />
            </AppShell>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
