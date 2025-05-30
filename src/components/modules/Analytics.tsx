
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen,
  Target,
  Clock,
  Award,
  Eye
} from 'lucide-react';

interface AnalyticsProps {
  user: {
    role: string;
  };
}

export const Analytics = ({ user }: AnalyticsProps) => {
  const overviewStats = [
    { label: 'Total Learners', value: '1,247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Courses', value: '156', change: '+8%', icon: BookOpen, color: 'text-green-600' },
    { label: 'Completion Rate', value: '84%', change: '+5%', icon: Target, color: 'text-purple-600' },
    { label: 'Study Hours', value: '12,450', change: '+15%', icon: Clock, color: 'text-orange-600' }
  ];

  const coursePerformance = [
    { course: 'Advanced React Development', enrollments: 245, completion: 78, rating: 4.8, revenue: '$12,450' },
    { course: 'Project Management Fundamentals', enrollments: 189, completion: 85, rating: 4.6, revenue: '$9,876' },
    { course: 'Digital Marketing Strategy', enrollments: 156, completion: 72, rating: 4.7, revenue: '$8,234' },
    { course: 'Data Analysis with Python', enrollments: 134, completion: 68, rating: 4.5, revenue: '$7,123' }
  ];

  const learnerEngagement = [
    { metric: 'Daily Active Users', value: 68, trend: 'up' },
    { metric: 'Session Duration', value: 45, trend: 'up' },
    { metric: 'Course Completion', value: 84, trend: 'up' },
    { metric: 'Assessment Scores', value: 76, trend: 'down' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into learning performance</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="learners">Learner Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3" />
                          {stat.change}
                        </p>
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

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Activity Trend</CardTitle>
                <CardDescription>Daily active learners over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Activity trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Completion Rates</CardTitle>
                <CardDescription>Completion percentage by course category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Web Development', 'Business', 'Data Science', 'Design'].map((category, index) => (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category}</span>
                        <span>{85 - index * 5}%</span>
                      </div>
                      <Progress value={85 - index * 5} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Analysis</CardTitle>
              <CardDescription>Detailed metrics for all active courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-3 font-medium">Course</th>
                      <th className="p-3 font-medium">Enrollments</th>
                      <th className="p-3 font-medium">Completion</th>
                      <th className="p-3 font-medium">Rating</th>
                      <th className="p-3 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursePerformance.map((course, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{course.course}</p>
                            <p className="text-sm text-gray-600">Active</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            {course.enrollments}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <Progress value={course.completion} />
                            </div>
                            <span className="text-sm">{course.completion}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-yellow-500" />
                            {course.rating}
                          </div>
                        </td>
                        <td className="p-3 font-medium text-green-600">
                          {course.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learners" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learner Engagement Metrics</CardTitle>
                <CardDescription>Key indicators of learner activity and success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learnerEngagement.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{metric.value}%</span>
                        <TrendingUp className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Patterns</CardTitle>
                <CardDescription>When and how learners engage with content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Peak Learning Hours</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">9:00 AM - 11:00 AM</span>
                      <Badge>35% of activity</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Most Active Day</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tuesday</span>
                      <Badge>22% of weekly activity</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Average Session</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">42 minutes</span>
                      <Badge>+12% vs last month</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Monthly Performance Report', description: 'Comprehensive monthly analysis', type: 'PDF' },
              { title: 'Learner Progress Summary', description: 'Individual learner progress tracking', type: 'Excel' },
              { title: 'Course Effectiveness Study', description: 'Course impact and outcomes analysis', type: 'PDF' },
              { title: 'Financial Analytics Report', description: 'Revenue and cost analysis', type: 'Excel' },
              { title: 'Engagement Metrics Dashboard', description: 'Interactive engagement analytics', type: 'Interactive' },
              { title: 'Certification Tracking Report', description: 'Certificate issuance and verification', type: 'PDF' }
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-600 hover:underline">View</button>
                    <button className="text-xs text-gray-600 hover:underline">Download</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
