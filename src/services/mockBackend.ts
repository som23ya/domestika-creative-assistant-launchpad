// Mock Backend Service for Domestika Creative AI Assistant
// Simulates LLM responses for both Personalized Skill Journey and Intelligent Feedback Loop

export interface SkillRecommendation {
  course: string;
  exercise: string;
}

export interface FeedbackResponse {
  feedback: string;
  type: 'positive' | 'suggestion';
}

export interface ProcessingOptions {
  delay?: number; // milliseconds
  debug?: boolean;
}

// Enhanced creative interests database with related terms
export interface CreativeInterest {
  name: string;
  relatedTerms: string[];
  course: string;
  exercise: string;
}

const CREATIVE_INTERESTS: Record<string, CreativeInterest> = {
  'illustration': {
    name: 'illustration',
    relatedTerms: ['digital illustration', 'character design', 'concept art', 'drawing', 'sketching'],
    course: 'Introduction to Digital Illustration',
    exercise: 'Create a character sketch with 3 color variations'
  },
  'ux design': {
    name: 'ux design',
    relatedTerms: ['user experience', 'user research', 'usability', 'wireframes', 'prototyping'],
    course: 'UX Design Fundamentals',
    exercise: 'Design a mobile app wireframe'
  },
  'ui design': {
    name: 'ui design',
    relatedTerms: ['user interface', 'interface design', 'app design', 'web interface'],
    course: 'Modern UI Design Principles',
    exercise: 'Create a landing page mockup for a creative agency'
  },
  'graphic design': {
    name: 'graphic design',
    relatedTerms: ['visual design', 'layout design', 'print design', 'poster design'],
    course: 'Brand Identity Design',
    exercise: 'Design a complete logo and brand guidelines'
  },
  'motion design': {
    name: 'motion design',
    relatedTerms: ['motion graphics', 'animation', 'after effects', 'kinetic typography'],
    course: 'Motion Graphics Mastery',
    exercise: 'Create a 10-second animated logo reveal'
  },
  'web design': {
    name: 'web design',
    relatedTerms: ['website design', 'responsive design', 'frontend design', 'landing pages'],
    course: 'Responsive Web Design',
    exercise: 'Build a portfolio website from scratch'
  },
  'product design': {
    name: 'product design',
    relatedTerms: ['industrial design', 'product development', 'design thinking'],
    course: 'Product Design Fundamentals',
    exercise: 'Design and prototype a mobile accessory'
  },
  'interior design': {
    name: 'interior design',
    relatedTerms: ['space design', 'room planning', 'architectural design', 'furniture design'],
    course: 'Interior Design Principles',
    exercise: 'Design a cozy living room layout'
  },
  'fashion design': {
    name: 'fashion design',
    relatedTerms: ['clothing design', 'textile design', 'fashion illustration', 'pattern making'],
    course: 'Fashion Design Essentials',
    exercise: 'Sketch a seasonal clothing collection'
  },
  'photography': {
    name: 'photography',
    relatedTerms: ['photo', 'camera', 'photoshoot', 'composition', 'lighting'],
    course: 'Portrait Photography Mastery',
    exercise: 'Take 10 portraits using natural lighting techniques'
  },
  'digital photography': {
    name: 'digital photography',
    relatedTerms: ['photo editing', 'lightroom', 'photoshop', 'image processing'],
    course: 'Digital Photography Workshop',
    exercise: 'Edit a photo series with consistent styling'
  },
  'portrait photography': {
    name: 'portrait photography',
    relatedTerms: ['headshots', 'people photography', 'studio lighting', 'posing'],
    course: 'Professional Portrait Photography',
    exercise: 'Create a portrait series with different lighting setups'
  },
  'animation': {
    name: 'animation',
    relatedTerms: ['cartoon', 'motion', 'character animation', 'storytelling'],
    course: '2D Animation Basics',
    exercise: 'Create a 5-second character walking cycle'
  },
  '3d animation': {
    name: '3d animation',
    relatedTerms: ['3d modeling', 'rigging', 'rendering', 'blender', 'maya'],
    course: '3D Animation Fundamentals',
    exercise: 'Model and animate a simple 3D character'
  },
  '2d animation': {
    name: '2d animation',
    relatedTerms: ['traditional animation', 'frame by frame', 'tweening', 'cel animation'],
    course: '2D Animation Techniques',
    exercise: 'Create a bouncing ball animation sequence'
  },
  'video editing': {
    name: 'video editing',
    relatedTerms: ['video production', 'montage', 'post production', 'color grading'],
    course: 'Video Editing Masterclass',
    exercise: 'Edit a 2-minute creative video story'
  },
  'music production': {
    name: 'music production',
    relatedTerms: ['audio production', 'sound design', 'mixing', 'mastering', 'beats'],
    course: 'Music Production Basics',
    exercise: 'Produce a 30-second instrumental track'
  },
  'painting': {
    name: 'painting',
    relatedTerms: ['fine art', 'canvas', 'brushwork', 'color theory', 'composition'],
    course: 'Digital Painting Techniques',
    exercise: 'Paint a landscape using only 5 colors'
  },
  'watercolor painting': {
    name: 'watercolor painting',
    relatedTerms: ['watercolor', 'wet on wet', 'color bleeding', 'transparency'],
    course: 'Watercolor Fundamentals',
    exercise: 'Paint a floral composition with watercolors'
  },
  'digital painting': {
    name: 'digital painting',
    relatedTerms: ['concept art', 'matte painting', 'photoshop painting', 'brush techniques'],
    course: 'Digital Painting Mastery',
    exercise: 'Create a digital environment painting'
  },
  'calligraphy': {
    name: 'calligraphy',
    relatedTerms: ['hand lettering', 'brush lettering', 'script writing', 'ink work'],
    course: 'Modern Calligraphy Techniques',
    exercise: 'Design a quote poster with hand lettering'
  },
  'typography': {
    name: 'typography',
    relatedTerms: ['font design', 'lettering', 'typeface', 'text layout', 'kerning'],
    course: 'Typography Fundamentals',
    exercise: 'Design a poster using only typographic elements'
  },
  'branding': {
    name: 'branding',
    relatedTerms: ['brand identity', 'logo design', 'brand strategy', 'visual identity'],
    course: 'Brand Identity Design',
    exercise: 'Create a complete brand package for a startup'
  },
  'creative writing': {
    name: 'creative writing',
    relatedTerms: ['storytelling', 'screenwriting', 'poetry', 'narrative', 'fiction'],
    course: 'Creative Writing Workshop',
    exercise: 'Write a 500-word short story with a twist ending'
  },
  'sculpture': {
    name: 'sculpture',
    relatedTerms: ['3d art', 'clay modeling', 'carving', 'assemblage', 'installation'],
    course: 'Sculpture Fundamentals',
    exercise: 'Create a small sculpture using found objects'
  }
};

