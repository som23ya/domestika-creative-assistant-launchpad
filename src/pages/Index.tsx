import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import CreativeJourney from '@/components/CreativeJourney';
import ProjectFeedback from '@/components/ProjectFeedback';
import CourseGrid from '@/components/CourseGrid';
import PointsInfoCard from '@/components/PointsInfoCard';
import Footer from '@/components/Footer';
import { domestikaService, DomestikaCourse } from '@/services/domestikaService';
import { useSearchParams } from 'react-router-dom';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const [currentView, setCurrentView] = useState<'home' | 'journey' | 'feedback'>(
    viewParam === 'journey' ? 'journey' : viewParam === 'feedback' ? 'feedback' : 'home'
  );
  const [recommendedCourses, setRecommendedCourses] = useState<DomestikaCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<DomestikaCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Get personalized creative guidance tailored to your unique style and goals.'
    },
    {
      icon: Users,
      title: 'Community Inspired',
      description: 'Learn from techniques and approaches used by thousands of Domestika creators.'
    },
    {
      icon: Award,
      title: 'Expert-Level Feedback',
      description: 'Receive detailed critiques that help you grow as a creative professional.'
    },
    {
      icon: Zap,
      title: 'Instant Inspiration',
      description: 'Break through creative blocks with AI-generated ideas and prompts.'
    }
  ];

  // Update view when URL params change
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'journey') {
      setCurrentView('journey');
    } else if (view === 'feedback') {
      setCurrentView('feedback');
    } else {
      setCurrentView('home');
    }
  }, [searchParams]);

  // Load recommended courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCoursesLoading(true);
        const courses = await domestikaService.getPopularCourses(12);
        setRecommendedCourses(courses);
        setFilteredCourses(courses);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Handle category selection from header
  const handleCategorySelect = async (categorySlug: string) => {
    try {
      setCoursesLoading(true);
      setSelectedCategory(categorySlug);
      const courses = await domestikaService.getCoursesByCategory(categorySlug, 12);
      setFilteredCourses(courses);
    } catch (error) {
      console.error('Failed to load category courses:', error);
      setFilteredCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  // Reset to show all courses
  const handleShowAllCourses = async () => {
    try {
      setCoursesLoading(true);
      setSelectedCategory(null);
      setFilteredCourses(recommendedCourses);
    } catch (error) {
      console.error('Failed to reset courses:', error);
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleBackToHome = () => {
    setSearchParams({});
    setCurrentView('home');
  };

  if (currentView === 'journey') {
    return <CreativeJourney onBack={handleBackToHome} />;
  }

  if (currentView === 'feedback') {
    return (
      <div className="min-h-screen bg-white">
        <Header onCategorySelect={handleCategorySelect} />
        <div className="py-8 px-domestika">
          <div className="max-w-domestika mx-auto">
            <ProjectFeedback onBack={handleBackToHome} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCoursesSectionTitle = () => {
    if (selectedCategory) {
      const category = domestikaService.getCategories().find(cat => cat.slug === selectedCategory);
      return `${category?.name || 'Category'} Courses`;
    }
    return 'Recommended Courses from Domestika';
  };

  const getCoursesSectionSubtitle = () => {
    if (selectedCategory) {
      return 'Discover courses in your selected category';
    }
    return 'Explore popular courses handpicked from Domestika\'s extensive catalog';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onCategorySelect={handleCategorySelect} />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-domestika">
        <div className="max-w-domestika mx-auto text-center">
          <div className="mb-8 fade-in-up">
            <h1 className="text-h1 sm:text-5xl md:text-6xl font-bold domestika-text-coral mb-6 leading-tight">
              Unleash Your
              <br />
              Creative Potential
            </h1>
            <p className="text-body sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI assistant for creative growth, inspiration, and expert feedback. 
              Join thousands of artists elevating their craft with intelligent guidance.
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 fade-in-up">
            <Button
              onClick={() => {
                setSearchParams({ view: 'journey' });
                setCurrentView('journey');
              }}
              className="domestika-gradient text-white hover:bg-domestika-coral-dark transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-domestika shadow-md transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Start Your Creative Journey
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
            
            <Button
              onClick={() => {
                setSearchParams({ view: 'feedback' });
                setCurrentView('feedback');
              }}
              variant="outline"
              className="border-2 border-input bg-white text-foreground hover:bg-secondary transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-domestika shadow-md transform hover:scale-105"
            >
              Upload Project for Feedback
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>

          {/* Floating Creative Elements */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-16 h-16 bg-domestika-green rounded-full opacity-20 floating-animation"></div>
            <div className="absolute -bottom-5 -right-15 w-12 h-12 bg-domestika-blue rounded-full opacity-30 floating-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-5 right-10 w-8 h-8 bg-domestika-coral rounded-full opacity-25 floating-animation" style={{animationDelay: '4s'}}></div>
          </div>
        </div>
      </section>

      {/* Points Info Section */}
      <section className="py-12 px-domestika">
        <div className="max-w-domestika mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PointsInfoCard />
            </div>
            <div className="space-y-6">
              <Card className="domestika-card text-center">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 domestika-gradient rounded-domestika flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Track Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Monitor your creative journey with our comprehensive points system and activity tracking.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section id="courses-section" className="py-12 sm:py-20 px-domestika bg-white">
        <div className="max-w-domestika mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div></div>
            {selectedCategory && (
              <Button
                onClick={handleShowAllCourses}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Show All Courses
              </Button>
            )}
          </div>
          
          <CourseGrid
            courses={filteredCourses}
            loading={coursesLoading}
            title={getCoursesSectionTitle()}
            subtitle={getCoursesSectionSubtitle()}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-domestika domestika-bg-light">
        <div className="max-w-domestika mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-h2 sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Creative Assistant?
            </h2>
            <p className="text-body sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI and inspired by the Domestika creative community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="domestika-card text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 domestika-gradient rounded-domestika flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-domestika">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold domestika-text-coral">10K+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Projects Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold domestika-text-coral">95%</div>
              <div className="text-muted-foreground text-sm sm:text-base">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold domestika-text-coral">24/7</div>
              <div className="text-muted-foreground text-sm sm:text-base">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
