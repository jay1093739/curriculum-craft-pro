
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Users, 
  Clock,
  Star,
  Search
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CourseManagementProps {
  user: {
    role: string;
  };
}

export const CourseManagement = ({ user }: CourseManagementProps) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master modern React patterns and best practices',
      category: 'Web Development',
      duration: '8 weeks',
      students: 145,
      rating: 4.8,
      status: 'Published',
      syllabus: [
        'React Hooks and Context',
        'Performance Optimization',
        'Testing Strategies',
        'Advanced Patterns'
      ]
    },
    {
      id: 2,
      title: 'Project Management Fundamentals',
      description: 'Learn essential project management skills and methodologies',
      category: 'Business',
      duration: '6 weeks',
      students: 89,
      rating: 4.6,
      status: 'Draft',
      syllabus: [
        'Project Planning',
        'Risk Management',
        'Team Leadership',
        'Agile Methodologies'
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    syllabus: ''
  });

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const course = {
      id: courses.length + 1,
      ...newCourse,
      students: 0,
      rating: 0,
      status: 'Draft',
      syllabus: newCourse.syllabus.split('\n').filter(item => item.trim())
    };

    setCourses([...courses, course]);
    setNewCourse({ title: '', description: '', category: '', duration: '', syllabus: '' });
    setShowCreateForm(false);
    
    toast({
      title: "Success",
      description: "Course created successfully!"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Structure & Syllabus</h1>
          <p className="text-gray-600 mt-1">Manage your course content and structure</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus Management</TabsTrigger>
          <TabsTrigger value="analytics">Course Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
          </div>

          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        {course.title}
                        <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      {course.category}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4" />
                      {course.rating}/5.0
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Course Outline:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.syllabus.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Syllabus Builder</CardTitle>
              <CardDescription>Create and organize your course curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                Select a course from the overview tab to edit its syllabus, or create a new course.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {courses.reduce((sum, course) => sum + course.students, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Enrollments</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Course Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="Course description"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  placeholder="e.g., Web Development"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  placeholder="e.g., 8 weeks"
                />
              </div>
              <div>
                <Label htmlFor="syllabus">Syllabus (one topic per line)</Label>
                <Textarea
                  id="syllabus"
                  value={newCourse.syllabus}
                  onChange={(e) => setNewCourse({...newCourse, syllabus: e.target.value})}
                  placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreateCourse} className="flex-1">
                  Create Course
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