// Legacy compatibility - convert to old format for existing code
const SKILL_RECOMMENDATIONS: Record<string, SkillRecommendation> = Object.fromEntries(
  Object.entries(CREATIVE_INTERESTS).map(([key, interest]) => [
    key, 
    { course: interest.course, exercise: interest.exercise }
  ])
);

// Search function for predictive search
export function searchCreativeInterests(query: string, limit: number = 5): string[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const matches: { interest: string; score: number }[] = [];
  
  Object.entries(CREATIVE_INTERESTS).forEach(([key, interest]) => {
    let score = 0;
    
    // Exact match with interest name gets highest score
    if (interest.name.includes(normalizedQuery)) {
      score += interest.name === normalizedQuery ? 100 : 50;
    }
    
    // Check related terms
    interest.relatedTerms.forEach(term => {
      if (term.includes(normalizedQuery)) {
        score += term === normalizedQuery ? 80 : 30;
      }
    });
    
    // Partial matches get lower scores
    if (normalizedQuery.length >= 3) {
      if (interest.name.startsWith(normalizedQuery)) score += 40;
      interest.relatedTerms.forEach(term => {
        if (term.startsWith(normalizedQuery)) score += 20;
      });
    }
    
    if (score > 0) {
      matches.push({ interest: interest.name, score });
    }
  });
  
  // Sort by score and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(match => match.interest);
}

