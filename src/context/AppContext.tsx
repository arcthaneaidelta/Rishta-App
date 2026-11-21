import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Conversation, ReportItem, ToastMessage, QuizResult } from '../types';
import { INITIAL_SAMPLE_PROFILES } from '../data/sampleProfiles';
import { INITIAL_CONVERSATIONS } from '../data/sampleConversations';

interface AppContextType {
  currentUser: UserProfile | null;
  profiles: UserProfile[];
  blockedUserIds: string[];
  favoriteUserIds: string[];
  sentInterestIds: string[];
  conversations: Conversation[];
  reports: ReportItem[];
  quizResult: QuizResult | null;
  toasts: ToastMessage[];
  unreadTotal: number;
  
  // Actions
  loginAsDemo: (persona: 'tariq_male_free' | 'maryam_female_silver' | 'zayd_male_gold' | 'guest') => void;
  registerUser: (profileData: Partial<UserProfile>) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  deleteAccount: () => void;
  
  // Interactions
  toggleFavorite: (profileId: string) => void;
  toggleInterest: (profileId: string) => void;
  blockUser: (profileId: string) => void;
  unblockUser: (profileId: string) => void;
  submitReport: (targetUserId: string, targetUserName: string, reason: string, notes: string) => void;
  
  // Messaging
  sendMessage: (recipientId: string, text: string) => { success: boolean; errorReason?: 'male_free_restriction' | 'female_silver_cap' };
  markConversationAsRead: (conversationId: string) => void;
  
  // Quiz
  saveQuizResult: (result: QuizResult) => void;
  retakeQuiz: () => void;
  
  // Admin
  approvePhoto: (profileId: string) => void;
  rejectPhoto: (profileId: string) => void;
  deleteSampleMember: (profileId: string) => void;
  resolveReport: (reportId: string, action: 'reviewed' | 'action_taken') => void;
  
