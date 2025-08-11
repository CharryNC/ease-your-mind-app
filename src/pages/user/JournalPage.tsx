import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { resourcesAPI, JournalEntry } from '../../api/resourcesAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useToast } from '../../hooks/use-toast';
import { FileText, Plus, Edit, Trash2, Calendar, Tag } from 'lucide-react';

const JournalPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as JournalEntry['mood'],
    tags: '',
    isPrivate: true
  });

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;
    try {
      const data = await resourcesAPI.getJournalEntries(user.id);
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch journal entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in both title and content.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsCreating(true);
      const entry = await resourcesAPI.createJournalEntry({
        ...newEntry,
        userId: user!.id,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      
      setEntries(prev => [entry, ...prev]);
      setNewEntry({ title: '', content: '', mood: 'neutral', tags: '', isPrivate: true });
      toast({
        title: 'Entry Created',
        description: 'Your journal entry has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create journal entry.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'very-happy': return 'text-green-600';
      case 'happy': return 'text-green-500';
      case 'neutral': return 'text-yellow-500';
      case 'sad': return 'text-orange-500';
      case 'very-sad': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Journal</h1>
          <p className="text-muted-foreground">Reflect on your thoughts and track your mental wellness journey.</p>
        </div>

        {/* New Entry Form */}
        <Card className="mb-8 shadow-wellness-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Write New Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Entry title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="What's on your mind today?"
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value as JournalEntry['mood'] }))}
                className="p-2 border rounded-md"
              >
                <option value="very-happy">😊 Very Happy</option>
                <option value="happy">🙂 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">🙁 Sad</option>
                <option value="very-sad">😢 Very Sad</option>
              </select>
              <Input
                placeholder="Tags (comma separated)"
                value={newEntry.tags}
                onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEntry.isPrivate}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, isPrivate: e.target.checked }))}
                />
                Private Entry
              </label>
            </div>
            <Button onClick={handleCreateEntry} disabled={isCreating} variant="hero">
              {isCreating ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Save Entry
            </Button>
          </CardContent>
        </Card>

        {/* Entries List */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <Card key={entry.id} className="shadow-wellness-sm hover:shadow-wellness-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{entry.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className={`font-medium ${getMoodColor(entry.mood)}`}>
                        {entry.mood.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{entry.content}</p>
                {entry.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {entries.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No journal entries yet</h3>
              <p className="text-muted-foreground">Start writing to track your mental wellness journey.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;