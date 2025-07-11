
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileImage, MessageSquare, Star, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockBackend, type FeedbackResponse } from '@/services/mockBackend';

interface ProjectFeedbackProps {
  onBack: () => void;
}

const ProjectFeedback: React.FC<ProjectFeedbackProps> = ({ onBack }) => {
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [feedbackResponse, setFeedbackResponse] = useState<FeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  // Feedback heuristics now handled by mockBackend service

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setUploadedFile(file);
    } else if (file) {
      alert('Please upload only .jpg or .png files');
    }
  };

  // Feedback analysis now handled by mockBackend service

  const handleGetFeedback = async () => {
    setIsLoading(true);
    
    try {
      // Use mock backend service for processing
      const response = await mockBackend.processFeedback({
        description: projectDescription,
        hasImage: !!uploadedFile,
        fileName: uploadedFile?.name
      }, {
        delay: 2000, // 2 second delay to simulate analysis
        debug: true
      });
      
      setFeedbackResponse(response);
      setFeedbackGenerated(true);
    } catch (error) {
      console.error('[ProjectFeedback] Error processing feedback:', error);
      setFeedbackResponse({
        feedback: 'Sorry, there was an error processing your feedback. Please try again.',
        type: 'suggestion'
      });
      setFeedbackGenerated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProjectDescription('');
    setUploadedFile(null);
    setFeedbackResponse(null);
    setFeedbackGenerated(false);
  };

  const getFeedbackIcon = () => {
    return feedbackResponse?.type === 'positive' ? CheckCircle : AlertTriangle;
  };

  const getFeedbackColor = () => {
    return feedbackResponse?.type === 'positive' ? 'text-green-600' : 'text-orange-600';
  };

  const getFeedbackBgColor = () => {
    return feedbackResponse?.type === 'positive' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto modal-fade-in">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8 sm:mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold creative-text-gradient mb-4">
            Intelligent Feedback Loop
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Upload your creative work or describe your project to receive AI-powered insights and personalized feedback to enhance your skills.
          </p>
        </div>

        {!feedbackGenerated ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Upload Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl scale-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Upload Your Project
                </CardTitle>
                <CardDescription>
                  Share images (.jpg, .png) of your creative work for visual analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <FileImage className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG and PNG files
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
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl scale-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Describe Your Project
                </CardTitle>
                <CardDescription>
                  Tell us about your creative work for more targeted feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your project in detail... (e.g., 'This is a character sketch for a fantasy story', 'A wireframe for a mobile food delivery app', 'Logo design for an organic bakery')"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[150px] sm:min-h-[200px] resize-none border-purple-200 focus:border-purple-400"
                />
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Sketch</Badge>
                  <Badge variant="secondary" className="text-xs">Wireframe</Badge>
                  <Badge variant="secondary" className="text-xs">Illustration</Badge>
                  <Badge variant="secondary" className="text-xs">Design</Badge>
                  <Badge variant="secondary" className="text-xs">Logo</Badge>
                  <Badge variant="secondary" className="text-xs">Photography</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className={`bg-white/90 backdrop-blur-sm border-2 shadow-2xl ${getFeedbackBgColor()} scale-fade-in`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
                {React.createElement(getFeedbackIcon(), { className: `w-6 h-6 ${getFeedbackColor()}` })}
                Your Intelligent Feedback
              </CardTitle>
              <CardDescription>
                AI-powered insights based on your project analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-gray-800 leading-relaxed text-lg">
                  {feedbackResponse?.feedback}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex justify-center gap-4">
          {!feedbackGenerated ? (
            <Button
              onClick={handleGetFeedback}
              disabled={isLoading || (!projectDescription.trim() && !uploadedFile)}
              className="creative-gradient text-white hover:opacity-90 px-6 sm:px-8 py-3 text-base sm:text-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Your Project...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Get Feedback
                </>
              )}
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 px-4 sm:px-6"
              >
                Upload Another Project
              </Button>
              <Button
                onClick={handleGetFeedback}
                className="creative-gradient text-white hover:opacity-90 px-4 sm:px-6"
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
