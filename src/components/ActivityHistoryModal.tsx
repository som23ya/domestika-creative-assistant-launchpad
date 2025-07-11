import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Activity, Upload, MessageSquare, BookOpen, Dumbbell } from 'lucide-react';

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserActivity {
  id: string;
  activity_type: string;
  activity_details: any;
  timestamp: string;
}

export function ActivityHistoryModal({ isOpen, onClose }: ActivityHistoryModalProps) {
  const { user } = useAuth();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      fetchActivities();
    }
  }, [isOpen, user]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_upload':
        return <Upload className="h-4 w-4" />;
      case 'feedback_received':
        return <MessageSquare className="h-4 w-4" />;
      case 'course_selected':
        return <BookOpen className="h-4 w-4" />;
      case 'exercise_selected':
        return <Dumbbell className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityTitle = (activity: UserActivity) => {
    switch (activity.activity_type) {
      case 'project_upload':
        return 'Project Uploaded';
      case 'feedback_received':
        return 'Feedback Received';
      case 'course_selected':
        return `Course Selected: ${activity.activity_details.title || 'Unknown'}`;
      case 'exercise_selected':
        return `Exercise Selected: ${activity.activity_details.title || 'Unknown'}`;
      default:
        return 'Activity';
    }
  };

  const getActivityDescription = (activity: UserActivity) => {
    switch (activity.activity_type) {
      case 'feedback_received':
        return (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {activity.activity_details.feedback}
            </p>
            {activity.activity_details.rating && (
              <Badge variant="secondary">
                Rating: {activity.activity_details.rating}/10
              </Badge>
            )}
          </div>
        );
      case 'project_upload':
        return `Project: ${activity.activity_details.filename || 'Uploaded file'}`;
      default:
        return JSON.stringify(activity.activity_details);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5" />
            Activity History
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading activities...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No activities yet. Start creating!</p>
            </div>
          ) : (
            activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    {getActivityIcon(activity.activity_type)}
                    {getActivityTitle(activity)}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {getActivityDescription(activity)}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}