// Mock data for Feedback Loop heuristics
const FEEDBACK_HEURISTICS: Record<string, { type: 'positive' | 'suggestion'; responses: string[] }> = {
  'sketch': {
    type: 'suggestion',
    responses: [
      'Your sketch shows strong foundational composition! Consider adding more line weight variation to create depth and visual hierarchy. Try using thicker lines for foreground elements and thinner lines for background details.',
      'Great character concept! To enhance your sketch, experiment with different shading techniques like cross-hatching or stippling to add texture and dimension.',
      'Your proportions are well-balanced. For the next iteration, try adding more dynamic poses or gestures to bring more life and energy to your character.'
    ]
  },
  'wireframe': {
    type: 'suggestion',
    responses: [
      'Your wireframe demonstrates good information architecture! Consider adding more spacing between elements for better visual breathing room and improved usability.',
      'Solid layout structure! To enhance user experience, try incorporating more visual hierarchy through different text sizes and button prominence.',
      'Great foundation for your interface! Consider adding breadcrumbs or navigation indicators to help users understand their location within the app flow.'
    ]
  },
  'illustration': {
    type: 'positive',
    responses: [
      'Your illustration showcases excellent color harmony! The palette creates a cohesive mood. Consider experimenting with complementary colors for accent elements to make key areas pop.',
      'Beautiful artistic style! Your use of light and shadow creates great depth. Try adding more contrast in focal areas to guide the viewer\'s eye through your composition.',
      'Fantastic attention to detail! Your illustration has strong visual appeal. Consider adding subtle textures or patterns to enhance the overall richness of your artwork.'
    ]
  },
  'design': {
    type: 'suggestion',
    responses: [
      'Your design concept has strong visual appeal! Consider testing different typography pairings to enhance readability and create better brand consistency.',
      'Great use of white space! To improve accessibility, ensure your color choices meet WCAG contrast guidelines, especially for text elements.',
      'Solid design foundation! Try experimenting with different grid systems or alignment techniques to create more dynamic and engaging layouts.'
    ]
  },
  'logo': {
    type: 'positive',
    responses: [
      'Your logo design has strong brand potential! The concept is memorable and distinctive. Consider testing scalability at different sizes to ensure it works across all applications.',
      'Excellent use of symbolism! Your logo effectively communicates the brand message. Try exploring monochrome versions to ensure versatility across different media.',
      'Great typography integration! The logo has professional appeal. Consider creating variations for different use cases (horizontal, stacked, icon-only).'
    ]
  },
  'photography': {
    type: 'positive',
    responses: [
      'Your composition follows the rule of thirds beautifully! The lighting creates excellent mood and atmosphere. Consider experimenting with different aperture settings for varied depth of field effects.',
      'Fantastic capture of the moment! Your timing and framing are excellent. Try exploring different perspectives or angles to add more dynamic visual interest.',
      'Great attention to detail in your shot! The colors are vibrant and well-balanced. Consider post-processing techniques to enhance contrast and bring out more detail in shadows.'
    ]
  },
  'ui': {
    type: 'suggestion',
    responses: [
      'Your UI design shows good understanding of user interface principles! Consider improving accessibility by ensuring sufficient color contrast and touch target sizes.',
      'Clean interface design! To enhance usability, try implementing a more consistent spacing system and clear visual hierarchy throughout your components.',
      'Solid foundation for your interface! Consider adding micro-interactions and transitions to improve user engagement and provide better feedback.'
    ]
  }
};

// Generic image upload feedback responses
const IMAGE_UPLOAD_FEEDBACK: string[] = [
  'Your uploaded image shows great visual appeal! The composition draws the viewer\'s eye effectively. Consider adjusting the contrast slightly to improve accessibility and make key elements more prominent.',
  'Excellent color palette choice! The tones work harmoniously together. For your next iteration, try experimenting with different lighting angles to add more depth and dimension.',
  'Strong visual foundation! Your image has good balance and proportion. Consider adding more texture or pattern elements to enhance visual interest and engagement.',
  'Great attention to detail in your work! The overall aesthetic is cohesive and professional. Try exploring different cropping options to see how they affect the composition\'s impact.'
];

// Utility function for debugging
function debugLog(message: string, data?: any): void {
  console.log(`[MockBackend] ${message}`, data ? data : '');
}

// Mock Backend Class
export class MockBackendService {
  private defaultDelay = 1000; // 1 second default response time

