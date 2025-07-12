
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { ActivityHistoryModal } from './ActivityHistoryModal';
import { useToast } from '@/hooks/use-toast';
import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import UserActions from './UserActions';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  onCategorySelect?: (categorySlug: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <>
      <header className="bg-white border-b border-border py-4 px-domestika sticky top-0 z-50">
        <div className="max-w-domestika mx-auto">
          <div className="flex items-center justify-between">
            <HeaderLogo />

            <HeaderNavigation onCategorySelect={onCategorySelect} />

            <div className="flex items-center space-x-4">
              <UserActions />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onCategorySelect={onCategorySelect}
            onShowLoginModal={() => setShowLoginModal(true)}
            onShowActivityModal={() => setShowActivityModal(true)}
            onSignOut={handleSignOut}
          />
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <ActivityHistoryModal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} />
    </>
  );
};

export default Header;
