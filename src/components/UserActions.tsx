
import React, { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { ActivityHistoryModal } from './ActivityHistoryModal';
import { useToast } from '@/hooks/use-toast';

const UserActions = () => {
  const { user, loading, signOut } = useAuth();
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
      <div className="flex justify-center">
        <div className="w-6 h-6 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex items-center space-x-2">
        {user ? (
          <>
            <Button
              onClick={() => setShowActivityModal(true)}
              variant="ghost"
              className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setShowLoginModal(true)}
            className="domestika-gradient text-white hover:opacity-90"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <ActivityHistoryModal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} />
    </>
  );
};

export default UserActions;
