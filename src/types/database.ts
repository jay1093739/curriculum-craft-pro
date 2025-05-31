
export interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string | null;
  thumbnail_url: string | null;
  price: number;
  duration_hours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  instructor?: Profile;
  enrollments?: { count: number }[];
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress: number;
  completed_at: string | null;
  course?: Course;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  issued_at: string;
  certificate_url: string | null;
  course?: Course;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  duration_minutes: number;
  order_index: number;
  created_at: string;
}

export interface Assessment {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  total_points: number;
  passing_score: number;
  created_at: string;
}
