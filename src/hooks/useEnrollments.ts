
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import type { Enrollment } from '@/types/database';

export const useUserEnrollments = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['enrollments', user?.id],
    queryFn: async (): Promise<Enrollment[]> => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching enrollments:', error);
          return [];
        }
        return data as Enrollment[] || [];
      } catch (error) {
        console.error('Error in useUserEnrollments:', error);
        return [];
      }
    },
    enabled: !!user
  });
};

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error('Must be logged in to enroll');
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .insert([{ user_id: user.id, course_id: courseId }])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error enrolling in course:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast({
        title: "Success",
        description: "Successfully enrolled in course!"
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

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ enrollmentId, progress }: { enrollmentId: string, progress: number }) => {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .update({ progress })
          .eq('id', enrollmentId)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error updating progress:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    }
  });
};
