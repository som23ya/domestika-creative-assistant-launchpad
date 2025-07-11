import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      onClose();
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Failed to sign in with GitHub. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-foreground">
            Sign In to Domestika Creative Assistant
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full domestika-gradient text-white hover:opacity-90 transition-opacity"
            size="lg"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <Button
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            size="lg"
          >
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}