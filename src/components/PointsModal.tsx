
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Upload, BookOpen, Zap, LogIn } from 'lucide-react';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { useAuth } from '@/contexts/AuthContext';

interface PointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PointsModal: React.FC<PointsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { getUserPoints, getUserActivity } = useActivityTracker();
  const [totalPoints, setTotalPoints] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        loadPointsData();
      } else {
        setLoading(false);
        setTotalPoints(0);
        setActivities([]);
      }
    }
  }, [isOpen, user]);

  const loadPointsData = async () => {
    setLoading(true);
    try {
      const [points, activityData] = await Promise.all([
        getUserPoints(),
        getUserActivity()
      ]);
      setTotalPoints(points);
      setActivities(activityData);
    } catch (error) {
      console.error('Error loading points data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'project_upload':
        return <Upload className="w-4 h-4" />;
      case 'feedback_received':
        return <Star className="w-4 h-4" />;
      case 'course_selected':
        return <BookOpen className="w-4 h-4" />;
      case 'exercise_selected':
        return <Zap className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getActivityLabel = (activityType: string) => {
    switch (activityType) {
      case 'project_upload':
        return 'Project Upload';
      case 'feedback_received':
        return 'AI Feedback';
      case 'course_selected':
        return 'Course Selected';
      case 'exercise_selected':
        return 'Exercise Completed';
      default:
        return 'Activity';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 domestika-text-coral" />
            {user ? 'Your Points' : 'Earn Points'}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Total Points */}
            <div className="text-center p-6 domestika-bg-light rounded-domestika">
              <div className="text-3xl font-bold domestika-text-coral mb-2">
                {user ? totalPoints : 0}
              </div>
              <div className="text-muted-foreground">
                {user ? 'Total Points Earned' : 'Sign in to start earning points!'}
              </div>
            </div>

            {/* Points Guide - Always visible */}
            <div>
              <h3 className="font-semibold mb-3 text-foreground">How to earn points:</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload project for feedback: +20 points
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Select a course: +50 points
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Complete an exercise: +50 points
                </div>
              </div>
            </div>

            {user ? (
              /* Points History for logged-in users */
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Recent Activity</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {activities.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No activity yet. Start exploring to earn points!
                    </p>
                  ) : (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 border border-border rounded-domestika"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 domestika-gradient rounded-full flex items-center justify-center text-white">
                            {getActivityIcon(activity.activity_type)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {getActivityLabel(activity.activity_type)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                          +{activity.activity_details?.points_earned || 0}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* Sign in prompt for non-logged-in users */
              <div className="text-center py-4">
                <div className="mb-4 text-muted-foreground">
                  Sign in to track your progress and see your activity history!
                </div>
                <Button
                  onClick={onClose}
                  className="domestika-gradient text-white hover:opacity-90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Start Earning
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
