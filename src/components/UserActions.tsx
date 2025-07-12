
import React, { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { ActivityHistoryModal } from './ActivityHistoryModal';
import { useToast } from '@/hooks/use-toast';

const UserActions: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
    );
  }

  if (user) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground hidden lg:block">
            Welcome, {user.email?.split('@')[0]}!
          </span>
          <Button
            onClick={() => setShowActivityModal(true)}
            variant="ghost"
            size="sm"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
        <ActivityHistoryModal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowLoginModal(true)}
        className="domestika-gradient text-white hover:opacity-90"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default UserActions;
