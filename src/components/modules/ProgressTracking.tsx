
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  BookOpen,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';

interface ProgressTrackingProps {
  user: {
    role: string;
  };
}

export const ProgressTracking = ({ user }: ProgressTrackingProps) => {
  const courseProgress = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 75,
      completedLessons: 15,
      totalLessons: 20,
      timeSpent: '24 hours',
      estimatedCompletion: '5 days',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Project Management Fundamentals',
      progress: 100,
      completedLessons: 12,
      totalLessons: 12,
      timeSpent: '18 hours',
      estimatedCompletion: 'Completed',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      progress: 45,
      completedLessons: 9,
      totalLessons: 20,
      timeSpent: '12 hours',
      estimatedCompletion: '12 days',
      status: 'In Progress'
    }
  ];

  const learningGoals = [
    { goal: 'Complete 3 courses this month', progress: 67, current: 2, target: 3 },
    { goal: 'Study 20 hours per week', progress: 85, current: 17, target: 20 },
    { goal: 'Achieve 85% average score', progress: 94, current: 88, target: 85 },
    { goal: 'Earn 2 certificates', progress: 50, current: 1, target: 2 }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 3.1 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 1.8 },
    { day: 'Sun', hours: 2.2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor your learning journey and achievements</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Progress</p>
                    <p className="text-2xl font-bold text-gray-900">73%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Study Hours</p>
                    <p className="text-2xl font-bold text-gray-900">54h</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Certificates</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Activity</CardTitle>
              <CardDescription>Hours spent learning this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 gap-2">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full min-h-4"
                      style={{ height: `${(day.hours / 5) * 100}%` }}
                    />
                    <span className="text-xs text-gray-600 mt-2">{day.day}</span>
                    <span className="text-xs text-gray-500">{day.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6">
            {courseProgress.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        {course.title}
                        <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        {course.completedLessons}/{course.totalLessons} lessons
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        {course.timeSpent} studied
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {course.estimatedCompletion}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Target className="h-4 w-4" />
                        {course.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Goals</CardTitle>
              <CardDescription>Track your personal learning objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.goal}</h4>
                      <span className="text-sm text-gray-600">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <Progress value={goal.progress} />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{goal.progress}% complete</span>
                      <span>
                        {goal.progress >= 100 ? 'Goal achieved!' : 
                         goal.target - goal.current > 0 ? `${goal.target - goal.current} remaining` : 
                         'Goal exceeded!'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Learning Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Most active day</span>
                    <Badge>Wednesday</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Preferred study time</span>
                    <Badge>Morning (9-11 AM)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average session</span>
                    <Badge>45 minutes</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completion rate</span>
                    <Badge>85%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quiz Accuracy</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Assignment Quality</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Score</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
