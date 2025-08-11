import axios from 'axios';
import { User, UserRole } from '../contexts/AuthContext';

// Mock API base URL - replace with your Django backend URL
const API_BASE_URL = 'https://api.mindease.com'; // TODO: Replace with actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mindease_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthResponse {
  user: User;
  token: string;
}

// Mock authentication functions
export const authAPI = {
  async login(email: string, password: string, role: UserRole): Promise<AuthResponse> {
    // Mock API call - replace with actual backend call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Mock validation
    if (email === 'user@test.com' && password === 'password') {
      return {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          role: role,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    
    if (email === 'counsellor@test.com' && password === 'password') {
      return {
        user: {
          id: '2',
          email,
          name: 'Dr. Sarah Johnson',
          role: role,
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async signup(email: string, password: string, name: string, role: UserRole): Promise<AuthResponse> {
    // Mock API call - replace with actual backend call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Mock user creation
    return {
      user: {
        id: Date.now().toString(),
        email,
        name,
        role,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&random=${Date.now()}`
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  },

  async refreshToken(): Promise<AuthResponse> {
    // Mock token refresh - replace with actual backend call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const storedUser = localStorage.getItem('mindease_user');
    if (!storedUser) {
      throw new Error('No user found');
    }
    
    return {
      user: JSON.parse(storedUser),
      token: 'mock-jwt-token-' + Date.now()
    };
  }
};

export default api;