import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Upload } from 'lucide-react';

const ResourcesUploadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Upload Resources</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resource Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Resource upload and management interface will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesUploadPage;