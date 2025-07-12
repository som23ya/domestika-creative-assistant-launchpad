
import React from 'react';
import { ExternalLink, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DOMESTIKA_CATEGORIES } from '@/services/domestikaService';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (categorySlug: string) => void;
  onShowLoginModal: () => void;
  onShowActivityModal: () => void;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onCategorySelect,
  onShowLoginModal,
  onShowActivityModal,
  onSignOut
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/?view=journey');
    onClose();
  };

  const handleUploadFeedback = () => {
    navigate('/?view=feedback');
    onClose();
  };

  const handleCategorySelect = (categorySlug: string) => {
    if (onCategorySelect) {
      onCategorySelect(categorySlug);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pt-4 border-t border-border">
      <div className="flex flex-col space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:text-domestika-coral hover:bg-domestika-gray-light"
          onClick={handleStartJourney}
        >
          Start Creative Journey
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:text-domestika-coral hover:bg-domestika-gray-light"
          onClick={handleUploadFeedback}
        >
          Upload Project Feedback
        </Button>
        
        {/* Mobile Categories */}
        <div className="border-t border-border pt-2 mt-2">
          <p className="text-sm font-medium text-muted-foreground px-3 py-2">Categories</p>
          <div className="max-h-48 overflow-y-auto">
            {DOMESTIKA_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-start text-sm hover:text-domestika-coral hover:bg-domestika-gray-light"
                onClick={() => handleCategorySelect(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => {
            window.open('https://www.domestika.org', '_blank');
            onClose();
          }}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white w-full justify-start"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit Domestika.org
        </Button>

        {loading ? (
          <div className="flex justify-center py-2">
            <div className="w-6 h-6 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : user ? (
          <div className="flex flex-col space-y-2 pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground px-3 py-1">
              Welcome, {user.email?.split('@')[0]}!
            </span>
            <Button
              onClick={() => {
                onShowActivityModal();
                onClose();
              }}
              variant="ghost"
              className="justify-start hover:text-domestika-coral hover:bg-domestika-gray-light"
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
              className="justify-start hover:text-domestika-coral hover:bg-domestika-gray-light"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              onShowLoginModal();
              onClose();
            }}
            className="domestika-gradient text-white hover:opacity-90 w-full"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
