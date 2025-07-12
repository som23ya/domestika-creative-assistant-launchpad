
export interface DomestikaCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  thumbnail: string;
  description: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  url: string;
  price: string;
}

export interface DomestikaCategory {
  id: string;
  name: string;
  slug: string;
}

// Mock Domestika categories based on their actual website
export const DOMESTIKA_CATEGORIES: DomestikaCategory[] = [
  { id: '1', name: 'Illustration', slug: 'illustration' },
  { id: '2', name: 'Design', slug: 'design' },
  { id: '3', name: 'Photography & Video', slug: 'photography-video' },
  { id: '4', name: 'Marketing & Business', slug: 'marketing-business' },
  { id: '5', name: 'Craft', slug: 'craft' },
  { id: '6', name: '3D & Animation', slug: '3d-animation' },
  { id: '7', name: 'Architecture & Spaces', slug: 'architecture-spaces' },
  { id: '8', name: 'Writing', slug: 'writing' },
  { id: '9', name: 'Fashion', slug: 'fashion' },
  { id: '10', name: 'Web & App Design', slug: 'web-app-design' },
  { id: '11', name: 'Music & Audio', slug: 'music-audio' },
  { id: '12', name: 'Calligraphy & Typography', slug: 'calligraphy-typography' },
  { id: '13', name: 'Culinary', slug: 'culinary' },
  { id: '14', name: 'Technology', slug: 'technology' },
  { id: '15', name: 'Fine Arts', slug: 'fine-arts' },
  { id: '16', name: 'Lifestyle', slug: 'lifestyle' }
];

// Mock course data that simulates Domestika's actual courses
const MOCK_COURSES: DomestikaCourse[] = [
  {
    id: '1',
    title: 'Introduction to Adobe Photoshop',
    instructor: 'Carles Marsal',
    category: 'Design',
    thumbnail: '/placeholder.svg',
    description: 'Learn the fundamentals of digital image editing with Adobe Photoshop',
    rating: 4.8,
    students: 15420,
    duration: '3h 45m',
    level: 'Beginner',
    url: 'https://www.domestika.org/en/courses/1/introduction-to-adobe-photoshop',
    price: '$49'
  },
  {
    id: '2',
    title: 'Drawing for Beginners',
    instructor: 'Puño',
    category: 'Illustration',
    thumbnail: '/placeholder.svg',
    description: 'Master the basics of drawing and develop your artistic skills',
    rating: 4.9,
    students: 28350,
    duration: '4h 20m',
    level: 'Beginner',
    url: 'https://www.domestika.org/en/courses/2/drawing-for-beginners',
    price: '$39'
  },
  {
    id: '3',
    title: 'UX Design Fundamentals',
    instructor: 'Daniel Caballero',
    category: 'Web & App Design',
    thumbnail: '/placeholder.svg',
    description: 'Learn user experience design principles and create intuitive interfaces',
    rating: 4.7,
    students: 12180,
    duration: '5h 15m',
    level: 'Intermediate',
    url: 'https://www.domestika.org/en/courses/3/ux-design-fundamentals',
    price: '$59'
  },
  {
    id: '4',
    title: 'Digital Photography Essentials',
    instructor: 'Marta Bevacqua',
    category: 'Photography & Video',
    thumbnail: '/placeholder.svg',
    description: 'Master composition, lighting, and post-processing techniques',
    rating: 4.8,
    students: 19720,
    duration: '6h 30m',
    level: 'Beginner',
    url: 'https://www.domestika.org/en/courses/4/digital-photography-essentials',
    price: '$69'
  },
  {
    id: '5',
    title: 'Brand Identity Design',
    instructor: 'Sagi Haviv',
    category: 'Design',
    thumbnail: '/placeholder.svg',
    description: 'Create memorable brand identities that stand out in the market',
    rating: 4.9,
    students: 8940,
    duration: '4h 45m',
    level: 'Intermediate',
    url: 'https://www.domestika.org/en/courses/5/brand-identity-design',
    price: '$79'
  },
  {
    id: '6',
    title: 'Watercolor Illustration Techniques',
    instructor: 'Ana Santos',
    category: 'Illustration',
    thumbnail: '/placeholder.svg',
    description: 'Explore watercolor painting techniques for modern illustration',
    rating: 4.6,
    students: 16230,
    duration: '3h 20m',
    level: 'Beginner',
    url: 'https://www.domestika.org/en/courses/6/watercolor-illustration-techniques',
    price: '$45'
  },
  {
    id: '7',
    title: 'Motion Graphics with After Effects',
    instructor: 'Jorge R. Canedo Estrada',
    category: '3D & Animation',
    thumbnail: '/placeholder.svg',
    description: 'Create stunning motion graphics and animations',
    rating: 4.7,
    students: 11560,
    duration: '7h 15m',
    level: 'Advanced',
    url: 'https://www.domestika.org/en/courses/7/motion-graphics-with-after-effects',
    price: '$89'
  },
  {
    id: '8',
    title: 'Typography Fundamentals',
    instructor: 'Laura Meseguer',
    category: 'Calligraphy & Typography',
    thumbnail: '/placeholder.svg',
    description: 'Learn the art and science of typography design',
    rating: 4.8,
    students: 13470,
    duration: '4h 10m',
    level: 'Intermediate',
    url: 'https://www.domestika.org/en/courses/8/typography-fundamentals',
    price: '$55'
  },
  {
    id: '9',
    title: 'Product Photography',
    instructor: 'Martí Sans',
    category: 'Photography & Video',
    thumbnail: '/placeholder.svg',
    description: 'Master product photography for e-commerce and marketing',
    rating: 4.5,
    students: 9820,
    duration: '5h 25m',
    level: 'Intermediate',
    url: 'https://www.domestika.org/en/courses/9/product-photography',
    price: '$65'
  },
  {
    id: '10',
    title: 'Ceramic Hand Building',
    instructor: 'Lilly Maetzig',
    category: 'Craft',
    thumbnail: '/placeholder.svg',
    description: 'Create beautiful ceramic pieces using hand-building techniques',
    rating: 4.9,
    students: 7540,
    duration: '3h 50m',
    level: 'Beginner',
    url: 'https://www.domestika.org/en/courses/10/ceramic-hand-building',
    price: '$42'
  }
];

export class DomestikaService {
  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get popular courses (simulates API call)
  async getPopularCourses(limit: number = 10): Promise<DomestikaCourse[]> {
    await this.delay(500); // Simulate network delay
    return MOCK_COURSES.slice(0, limit);
  }

  // Get courses by category
  async getCoursesByCategory(categorySlug: string, limit: number = 10): Promise<DomestikaCourse[]> {
    await this.delay(500);
    const category = DOMESTIKA_CATEGORIES.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    
    return MOCK_COURSES.filter(course => 
      course.category.toLowerCase() === category.name.toLowerCase()
    ).slice(0, limit);
  }

  // Search courses by interest/keyword
  async searchCourses(query: string, limit: number = 10): Promise<DomestikaCourse[]> {
    await this.delay(300);
    const searchTerm = query.toLowerCase();
    
    return MOCK_COURSES.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm)
    ).slice(0, limit);
  }

  // Get all categories
  getCategories(): DomestikaCategory[] {
    return DOMESTIKA_CATEGORIES;
  }
}

export const domestikaService = new DomestikaService();
