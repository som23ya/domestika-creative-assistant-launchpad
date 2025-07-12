
import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, User, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PointsModal } from './PointsModal';
import { useActivityTracker } from '@/hooks/useActivityTracker';

interface MobileMeneProp {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (categorySlug: string) => void;
  onShowLoginModal: () => void;
  onShowActivityModal: () => void;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMeneProp> = ({
  isOpen,
  onClose,
  onShowLoginModal,
  onShowActivityModal,
  onSignOut
}) => {
  const { user } = useAuth();
  const { getUserPoints } = useActivityTracker();
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (user) {
      loadPoints();
    }
  }, [user]);

  const loadPoints = async () => {
    const points = await getUserPoints();
    setTotalPoints(points);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="md:hidden bg-white border-t border-border py-4 space-y-4">
        {user ? (
          <>
            <Button
              onClick={() => {
                setShowPointsModal(true);
                onClose();
              }}
              variant="ghost"
              className="w-full justify-start text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <Trophy className="w-4 h-4 mr-2" />
              {totalPoints} Points
            </Button>
            <Button
              onClick={() => {
                onShowActivityModal();
                onClose();
              }}
              variant="ghost"
              className="w-full justify-start text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={() => {
                onSignOut();
                onClose();
              }}
              variant="ghost"
              className="w-full justify-start text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              onShowLoginModal();
              onClose();
            }}
            className="w-full domestika-gradient text-white hover:opacity-90"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
      
      <PointsModal isOpen={showPointsModal} onClose={() => setShowPointsModal(false)} />
    </>
  );
};

export default MobileMenu;
