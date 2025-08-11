import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { counsellorAPI, Counsellor } from '../../api/counsellorAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { 
  ArrowLeft, 
  Star, 
  DollarSign, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  MapPin,
  BookOpen,
  Award,
  MessageCircle
} from 'lucide-react';

const CounsellorProfilePage: React.FC = () => {
  const { counsellorId } = useParams<{ counsellorId: string }>();
  const [counsellor, setCounsellor] = useState<Counsellor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellor = async () => {
      if (!counsellorId) return;
      
      try {
        const data = await counsellorAPI.getCounsellorById(counsellorId);
        setCounsellor(data);
      } catch (error) {
        console.error('Failed to fetch counsellor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounsellor();
  }, [counsellorId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading counsellor profile...</p>
        </div>
      </div>
    );
  }

  if (!counsellor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Counsellor Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The counsellor you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="hero" asChild>
            <Link to="/counsellors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Counsellors
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/counsellors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Counsellors
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border border-border shadow-wellness-sm mb-6">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <img
                    src={counsellor.avatar}
                    alt={counsellor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">{counsellor.name}</h1>
                      {counsellor.verified && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{counsellor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{counsellor.totalSessions} sessions completed</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-primary font-medium text-lg">
                      <DollarSign className="h-5 w-5" />
                      ${counsellor.pricePerSession} per session
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    About
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{counsellor.bio}</p>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {counsellor.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-primary-light border-primary/30">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Age Groups */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Works With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {counsellor.ageGroups.map((group, index) => (
                      <Badge key={index} variant="secondary">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Availability
                  </h3>
                  <div className="space-y-2">
                    {counsellor.availability.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-wellness-green" />
                        <span className="text-sm">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Session Card */}
            <Card className="border border-primary/30 shadow-wellness-md bg-gradient-wellness">
              <CardHeader>
                <CardTitle className="text-center">Ready to get started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a session with {counsellor.name.split(' ')[0]} to begin your journey.
                  </p>
                  <Button variant="hero" className="w-full" size="lg" asChild>
                    <Link to={`/booking/${counsellor.id}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Link>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span>Session Duration:</span>
                    <span className="font-medium">60 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Session Type:</span>
                    <span className="font-medium">Video Call</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price:</span>
                    <span className="font-medium">${counsellor.pricePerSession}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{counsellor.rating}/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                  <span className="font-medium">{counsellor.totalSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Specializations</span>
                  <span className="font-medium">{counsellor.specializations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-medium text-wellness-green">Within 24h</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border border-border shadow-wellness-sm">
              <CardHeader>
                <CardTitle className="text-lg">Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  All sessions are conducted via secure video call. You'll receive a link after booking.
                </p>
                <div className="pt-2">
                  <p className="font-medium mb-2">What to expect:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Safe and confidential environment</li>
                    <li>• Professional guidance and support</li>
                    <li>• Personalized treatment approach</li>
                    <li>• Regular progress assessments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorProfilePage;