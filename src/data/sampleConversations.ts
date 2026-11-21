import type { Conversation } from '../types';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'sample-1', // Maryam Al-Mansoor (Columbia)
    lastMessage: 'Assalamu alaikum! I noticed you are involved with campus bioethics too. How are you liking your semester so far?',
    lastTimestamp: '2:45 PM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'sample-1',
        recipientId: 'current-user',
        text: 'Assalamu alaikum! I noticed you are involved with campus bioethics too. How are you liking your semester so far?',
        timestamp: '2:45 PM',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participantId: 'sample-2', // Zayd Al-Otaibi (King Saud Univ)
    lastMessage: 'That traditional courtyard concept you mentioned sounds really inspiring. What semester are you in?',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        senderId: 'sample-2',
        recipientId: 'current-user',
        text: 'Salam! Hope exams are treating you well. Are you planning on attending the regional student symposium next month?',
        timestamp: 'Yesterday, 4:15 PM',
        isRead: true,
      },
      {
        id: 'msg-202',
        senderId: 'current-user',
        recipientId: 'sample-2',
        text: 'Wa alaikum assalam Zayd! Yes, definitely hoping to attend if finals allow. We are presenting a small campus pavilion study.',
        timestamp: 'Yesterday, 5:20 PM',
        isRead: true,
      },
      {
        id: 'msg-203',
        senderId: 'sample-2',
        recipientId: 'current-user',
        text: 'That traditional courtyard concept you mentioned sounds really inspiring. What semester are you in?',
        timestamp: 'Yesterday, 6:02 PM',
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    participantId: 'sample-3', // Layla Farooq (U of T)
    lastMessage: 'That hackathon project in Toronto was intense! Glad to connect here.',
    lastTimestamp: '2 days ago',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-301',
        senderId: 'sample-3',
        recipientId: 'current-user',
        text: 'Salam! I saw on your profile you also love hiking around Ontario.',
        timestamp: '2 days ago, 11:30 AM',
        isRead: true,
      },
      {
        id: 'msg-302',
        senderId: 'current-user',
        recipientId: 'sample-3',
        text: 'Salam Layla! Yes, Algonquin during autumn is unmatched. Have you tried the track there?',
        timestamp: '2 days ago, 1:15 PM',
        isRead: true,
      },
      {
        id: 'msg-303',
        senderId: 'sample-3',
        recipientId: 'current-user',
        text: 'That hackathon project in Toronto was intense! Glad to connect here.',
        timestamp: '2 days ago, 1:40 PM',
        isRead: true,
      },
    ],
  },
];
