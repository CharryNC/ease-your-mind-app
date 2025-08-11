import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar } from 'lucide-react';

const MySessionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Sessions</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your session management interface will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MySessionsPage;