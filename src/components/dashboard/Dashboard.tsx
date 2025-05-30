
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CourseManagement } from '../modules/CourseManagement';
import { ContentDelivery } from '../modules/ContentDelivery';
import { Assessment } from '../modules/Assessment';
import { UserManagement } from '../modules/UserManagement';
import { ProgressTracking } from '../modules/ProgressTracking';
import { Communication } from '../modules/Communication';
import { Analytics } from '../modules/Analytics';
import { Settings } from '../modules/Settings';
import { DashboardHome } from './DashboardHome';

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
  };
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'courses':
        return <CourseManagement user={user} />;
      case 'content':
        return <ContentDelivery user={user} />;
      case 'assessment':
        return <Assessment user={user} />;
      case 'users':
        return <UserManagement user={user} />;
      case 'progress':
        return <ProgressTracking user={user} />;
      case 'communication':
        return <Communication user={user} />;
      case 'analytics':
        return <Analytics user={user} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        user={user} 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
      />
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};