  // Toasts
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Demo Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_PERSONAS: Record<string, UserProfile> = {
  tariq_male_free: {
    id: 'current-user-tariq',
    name: 'Tariq Al-Mansoor',
    age: 22,
    gender: 'man',
    region: 'USA',
    country: 'United States',
    city: 'Chicago',
    university: 'Northwestern University',
    major: 'Computer Engineering',
    graduationYear: 2026,
    denomination: 'Sunni',
    interests: ['Campus MSA', 'Robotics', 'Coffee', 'Basketball'],
    bio: 'Junior engineering student. Exploring meaningful connections grounded in shared values, mutual respect, and lifelong ambitions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'],
    compatibility: 88,
    isSample: false,
    emailVerified: true,
    photoChecked: true,
    tier: 'Free',
    joinedDate: 'November 2025',
  },
  maryam_female_silver: {
    id: 'current-user-maryam',
    name: 'Maryam Zahra',
    age: 21,
    gender: 'woman',
    region: 'Canada',
    country: 'Canada',
    city: 'Toronto',
    university: 'University of Toronto',
    major: 'Health Sciences',
    graduationYear: 2026,
    denomination: 'Sunni',
    interests: ['Student Health', 'Calligraphy', 'Nature Walks', 'Book Reading'],
    bio: 'Complimentary Silver demonstration member. Enjoying quiet campus corners and genuine, family-oriented connections.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80'],
    compatibility: 92,
    isSample: false,
    emailVerified: true,
    photoChecked: true,
    tier: 'Complimentary Silver',
    joinedDate: 'December 2025',
  },
  zayd_male_gold: {
    id: 'current-user-zayd',
    name: 'Zayd Al-Husseini',
    age: 24,
    gender: 'man',
    region: 'GCC',
    country: 'UAE',
    city: 'Dubai',
    university: 'American University of Sharjah',
    major: 'Finance & Investments',
    graduationYear: 2025,
    denomination: 'Sunni',
    interests: ['Architecture', 'Equestrian', 'Fintech', 'Specialty Coffee'],
    bio: 'Gold Tier member demonstration. Exploring connections with respectful, ambitious individuals worldwide.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'],
    compatibility: 95,
    isSample: false,
    emailVerified: true,
    photoChecked: true,
    tier: 'Gold',
    joinedDate: 'January 2026',
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profiles
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('sakeena_profiles');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_PROFILES;
  });

  // Current User (default Tariq male free to demonstrate membership rules)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sakeena_current_user');
    return saved ? JSON.parse(saved) : DEMO_PERSONAS.tariq_male_free;
  });

  // Blocked, Favorites, Interests
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sakeena_blocked_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteUserIds, setFavoriteUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sakeena_favorites');
    return saved ? JSON.parse(saved) : ['sample-1'];
  });

  const [sentInterestIds, setSentInterestIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sakeena_sent_interests');
    return saved ? JSON.parse(saved) : ['sample-3'];
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('sakeena_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  // Reports
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('sakeena_reports');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rep-1',
        targetUserId: 'sample-5',
        targetUserName: 'Bilal Siddiqui',
        reason: 'Demonstration report',
        notes: 'Checking report resolution in admin panel.',
        timestamp: '1 hour ago',
        status: 'pending',
      },
    ];
  });

  // Quiz Result
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    const saved = localStorage.getItem('sakeena_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sakeena_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sakeena_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sakeena_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sakeena_blocked_users', JSON.stringify(blockedUserIds));
  }, [blockedUserIds]);

  useEffect(() => {
    localStorage.setItem('sakeena_favorites', JSON.stringify(favoriteUserIds));
  }, [favoriteUserIds]);

  useEffect(() => {
    localStorage.setItem('sakeena_sent_interests', JSON.stringify(sentInterestIds));
  }, [sentInterestIds]);

  useEffect(() => {
    localStorage.setItem('sakeena_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('sakeena_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    if (quizResult) {
      localStorage.setItem('sakeena_quiz_result', JSON.stringify(quizResult));
    } else {
      localStorage.removeItem('sakeena_quiz_result');
    }
  }, [quizResult]);

  // Toast helper
  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch demo persona
  const loginAsDemo = (persona: 'tariq_male_free' | 'maryam_female_silver' | 'zayd_male_gold' | 'guest') => {
    if (persona === 'guest') {
      setCurrentUser(null);
      addToast('Guest Mode', 'Viewing Sakeena as a non-registered visitor.');
    } else {
      const selected = DEMO_PERSONAS[persona];
      setCurrentUser(selected);
      addToast('Demo Persona Switched', `Logged in as ${selected.name} (${selected.gender === 'man' ? 'Male' : 'Female'} • ${selected.tier}).`, 'success');
    }
  };

  // Register simulated user
  const registerUser = (profileData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: profileData.name || 'New Member',
      age: profileData.age || 21,
      gender: profileData.gender || 'man',
      region: profileData.region || 'USA',
      country: profileData.country || 'United States',
      city: profileData.city || 'Chicago',
      university: profileData.university || 'University Student',
      major: profileData.major || 'Undergraduate',
      denomination: profileData.denomination || 'Sunni',
      interests: profileData.interests || ['Campus MSA', 'Coffee', 'Academics'],
      bio: profileData.bio || 'Recently joined student exploring meaningful connections on Sakeena.',
      avatar: profileData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      photos: profileData.photos || [profileData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'],
      compatibility: 90,
      isSample: false,
      emailVerified: true,
      photoChecked: false,
      tier: profileData.gender === 'woman' ? 'Complimentary Silver' : 'Free',
      joinedDate: 'Today',
      isPendingPhotoApproval: true,
    };
    setCurrentUser(newUser);
    addToast('Welcome to Sakeena!', 'Your registration was completed successfully. Enjoy free browsing.', 'success');
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    addToast('Profile Updated', 'Your profile details have been saved locally.', 'success');
  };

  const deleteAccount = () => {
    setCurrentUser(null);
    localStorage.removeItem('sakeena_current_user');
    addToast('Account Deleted', 'Your demonstration account has been cleared.', 'info');
  };

  // Interactions
  const toggleFavorite = (profileId: string) => {
    setFavoriteUserIds((prev) => {
      const isFav = prev.includes(profileId);
      if (isFav) {
        addToast('Removed from Saved', 'Profile removed from your saved list.');
        return prev.filter((id) => id !== profileId);
      } else {
        addToast('Saved Profile', 'Profile added to your saved list.', 'success');
        return [...prev, profileId];
      }
    });
  };

  const toggleInterest = (profileId: string) => {
    setSentInterestIds((prev) => {
      const alreadySent = prev.includes(profileId);
      if (alreadySent) {
        addToast('Interest Withdrawn', 'You have withdrawn your interest.', 'info');
        return prev.filter((id) => id !== profileId);
      } else {
        addToast('Interest Sent!', 'Your interest has been delivered to this member free of charge.', 'success');
        return [...prev, profileId];
      }
    });
  };

  const blockUser = (profileId: string) => {
    setBlockedUserIds((prev) => [...prev, profileId]);
    addToast('Profile Blocked', 'This profile is now hidden from your demonstration browsing session.', 'warning');
  };

  const unblockUser = (profileId: string) => {
    setBlockedUserIds((prev) => prev.filter((id) => id !== profileId));
    addToast('Profile Unblocked', 'Profile restored to browsing.', 'info');
  };

  const submitReport = (targetUserId: string, targetUserName: string, reason: string, notes: string) => {
    const newReport: ReportItem = {
      id: 'rep-' + Date.now(),
      targetUserId,
      targetUserName,
      reason,
      notes,
      timestamp: 'Just now',
      status: 'pending',
    };
    setReports((prev) => [newReport, ...prev]);
    addToast('Report Submitted', 'Thank you for keeping our community safe. Our moderation team has received your report.', 'info');
  };

  // Messaging with explicit business rule enforcement
  const sendMessage = (recipientId: string, text: string): { success: boolean; errorReason?: 'male_free_restriction' | 'female_silver_cap' } => {
    if (!currentUser) {
      addToast('Log In Required', 'Please log in to send messages.', 'warning');
      return { success: false };
    }

    // Check if conversation already exists
    const existingConv = conversations.find((c) => c.participantId === recipientId);

    // Business rule 1: Free Male Member cannot start new conversation unless contacted first
    if (currentUser.gender === 'man' && currentUser.tier === 'Free') {
      if (!existingConv || existingConv.messages.length === 0) {
        return { success: false, errorReason: 'male_free_restriction' };
      }
    }

    // Business rule 2: Female Complimentary Silver capped at 5 demonstration messages
    if (currentUser.gender === 'woman' && currentUser.tier === 'Complimentary Silver') {
      const userSentCount = conversations.reduce((total, conv) => {
        return total + conv.messages.filter((m) => m.senderId === currentUser.id || m.senderId === 'current-user').length;
      }, 0);
      if (userSentCount >= 5) {
        return { success: false, errorReason: 'female_silver_cap' };
      }
    }

    const newMessage = {
      id: 'msg-' + Date.now(),
      senderId: currentUser.id,
      recipientId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    if (existingConv) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === existingConv.id
            ? {
                ...c,
                lastMessage: text,
                lastTimestamp: 'Just now',
                messages: [...c.messages, newMessage],
              }
            : c
        )
      );
    } else {
      const newConv: Conversation = {
        id: 'conv-' + Date.now(),
        participantId: recipientId,
        lastMessage: text,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [newMessage],
      };
      setConversations((prev) => [newConv, ...prev]);
    }

    addToast('Message Sent', 'Your message has been sent.', 'success');
    return { success: true };
  };

  const markConversationAsRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Quiz
  const saveQuizResult = (result: QuizResult) => {
    setQuizResult(result);
    // Update sample profiles compatibility scores with bonus
    setProfiles((prev) =>
      prev.map((p) => {
        const bonus = Math.min(99, Math.max(78, p.compatibility + (result.compatibilityBonus || 2)));
        return { ...p, compatibility: bonus };
      })
    );
    addToast('Quiz Completed', 'Your Compatibility Snapshot is ready! Match scores have been recalculated.', 'success');
  };

  const retakeQuiz = () => {
    setQuizResult(null);
    localStorage.removeItem('sakeena_quiz_result');
  };

  // Admin Actions
  const approvePhoto = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, photoChecked: true, isPendingPhotoApproval: false } : p))
    );
    if (currentUser?.id === profileId) {
      setCurrentUser((prev) => (prev ? { ...prev, photoChecked: true, isPendingPhotoApproval: false } : null));
    }
    addToast('Photo Approved', 'The sample photo has been approved for public browsing.', 'success');
  };

  const rejectPhoto = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, photoChecked: false, isPendingPhotoApproval: false } : p))
    );
    addToast('Photo Rejected', 'The photo was rejected and returned to member.', 'warning');
  };

  const deleteSampleMember = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    addToast('Member Removed', 'Sample profile removed from demonstration dataset.', 'info');
  };

  const resolveReport = (reportId: string, action: 'reviewed' | 'action_taken') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );
    addToast('Report Resolved', `Report marked as ${action === 'reviewed' ? 'Reviewed' : 'Action Taken'}.`, 'success');
  };

  // Reset Demo
  const resetDemoData = () => {
    localStorage.removeItem('sakeena_profiles');
    localStorage.removeItem('sakeena_current_user');
    localStorage.removeItem('sakeena_blocked_users');
    localStorage.removeItem('sakeena_favorites');
    localStorage.removeItem('sakeena_sent_interests');
    localStorage.removeItem('sakeena_conversations');
    localStorage.removeItem('sakeena_reports');
    localStorage.removeItem('sakeena_quiz_result');

    setProfiles(INITIAL_SAMPLE_PROFILES);
    setCurrentUser(DEMO_PERSONAS.tariq_male_free);
    setBlockedUserIds([]);
    setFavoriteUserIds(['sample-1']);
    setSentInterestIds(['sample-3']);
    setConversations(INITIAL_CONVERSATIONS);
    setReports([
      {
        id: 'rep-1',
        targetUserId: 'sample-5',
        targetUserName: 'Bilal Siddiqui',
        reason: 'Demonstration report',
        notes: 'Checking report resolution in admin panel.',
        timestamp: '1 hour ago',
        status: 'pending',
      },
    ]);
    setQuizResult(null);

    addToast('Demo State Reset', 'Initial demonstration data and mock members have been restored.', 'info');
  };

  const unreadTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        profiles,
        blockedUserIds,
        favoriteUserIds,
        sentInterestIds,
        conversations,
        reports,
        quizResult,
        toasts,
        unreadTotal,
        loginAsDemo,
        registerUser,
        updateCurrentUser,
        deleteAccount,
        toggleFavorite,
        toggleInterest,
        blockUser,
        unblockUser,
        submitReport,
        sendMessage,
        markConversationAsRead,
        saveQuizResult,
        retakeQuiz,
        approvePhoto,
        rejectPhoto,
        deleteSampleMember,
        resolveReport,
        addToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
