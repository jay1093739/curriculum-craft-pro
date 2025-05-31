
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Course } from '@/types/database';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Course[]> => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            instructor:profiles!instructor_id(full_name),
            enrollments(count)
          `)
          .eq('status', 'published');
        
        if (error) {
          console.error('Error fetching courses:', error);
          return [];
        }
        return data as Course[] || [];
      } catch (error) {
        console.error('Error in useCourses:', error);
        return [];
      }
    }
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (courseData: Partial<Course>) => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .insert([courseData as any])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error creating course:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Success",
        description: "Course created successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & Partial<Course>) => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .update(updateData as any)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error updating course:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Success",
        description: "Course updated successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (courseId: string) => {
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', courseId);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Success",
        description: "Course deleted successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};
