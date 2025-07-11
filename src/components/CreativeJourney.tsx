
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Lightbulb, Palette, Camera, Code, Music, PenTool, BookOpen, Target, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockBackend, searchCreativeInterests, type SkillRecommendation } from '@/services/mockBackend';

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
  
  // Predictive search state
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  // Predictive search functions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInterest(value);
    
    if (value.trim().length >= 2) {
      const suggestions = searchCreativeInterests(value, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInterest(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        handlePersonalizedSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(searchSuggestions[activeSuggestionIndex]);
        } else {
          handlePersonalizedSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
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
      <div className="min-h-screen bg-white py-4 sm:py-8 px-domestika">
        <div className="max-w-domestika mx-auto modal-fade-in">
          <Button 
            onClick={() => setShowPersonalizedJourney(false)}
            variant="ghost" 
            className="mb-6 text-domestika-coral hover:text-domestika-coral-dark hover:bg-domestika-gray-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journey Options
          </Button>

          <div className="text-center mb-8 slide-up">
            <h2 className="text-h2 sm:text-3xl md:text-4xl font-bold domestika-text-coral mb-4">
              Personalized Skill Journey
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto px-4">
              Tell us your creative interests and get personalized course recommendations and practice exercises.
            </p>
          </div>

          <Card className="domestika-card mb-8 scale-fade-in">
            <CardHeader>
              <CardTitle className="text-xl domestika-text-coral flex items-center">
                <Target className="w-5 h-5 mr-2" />
                What interests you?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your creative interests (e.g., "illustration", "UX design", "photography")
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interest">Your Creative Interest</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      id="interest"
                      placeholder="Type to search: illustration, UX design, photography..."
                      value={userInterest}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      className="flex-1"
                      autoComplete="off"
                    />
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-domestika shadow-lg z-50 max-h-60 overflow-y-auto animate-fade-in"
                      >
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full text-left px-4 py-3 hover:bg-domestika-gray-light transition-colors border-b border-gray-100 last:border-b-0 ${
                              index === activeSuggestionIndex 
                                ? 'bg-domestika-gray-light domestika-text-coral' 
                                : 'text-foreground'
                            }`}
                          >
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-2 text-domestika-coral flex-shrink-0" />
                              <span className="font-medium capitalize">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handlePersonalizedSubmit}
                    disabled={!userInterest.trim() || isLoading}
                    className="domestika-button hover:bg-domestika-coral-dark px-6"
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-domestika-coral"></div>
                  <span className="ml-3 text-muted-foreground">Generating personalized recommendations...</span>
                </div>
              )}

              {!isLoading && userInterest && (
                <div className="mt-6">
                  {recommendations ? (
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold domestika-text-coral mb-4">
                        Recommendations for "{userInterest}"
                      </h3>
                      
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="domestika-card bg-domestika-gray-light">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center domestika-text-coral">
                              <BookOpen className="w-5 h-5 mr-2" />
                              Recommended Course
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium text-foreground">
                              {recommendations.course}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              A comprehensive course tailored to your interests
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="domestika-card bg-accent/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center text-domestika-blue">
                              <Target className="w-5 h-5 mr-2" />
                              Practice Exercise
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium text-foreground">
                              {recommendations.exercise}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Hands-on practice to develop your skills
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <Card className="domestika-card bg-accent/10 border-domestika-coral/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="domestika-text-coral mb-2">
                            <Lightbulb className="w-8 h-8 mx-auto" />
                          </div>
                          <p className="text-foreground font-medium mb-2">
                            Sorry, I don't have recommendations for that interest yet.
                          </p>
                          <p className="text-muted-foreground text-sm">
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
      <div className="min-h-screen bg-white py-4 sm:py-8 px-domestika">
        <div className="max-w-domestika mx-auto modal-fade-in">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 text-domestika-coral hover:text-domestika-coral-dark hover:bg-domestika-gray-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="domestika-card scale-fade-in">
            <CardHeader>
              <CardTitle className="text-h2 domestika-text-coral">
                Your Creative Path: {categories.find(c => c.id === selectedCategory)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-domestika-coral"></div>
                  <span className="ml-4 text-lg text-muted-foreground">Generating personalized recommendations...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="domestika-bg-light p-6 rounded-domestika">
                      <pre className="whitespace-pre-wrap font-domestika text-foreground leading-relaxed">
                        {aiResponse}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      onClick={() => setSelectedCategory(null)}
                      variant="outline"
                      className="border-input text-foreground hover:bg-domestika-gray-light"
                    >
                      Explore Other Categories
                    </Button>
                    <Button 
                      onClick={() => handleCategorySelect(selectedCategory)}
                      className="domestika-button hover:bg-domestika-coral-dark"
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
    <div className="min-h-screen bg-white py-4 sm:py-8 px-domestika">
      <div className="max-w-domestika mx-auto modal-fade-in">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-domestika-coral hover:text-domestika-coral-dark hover:bg-domestika-gray-light"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8 sm:mb-12 slide-up">
          <h2 className="text-h2 sm:text-3xl md:text-4xl font-bold domestika-text-coral mb-4">
            Start Your Creative Journey
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Choose how you'd like to begin your creative adventure with our AI assistant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
            <Button
              onClick={() => setShowPersonalizedJourney(true)}
              className="domestika-button hover:bg-domestika-coral-dark transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-domestika shadow-md transform hover:scale-105"
            >
              <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Personalized Skill Journey
            </Button>
            
            <Button
              onClick={() => {}}
              variant="outline"
              className="border-2 border-input bg-white text-foreground hover:bg-secondary transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-domestika shadow-md transform hover:scale-105"
            >
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Browse Categories
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="domestika-card cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${category.color} rounded-domestika flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground text-sm sm:text-base">
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
