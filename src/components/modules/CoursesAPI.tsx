
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCourses } from '@/hooks/useCourses';
import { useUserEnrollments, useEnrollInCourse } from '@/hooks/useEnrollments';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Users, Clock, Star, Search, DollarSign } from 'lucide-react';

export const CoursesAPI = () => {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: enrollments } = useUserEnrollments();
  const { mutate: enrollInCourse, isPending: enrolling } = useEnrollInCourse();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses?.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isEnrolled = (courseId: string) => {
    return enrollments?.some(enrollment => enrollment.course_id === courseId);
  };

  if (coursesLoading) {
    return <div className="flex items-center justify-center p-8">Loading courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
          <p className="text-gray-600 mt-1">Discover and enroll in courses</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3">
                    {course.title}
                    <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEnrolled(course.id) ? (
                    <Button 
                      onClick={() => enrollInCourse(course.id)}
                      disabled={enrolling}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Enrolled
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  {course.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours} hours
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {course.enrollments?.[0]?.count || 0} students
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  ${course.price}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Instructor:</strong> {course.instructor?.full_name || 'Unknown'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
};
