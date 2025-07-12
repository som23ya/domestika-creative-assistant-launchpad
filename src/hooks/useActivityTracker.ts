
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ActivityDetails {
  project_id?: string;
  feedback?: string;
  rating?: number;
  title?: string;
  filename?: string;
  points_earned?: number;
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

    // Assign points based on activity type
    let pointsEarned = 0;
    switch (activityType) {
      case 'project_upload':
        pointsEarned = 20;
        break;
      case 'feedback_received':
        pointsEarned = 20;
        break;
      case 'course_selected':
        pointsEarned = 50;
        break;
      case 'exercise_selected':
        pointsEarned = 50;
        break;
    }

    const activityDetails = {
      ...details,
      points_earned: pointsEarned
    };

    try {
      const { error } = await supabase
        .from('user_activity')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          activity_details: activityDetails
        });

      if (error) throw error;

      // Show points earned toast
      if (pointsEarned > 0) {
        toast({
          title: `+${pointsEarned} Points Earned!`,
          description: getActivityMessage(activityType),
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error tracking activity:', error);
      toast({
        title: "Activity Tracking Error",
        description: "Failed to save activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getActivityMessage = (activityType: string) => {
    switch (activityType) {
      case 'project_upload':
        return 'Great job uploading your project!';
      case 'feedback_received':
        return 'Thanks for getting AI feedback!';
      case 'course_selected':
        return 'Keep learning with this course!';
      case 'exercise_selected':
        return 'Practice makes perfect!';
      default:
        return 'Keep up the great work!';
    }
  };

  const getUserPoints = async () => {
    if (!user) return 0;

    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('activity_details')
        .eq('user_id', user.id);

      if (error) throw error;

      return data.reduce((total, activity) => {
        // Safely access points_earned from the JSON object
        const activityDetails = activity.activity_details as any;
        const points = activityDetails?.points_earned || 0;
        return total + points;
      }, 0);
    } catch (error) {
      console.error('Error fetching user points:', error);
      return 0;
    }
  };

  const getUserActivity = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user activity:', error);
      return [];
    }
  };

  return { trackActivity, getUserPoints, getUserActivity };
}
