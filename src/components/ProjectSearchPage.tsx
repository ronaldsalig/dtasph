import { useState } from 'react';
import { Search, MapPin, Hash } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ProjectSearchPageProps {
  onProjectSelect: (projectId: string) => void;
}

export function ProjectSearchPage({ onProjectSelect }: ProjectSearchPageProps) {
  const [searchType, setSearchType] = useState<'location' | 'id'>('location');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [projectId, setProjectId] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const regions = [
    'NCR - National Capital Region',
    'CAR - Cordillera Administrative Region',
    'Region I - Ilocos Region',
    'Region II - Cagayan Valley',
    'Region III - Central Luzon',
    'Region IV-A - CALABARZON',
    'Region IV-B - MIMAROPA',
    'Region V - Bicol Region',
    'Region VI - Western Visayas',
    'Region VII - Central Visayas',
    'Region VIII - Eastern Visayas',
    'Region IX - Zamboanga Peninsula',
    'Region X - Northern Mindanao',
    'Region XI - Davao Region',
    'Region XII - SOCCSKSARGEN',
    'Region XIII - Caraga',
    'BARMM - Bangsamoro Autonomous Region'
  ];

  const provinces = {
    'NCR - National Capital Region': ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong'],
    'Region III - Central Luzon': ['Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'],
    'Region IV-A - CALABARZON': ['Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'],
  };

  const mockProjects = [
    {
      id: 'DPWH-2024-001',
      name: 'Maharlika Highway Rehabilitation Project',
      location: 'Bataan, Region III',
      budget: 150000000,
      status: 'ongoing',
      progress: 65,
      agency: 'DPWH'
    },
    {
      id: 'DEPED-2024-002',
      name: 'School Building Construction - Bataan National High School',
      location: 'Bataan, Region III',
      budget: 25000000,
      status: 'completed',
      progress: 100,
      agency: 'DepEd'
    },
    {
      id: 'DOH-2024-003',
      name: 'Rural Health Unit Modernization',
      location: 'Bataan, Region III',
      budget: 8000000,
      status: 'planning',
      progress: 15,
      agency: 'DOH'
    }
  ];

  const handleLocationSearch = () => {
    if (selectedRegion && selectedProvince) {
      setSearchResults(mockProjects);
    }
  };

  const handleIdSearch = () => {
    if (projectId) {
      const project = mockProjects.find(p => p.id.toLowerCase().includes(projectId.toLowerCase()));
      if (project) {
        onProjectSelect(project.id);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-4 text-gray-900">Track Government Projects</h1>
          <p className="text-gray-600">
            Search for public projects by location or enter a specific project ID to view detailed information.
          </p>
        </div>

        {/* Search Options */}
        <Card className="p-8 mb-8 rounded-3xl">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              variant={searchType === 'location' ? 'default' : 'outline'}
              onClick={() => setSearchType('location')}
              className="flex-1 rounded-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Search by Location
            </Button>
            <Button
              variant={searchType === 'id' ? 'default' : 'outline'}
              onClick={() => setSearchType('id')}
              className="flex-1 rounded-full"
            >
              <Hash className="w-4 h-4 mr-2" />
              Search by Project ID
            </Button>
          </div>

          {searchType === 'location' ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Select Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Choose your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRegion && provinces[selectedRegion as keyof typeof provinces] && (
                <div>
                  <label className="block mb-2 text-gray-700">Select Province/City</label>
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Choose your province/city" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces[selectedRegion as keyof typeof provinces].map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                onClick={handleLocationSearch}
                disabled={!selectedRegion || !selectedProvince}
                className="w-full rounded-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Projects
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Project ID</label>
                <Input
                  placeholder="Enter project ID (e.g., DPWH-2024-001)"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="rounded-full"
                />
              </div>
              <Button 
                onClick={handleIdSearch}
                disabled={!projectId}
                className="w-full rounded-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Project
              </Button>
            </div>
          )}
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl text-gray-900">Found {searchResults.length} projects</h2>
            {searchResults.map((project) => (
              <Card 
                key={project.id} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded-2xl"
                onClick={() => onProjectSelect(project.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg text-gray-900">{project.name}</h3>
                      <Badge className={`rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{project.location}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>ID: {project.id}</span>
                      <span>Agency: {project.agency}</span>
                      <span>Budget: ₱{project.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-primary mb-1">{project.progress}%</div>
                    <div className="text-sm text-gray-500">Progress</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}