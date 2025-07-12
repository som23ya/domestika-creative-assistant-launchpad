
import React, { useState } from 'react';
import { Sparkles, LogIn, LogOut, User, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { ActivityHistoryModal } from './ActivityHistoryModal';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DOMESTIKA_CATEGORIES } from '@/services/domestikaService';

interface HeaderProps {
  onCategorySelect?: (categorySlug: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const { user, signOut, loading } = useAuth();
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

  const handleCategorySelect = (categorySlug: string) => {
    if (onCategorySelect) {
      onCategorySelect(categorySlug);
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Start Creative Journey', href: '/', icon: Sparkles },
    { label: 'Upload Project Feedback', href: '/feedback', icon: ExternalLink },
  ];

  return (
    <>
      <header className="bg-white border-b border-border py-4 px-domestika sticky top-0 z-50">
        <div className="max-w-domestika mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="domestika-gradient p-2 rounded-domestika">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-h1 font-bold text-foreground hidden sm:block">
                Domestika Creative Assistant
              </h1>
              <h1 className="text-lg font-bold text-foreground sm:hidden">
                Domestika
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Browse Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-primary"
                  >
                    Browse Categories
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white border border-input shadow-lg z-50">
                  {DOMESTIKA_CATEGORIES.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleCategorySelect(category.slug)}
                      className="cursor-pointer hover:bg-domestika-gray-light focus:bg-domestika-gray-light"
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                onClick={() => window.open('https://www.domestika.org', '_blank')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Domestika.org
              </Button>

              {loading ? (
                <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
              ) : user ? (
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.label}
                    </Button>
                  </Link>
                ))}
                
                {/* Mobile Categories */}
                <div className="border-t border-border pt-2 mt-2">
                  <p className="text-sm font-medium text-muted-foreground px-3 py-2">Categories</p>
                  <div className="max-h-48 overflow-y-auto">
                    {DOMESTIKA_CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className="w-full justify-start text-sm"
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
                    setMobileMenuOpen(false);
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
                        setShowActivityModal(true);
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="domestika-gradient text-white hover:opacity-90 w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <ActivityHistoryModal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} />
    </>
  );
};

export default Header;
