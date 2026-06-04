export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl?: string; // HTML5 playable stock/portfolio video url
  externalUrl?: string; // YouTube, Bilibili or Vimeo full version mockup link
  images?: string[]; // Grid assets
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  details?: {
    label: string;
    value: string;
  }[];
  isColorGrade?: boolean; // For post-production RAW vs Graded slider
  rawVideoUrl?: string; // Original ungraded video
  gradedVideoUrl?: string; // Graded output video
  rawImageUrl?: string; // Original raw image placeholder
  gradedImageUrl?: string; // Graded image placeholder
}

export interface Category {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  accentColor: string;
  bgColor: string;
  projects: Project[];
}

export type PageId = 'home' | 'creative-short-films' | 'post-production-editing' | 'graphic-design';
