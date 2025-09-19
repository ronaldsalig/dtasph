import { useState } from 'react';
import { Users, Plus, Edit, Eye, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

export function OfficialsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'update'>('overview');
  const [newProject, setNewProject] = useState({
    name: '',
    agency: '',
    budget: '',
    location: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const recentProjects = [
    { id: 'DPWH-2024-001', name: 'Maharlika Highway Rehabilitation', agency: 'DPWH', budget: 150000000, status: 'ongoing' },
    { id: 'DEPED-2024-002', name: 'School Building Construction', agency: 'DepEd', budget: 25000000, status: 'completed' },
    { id: 'DOH-2024-003', name: 'Rural Health Unit Modernization', agency: 'DOH', budget: 8000000, status: 'planning' },
  ];

  const agencies = [
    'DPWH - Department of Public Works and Highways',
    'DepEd - Department of Education',
    'DOH - Department of Health',
    'DSWD - Department of Social Welfare and Development',
    'DA - Department of Agriculture',
    'DBM - Department of Budget and Management'
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the project
    alert('Project created successfully! Project ID: ' + 'PROJ-' + Date.now());
    setNewProject({
      name: '',
      agency: '',
      budget: '',
      location: '',
      description: '',
      startDate: '',
      endDate: ''
    });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-4 text-gray-900">Officials Dashboard</h1>
          <p className="text-gray-600">
            Manage project budgets, track expenditures, and ensure transparency in government spending.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="rounded-full px-6"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('create')}
              className="rounded-full px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
            <Button
              variant={activeTab === 'update' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('update')}
              className="rounded-full px-6"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Funds
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 mb-1">Total Budget Allocated</p>
                    <p className="text-2xl">₱183M</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-200" />
                </div>
              </Card>
              
              <Card className="p-6 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 mb-1">Total Disbursed</p>
                    <p className="text-2xl">₱125M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </Card>
              
              <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 mb-1">Active Projects</p>
                    <p className="text-2xl">12</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-200" />
                </div>
              </Card>
            </div>

            {/* Recent Projects */}
            <Card className="p-8 rounded-3xl">
              <h2 className="text-xl mb-6">Recent Projects</h2>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <h3 className="text-gray-900 mb-1">{project.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>ID: {project.id}</span>
                        <span>Agency: {project.agency}</span>
                        <span>Budget: ₱{project.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge className={`rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Create Project Tab */}
        {activeTab === 'create' && (
          <Card className="p-8 rounded-3xl max-w-2xl mx-auto">
            <h2 className="text-xl mb-6">Create New Project</h2>
            
            <Alert className="mb-6 rounded-2xl">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                All project data will be recorded on the blockchain for transparency and accountability.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleCreateProject} className="space-y-6">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                  className="rounded-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="agency">Implementing Agency</Label>
                <Select value={newProject.agency} onValueChange={(value) => setNewProject({...newProject, agency: value})}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select agency" />
                  </SelectTrigger>
                  <SelectContent>
                    {agencies.map((agency) => (
                      <SelectItem key={agency} value={agency}>
                        {agency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Total Budget (₱)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    placeholder="0"
                    className="rounded-full"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="Province, Region"
                    className="rounded-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="rounded-full"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Expected Completion</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    className="rounded-full"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Detailed description of the project"
                  rows={4}
                  className="rounded-2xl"
                  required
                />
              </div>

              <Button type="submit" className="w-full rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </form>
          </Card>
        )}

        {/* Update Funds Tab */}
        {activeTab === 'update' && (
          <Card className="p-8 rounded-3xl max-w-2xl mx-auto">
            <h2 className="text-xl mb-6">Update Project Funds</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="projectSelect">Select Project</Label>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Choose project to update" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} ({project.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="updateType">Update Type</Label>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select update type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disbursement">Fund Disbursement</SelectItem>
                    <SelectItem value="expenditure">Record Expenditure</SelectItem>
                    <SelectItem value="milestone">Milestone Completion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount (₱)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="rounded-full"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes/Description</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this transaction"
                  rows={3}
                  className="rounded-2xl"
                />
              </div>

              <Button className="w-full rounded-full">
                <Edit className="w-4 h-4 mr-2" />
                Update Project Funds
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}