
import React, { useState } from 'react';
import { ArrowLeft, Upload, FileImage, MessageSquare, Star, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
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
  const [feedbackType, setFeedbackType] = useState<'positive' | 'suggestion' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  // Heuristics for feedback generation
  const feedbackHeuristics = {
    'sketch': {
      type: 'suggestion',
      responses: [
        "Your sketch shows strong foundational composition! Consider adding more line weight variation to create depth and visual hierarchy. Try using thicker lines for foreground elements and thinner lines for background details.",
        "Great character concept! To enhance your sketch, experiment with different shading techniques like cross-hatching or stippling to add texture and dimension.",
        "Your proportions are well-balanced. For the next iteration, try adding more dynamic poses or gestures to bring more life and energy to your character."
      ]
    },
    'wireframe': {
      type: 'suggestion',
      responses: [
        "Your wireframe demonstrates good information architecture! Consider adding more spacing between elements for better visual breathing room and improved usability.",
        "Solid layout structure! To enhance user experience, try incorporating more visual hierarchy through different text sizes and button prominence.",
        "Great foundation for your interface! Consider adding breadcrumbs or navigation indicators to help users understand their location within the app flow."
      ]
    },
    'illustration': {
      type: 'positive',
      responses: [
        "Your illustration showcases excellent color harmony! The palette creates a cohesive mood. Consider experimenting with complementary colors for accent elements to make key areas pop.",
        "Beautiful artistic style! Your use of light and shadow creates great depth. Try adding more contrast in focal areas to guide the viewer's eye through your composition.",
        "Fantastic attention to detail! Your illustration has strong visual appeal. Consider adding subtle textures or patterns to enhance the overall richness of your artwork."
      ]
    },
    'design': {
      type: 'suggestion',
      responses: [
        "Your design concept has strong visual appeal! Consider testing different typography pairings to enhance readability and create better brand consistency.",
        "Great use of white space! To improve accessibility, ensure your color choices meet WCAG contrast guidelines, especially for text elements.",
        "Solid design foundation! Try experimenting with different grid systems or alignment techniques to create more dynamic and engaging layouts."
      ]
    },
    'logo': {
      type: 'positive',
      responses: [
        "Your logo design has strong brand potential! The concept is memorable and distinctive. Consider testing scalability at different sizes to ensure it works across all applications.",
        "Excellent use of symbolism! Your logo effectively communicates the brand message. Try exploring monochrome versions to ensure versatility across different media.",
        "Great typography integration! The logo has professional appeal. Consider creating variations for different use cases (horizontal, stacked, icon-only)."
      ]
    },
    'photography': {
      type: 'positive',
      responses: [
        "Your composition follows the rule of thirds beautifully! The lighting creates excellent mood and atmosphere. Consider experimenting with different aperture settings for varied depth of field effects.",
        "Fantastic capture of the moment! Your timing and framing are excellent. Try exploring different perspectives or angles to add more dynamic visual interest.",
        "Great attention to detail in your shot! The colors are vibrant and well-balanced. Consider post-processing techniques to enhance contrast and bring out more detail in shadows."
      ]
    }
  };

  const imageUploadFeedback = [
    "Your uploaded image shows great visual appeal! The composition draws the viewer's eye effectively. Consider adjusting the contrast slightly to improve accessibility and make key elements more prominent.",
    "Excellent color palette choice! The tones work harmoniously together. For your next iteration, try experimenting with different lighting angles to add more depth and dimension.",
    "Strong visual foundation! Your image has good balance and proportion. Consider adding more texture or pattern elements to enhance visual interest and engagement.",
    "Great attention to detail in your work! The overall aesthetic is cohesive and professional. Try exploring different cropping options to see how they affect the composition's impact."
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setUploadedFile(file);
    } else if (file) {
      alert('Please upload only .jpg or .png files');
    }
  };

  const analyzeInput = () => {
    const description = projectDescription.toLowerCase();
    
    // Check for keywords in description
    for (const [keyword, feedbackData] of Object.entries(feedbackHeuristics)) {
      if (description.includes(keyword)) {
        const randomResponse = feedbackData.responses[Math.floor(Math.random() * feedbackData.responses.length)];
        return {
          feedback: randomResponse,
          type: feedbackData.type as 'positive' | 'suggestion'
        };
      }
    }

    // If image is uploaded but no matching keywords in description
    if (uploadedFile) {
      const randomImageFeedback = imageUploadFeedback[Math.floor(Math.random() * imageUploadFeedback.length)];
      return {
        feedback: randomImageFeedback,
        type: 'positive' as const
      };
    }

    // Fallback for unrecognized input
    return {
      feedback: "I'd love to provide more specific feedback! Try describing your project using keywords like 'sketch', 'wireframe', 'illustration', 'design', 'logo', or 'photography' for more targeted suggestions.",
      type: 'suggestion' as const
    };
  };

  const handleGetFeedback = () => {
    if (!projectDescription.trim() && !uploadedFile) {
      setFeedback('Please upload an image or describe your project to receive personalized feedback.');
      setFeedbackType('suggestion');
      setFeedbackGenerated(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const result = analyzeInput();
      setFeedback(result.feedback);
      setFeedbackType(result.type);
      setIsLoading(false);
      setFeedbackGenerated(true);
    }, 2000);
  };

  const handleReset = () => {
    setProjectDescription('');
    setUploadedFile(null);
    setFeedback('');
    setFeedbackType('');
    setFeedbackGenerated(false);
  };

  const getFeedbackIcon = () => {
    return feedbackType === 'positive' ? CheckCircle : AlertTriangle;
  };

  const getFeedbackColor = () => {
    return feedbackType === 'positive' ? 'text-green-600' : 'text-orange-600';
  };

  const getFeedbackBgColor = () => {
    return feedbackType === 'positive' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200';
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
            Intelligent Feedback Loop
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your creative work or describe your project to receive AI-powered insights and personalized feedback to enhance your skills.
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
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
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
                  placeholder="Describe your project... (e.g., 'This is a character sketch', 'A wireframe for a mobile app', 'Logo design for a bakery')"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[200px] resize-none border-purple-200 focus:border-purple-400"
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
          <Card className={`bg-white/90 backdrop-blur-sm border-2 shadow-2xl ${getFeedbackBgColor()}`}>
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
                  {feedback}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {!feedbackGenerated ? (
            <Button
              onClick={handleGetFeedback}
              disabled={isLoading}
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
                  Get Feedback
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
                onClick={handleGetFeedback}
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
