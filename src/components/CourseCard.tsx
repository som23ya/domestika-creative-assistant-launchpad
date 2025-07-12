
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock } from 'lucide-react';
import { DomestikaCourse } from '@/services/domestikaService';

interface CourseCardProps {
  course: DomestikaCourse;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <Card 
      className="domestika-card cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 h-full"
      onClick={onClick}
    >
      <div className="aspect-video bg-domestika-gray-light rounded-t-lg flex items-center justify-center">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover rounded-t-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-domestika-gray-light">
                <span class="text-muted-foreground text-sm">Course Thumbnail</span>
              </div>
            `;
          }}
        />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold text-foreground leading-tight line-clamp-2">
            {course.title}
          </CardTitle>
          <Badge variant="secondary" className="flex-shrink-0 text-xs">
            {course.level}
          </Badge>
        </div>
        <CardDescription className="text-domestika-coral font-medium">
          {course.instructor}
        </CardDescription>
      </CardContent>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="mt-3 text-xs">
          {course.category}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
