/**
 * Video Embed Helpers - Rewritten from scratch
 *
 * This utility provides functions to handle YouTube video URLs and convert them
 * to embeddable iframes that can be played directly on the website.
 */

/**
 * Extracts the YouTube video ID from various YouTube URL formats
 *
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - URLs with additional parameters (e.g., ?v=VIDEO_ID&t=30s)
 *
 * @param url - The YouTube URL to parse
 * @returns The video ID or null if not found
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // Remove whitespace
  const cleanUrl = url.trim();

  // Pattern 1: youtube.com/watch?v=VIDEO_ID
  const watchPattern = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const watchMatch = cleanUrl.match(watchPattern);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Pattern 2: youtu.be/VIDEO_ID
  const shortPattern = /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const shortMatch = cleanUrl.match(shortPattern);
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }

  // Pattern 3: youtube.com/embed/VIDEO_ID
  const embedPattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const embedMatch = cleanUrl.match(embedPattern);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Pattern 4: m.youtube.com/watch?v=VIDEO_ID (mobile)
  const mobilePattern = /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const mobileMatch = cleanUrl.match(mobilePattern);
  if (mobileMatch && mobileMatch[1]) {
    return mobileMatch[1];
  }

  return null;
};

/**
 * Checks if a given URL is a valid YouTube URL
 *
 * @param url - The URL to check
 * @returns true if it's a valid YouTube URL, false otherwise
 */
export const isYouTubeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const videoId = extractYouTubeVideoId(url);
  return videoId !== null;
};

/**
 * Converts a YouTube URL to an embeddable iframe URL
 *
 * This creates a URL suitable for use in an iframe src attribute.
 * The embed URL includes parameters for better user experience:
 * - autoplay=0: Don't autoplay videos
 * - rel=0: Show related videos from the same channel only
 * - modestbranding=1: Minimize YouTube branding
 *
 * @param url - The YouTube URL to convert
 * @returns The embed URL or null if the URL is invalid
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  // Create embed URL with recommended parameters
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
};

/**
 * Gets the thumbnail URL for a YouTube video
 *
 * @param url - The YouTube URL
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'maxres')
 * @returns The thumbnail URL or null if invalid
 */
export const getYouTubeThumbnail = (url: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string | null => {
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    maxres: 'maxresdefault.jpg'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
};

/**
 * Validates a YouTube URL and returns detailed information
 *
 * @param url - The YouTube URL to validate
 * @returns An object with validation results and video information
 */
export const validateYouTubeUrl = (url: string): {
  isValid: boolean;
  videoId: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  errorMessage?: string;
} => {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      videoId: null,
      embedUrl: null,
      thumbnailUrl: null,
      errorMessage: 'URL is empty or invalid'
    };
  }

  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return {
      isValid: false,
      videoId: null,
      embedUrl: null,
      thumbnailUrl: null,
      errorMessage: 'Not a valid YouTube URL'
    };
  }

  return {
    isValid: true,
    videoId,
    embedUrl: getYouTubeEmbedUrl(url),
    thumbnailUrl: getYouTubeThumbnail(url),
  };
};

// Legacy function for backward compatibility
export const isVideoUrl = isYouTubeUrl;
export const convertToEmbedUrl = (url: string): string => {
  return getYouTubeEmbedUrl(url) || url;
};
export const extractEmbedUrl = (url: string): string => {
  return url?.trim() || '';
};
