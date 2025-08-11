import React, { useState, useEffect } from 'react';
import { resourcesAPI, Resource } from '../../api/resourcesAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  Search,
  BookOpen,
  Video,
  Headphones,
  Activity,
  Clock,
  Star,
  Filter,
  Play,
  Eye,
  Download
} from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    difficulty: ''
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourcesAPI.getResources();
        setResources(data);
        setFilteredResources(data);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(r =>
        r.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    // Difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(r => r.difficulty === filters.difficulty);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ category: '', type: '', difficulty: '' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return BookOpen;
      case 'video':
        return Video;
      case 'podcast':
        return Headphones;
      case 'exercise':
        return Activity;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'text-blue-600';
      case 'video':
        return 'text-red-600';
      case 'podcast':
        return 'text-purple-600';
      case 'exercise':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
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
          <p className="text-muted-foreground">Loading mental health resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mental Health Resources
          </h1>
          <p className="text-muted-foreground">
            Explore articles, videos, exercises, and tools to support your mental wellness journey.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border border-border shadow-wellness-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-wellness"
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="self-esteem">Self-Esteem</SelectItem>
                    <SelectItem value="panic">Panic Attacks</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="podcast">Podcasts</SelectItem>
                    <SelectItem value="exercise">Exercises</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="border border-border shadow-wellness-sm hover:shadow-wellness-md transition-all duration-200 hover:scale-105">
                  <div className="relative">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        <TypeIcon className="h-3 w-3" />
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                      </span>
                    </div>
                    {resource.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>By {resource.author}</span>
                      <span>•</span>
                      <span>{new Date(resource.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{resource.rating}</span>
                      </div>
                      
                      {resource.duration && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{resource.duration} min</span>
                        </div>
                      )}
                      
                      {resource.readTime && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{resource.readTime} min read</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="hero" className="flex-1">
                        {resource.type === 'video' ? (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Watch
                          </>
                        ) : resource.type === 'podcast' ? (
                          <>
                            <Headphones className="h-4 w-4 mr-1" />
                            Listen
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Read
                          </>
                        )}
                      </Button>
                      <Button variant="calm" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button variant="hero" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;