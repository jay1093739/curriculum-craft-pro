
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/auth/AuthPage';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Dashboard 
      user={{
        id: user.id,
        name: profile?.full_name || user.email || 'User',
        email: user.email || '',
        role: profile?.role || 'student'
      }} 
      onLogout={() => {}} // This will be handled by the auth context
    />
  );
};

export default Index;
