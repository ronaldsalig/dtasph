import { Shield, Eye, Database, AlertTriangle, Users, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Eye,
      title: 'Real-time Tracking',
      description: 'Monitor every peso from allocation to utilization'
    },
    {
      icon: Database,
      title: 'Blockchain Security',
      description: 'Immutable and tamper-proof transaction records'
    },
    {
      icon: AlertTriangle,
      title: 'AI-Powered Alerts',
      description: 'Automated detection of unusual spending patterns'
    },
    {
      icon: Users,
      title: 'Citizen Monitoring',
      description: 'Community-driven transparency and reporting'
    },
    {
      icon: Smartphone,
      title: 'Digital Payments',
      description: 'Cashless transfers with complete digital trails'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-purple-200 rounded-full opacity-25"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl mb-6 text-gray-900">
              Digital Transparency and
              <br />
              <span className="text-primary">Accountability System</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A revolutionary platform that tracks every peso of public funds in real-time, 
              ensuring complete transparency and accountability in government spending.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate('search')}
                className="rounded-full px-8"
              >
                Track Public Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('dashboard')}
                className="rounded-full px-8"
              >
                Officials Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-gray-900">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive system ensures complete transparency in government spending 
              through cutting-edge technology and citizen engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow rounded-2xl">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Ensure Government Accountability?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Filipino citizens in monitoring public fund usage and promoting transparency.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => onNavigate('search')}
            className="rounded-full px-8"
          >
            Start Tracking Now
          </Button>
        </div>
      </div>
    </div>
  );
}