
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, FileImage, MessageSquare, Star, TrendingUp, Eye, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateFeedback } from '@/services/mockBackend';
import { useAuth } from '@/contexts/AuthContext';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { supabase } from '@/integrations/supabase/client';
import { ActivityHistoryModal } from './ActivityHistoryModal';

interface ProjectFeedbackProps {
  onBack?: () => void;
}

const ProjectFeedback: React.FC<ProjectFeedbackProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { trackActivity } = useActivityTracker();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFeedback(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    try {
      let projectId = '';
      
      // Upload file to Supabase Storage if user is logged in
      if (user) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-uploads')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        projectId = uploadData.path;

        // Track project upload activity - this awards points for upload
        await trackActivity('project_upload', {
          project_id: projectId,
          filename: file.name
        });
      }

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = generateFeedback();
      setFeedback(result);

      // Track feedback received activity if user is logged in - this awards additional points for receiving feedback
      if (user) {
        await trackActivity('feedback_received', {
          project_id: projectId,
          feedback: result.feedback,
          rating: result.rating
        });
      }
      
      toast({
        title: "Analysis Complete!",
        description: "Your project has been analyzed and feedback is ready.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setFeedback(null);
  };

  return (
    <div className="space-y-domestika">
      <div className="text-center mb-domestika">
        <h2 className="text-h2 font-bold text-foreground mb-4">
          Intelligent Feedback Loop
        </h2>
        <p className="text-body text-muted-foreground max-w-2xl mx-auto">
          Upload your creative work to receive AI-powered insights and personalized feedback
        </p>
        {user && (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 mt-2">
            Earn 40 points total (20 for upload + 20 for feedback)
          </Badge>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-domestika">
        {/* Upload Section */}
        <Card className="domestika-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Your Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-domestika p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop your image here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, and other image formats
                </p>
              </label>
            </div>
            
            {file && (
              <div className="bg-accent/10 p-4 rounded-domestika">
                <div className="flex items-center gap-3">
                  <FileImage className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="domestika-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!feedback ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Upload an image to receive detailed feedback
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Feedback</h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {feedback.rating}/10
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feedback.feedback}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Improvement Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {feedback.categories.map((category: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {user && (
                  <Button
                    onClick={() => setShowActivityModal(true)}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    View Activity History
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {file && !feedback && (
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="domestika-gradient text-white hover:opacity-90 px-8 py-3"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5 mr-2" />
                Analyze Project
              </>
            )}
          </Button>
        )}
        
        {feedback && (
          <div className="flex gap-4">
            <Button
              onClick={resetUpload}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Upload Another
            </Button>
            <Button
              onClick={handleAnalyze}
              className="domestika-gradient text-white hover:opacity-90"
            >
              Get More Feedback
            </Button>
          </div>
        )}
      </div>
      
      <ActivityHistoryModal 
        isOpen={showActivityModal} 
        onClose={() => setShowActivityModal(false)} 
      />
    </div>
  );
};

export default ProjectFeedback;
