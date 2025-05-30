
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Clock, 
  TrendingUp,
  CheckCircle,
  PlayCircle,
  Award
} from 'lucide-react';

interface DashboardHomeProps {
  user: {
    role: 'student' | 'instructor' | 'admin';
    name: string;
  };
}

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    return `${greeting}, ${user.name}!`;
  };

  const studentStats = [
    { label: 'Enrolled Courses', value: '8', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Completed', value: '5', icon: CheckCircle, color: 'text-green-600' },
    { label: 'In Progress', value: '3', icon: PlayCircle, color: 'text-orange-600' },
    { label: 'Certificates', value: '5', icon: Award, color: 'text-purple-600' },
  ];

  const instructorStats = [
    { label: 'My Courses', value: '12', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Students', value: '247', icon: Users, color: 'text-green-600' },
    { label: 'Assessments', value: '34', icon: Trophy, color: 'text-orange-600' },
    { label: 'Avg. Rating', value: '4.8', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const adminStats = [
    { label: 'Total Courses', value: '156', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Active Users', value: '1,247', icon: Users, color: 'text-green-600' },
    { label: 'Certifications', value: '523', icon: Award, color: 'text-orange-600' },
    { label: 'System Health', value: '98%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const getStats = () => {
    switch (user.role) {
      case 'student': return studentStats;
      case 'instructor': return instructorStats;
      case 'admin': return adminStats;
      default: return studentStats;
    }
  };

  const recentCourses = [
    { id: 1, title: 'Advanced React Development', progress: 75, status: 'In Progress' },
    { id: 2, title: 'Project Management Fundamentals', progress: 100, status: 'Completed' },
    { id: 3, title: 'Digital Marketing Strategy', progress: 45, status: 'In Progress' },
    { id: 4, title: 'Data Analysis with Python', progress: 20, status: 'Started' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getWelcomeMessage()}</h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your learning journey</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest course progress and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant={course.status === 'Completed' ? 'default' : 'secondary'}
                    className="ml-3"
                  >
                    {course.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {user.role === 'student' && (
                <>
                  <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                    <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">Browse Courses</p>
                    <p className="text-sm text-gray-600">Find new courses</p>
                  </button>
                  <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                    <Trophy className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">View Certificates</p>
                    <p className="text-sm text-gray-600">Download certificates</p>
                  </button>
                </>
              )}
              {user.role === 'instructor' && (
                <>
                  <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                    <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">Create Course</p>
                    <p className="text-sm text-gray-600">Add new content</p>
                  </button>
                  <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                    <Users className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">Student Progress</p>
                    <p className="text-sm text-gray-600">Track performance</p>
                  </button>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <button className="p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">User Management</p>
                    <p className="text-sm text-gray-600">Manage users</p>
                  </button>
                  <button className="p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                    <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">System Analytics</p>
                    <p className="text-sm text-gray-600">View reports</p>
                  </button>
                </>
              )}
              <button className="p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
                <Clock className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Schedule</p>
                <p className="text-sm text-gray-600">View calendar</p>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors">
                <Award className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Achievements</p>
                <p className="text-sm text-gray-600">View badges</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
