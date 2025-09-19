import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ProjectSearchPage } from './components/ProjectSearchPage';
import { ProjectDetailsPage } from './components/ProjectDetailsPage';
import { OfficialsDashboard } from './components/OfficialsDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page !== 'details') {
      setSelectedProjectId(null);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('details');
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
    setSelectedProjectId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handlePageChange} />
      )}
      
      {currentPage === 'search' && (
        <ProjectSearchPage onProjectSelect={handleProjectSelect} />
      )}
      
      {currentPage === 'details' && selectedProjectId && (
        <ProjectDetailsPage 
          projectId={selectedProjectId} 
          onBack={handleBackToSearch} 
        />
      )}
      
      {currentPage === 'dashboard' && (
        <OfficialsDashboard />
      )}
    </div>
  );
}