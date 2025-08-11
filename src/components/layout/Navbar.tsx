import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
  Heart,
  User,
  Calendar,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  DollarSign,
  Users,
  Upload
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  // User navigation items
  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/counsellors', label: 'Find Counsellors', icon: Users },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/journal', label: 'Journal', icon: FileText },
    { path: '/profile', label: 'Profile', icon: Settings },
  ];

  // Counsellor navigation items
  const counsellorNavItems = [
    { path: '/counsellor/dashboard', label: 'Dashboard', icon: User },
    { path: '/counsellor/sessions', label: 'My Sessions', icon: Calendar },
    { path: '/counsellor/profile', label: 'Edit Profile', icon: Settings },
    { path: '/counsellor/resources', label: 'Upload Resources', icon: Upload },
    { path: '/counsellor/earnings', label: 'Earnings', icon: DollarSign },
  ];

  const navItems = user?.role === 'counsellor' ? counsellorNavItems : userNavItems;

  if (isLoading) {
    return (
      <nav className="bg-card border-b border-border shadow-wellness-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-card border-b border-border shadow-wellness-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={user ? (user.role === 'counsellor' ? '/counsellor/dashboard' : '/dashboard') : '/'} 
                  className="flex items-center gap-2 group">
              <div className="relative">
                <Heart className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
                <div className="absolute inset-0 bg-primary-glow/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold text-gradient">MindEase</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-light text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                  <span className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">
                    {user.role === 'counsellor' ? 'Counsellor' : 'User'}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-wellness-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-3 px-3 py-3 bg-gradient-wellness rounded-lg mb-3">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.role === 'counsellor' ? 'Counsellor' : 'User'}
                    </div>
                  </div>
                </div>

                {/* Navigation items */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary-light text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-hero text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;