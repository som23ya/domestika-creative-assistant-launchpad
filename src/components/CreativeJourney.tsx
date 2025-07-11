
import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, Palette, Camera, Code, Music, PenTool, BookOpen, Target, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockBackend, type SkillRecommendation } from '@/services/mockBackend';

interface CreativeJourneyProps {
  onBack: () => void;
}

// Using SkillRecommendation from mockBackend service

const CreativeJourney: React.FC<CreativeJourneyProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInterest, setUserInterest] = useState('');
  const [recommendations, setRecommendations] = useState<SkillRecommendation | null>(null);
  const [showPersonalizedJourney, setShowPersonalizedJourney] = useState(false);

  const categories = [
    { id: 'design', name: 'Graphic Design', icon: Palette, color: 'bg-purple-500' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'bg-blue-500' },
    { id: 'illustration', name: 'Illustration', icon: PenTool, color: 'bg-pink-500' },
    { id: 'web', name: 'Web Design', icon: Code, color: 'bg-green-500' },
    { id: 'music', name: 'Music Production', icon: Music, color: 'bg-orange-500' },
    { id: 'general', name: 'Creative Inspiration', icon: Lightbulb, color: 'bg-yellow-500' }
  ];

  const mockResponses = {
    design: "🎨 Welcome to your graphic design journey! Here are some inspiring ideas to get you started:\n\n• Explore minimalist poster designs with bold typography\n• Try creating brand identity systems for fictional companies\n• Experiment with color psychology in your compositions\n• Study the masters: Swiss design, Bauhaus, and modern trends\n\nReady to create something amazing? Start with a simple logo design challenge!",
    photography: "📸 Your photography adventure begins here! Let's capture the world through your lens:\n\n• Master the golden hour - shoot during sunrise/sunset\n• Practice the rule of thirds and leading lines\n• Experiment with macro photography of everyday objects\n• Try street photography to tell compelling stories\n\nChallenge: Take 10 photos today focusing on shadows and light patterns!",
    illustration: "✏️ Time to bring your imagination to life through illustration:\n\n• Start with daily sketching - even 15 minutes counts\n• Explore different styles: realistic, abstract, cartoon, minimalist\n• Practice drawing from life before stylizing\n• Study anatomy, perspective, and composition fundamentals\n\nToday's challenge: Illustrate your favorite childhood memory in your unique style!",
    web: "💻 Let's build beautiful and functional web experiences:\n\n• Focus on user experience (UX) first, aesthetics second\n• Learn responsive design principles for all devices\n• Explore modern CSS techniques and animations\n• Study accessibility guidelines for inclusive design\n\nProject idea: Design a portfolio site that tells your creative story!",
    music: "🎵 Your musical creativity journey starts with these steps:\n\n• Experiment with different genres and instruments\n• Learn basic music theory to enhance your compositions\n• Use digital audio workstations (DAWs) to produce tracks\n• Collaborate with other musicians for fresh perspectives\n\nChallenge: Create a 30-second melody that captures your current mood!",
    general: "💡 Ignite your creative spark with these universal principles:\n\n• Embrace constraints - they fuel creativity\n• Keep a daily creative journal or sketchbook\n• Seek inspiration from nature, architecture, and cultures\n• Don't fear failure - it's part of the creative process\n\nToday's inspiration: Create something using only 3 colors and 2 shapes!"
  };

  // Skill recommendations now handled by mockBackend service

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setAiResponse(mockResponses[categoryId as keyof typeof mockResponses]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePersonalizedSubmit = async () => {
    if (!userInterest.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Use mock backend service for processing
      const recommendation = await mockBackend.processSkillJourney(userInterest, {
        delay: 1000,
        debug: true
      });
      
      setRecommendations(recommendation);
    } catch (error) {
      console.error('[CreativeJourney] Error processing skill journey:', error);
      setRecommendations(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePersonalizedSubmit();
    }
  };

  if (showPersonalizedJourney) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-4 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto modal-fade-in">
          <Button 
            onClick={() => setShowPersonalizedJourney(false)}
            variant="ghost" 
            className="mb-6 text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journey Options
          </Button>

          <div className="text-center mb-8 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold creative-text-gradient mb-4">
              Personalized Skill Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Tell us your creative interests and get personalized course recommendations and practice exercises.
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl mb-8 scale-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl creative-text-gradient flex items-center">
                <Target className="w-6 h-6 mr-2" />
                What interests you?
              </CardTitle>
              <CardDescription>
                Enter your creative interests (e.g., "illustration", "UX design", "photography")
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interest">Your Creative Interest</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="interest"
                    placeholder="Enter your creative interest, like illustration or UX design"
                    value={userInterest}
                    onChange={(e) => setUserInterest(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handlePersonalizedSubmit}
                    disabled={!userInterest.trim() || isLoading}
                    className="creative-gradient text-white hover:opacity-90 px-6"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600">Generating personalized recommendations...</span>
                </div>
              )}

              {!isLoading && userInterest && (
                <div className="mt-6">
                  {recommendations ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold creative-text-gradient mb-4">
                        Recommendations for "{userInterest}"
                      </h3>
                      
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center text-purple-700">
                              <BookOpen className="w-5 h-5 mr-2" />
                              Recommended Course
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium text-gray-800">
                              {recommendations.course}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              A comprehensive course tailored to your interests
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-pink-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center text-blue-700">
                              <Target className="w-5 h-5 mr-2" />
                              Practice Exercise
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium text-gray-800">
                              {recommendations.exercise}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              Hands-on practice to develop your skills
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <Card className="border border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-orange-600 mb-2">
                            <Lightbulb className="w-8 h-8 mx-auto" />
                          </div>
                          <p className="text-orange-800 font-medium mb-2">
                            Sorry, I don't have recommendations for that interest yet.
                          </p>
                          <p className="text-orange-700 text-sm">
                            Try "illustration", "UX design", "photography", "graphic design", or "animation"!
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-4 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto modal-fade-in">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl scale-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl creative-text-gradient">
                Your Creative Path: {categories.find(c => c.id === selectedCategory)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <span className="ml-4 text-lg text-gray-600">Generating personalized recommendations...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
                      <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                        {aiResponse}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <Button 
                      onClick={() => setSelectedCategory(null)}
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Explore Other Categories
                    </Button>
                    <Button 
                      onClick={() => handleCategorySelect(selectedCategory)}
                      className="creative-gradient text-white hover:opacity-90"
                    >
                      Get More Ideas
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto modal-fade-in">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8 sm:mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold creative-text-gradient mb-4">
            Start Your Creative Journey
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Choose how you'd like to begin your creative adventure with our AI assistant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
            <Button
              onClick={() => setShowPersonalizedJourney(true)}
              className="creative-gradient text-white hover:opacity-90 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105"
            >
              <Target className="w-6 h-6 mr-2" />
              Personalized Skill Journey
            </Button>
            
            <Button
              onClick={() => {}}
              variant="outline"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105"
            >
              <Lightbulb className="w-6 h-6 mr-2" />
              Browse Categories
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Explore the world of {category.name.toLowerCase()} with AI-powered guidance and inspiration.
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeJourney;
