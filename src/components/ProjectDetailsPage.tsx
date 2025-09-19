import { ArrowLeft, Building, Calendar, DollarSign, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ProjectDetailsPageProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectDetailsPage({ projectId, onBack }: ProjectDetailsPageProps) {
  // Mock project data
  const project = {
    id: 'DPWH-2024-001',
    name: 'Maharlika Highway Rehabilitation Project',
    description: 'Comprehensive rehabilitation and widening of the Maharlika Highway connecting major cities in Central Luzon region.',
    agency: 'Department of Public Works and Highways (DPWH)',
    location: 'Bataan Province, Region III - Central Luzon',
    status: 'ongoing',
    startDate: '2024-01-15',
    expectedCompletion: '2024-12-15',
    totalBudget: 150000000,
    disbursed: 97500000,
    utilized: 85000000,
    progress: 65,
    contractor: 'ABC Construction Corporation',
    projectManager: 'Engr. Juan Dela Cruz',
    beneficiaries: 250000
  };

  const expenditures = [
    { category: 'Materials & Supplies', allocated: 60000000, spent: 45000000, percentage: 75 },
    { category: 'Labor Costs', allocated: 40000000, spent: 25000000, percentage: 62.5 },
    { category: 'Equipment Rental', allocated: 30000000, spent: 12000000, percentage: 40 },
    { category: 'Administrative Costs', allocated: 15000000, spent: 2500000, percentage: 16.7 },
    { category: 'Contingency Fund', allocated: 5000000, spent: 500000, percentage: 10 }
  ];

  const milestones = [
    { phase: 'Planning & Design', status: 'completed', date: '2024-01-15', budget: 10000000 },
    { phase: 'Site Preparation', status: 'completed', date: '2024-02-01', budget: 15000000 },
    { phase: 'Foundation Work', status: 'completed', date: '2024-04-01', budget: 30000000 },
    { phase: 'Road Construction', status: 'ongoing', date: '2024-07-01', budget: 70000000 },
    { phase: 'Final Inspection', status: 'pending', date: '2024-11-15', budget: 25000000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>

        {/* Project Overview */}
        <Card className="p-8 mb-8 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-2xl text-gray-900">{project.name}</h1>
                <Badge className={`rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{project.agency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{project.startDate} to {project.expectedCompletion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{project.beneficiaries.toLocaleString()} beneficiaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Project ID: {project.id}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-2xl">
                <h3 className="mb-4">Project Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{project.progress}%</div>
                  <Progress value={project.progress} className="bg-white/20" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Budget:</span>
                    <span>₱{project.totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disbursed:</span>
                    <span>₱{project.disbursed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilized:</span>
                    <span>₱{project.utilized.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Breakdown */}
          <Card className="p-6 rounded-3xl">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget Breakdown
            </h2>
            <div className="space-y-4">
              {expenditures.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">
                      ₱{item.spent.toLocaleString()} / ₱{item.allocated.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.percentage} className="flex-1" />
                    <span className="text-sm text-gray-500 w-12">{item.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Project Milestones */}
          <Card className="p-6 rounded-3xl">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Project Milestones
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'ongoing' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{milestone.phase}</span>
                      <Badge className={`text-xs rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {milestone.date} • ₱{milestone.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="p-6 mt-8 rounded-3xl bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg text-yellow-800 mb-2">Transparency Notice</h3>
              <p className="text-yellow-700 mb-4">
                This project data is updated in real-time and secured using blockchain technology. 
                All transactions are immutable and publicly verifiable.
              </p>
              <div className="text-sm text-yellow-600">
                <p>Last updated: {new Date().toLocaleDateString()} • Verified by COA</p>
                <p>Contractor: {project.contractor} • Project Manager: {project.projectManager}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}