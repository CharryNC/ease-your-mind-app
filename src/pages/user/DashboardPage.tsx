import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { counsellorAPI, Session } from '../../api/counsellorAPI';
import { resourcesAPI, JournalEntry } from '../../api/resourcesAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  Calendar,
  Clock,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Heart,
  Plus,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        const [sessionsData, journalData] = await Promise.all([
          counsellorAPI.getSessions(user.id),
          resourcesAPI.getJournalEntries(user.id)
        ]);
        
        setSessions(sessionsData);
        setJournalEntries(journalData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const recentJournalEntries = journalEntries.slice(0, 3);
  const completedSessions = sessions.filter(s => s.status === 'completed').length;

  const quickActions = [
    {
      title: 'Find a Counsellor',
      description: 'Browse qualified mental health professionals',
      icon: Users,
      href: '/counsellors',
      variant: 'hero' as const
    },
    {
      title: 'Write in Journal',
      description: 'Reflect on your thoughts and feelings',
      icon: FileText,
      href: '/journal',
      variant: 'wellness' as const
    },
    {
      title: 'Explore Resources',
      description: 'Access self-help articles and exercises',
      icon: BookOpen,
      href: '/resources',
      variant: 'calm' as const
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your mental wellness journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-border shadow-wellness-sm hover:shadow-wellness-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-hero text-white p-3 rounded-full">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingSessions.length}</p>
                  <p className="text-muted-foreground text-sm">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-wellness-sm hover:shadow-wellness-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-wellness-green text-white p-3 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedSessions}</p>
                  <p className="text-muted-foreground text-sm">Sessions Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-wellness-sm hover:shadow-wellness-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary-light text-primary p-3 rounded-full">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{journalEntries.length}</p>
                  <p className="text-muted-foreground text-sm">Journal Entries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.href} to={action.href}>
                        <Card className="border border-border hover:shadow-wellness-md transition-all duration-200 hover:scale-105">
                          <CardContent className="p-4 text-center">
                            <div className="mb-3">
                              <Icon className="h-8 w-8 text-primary mx-auto" />
                            </div>
                            <h3 className="font-semibold mb-1">{action.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {action.description}
                            </p>
                            <Button variant={action.variant} size="sm" className="w-full">
                              Get Started
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/counsellors">
                    Book New Session
                    <Plus className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-gradient-wellness rounded-lg border border-primary/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary text-white p-2 rounded-full">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{session.counsellorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="calm" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Upcoming Sessions</h3>
                    <p className="text-muted-foreground mb-4">
                      Ready to take the next step in your wellness journey?
                    </p>
                    <Button variant="hero" asChild>
                      <Link to="/counsellors">
                        Find a Counsellor
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Journal Entries */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Journal
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/journal">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentJournalEntries.length > 0 ? (
                  <div className="space-y-3">
                    {recentJournalEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 bg-gradient-card rounded-lg border border-border/50"
                      >
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {entry.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {entry.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Start journaling to track your progress
                    </p>
                    <Button variant="wellness" size="sm" asChild>
                      <Link to="/journal">
                        Write First Entry
                        <Plus className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Motivation Card */}
            <Card className="border border-border shadow-wellness-sm bg-gradient-hero text-white">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">You're doing great!</h3>
                <p className="text-sm text-white/90 mb-4">
                  Every step forward is progress. Keep taking care of your mental health.
                </p>
                <Button variant="soft" size="sm" asChild>
                  <Link to="/resources">
                    Explore Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;