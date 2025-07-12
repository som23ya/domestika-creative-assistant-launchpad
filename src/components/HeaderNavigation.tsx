
import React from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  const navItems = [
    { label: 'Start Creative Journey', href: '/', icon: null },
    { label: 'Upload Project Feedback', href: '/feedback', icon: ExternalLink },
  ];

  const handleCategorySelect = (categorySlug: string) => {
    if (onCategorySelect) {
      onCategorySelect(categorySlug);
    }
  };

  return (
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
    </div>
  );
};

export default HeaderNavigation;
