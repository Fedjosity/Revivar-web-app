/**
 * Unsplash API service
 * Handles all interactions with Unsplash API for fetching images
 */

import axios from "axios";
import type { UnsplashImage, UnsplashSearchResponse } from "@/types/unsplash";

// Unsplash API Access Key from environment variables
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = "https://api.unsplash.com";

// Validate API key is present
if (!UNSPLASH_ACCESS_KEY) {
  console.error("Missing VITE_UNSPLASH_ACCESS_KEY environment variable");
}

const api = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

/**
 * Fetch random colorful images from Unsplash
 * @param count - Number of images to fetch (default: 4)
 * @returns Array of Unsplash images
 */
export async function fetchRandomImages(
  count: number = 4
): Promise<UnsplashImage[]> {
  try {
    const response = await api.get<UnsplashImage[]>("/photos/random", {
      params: {
        count,
        orientation: "portrait",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random images:", error);
    throw new Error("Failed to fetch images from Unsplash");
  }
}

/**
 * Search for images on Unsplash with pagination
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @param perPage - Number of results per page (default: 8)
 * @returns Unsplash search response with results
 */
export async function searchImages(
  query: string,
  page: number = 1,
  perPage: number = 8
): Promise<UnsplashSearchResponse> {
  try {
    const response = await api.get<UnsplashSearchResponse>("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
        orientation: "portrait",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching images:", error);
    throw new Error("Failed to search images on Unsplash");
  }
}

/**
 * Trigger download tracking for Unsplash (required by API guidelines)
 * @param downloadLocation - Download location URL from image data
 */
export async function triggerDownload(downloadLocation: string): Promise<void> {
  try {
    await api.get(downloadLocation);
  } catch (error) {
    console.error("Error triggering download:", error);
  }
}
