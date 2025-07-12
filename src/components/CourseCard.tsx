
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Trophy } from 'lucide-react';
import { DomestikaCourse } from '@/services/domestikaService';

interface CourseCardProps {
  course: DomestikaCourse;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const handleCourseClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(course.url, '_blank');
    }
  };

  return (
    <Card 
      className="domestika-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCourseClick}
    >
      <div className="aspect-video bg-domestika-gray-light rounded-t-domestika overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs bg-domestika-green text-white">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg font-bold text-foreground line-clamp-2 mb-2">
          {course.title}
        </CardTitle>
        
        <CardDescription className="text-sm text-muted-foreground">
          by {course.instructor}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{course.students}</span>
            </div>
          </div>
          <div className="font-medium text-primary">
            {course.price}
          </div>
        </div>
        
        {/* Points Badge */}
        <div className="flex items-center justify-center">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-xs">
            <Trophy className="w-3 h-3 mr-1" />
            Earn 50 points
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
