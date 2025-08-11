import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Heart,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Quote
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Qualified Counsellors',
      description: 'Connect with licensed mental health professionals'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your privacy and data security are our priority'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored therapy approaches for your unique needs'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Working Professional',
      content: 'MindEase helped me find the perfect counsellor. The platform is so easy to use and my therapist has been incredibly supportive.',
      rating: 5
    },
    {
      name: 'David R.',
      role: 'Student',
      content: 'As a college student dealing with anxiety, I found exactly the help I needed. The counsellors really understand what young people go through.',
      rating: 5
    },
    {
      name: 'Maria L.',
      role: 'Parent',
      content: 'Finding help for my teenager was challenging until I discovered MindEase. The counsellors specialize in teen issues and it made all the difference.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Mental Wellness
              <br />
              <span className="text-white/90">Starts Here</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Connect with qualified mental health professionals who understand your journey. 
              Take the first step towards a healthier, happier you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="soft" asChild className="text-lg px-8 py-4">
                <Link to="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                <Link to="/counsellors">
                  Browse Counsellors
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose MindEase?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make mental health care accessible, affordable, and personalized for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-wellness rounded-full mb-4 group-hover:shadow-wellness-lg transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-wellness">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with your mental wellness journey is simple.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description: 'Tell us about yourself and what you\'re looking for in a counsellor.'
              },
              {
                step: '2',
                title: 'Find Your Match',
                description: 'Browse qualified counsellors and find the perfect fit for your needs.'
              },
              {
                step: '3',
                title: 'Start Your Journey',
                description: 'Book your first session and begin your path to better mental health.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from people who found their path to wellness with MindEase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-wellness-md hover:shadow-wellness-lg transition-shadow duration-300 border border-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of people who have found support, growth, and healing through MindEase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="soft" asChild className="text-lg px-8 py-4">
              <Link to="/signup">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
              <Link to="/login">
                I Already Have an Account
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;