import api from './authAPI';

export interface Counsellor {
  id: string;
  name: string;
  avatar: string;
  specializations: string[];
  ageGroups: string[];
  pricePerSession: number;
  rating: number;
  totalSessions: number;
  bio: string;
  availability: string[];
  verified: boolean;
}

export interface Session {
  id: string;
  counsellorId: string;
  counsellorName: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
  feedback?: string;
}

// Mock data
const mockCounsellors: Counsellor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
    specializations: ['Anxiety', 'Depression', 'Stress Management'],
    ageGroups: ['Adults', 'Young Adults'],
    pricePerSession: 80,
    rating: 4.9,
    totalSessions: 1250,
    bio: 'Licensed clinical psychologist with 10+ years of experience helping individuals overcome anxiety and depression.',
    availability: ['Monday 9:00-17:00', 'Tuesday 9:00-17:00', 'Wednesday 9:00-17:00'],
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
    specializations: ['Couples Therapy', 'Family Counseling', 'Communication'],
    ageGroups: ['Adults', 'Couples'],
    pricePerSession: 90,
    rating: 4.8,
    totalSessions: 890,
    bio: 'Specialized in relationship counseling and family therapy. Helping couples build stronger connections.',
    availability: ['Thursday 10:00-18:00', 'Friday 10:00-18:00', 'Saturday 9:00-15:00'],
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1594824804732-ca8db42265d0?w=300&h=300&fit=crop&crop=face',
    specializations: ['Teen Counseling', 'Academic Stress', 'Self-Esteem'],
    ageGroups: ['Teenagers', 'Young Adults'],
    pricePerSession: 70,
    rating: 4.7,
    totalSessions: 650,
    bio: 'Passionate about helping teenagers and young adults navigate life challenges and build confidence.',
    availability: ['Monday 14:00-20:00', 'Wednesday 14:00-20:00', 'Friday 14:00-20:00'],
    verified: true
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
    specializations: ['PTSD', 'Trauma Recovery', 'Military Veterans'],
    ageGroups: ['Adults'],
    pricePerSession: 100,
    rating: 4.9,
    totalSessions: 980,
    bio: 'Specialized in trauma therapy and PTSD treatment, with extensive experience working with veterans.',
    availability: ['Tuesday 8:00-16:00', 'Thursday 8:00-16:00'],
    verified: true
  }
];

const mockSessions: Session[] = [
  {
    id: '1',
    counsellorId: '1',
    counsellorName: 'Dr. Sarah Johnson',
    userId: '1',
    userName: 'John Doe',
    date: '2024-01-15',
    time: '10:00',
    duration: 60,
    status: 'upcoming'
  },
  {
    id: '2',
    counsellorId: '2',
    counsellorName: 'Michael Chen',
    userId: '1',
    userName: 'John Doe',
    date: '2024-01-10',
    time: '14:00',
    duration: 60,
    status: 'completed',
    rating: 5,
    feedback: 'Great session, very helpful advice!'
  }
];

export const counsellorAPI = {
  async getCounsellors(filters?: {
    specialization?: string;
    ageGroup?: string;
    maxPrice?: number;
  }): Promise<Counsellor[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = mockCounsellors;
    
    if (filters?.specialization) {
      filtered = filtered.filter(c => 
        c.specializations.some(s => 
          s.toLowerCase().includes(filters.specialization!.toLowerCase())
        )
      );
    }
    
    if (filters?.ageGroup) {
      filtered = filtered.filter(c => 
        c.ageGroups.some(age => 
          age.toLowerCase().includes(filters.ageGroup!.toLowerCase())
        )
      );
    }
    
    if (filters?.maxPrice) {
      filtered = filtered.filter(c => c.pricePerSession <= filters.maxPrice!);
    }
    
    return filtered;
  },

  async getCounsellorById(id: string): Promise<Counsellor | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCounsellors.find(c => c.id === id) || null;
  },

  async getSessions(userId: string): Promise<Session[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSessions.filter(s => s.userId === userId);
  },

  async getCounsellorSessions(counsellorId: string): Promise<Session[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSessions.filter(s => s.counsellorId === counsellorId);
  },

  async bookSession(counsellorId: string, date: string, time: string): Promise<Session> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const counsellor = mockCounsellors.find(c => c.id === counsellorId);
    if (!counsellor) {
      throw new Error('Counsellor not found');
    }
    
    const newSession: Session = {
      id: Date.now().toString(),
      counsellorId,
      counsellorName: counsellor.name,
      userId: '1', // Current user ID
      userName: 'John Doe', // Current user name
      date,
      time,
      duration: 60,
      status: 'upcoming'
    };
    
    mockSessions.push(newSession);
    return newSession;
  }
};