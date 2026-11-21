export type Region = 'USA' | 'GCC' | 'Southeast Asia' | 'Canada';

export type Denomination = 'Sunni' | 'Shia' | 'Just Muslim' | 'Independent';

export type MembershipTier = 'Free' | 'Silver' | 'Gold' | 'Elite' | 'Complimentary Silver';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'man' | 'woman';
  region: Region;
  country: string;
  city: string;
  university: string;
  major: string;
  graduationYear?: number;
  denomination: Denomination;
  interests: string[];
  bio: string;
  avatar: string;
  photos: string[];
  compatibility: number;
  isSample: boolean;
  emailVerified: boolean;
  photoChecked: boolean;
  tier: MembershipTier;
  joinedDate: string;
  isPendingPhotoApproval?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: Message[];
}

export interface ReportItem {
  id: string;
  targetUserId: string;
  targetUserName: string;
  reason: string;
  notes: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'action_taken';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    trait: string;
    scoreWeight: number;
  }[];
}

export interface QuizResult {
  completed: boolean;
  archetype: string;
  archetypeDescription: string;
  traits: string[];
  compatibilityBonus: number;
}
