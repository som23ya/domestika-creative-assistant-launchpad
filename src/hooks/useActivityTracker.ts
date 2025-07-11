import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ActivityDetails {
  project_id?: string;
  feedback?: string;
  rating?: number;
  title?: string;
  filename?: string;
  [key: string]: any;
}

export function useActivityTracker() {
  const { user } = useAuth();
  const { toast } = useToast();

  const trackActivity = async (
    activityType: 'project_upload' | 'feedback_received' | 'course_selected' | 'exercise_selected',
    details: ActivityDetails = {}
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_activity')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          activity_details: details
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking activity:', error);
      toast({
        title: "Activity Tracking Error",
        description: "Failed to save activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { trackActivity };
}