
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  FileText, 
  Download, 
  Upload,
  Video,
  BookOpen,
  Headphones,
  Image
} from 'lucide-react';

interface ContentDeliveryProps {
  user: {
    role: string;
  };
}

export const ContentDelivery = ({ user }: ContentDeliveryProps) => {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      modules: [
        {
          id: 1,
          title: 'React Hooks Deep Dive',
          type: 'video',
          duration: '45 min',
          completed: true,
          content: [
            { type: 'video', title: 'Introduction to Hooks', duration: '15 min' },
            { type: 'document', title: 'Hooks Reference Guide', size: '2.3 MB' },
            { type: 'quiz', title: 'Hooks Knowledge Check', questions: 10 }
          ]
        },
        {
          id: 2,
          title: 'Performance Optimization',
          type: 'mixed',
          duration: '60 min',
          completed: false,
          content: [
            { type: 'video', title: 'React.memo and useMemo', duration: '20 min' },
            { type: 'video', title: 'Code Splitting Strategies', duration: '25 min' },
            { type: 'document', title: 'Performance Checklist', size: '1.1 MB' }
          ]
        }
      ]
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Delivery</h1>
          <p className="text-gray-600 mt-1">Access and manage course materials</p>
        </div>
        {user.role === 'instructor' && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
        )}
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="library">Content Library</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>Course modules and learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          {getContentIcon(module.type)}
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={module.completed ? 'default' : 'secondary'}>
                            {module.completed ? 'Completed' : 'In Progress'}
                          </Badge>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                      </div>
                      
                      <Progress value={module.completed ? 100 : 45} className="mb-3" />
                      
                      <div className="grid gap-2">
                        {module.content.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {getContentIcon(item.type)}
                              <span className="text-sm">{item.title}</span>
                              {item.duration && (
                                <span className="text-xs text-gray-500">({item.duration})</span>
                              )}
                              {item.size && (
                                <span className="text-xs text-gray-500">({item.size})</span>
                              )}
                              {item.questions && (
                                <span className="text-xs text-gray-500">({item.questions} questions)</span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Play className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Videos', 'Documents', 'Audio Files', 'Interactive Content', 'Assessments', 'Case Studies'].map((category) => (
              <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">Browse {category.toLowerCase()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Downloaded Content</CardTitle>
              <CardDescription>Offline materials available for study</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Download className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No downloads yet. Download course materials to access them offline.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
