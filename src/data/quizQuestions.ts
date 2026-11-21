import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do you spend your ideal weekend away from lectures?',
    subtitle: 'Helps us understand your natural rhythm and social battery.',
    options: [
      {
        label: 'Quiet campus cafe & deep reading',
        description: 'Thoughtful, restorative spaces with a book or warm notebook.',
        trait: 'Reflective Scholar',
        scoreWeight: 10,
      },
      {
        label: 'Volunteering with the campus MSA or community',
        description: 'Giving back, organizing youth workshops, or community service.',
        trait: 'Community Builder',
        scoreWeight: 15,
      },
      {
        label: 'Active outdoors, hiking, or campus sports',
        description: 'Recharging through movement, nature walks, and fresh air.',
        trait: 'Grounded Explorer',
        scoreWeight: 12,
      },
      {
        label: 'Family dinners and warm gatherings with close friends',
        description: 'Cherishing slow meals, meaningful conversations, and trusted ties.',
        trait: 'Family-Centered Heart',
        scoreWeight: 14,
      },
    ],
  },
  {
    id: 2,
    question: 'What communication style feels most comfortable to you?',
    subtitle: 'Connecting naturally starts with how you share thoughts and pace conversations.',
    options: [
      {
        label: 'Thoughtful, measured exchanges with space to reflect',
        description: 'Quality over speed; intentional messages with depth.',
        trait: 'Intentional Communicator',
        scoreWeight: 12,
      },
      {
        label: 'Spontaneous, lighthearted check-ins throughout the day',
        description: 'Sharing daily funny campus moments, memes, and easy smiles.',
        trait: 'Spontaneous & Warm',
        scoreWeight: 10,
      },
      {
        label: 'In-depth audio notes or scheduled evening discussions',
        description: 'Hearing tone of voice, nuance, and genuine presence.',
        trait: 'Expressive Listener',
        scoreWeight: 14,
      },
      {
        label: 'Direct, clear, and goal-oriented conversation',
        description: 'Honest questions, transparent intentions, and zero ambiguity.',
        trait: 'Direct & Authentic',
        scoreWeight: 16,
      },
    ],
  },
  {
    id: 3,
    question: 'What role does faith play in your day-to-day university life?',
    subtitle: 'Understanding personal values and spiritual intentionality.',
    options: [
      {
        label: 'My daily compass and constant source of tranquility',
        description: 'Daily prayers anchored on schedule, active spiritual seeking.',
        trait: 'Spiritually Rooted',
        scoreWeight: 18,
      },
      {
        label: 'A personal journey of continuous growth and learning',
        description: 'Exploring deeper understanding alongside university studies.',
        trait: 'Curious Seeker',
        scoreWeight: 14,
      },
      {
        label: 'A cultural, family, and ethical foundation that guides my integrity',
        description: 'Strong moral principles, honest conduct, and community solidarity.',
        trait: 'Principled Pragmatist',
        scoreWeight: 12,
      },
      {
        label: 'Seeking someone to support each other in growing closer to God',
        description: 'Mutual encouragement, patience, and reciprocal spiritual support.',
        trait: 'Devoted Partner',
        scoreWeight: 16,
      },
    ],
  },
  {
    id: 4,
    question: 'What are your aspirations after graduation?',
    subtitle: 'Aligning long-term visions, geographic flexibility, and career balance.',
    options: [
      {
        label: 'Pursuing postgraduate research or specialized medical/law study',
        description: 'Deep dedication to intellectual mastery and societal impact.',
        trait: 'Academic Drive',
        scoreWeight: 14,
      },
      {
        label: 'Building a sustainable career while prioritizing family harmony',
        description: 'Maintaining a balanced lifestyle with warm home life as the anchor.',
        trait: 'Harmonious Balance',
        scoreWeight: 16,
      },
      {
        label: 'Entrepreneurship or global professional opportunities across regions',
        description: 'Embracing mobility across GCC, North America, or Southeast Asia.',
        trait: 'Global Mindset',
        scoreWeight: 13,
      },
      {
        label: 'Community leadership, social development, or public service',
        description: 'Leaving a tangible, ethical footprint in the world.',
        trait: 'Purpose Driven',
        scoreWeight: 15,
      },
    ],
  },
  {
    id: 5,
    question: 'What quality matters most to you in a prospective partner?',
    subtitle: 'The fundamental pillar that inspires trust and comfort.',
    options: [
      {
        label: 'Emotional maturity and gentle, respectful speech',
        description: 'Patience in disagreement, emotional self-regulation, and kindness.',
        trait: 'Gentle Character',
        scoreWeight: 18,
      },
      {
        label: 'Intellectual curiosity and shared passion for learning',
        description: 'Enjoying rich discussions, debating ideas, and mutual mental stimulation.',
        trait: 'Mental Affinity',
        scoreWeight: 14,
      },
      {
        label: 'Genuineness, humility, and absence of pretension',
        description: 'Authentic presence, modesty, and true sincerity.',
        trait: 'Pure Sincerity',
        scoreWeight: 16,
      },
      {
        label: 'A supportive, encouraging spirit that celebrates your dreams',
        description: 'Being each other’s primary champion through exams and life hurdles.',
        trait: 'Unconditional Ally',
        scoreWeight: 15,
      },
    ],
  },
];
