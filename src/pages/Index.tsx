
import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
  } | null>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
