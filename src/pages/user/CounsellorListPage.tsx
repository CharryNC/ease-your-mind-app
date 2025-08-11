import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { counsellorAPI, Counsellor } from '../../api/counsellorAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  Search,
  Filter,
  Star,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  MapPin,
  Calendar
} from 'lucide-react';

const CounsellorListPage: React.FC = () => {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [filteredCounsellors, setFilteredCounsellors] = useState<Counsellor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    ageGroup: '',
    maxPrice: '',
    sortBy: 'rating'
  });

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const data = await counsellorAPI.getCounsellors();
        setCounsellors(data);
        setFilteredCounsellors(data);
      } catch (error) {
        console.error('Failed to fetch counsellors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  useEffect(() => {
    let filtered = counsellors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.specializations.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
          c.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialization filter
    if (filters.specialization) {
      filtered = filtered.filter(c =>
        c.specializations.some(s =>
          s.toLowerCase().includes(filters.specialization.toLowerCase())
        )
      );
    }

    // Age group filter
    if (filters.ageGroup) {
      filtered = filtered.filter(c =>
        c.ageGroups.some(age =>
          age.toLowerCase().includes(filters.ageGroup.toLowerCase())
        )
      );
    }

    // Price filter
    if (filters.maxPrice) {
      filtered = filtered.filter(c => c.pricePerSession <= parseInt(filters.maxPrice));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricePerSession - b.pricePerSession);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerSession - a.pricePerSession);
        break;
      case 'experience':
        filtered.sort((a, b) => b.totalSessions - a.totalSessions);
        break;
      default:
        break;
    }

    setFilteredCounsellors(filtered);
  }, [counsellors, searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      specialization: '',
      ageGroup: '',
      maxPrice: '',
      sortBy: 'rating'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Finding counsellors for you...</p>
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
            Find Your Perfect Counsellor
          </h1>
          <p className="text-muted-foreground">
            Browse qualified mental health professionals and find the right match for your needs.
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
                  placeholder="Search by name, specialization, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-wellness"
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={filters.specialization} onValueChange={(value) => handleFilterChange('specialization', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="couples">Couples Therapy</SelectItem>
                    <SelectItem value="teen">Teen Counseling</SelectItem>
                    <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.ageGroup} onValueChange={(value) => handleFilterChange('ageGroup', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Age Groups</SelectItem>
                    <SelectItem value="teenagers">Teenagers</SelectItem>
                    <SelectItem value="young adults">Young Adults</SelectItem>
                    <SelectItem value="adults">Adults</SelectItem>
                    <SelectItem value="couples">Couples</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.maxPrice} onValueChange={(value) => handleFilterChange('maxPrice', value === 'any' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="60">Under $60</SelectItem>
                    <SelectItem value="80">Under $80</SelectItem>
                    <SelectItem value="100">Under $100</SelectItem>
                    <SelectItem value="120">Under $120</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
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
            Found {filteredCounsellors.length} counsellor{filteredCounsellors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Counsellors Grid */}
        {filteredCounsellors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounsellors.map((counsellor) => (
              <Card key={counsellor.id} className="border border-border shadow-wellness-sm hover:shadow-wellness-md transition-all duration-200 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={counsellor.avatar}
                      alt={counsellor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{counsellor.name}</CardTitle>
                        {counsellor.verified && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{counsellor.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({counsellor.totalSessions} sessions)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary font-medium">
                        <DollarSign className="h-4 w-4" />
                        ${counsellor.pricePerSession}/session
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specializations */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1">
                      {counsellor.specializations.slice(0, 3).map((spec, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {counsellor.specializations.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{counsellor.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {counsellor.ageGroups.join(', ')}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {counsellor.bio}
                  </p>

                  {/* Availability */}
                  <div className="flex items-center gap-1 text-sm text-wellness-green">
                    <Clock className="h-4 w-4" />
                    Available {counsellor.availability.length} days/week
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="hero" className="flex-1" asChild>
                      <Link to={`/booking/${counsellor.id}`}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Session
                      </Link>
                    </Button>
                    <Button variant="calm" size="sm" asChild>
                      <Link to={`/counsellor/${counsellor.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No counsellors found</h3>
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

export default CounsellorListPage;