
import React from 'react';
import { DomestikaCourse } from '@/services/domestikaService';
import CourseCard from './CourseCard';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { useAuth } from '@/contexts/AuthContext';

interface CourseGridProps {
  courses: DomestikaCourse[];
  loading?: boolean;
  title?: string;
  subtitle?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, loading, title, subtitle }) => {
  const { user } = useAuth();
  const { trackActivity } = useActivityTracker();

  const handleCourseClick = async (course: DomestikaCourse) => {
    if (user) {
      await trackActivity('course_selected', {
        course_id: course.id,
        title: course.title,
        instructor: course.instructor,
        category: course.category
      });
    }
    
    // In a real app, this would navigate to the course page
    window.open(`https://www.domestika.org`, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {title && (
          <div className="text-center">
            <h2 className="text-h2 sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-body sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="domestika-card animate-pulse">
              <div className="aspect-video bg-domestika-gray-light rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-domestika-gray-light rounded"></div>
                <div className="h-3 bg-domestika-gray-light rounded w-3/4"></div>
                <div className="h-3 bg-domestika-gray-light rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-h2 sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No courses found. Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleCourseClick(course)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
