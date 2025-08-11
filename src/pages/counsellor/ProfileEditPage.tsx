import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { User } from 'lucide-react';

const ProfileEditPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile editing interface for counsellors will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEditPage;