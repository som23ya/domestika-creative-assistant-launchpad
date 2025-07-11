
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import CreativeJourney from '@/components/CreativeJourney';
import ProjectFeedback from '@/components/ProjectFeedback';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'journey' | 'feedback'>('home');

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

  if (currentView === 'journey') {
    return <CreativeJourney onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'feedback') {
    return <ProjectFeedback onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 fade-in-up">
            <h2 className="text-5xl md:text-7xl font-bold creative-text-gradient mb-6 leading-tight">
              Unleash Your
              <br />
              Creative Potential
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your personal AI assistant for creative growth, inspiration, and expert feedback. 
              Join thousands of artists elevating their craft with intelligent guidance.
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 fade-in-up">
            <Button
              onClick={() => setCurrentView('journey')}
              className="creative-gradient text-white hover:opacity-90 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Start Your Creative Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={() => setCurrentView('feedback')}
              variant="outline"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105"
            >
              Upload Project for Feedback
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Floating Creative Elements */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 creative-gradient rounded-full opacity-20 floating-animation"></div>
            <div className="absolute -bottom-5 -right-15 w-16 h-16 bg-pink-400 rounded-full opacity-30 floating-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-5 right-10 w-12 h-12 bg-blue-400 rounded-full opacity-25 floating-animation" style={{animationDelay: '4s'}}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Creative Assistant?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI and inspired by the Domestika creative community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="text-center border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 creative-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold creative-text-gradient">10K+</div>
              <div className="text-gray-600">Projects Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold creative-text-gradient">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold creative-text-gradient">24/7</div>
              <div className="text-gray-600">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-gray-600">
            Powered by advanced AI technology • Inspired by creative excellence
          </p>
          <div className="flex justify-center items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500 creative-text-gradient font-medium">
              Domestika Creative Assistant
            </span>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Prototype by <span className="font-medium text-gray-700">AI Assistant</span> for Domestika Take-Home Assignment
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
