import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { counsellorAPI, Counsellor } from '../../api/counsellorAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useToast } from '../../hooks/use-toast';
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  ArrowLeft,
  User
} from 'lucide-react';

const BookingPage: React.FC = () => {
  const { counsellorId } = useParams<{ counsellorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [counsellor, setCounsellor] = useState<Counsellor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchCounsellor = async () => {
      if (!counsellorId) return;
      
      try {
        const data = await counsellorAPI.getCounsellorById(counsellorId);
        setCounsellor(data);
      } catch (error) {
        console.error('Failed to fetch counsellor:', error);
        toast({
          title: 'Error',
          description: 'Failed to load counsellor information.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounsellor();
  }, [counsellorId, toast]);

  const handleBooking = async () => {
    if (!counsellorId || !selectedDate || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select both date and time for your session.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsBooking(true);
      await counsellorAPI.bookSession(counsellorId, selectedDate, selectedTime);
      
      toast({
        title: 'Session Booked Successfully!',
        description: 'Your counselling session has been scheduled. You will receive a confirmation email shortly.',
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: error instanceof Error ? error.message : 'Failed to book session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsBooking(false);
    }
  };

  // Generate available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading counsellor information...</p>
        </div>
      </div>
    );
  }

  if (!counsellor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Counsellor Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The counsellor you're looking for doesn't exist or is no longer available.
          </p>
          <Button variant="hero" onClick={() => navigate('/counsellors')}>
            Browse All Counsellors
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/counsellors')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Counsellors
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Counsellor Info */}
          <Card className="border border-border shadow-wellness-md">
            <CardHeader>
              <div className="flex items-start gap-4">
                <img
                  src={counsellor.avatar}
                  alt={counsellor.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{counsellor.name}</CardTitle>
                    {counsellor.verified && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{counsellor.rating}</span>
                    <span className="text-muted-foreground">
                      ({counsellor.totalSessions} sessions completed)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                    <DollarSign className="h-5 w-5" />
                    ${counsellor.pricePerSession} per session
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Specializations */}
              <div>
                <h3 className="font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {counsellor.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Age Groups */}
              <div>
                <h3 className="font-semibold mb-3">Age Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {counsellor.ageGroups.map((age, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-wellness-green-light text-wellness-green rounded-full text-sm"
                    >
                      {age}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {counsellor.bio}
                </p>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold mb-3">General Availability</h3>
                <div className="space-y-1">
                  {counsellor.availability.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="border border-border shadow-wellness-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Book Your Session
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-3">
                <Label htmlFor="date">Select Date</Label>
                <select
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-input rounded-md bg-background focus-wellness"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <Label htmlFor="time">Select Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "hero" : "calm"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Session Details */}
              <div className="bg-gradient-wellness p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-3">Session Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">60 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Type:</span>
                    <span className="font-medium">Video Call</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold text-primary">
                      ${counsellor.pricePerSession}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <Button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isBooking}
                variant="hero"
                className="w-full"
                size="lg"
              >
                {isBooking ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Booking Session...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session - ${counsellor.pricePerSession}
                  </>
                )}
              </Button>

              {/* Policy Note */}
              <div className="text-xs text-muted-foreground bg-card p-3 rounded-lg border border-border/50">
                <p className="mb-2">
                  <strong>Cancellation Policy:</strong> Sessions can be cancelled or rescheduled 
                  up to 24 hours before the appointment time without charge.
                </p>
                <p>
                  You will receive a confirmation email with session details and video call link 
                  after booking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;