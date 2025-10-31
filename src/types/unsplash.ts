/**
 * Type definitions for Unsplash API responses
 * Based on Unsplash API documentation
 */

export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface CardCustomization {
  imageUrl: string;
  userName: string;
  fontFamily: string;
  fontColor: string;
}

export type FontFamily = 'serif' | 'sans' | 'cursive' | 'mono';
