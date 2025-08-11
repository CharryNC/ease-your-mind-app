import api from './authAPI';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'exercise';
  category: string;
  duration?: number; // in minutes for videos/podcasts
  readTime?: number; // in minutes for articles
  author: string;
  publishedDate: string;
  thumbnail: string;
  content?: string;
  url?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';
  tags: string[];
  date: string;
  isPrivate: boolean;
}

// Mock resources data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Beginner\'s Guide',
    description: 'Learn the basics of anxiety disorders and coping strategies',
    type: 'article',
    category: 'Anxiety',
    readTime: 8,
    author: 'Dr. Sarah Johnson',
    publishedDate: '2024-01-10',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    content: 'Anxiety is a natural response to stress, but when it becomes overwhelming...',
    tags: ['anxiety', 'coping', 'mental-health'],
    difficulty: 'beginner',
    rating: 4.8
  },
  {
    id: '2',
    title: '10-Minute Mindfulness Meditation',
    description: 'A guided meditation session to reduce stress and improve focus',
    type: 'video',
    category: 'Mindfulness',
    duration: 10,
    author: 'Michael Chen',
    publishedDate: '2024-01-08',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    url: 'https://example.com/meditation-video',
    tags: ['meditation', 'mindfulness', 'stress-relief'],
    difficulty: 'beginner',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Breathing Exercises for Panic Attacks',
    description: 'Simple breathing techniques to manage panic attacks',
    type: 'exercise',
    category: 'Panic Attacks',
    duration: 5,
    author: 'Dr. Emily Rodriguez',
    publishedDate: '2024-01-05',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    content: 'When you feel a panic attack coming on, try these breathing exercises...',
    tags: ['breathing', 'panic-attacks', 'techniques'],
    difficulty: 'beginner',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Building Self-Esteem in Teenagers',
    description: 'Practical strategies for teens to build confidence and self-worth',
    type: 'article',
    category: 'Self-Esteem',
    readTime: 12,
    author: 'Dr. James Wilson',
    publishedDate: '2024-01-03',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    content: 'Self-esteem is crucial for teenagers as they navigate social pressures...',
    tags: ['self-esteem', 'teenagers', 'confidence'],
    difficulty: 'intermediate',
    rating: 4.6
  }
];

const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    userId: '1',
    title: 'Today was challenging but I made it through',
    content: 'Had a difficult day at work, but I used the breathing techniques from my counsellor and it really helped...',
    mood: 'neutral',
    tags: ['work', 'stress', 'coping'],
    date: '2024-01-12',
    isPrivate: true
  },
  {
    id: '2',
    userId: '1',
    title: 'Feeling grateful today',
    content: 'Spent time with family and felt really supported. It\'s amazing how much difference human connection makes...',
    mood: 'happy',
    tags: ['gratitude', 'family', 'support'],
    date: '2024-01-10',
    isPrivate: false
  }
];

export const resourcesAPI = {
  async getResources(filters?: {
    category?: string;
    type?: string;
    difficulty?: string;
  }): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = mockResources;
    
    if (filters?.category) {
      filtered = filtered.filter(r => 
        r.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }
    
    if (filters?.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }
    
    if (filters?.difficulty) {
      filtered = filtered.filter(r => r.difficulty === filters.difficulty);
    }
    
    return filtered;
  },

  async getResourceById(id: string): Promise<Resource | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResources.find(r => r.id === id) || null;
  },

  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockJournalEntries.filter(j => j.userId === userId);
  },

  async createJournalEntry(entry: Omit<JournalEntry, 'id' | 'date'>): Promise<JournalEntry> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    mockJournalEntries.push(newEntry);
    return newEntry;
  },

  async updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<JournalEntry> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const entryIndex = mockJournalEntries.findIndex(j => j.id === id);
    if (entryIndex === -1) {
      throw new Error('Journal entry not found');
    }
    
    mockJournalEntries[entryIndex] = { ...mockJournalEntries[entryIndex], ...updates };
    return mockJournalEntries[entryIndex];
  },

  async deleteJournalEntry(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const entryIndex = mockJournalEntries.findIndex(j => j.id === id);
    if (entryIndex === -1) {
      throw new Error('Journal entry not found');
    }
    
    mockJournalEntries.splice(entryIndex, 1);
  }
};