
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

export const useUserCertificates = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['certificates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select(`
            *,
            course:courses(title, description)
          `)
          .eq('user_id', user.id);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
      }
    },
    enabled: !!user
  });
};

export const useIssueCertificate = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      try {
        const { data, error } = await supabase
          .from('certificates')
          .insert([{ user_id: user.id, course_id: courseId }])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error issuing certificate:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      toast({
        title: "Congratulations!",
        description: "Certificate issued successfully!"
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
