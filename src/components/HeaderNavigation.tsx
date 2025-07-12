
import React from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DOMESTIKA_CATEGORIES } from '@/services/domestikaService';

interface HeaderNavigationProps {
  onCategorySelect?: (categorySlug: string) => void;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ onCategorySelect }) => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/?view=journey');
  };

  const handleUploadFeedback = () => {
    navigate('/?view=feedback');
  };

  const handleCategorySelect = (categorySlug: string) => {
    if (onCategorySelect) {
      onCategorySelect(categorySlug);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button 
        variant="ghost" 
        className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
        onClick={handleStartJourney}
      >
        Start Creative Journey
      </Button>
      
      <Button 
        variant="ghost" 
        className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
        onClick={handleUploadFeedback}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Upload Project Feedback
      </Button>
      
      {/* Browse Categories Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-foreground hover:text-domestika-coral hover:bg-domestika-gray-light"
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
    </div>
  );
};

export default HeaderNavigation;
