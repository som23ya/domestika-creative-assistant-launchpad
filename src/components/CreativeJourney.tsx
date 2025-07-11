
import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, Palette, Camera, Code, Music, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CreativeJourneyProps {
  onBack: () => void;
}

const CreativeJourney: React.FC<CreativeJourneyProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setAiResponse(mockResponses[categoryId as keyof typeof mockResponses]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold creative-text-gradient mb-4">
            Start Your Creative Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your creative path and let our AI assistant guide you with personalized recommendations and inspiration.
          </p>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
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
        )}
      </div>
    </div>
  );
};

export default CreativeJourney;
