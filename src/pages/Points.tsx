
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Upload, BookOpen, Zap, LogIn, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Points = () => {
  const { user } = useAuth();
  const { getUserPoints, getUserActivity } = useActivityTracker();
  const [totalPoints, setTotalPoints] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadPointsData();
    } else {
      setLoading(false);
      setTotalPoints(0);
      setActivities([]);
    }
  }, [user]);

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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold domestika-text-coral mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8" />
            {user ? 'Your Progress' : 'Track Your Progress'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {user ? 'See how many points you\'ve earned on your creative journey' : 'Sign in to start earning points and tracking your creative journey'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Total Points Card */}
            <Card className="domestika-card">
              <CardContent className="text-center p-8">
                <div className="text-6xl font-bold domestika-text-coral mb-4">
                  {user ? totalPoints : 0}
                </div>
                <div className="text-xl text-muted-foreground">
                  {user ? 'Total Points Earned' : 'Sign in to start earning points!'}
                </div>
              </CardContent>
            </Card>

            {/* How to Earn Points */}
            <Card className="domestika-card">
              <CardHeader>
                <CardTitle className="text-2xl">How to Earn Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 p-4 border border-border rounded-domestika">
                    <div className="w-12 h-12 domestika-gradient rounded-full flex items-center justify-center text-white">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Upload Project</div>
                      <div className="text-sm text-muted-foreground">+20 points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-border rounded-domestika">
                    <div className="w-12 h-12 domestika-gradient rounded-full flex items-center justify-center text-white">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Select Course</div>
                      <div className="text-sm text-muted-foreground">+50 points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-border rounded-domestika">
                    <div className="w-12 h-12 domestika-gradient rounded-full flex items-center justify-center text-white">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Complete Exercise</div>
                      <div className="text-sm text-muted-foreground">+50 points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user ? (
              /* Activity History for logged-in users */
              <Card className="domestika-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.length === 0 ? (
                      <div className="text-center py-12">
                        <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">
                          No activity yet. Start exploring to earn points!
                        </p>
                      </div>
                    ) : (
                      activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-4 border border-border rounded-domestika"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 domestika-gradient rounded-full flex items-center justify-center text-white">
                              {getActivityIcon(activity.activity_type)}
                            </div>
                            <div>
                              <div className="font-semibold">
                                {getActivityLabel(activity.activity_type)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(activity.timestamp)}
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-lg px-3 py-1">
                            +{activity.activity_details?.points_earned || 0}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Sign in prompt for non-logged-in users */
              <Card className="domestika-card">
                <CardContent className="text-center p-8">
                  <LogIn className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h3>
                  <p className="text-muted-foreground mb-6">
                    Sign in to track your progress, earn points, and see your activity history!
                  </p>
                  <Button
                    onClick={() => navigate('/?showLogin=true')}
                    className="domestika-gradient text-white hover:opacity-90"
                    size="lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In to Start Earning
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Points;