  /**
   * Process skill journey request and return course/exercise recommendations
   */
  async processSkillJourney(
    interest: string, 
    options: ProcessingOptions = {}
  ): Promise<SkillRecommendation | null> {
    const { delay = this.defaultDelay, debug = true } = options;
    
    if (debug) {
      debugLog('Processing Skill Journey request', { interest, delay });
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, delay));

    const normalizedInterest = interest.toLowerCase().trim();
    const recommendation = SKILL_RECOMMENDATIONS[normalizedInterest];

    if (debug) {
      debugLog('Skill Journey response generated', { 
        input: normalizedInterest, 
        found: !!recommendation,
        recommendation 
      });
    }

    return recommendation || null;
  }

  /**
   * Process feedback request for uploaded projects
   */
  async processFeedback(
    input: {
      description?: string;
      hasImage?: boolean;
      fileName?: string;
    },
    options: ProcessingOptions = {}
  ): Promise<FeedbackResponse> {
    const { delay = this.defaultDelay, debug = true } = options;
    
    if (debug) {
      debugLog('Processing Feedback request', { input, delay });
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, delay));

    const { description = '', hasImage = false } = input;
    const normalizedDescription = description.toLowerCase();

    // Check for keywords in description
    for (const [keyword, feedbackData] of Object.entries(FEEDBACK_HEURISTICS)) {
      if (normalizedDescription.includes(keyword)) {
        const randomResponse = feedbackData.responses[
          Math.floor(Math.random() * feedbackData.responses.length)
        ];
        
        const response: FeedbackResponse = {
          feedback: randomResponse,
          type: feedbackData.type
        };

        if (debug) {
          debugLog('Feedback response generated from keyword match', { 
            keyword,
            input: normalizedDescription,
            response 
          });
        }

        return response;
      }
    }

    // If image is uploaded but no matching keywords in description
    if (hasImage) {
      const randomImageFeedback = IMAGE_UPLOAD_FEEDBACK[
        Math.floor(Math.random() * IMAGE_UPLOAD_FEEDBACK.length)
      ];
      
      const response: FeedbackResponse = {
        feedback: randomImageFeedback,
        type: 'positive'
      };

      if (debug) {
        debugLog('Feedback response generated for image upload', { 
          hasImage,
          response 
        });
      }

      return response;
    }

    // Fallback for unrecognized input
    const fallbackResponse: FeedbackResponse = {
      feedback: "I'd love to provide more specific feedback! Try describing your project using keywords like 'sketch', 'wireframe', 'illustration', 'design', 'logo', or 'photography' for more targeted suggestions.",
      type: 'suggestion'
    };

    if (debug) {
      debugLog('Fallback feedback response generated', { 
        input: normalizedDescription,
        response: fallbackResponse 
      });
    }

    return fallbackResponse;
  }

  /**
   * Get available skill recommendations (for debugging/testing)
   */
  getAvailableSkills(): string[] {
    return Object.keys(SKILL_RECOMMENDATIONS);
  }

  /**
   * Get available feedback keywords (for debugging/testing)
   */
  getFeedbackKeywords(): string[] {
    return Object.keys(FEEDBACK_HEURISTICS);
  }

  /**
   * Validate input and provide helpful error messages
   */
  validateSkillInput(interest: string): { valid: boolean; suggestion?: string } {
    if (!interest.trim()) {
      return { valid: false, suggestion: 'Please enter a creative interest' };
    }

    const normalizedInterest = interest.toLowerCase().trim();
    if (!SKILL_RECOMMENDATIONS[normalizedInterest]) {
      const availableSkills = this.getAvailableSkills();
      return { 
        valid: false, 
        suggestion: `Sorry, I don't have recommendations for "${interest}" yet. Try: ${availableSkills.slice(0, 3).join(', ')}, or other creative skills!` 
      };
    }

    return { valid: true };
  }

  /**
   * Validate feedback input
   */
  validateFeedbackInput(description: string, hasFile: boolean): { valid: boolean; message?: string } {
    if (!description.trim() && !hasFile) {
      return { 
        valid: false, 
        message: 'Please upload an image or describe your project to receive personalized feedback.' 
      };
    }
    return { valid: true };
  }
}

// Export singleton instance
export const mockBackend = new MockBackendService();