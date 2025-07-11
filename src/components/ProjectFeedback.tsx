
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileImage, MessageSquare, Star, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ProjectFeedbackProps {
  onBack: () => void;
}

const ProjectFeedback: React.FC<ProjectFeedbackProps> = ({ onBack }) => {
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  const mockFeedbacks = [
    "🎨 **Overall Impression**: Your project shows great potential! The composition is well-balanced and your color choices create a harmonious visual flow.\n\n**Strengths**:\n• Strong use of contrast to draw attention\n• Good understanding of visual hierarchy\n• Creative approach to the subject matter\n\n**Areas for Improvement**:\n• Consider refining the typography for better readability\n• The background could use more breathing space\n• Try experimenting with different lighting angles\n\n**Next Steps**: Focus on simplifying complex elements and emphasizing your strongest design choices. Great work overall! 🌟",
    
    "📸 **Creative Analysis**: This project demonstrates solid technical skills with room for artistic growth!\n\n**What's Working Well**:\n• Excellent attention to detail\n• Strong foundational techniques\n• Clear creative vision coming through\n\n**Enhancement Opportunities**:\n• Push the creative boundaries further\n• Consider the emotional impact on viewers\n• Experiment with unconventional approaches\n\n**Recommendation**: Try creating 3 variations of this concept to explore different creative directions. Your technical foundation is strong - now let your creativity soar! ✨",
    
    "🚀 **Project Evaluation**: You're on an exciting creative path! This work shows both technical competence and artistic intuition.\n\n**Highlights**:\n• Innovative problem-solving approach\n• Good grasp of design principles\n• Unique perspective that sets it apart\n\n**Growth Areas**:\n• Refine the execution of your strongest ideas\n• Consider the user/viewer experience more deeply\n• Balance complexity with clarity\n\n**Action Plan**: Focus your next iteration on amplifying what makes this project uniquely yours. Consider studying similar works by established artists for inspiration! 🎯"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleGenerateFeedback = () => {
    if (!projectDescription.trim() && !uploadedFile) {
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const randomFeedback = mockFeedbacks[Math.floor(Math.random() * mockFeedbacks.length)];
      setFeedback(randomFeedback);
      setIsLoading(false);
      setFeedbackGenerated(true);
    }, 2000);
  };

  const handleReset = () => {
    setProjectDescription('');
    setUploadedFile(null);
    setFeedback('');
    setFeedbackGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold creative-text-gradient mb-4">
            Upload Project for Feedback
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized, constructive feedback on your creative work from our AI assistant. Upload your project and describe your goals.
          </p>
        </div>

        {!feedbackGenerated ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Upload Your Project
                </CardTitle>
                <CardDescription>
                  Share your creative work for detailed analysis and feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    accept="image/*,video/*,.pdf,.psd,.ai,.sketch"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <FileImage className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports images, videos, PDFs, and design files
                    </p>
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileImage className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-800">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Project Description
                </CardTitle>
                <CardDescription>
                  Tell us about your project, goals, and specific areas you'd like feedback on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your project... What were you trying to achieve? What challenges did you face? What specific feedback are you looking for?"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[200px] resize-none border-purple-200 focus:border-purple-400"
                />
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Visual Design</Badge>
                  <Badge variant="secondary" className="text-xs">User Experience</Badge>
                  <Badge variant="secondary" className="text-xs">Technical Implementation</Badge>
                  <Badge variant="secondary" className="text-xs">Creative Direction</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl creative-text-gradient">
                <Star className="w-6 h-6 text-yellow-500" />
                Your Personalized Feedback
              </CardTitle>
              <CardDescription>
                Detailed analysis and recommendations for your creative project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {feedback}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {!feedbackGenerated ? (
            <Button
              onClick={handleGenerateFeedback}
              disabled={!projectDescription.trim() && !uploadedFile || isLoading}
              className="creative-gradient text-white hover:opacity-90 px-8 py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Your Project...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Get AI Feedback
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 px-6"
              >
                Upload Another Project
              </Button>
              <Button
                onClick={handleGenerateFeedback}
                className="creative-gradient text-white hover:opacity-90 px-6"
              >
                Get More Feedback
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFeedback;
