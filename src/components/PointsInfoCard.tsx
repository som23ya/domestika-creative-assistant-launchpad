
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Upload, BookOpen, Zap, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { useSearchParams } from 'react-router-dom';

const PointsInfoCard = () => {
  const { user } = useAuth();
  const { getUserPoints } = useActivityTracker();
  const [totalPoints, setTotalPoints] = useState(0);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      loadPoints();
    }
  }, [user]);

  const loadPoints = async () => {
    const points = await getUserPoints();
    setTotalPoints(points);
  };

  const handleUploadClick = () => {
    setSearchParams({ view: 'feedback' });
  };

  const handleCourseClick = () => {
    // Scroll to courses section
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExerciseClick = () => {
    setSearchParams({ view: 'journey' });
  };

  const pointsActivities = [
    {
      icon: Upload,
      activity: 'Upload Project for AI Feedback',
      points: 20,
      description: 'Get personalized insights on your creative work',
      onClick: handleUploadClick
    },
    {
      icon: BookOpen,
      activity: 'Select a Course',
      points: 50,
      description: 'Choose courses that match your interests',
      onClick: handleCourseClick
    },
    {
      icon: Zap,
      activity: 'Complete an Exercise',
      points: 50,
      description: 'Practice and improve your skills',
      onClick: handleExerciseClick
    }
  ];

  return (
    <Card className="domestika-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-orange-500" />
          Earn Points & Level Up
          {user && (
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 ml-auto">
              {totalPoints} Points
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Complete activities to earn points and track your creative journey!
        </p>
        
        <div className="space-y-3">
          {pointsActivities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border border-border rounded-domestika hover:bg-accent/10 transition-colors cursor-pointer"
              onClick={item.onClick}
            >
              <div className="w-10 h-10 domestika-gradient rounded-full flex items-center justify-center text-white">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{item.activity}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                +{item.points}
              </Badge>
            </div>
          ))}
        </div>

        {!user && (
          <div className="text-center text-sm text-muted-foreground mt-4 p-3 bg-accent/10 rounded-domestika">
            <Star className="w-4 h-4 inline mr-1" />
            Sign in to start earning points and track your progress!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsInfoCard;
