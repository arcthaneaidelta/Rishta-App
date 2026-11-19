import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { DemoBanner } from './DemoBanner';
import { NotificationDropdown } from './NotificationDropdown';
import { PlayerAvatar } from './PlayerAvatar';
import { useAppStore } from '../store';
import {
  LayoutDashboard,
  Gamepad2,
  Swords,
  Trophy,
  TableProperties,
  History,
  Medal,
  GraduationCap,
  ShieldAlert,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Layers,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { currentUser, notifications, logout, isAdmin, toggleAdmin, challenges } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const pendingIncomingChallenges = challenges.filter(
    (c) => c.receiverId === currentUser.id && c.status === 'pending'
  ).length;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/play', label: 'Friendly Match', icon: Gamepad2 },
    {
      to: '/challenges',
      label: 'Challenges',
      icon: Swords,
      badge: pendingIncomingChallenges > 0 ? pendingIncomingChallenges : undefined
    },
    { to: '/tournaments', label: 'Tournaments', icon: Trophy },
    { to: '/league', label: 'League', icon: TableProperties },
    { to: '/history', label: 'Match History', icon: History },
    { to: '/rankings', label: 'Rankings', icon: Medal },
    { to: '/tutorial', label: 'Tutorial', icon: GraduationCap }
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Overview', icon: ShieldAlert },
    { to: '/admin/users', label: 'User Control', icon: User },
    { to: '/admin/matches', label: 'Matches', icon: Swords },
    { to: '/admin/tournaments', label: 'Tournament Ops', icon: Trophy },
    { to: '/admin/leagues', label: 'League Ops', icon: TableProperties },
    { to: '/admin/payments', label: 'Payments', icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-warm-bg text-charcoal flex flex-col">
      {/* Top Demo Notification / Switcher Banner */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-stone-200/80 shrink-0 select-none">
          {/* Logo */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <BrandLogo size="md" />
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted px-3 mb-2">
              Federation
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-forest-600 text-surface shadow-subtle'
                        : 'text-charcoal hover:bg-forest-50/70 hover:text-forest-800'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-forest-950">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Admin Section if Admin Mode is enabled */}
            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-stone-100 space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-forest-800 px-3 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Admin Console</span>
                </div>
                {adminLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-stone-800 text-gold shadow-subtle'
                            : 'text-stone-700 hover:bg-stone-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-gold" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Profile card in sidebar */}
          <div className="p-3 border-t border-stone-100 bg-stone-50/50">
            <div className="flex items-center justify-between p-2 rounded-xl bg-surface border border-stone-200/70">
              <Link to="/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-90">
                <PlayerAvatar name={currentUser.displayName} avatarUrl={currentUser.avatar} size="sm" showBadge />
                <div className="min-w-0">
                  <div className="font-display font-bold text-xs text-charcoal truncate">
                    {currentUser.displayName}
                  </div>
                  <div className="text-[11px] text-forest-700 font-medium">
                    {currentUser.rating} Elo • #{currentUser.rank}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                title="Sign out of Federation"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-warm-bg/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left Title / Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-stone-200/60 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <span className="text-xs uppercase font-semibold tracking-wider text-charcoal-muted">
                  FUTBOLIÑO Federation
                </span>
              </div>
            </div>

            {/* Right Header: Search, Notifications, Profile */}
            <div className="flex items-center gap-3">
              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="p-2 rounded-xl bg-surface border border-stone-200 hover:border-forest-300 text-charcoal transition-colors relative"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-forest-600 text-surface text-[10px] font-bold flex items-center justify-center animate-subtle-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
              </div>

              {/* Player Quick Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-surface border border-stone-200 hover:border-forest-300 transition-colors"
                >
                  <PlayerAvatar name={currentUser.displayName} avatarUrl={currentUser.avatar} size="xs" />
                  <span className="text-xs font-semibold text-charcoal hidden sm:inline max-w-[110px] truncate">
                    {currentUser.displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface rounded-xl shadow-modal border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-stone-100">
                      <div className="text-xs font-bold text-charcoal">{currentUser.displayName}</div>
                      <div className="text-[11px] text-charcoal-muted truncate">{currentUser.email}</div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-charcoal hover:bg-stone-50"
                    >
                      <User className="w-3.5 h-3.5 text-forest-700" />
                      <span>Player Profile</span>
                    </Link>

                    <button
                      onClick={() => {
                        toggleAdmin();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-charcoal hover:bg-stone-50"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-forest-700" />
                      <span>{isAdmin ? 'Exit Admin View' : 'Enter Admin View'}</span>
                    </button>

                    <Link
                      to="/tutorial"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-charcoal hover:bg-stone-50"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-forest-700" />
                      <span>Rules & Tutorial</span>
                    </Link>

                    <div className="border-t border-stone-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Body Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-72 max-w-[85%] bg-surface flex flex-col h-full shadow-modal animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <BrandLogo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted px-3 mb-2">
                Federation
              </div>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-forest-600 text-surface' : 'text-charcoal hover:bg-stone-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-forest-950">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}

              {isAdmin && (
                <div className="pt-4 mt-4 border-t border-stone-100 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-forest-800 px-3 mb-2">
                    Admin Operations
                  </div>
                  {adminLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                            isActive ? 'bg-stone-800 text-gold' : 'text-charcoal hover:bg-stone-100'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0 text-gold" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-stone-100">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200/80 mb-2"
              >
                <PlayerAvatar name={currentUser.displayName} avatarUrl={currentUser.avatar} size="sm" />
                <div className="min-w-0">
                  <div className="font-display font-bold text-xs text-charcoal truncate">
                    {currentUser.displayName}
                  </div>
                  <div className="text-[11px] text-forest-700 font-medium">
                    {currentUser.rating} Elo
                  </div>
                </div>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
