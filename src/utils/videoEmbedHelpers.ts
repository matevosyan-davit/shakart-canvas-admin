/**
 * Video Embed Helpers
 *
 * This file contains utility functions for handling video embeds,
 * particularly YouTube videos. It provides consistent URL conversion
 * and validation across the application.
 */

/**
 * Extracts a clean URL from various input formats
 * Handles:
 * - Direct URLs (https://youtube.com/...)
 * - Iframe embed code (<iframe src="...">)
 * - Plain text URLs
 */
export const extractEmbedUrl = (embedLink: string): string => {
  if (!embedLink) return '';

  const trimmed = embedLink.trim();

  // If it's already a URL, return it
  if (trimmed.startsWith('http')) {
    return trimmed;
  }

  // If it's iframe HTML, extract the src URL
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }

  // Fallback to the original link
  return trimmed;
};

/**
 * Converts various YouTube URL formats to a standardized embed URL
 * Handles:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - youtube.com/v/VIDEO_ID
 * - URLs with additional parameters
 */
export const convertToEmbedUrl = (url: string): string => {
  try {
    const cleanUrl = url.trim();

    // Comprehensive YouTube regex that handles multiple formats
    // Captures the 11-character video ID from various YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = cleanUrl.match(youtubeRegex);

    if (match && match[1]) {
      // Use youtube-nocookie.com for privacy-enhanced mode
      // Add parameters for better user experience:
      // - rel=0: Don't show related videos from other channels
      // - modestbranding=1: Use modest YouTube branding
      return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }

    // If it's already an embed URL, return as is
    if (cleanUrl.includes('/embed/')) {
      return cleanUrl;
    }

    // For Vimeo and other platforms, return the URL as-is
    return cleanUrl;
  } catch (error) {
    console.error('Error converting URL:', error);
    return url;
  }
};

/**
 * Checks if a URL is a video platform URL that can be embedded
 */
export const isVideoUrl = (url: string): boolean => {
  try {
    const lowerUrl = url.toLowerCase().trim();
    return (
      lowerUrl.includes('youtube.com') ||
      lowerUrl.includes('youtu.be') ||
      lowerUrl.includes('vimeo.com') ||
      lowerUrl.includes('/embed/') ||
      lowerUrl.includes('youtube-nocookie.com')
    );
  } catch (error) {
    return false;
  }
};

/**
 * Validates if a YouTube URL is in a proper format
 * Returns true if the URL can be successfully converted to an embed URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  try {
    const cleanUrl = extractEmbedUrl(url);
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(cleanUrl);
  } catch (error) {
    return false;
  }
};

/**
 * Gets a thumbnail URL for a YouTube video
 * Useful for preview images before the video loads
 */
export const getYouTubeThumbnail = (url: string): string | null => {
  try {
    const cleanUrl = extractEmbedUrl(url);
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = cleanUrl.match(youtubeRegex);

    if (match && match[1]) {
      // Return high quality thumbnail
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }

    return null;
  } catch (error) {
    return null;
  }
};
