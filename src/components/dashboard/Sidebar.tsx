
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Settings,
  GraduationCap,
  Shield,
  Award,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  user: {
    role: 'student' | 'instructor' | 'admin';
  };
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export const Sidebar = ({ user, activeModule, onModuleChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'instructor', 'admin'] },
    { id: 'courses', label: 'Course Structure', icon: BookOpen, roles: ['instructor', 'admin'] },
    { id: 'content', label: 'Content Delivery', icon: FileText, roles: ['student', 'instructor', 'admin'] },
    { id: 'assessment', label: 'Assessment & Evaluation', icon: ClipboardCheck, roles: ['student', 'instructor', 'admin'] },
    { id: 'certification', label: 'Certification', icon: Award, roles: ['student', 'instructor', 'admin'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['admin'] },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp, roles: ['student', 'instructor', 'admin'] },
    { id: 'communication', label: 'Communication', icon: MessageSquare, roles: ['student', 'instructor', 'admin'] },
    { id: 'compliance', label: 'Legal & Compliance', icon: Shield, roles: ['admin'] },
    { id: 'portfolio', label: 'Portfolio Management', icon: Briefcase, roles: ['student', 'instructor', 'admin'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['instructor', 'admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['student', 'instructor', 'admin'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">CMS Portal</h2>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                    activeModule === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
