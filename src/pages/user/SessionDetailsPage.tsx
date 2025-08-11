import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { counsellorAPI, Session } from '../../api/counsellorAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useToast } from '../../hooks/use-toast';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Copy
} from 'lucide-react';

const SessionDetailsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock session data for demonstration
  const mockSession: Session = {
    id: sessionId || '1',
    counsellorId: '1',
    counsellorName: 'Dr. Sarah Johnson',
    userId: '1',
    userName: 'John Doe',
    date: '2024-01-15',
    time: '10:00',
    duration: 60,
    status: 'upcoming',
    notes: 'First session to discuss anxiety management techniques and establish treatment goals.',
    rating: undefined,
    feedback: undefined
  };

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      
      try {
        // For demo purposes, using mock data
        // In real implementation: const data = await counsellorAPI.getSessionById(sessionId);
        setSession(mockSession);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://meet.example.com/session-' + sessionId);
    toast({
      title: "Link copied!",
      description: "Video call link has been copied to your clipboard.",
    });
  };

  const handleJoinCall = () => {
    window.open('https://meet.example.com/session-' + sessionId, '_blank');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-wellness-green" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Session Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The session you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="hero" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const sessionDate = new Date(session.date);
  const sessionTime = session.time;
  const isToday = sessionDate.toDateString() === new Date().toDateString();
  const canJoin = session.status === 'upcoming' && isToday;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Session Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Info Card */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">Session with {session.counsellorName}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(session.status)}
                      <Badge className={getStatusColor(session.status)}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-lg border border-border/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {sessionDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-lg border border-border/50">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {sessionTime} ({session.duration} minutes)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Notes */}
                {session.notes && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Session Notes
                    </h3>
                    <p className="text-muted-foreground bg-gradient-wellness p-4 rounded-lg border border-primary/20">
                      {session.notes}
                    </p>
                  </div>
                )}

                {/* Feedback (for completed sessions) */}
                {session.status === 'completed' && session.feedback && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Your Feedback
                    </h3>
                    <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Rating:</span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < (session.rating || 0) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.feedback}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pre-session Preparation (for upcoming sessions) */}
            {session.status === 'upcoming' && (
              <Card className="border border-blue-200 shadow-wellness-sm bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    Preparation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Find a quiet, private space for your session</li>
                    <li>• Test your camera and microphone beforehand</li>
                    <li>• Prepare any questions or topics you'd like to discuss</li>
                    <li>• Have a notepad ready for important points</li>
                    <li>• Join the call a few minutes early</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Call Card */}
            <Card className="border border-primary/30 shadow-wellness-md bg-gradient-wellness">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Call
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canJoin ? (
                  <>
                    <p className="text-sm text-center text-muted-foreground">
                      Your session is ready to start!
                    </p>
                    <Button 
                      variant="hero" 
                      className="w-full" 
                      size="lg"
                      onClick={handleJoinCall}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Call
                    </Button>
                  </>
                ) : session.status === 'upcoming' ? (
                  <>
                    <p className="text-sm text-center text-muted-foreground">
                      The call will be available on session day.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Call Link
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-center text-muted-foreground">
                    This session has ended.
                  </p>
                )}

                <div className="pt-2 text-xs text-muted-foreground">
                  <p className="text-center">
                    Meeting ID: {sessionId?.slice(-8).toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Counsellor Info */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <CardTitle className="text-lg">Counsellor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {session.counsellorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{session.counsellorName}</p>
                    <p className="text-sm text-muted-foreground">Licensed Therapist</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/counsellor/${session.counsellorId}`}>
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Having technical issues or need to reschedule?
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download App
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsPage;