
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardCheck, 
  Clock, 
  Trophy, 
  Star,
  Plus,
  Play,
  Eye,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AssessmentProps {
  user: {
    role: string;
  };
}

export const Assessment = ({ user }: AssessmentProps) => {
  const [assessments] = useState([
    {
      id: 1,
      title: 'React Hooks Assessment',
      course: 'Advanced React Development',
      type: 'Quiz',
      questions: 15,
      duration: 30,
      attempts: 3,
      maxAttempts: 3,
      score: 85,
      status: 'Completed',
      dueDate: '2024-06-15'
    },
    {
      id: 2,
      title: 'Project Management Case Study',
      course: 'Project Management Fundamentals',
      type: 'Assignment',
      questions: 5,
      duration: 120,
      attempts: 1,
      maxAttempts: 2,
      score: null,
      status: 'In Progress',
      dueDate: '2024-06-20'
    },
    {
      id: 3,
      title: 'Final Practical Exam',
      course: 'Web Development Bootcamp',
      type: 'Practical',
      questions: 3,
      duration: 180,
      attempts: 0,
      maxAttempts: 1,
      score: null,
      status: 'Upcoming',
      dueDate: '2024-06-25'
    }
  ]);

  const handleStartAssessment = (assessmentId: number) => {
    toast({
      title: "Assessment Started",
      description: "Good luck with your assessment!"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'destructive';
      case 'Upcoming': return 'secondary';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessment & Evaluation</h1>
          <p className="text-gray-600 mt-1">Track your progress and test your knowledge</p>
        </div>
        {user.role === 'instructor' && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        )}
      </div>

      <Tabs defaultValue="assessments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessments">My Assessments</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-6">
          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        {assessment.title}
                        <Badge variant={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {assessment.course} • {assessment.type}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {assessment.status === 'Upcoming' && (
                        <Button 
                          onClick={() => handleStartAssessment(assessment.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      )}
                      {assessment.status === 'In Progress' && (
                        <Button variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      )}
                      {assessment.status === 'Completed' && (
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClipboardCheck className="h-4 w-4" />
                      {assessment.questions} questions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {assessment.duration} minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Trophy className="h-4 w-4" />
                      {assessment.attempts}/{assessment.maxAttempts} attempts
                    </div>
                    {assessment.score !== null && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4" />
                        <span className={`font-semibold ${getScoreColor(assessment.score)}`}>
                          {assessment.score}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {assessment.attempts > 0 && assessment.score !== null && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score Progress</span>
                        <span>{assessment.score}%</span>
                      </div>
                      <Progress value={assessment.score} />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                    {assessment.attempts < assessment.maxAttempts && assessment.status !== 'Completed' && (
                      <span>{assessment.maxAttempts - assessment.attempts} attempts remaining</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">Average Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <p className="text-sm text-gray-600">Certificates Earned</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.filter(a => a.score !== null).map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{assessment.title}</h4>
                      <p className="text-sm text-gray-600">{assessment.course}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(assessment.score!)}`}>
                        {assessment.score}%
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(assessment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Detailed analytics and performance insights will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((cert) => (
              <Card key={cert} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-yellow-50 p-4 rounded-full w-fit mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Course Completion Certificate</h3>
                  <p className="text-sm text-gray-600 mb-4">Advanced React Development</p>
                  <Button variant="outline" className="w-full">
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
