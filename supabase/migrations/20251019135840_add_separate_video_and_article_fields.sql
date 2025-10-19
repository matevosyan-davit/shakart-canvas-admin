/*
  # Add separate fields for videos and articles

  This migration adds dedicated fields for YouTube videos and article links,
  replacing the generic embed_link field.
  
  1. Changes
    - Add `video_url` column to `media` table (nullable text field for YouTube URLs)
    - Add `article_url` column to `media` table (nullable text field for article links)
    - Add `video_url` column to `exhibition_media` table (nullable)
    - Add `article_url` column to `exhibition_media` table (nullable)
  
  2. Important Notes
    - At least one of video_url or article_url should be provided for each media entry
    - Video URLs should be YouTube URLs that can be converted to embeds
    - Article URLs should be standard web URLs
    - The old embed_link field is kept for backward compatibility but will be deprecated
*/

-- Add video_url and article_url columns to media table
DO $$
BEGIN
  -- Add video_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE public.media ADD COLUMN video_url text;
  END IF;

  -- Add article_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'article_url'
  ) THEN
    ALTER TABLE public.media ADD COLUMN article_url text;
  END IF;
END $$;

-- Add video_url and article_url columns to exhibition_media table
DO $$
BEGIN
  -- Add video_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'exhibition_media' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE public.exhibition_media ADD COLUMN video_url text;
  END IF;

  -- Add article_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'exhibition_media' AND column_name = 'article_url'
  ) THEN
    ALTER TABLE public.exhibition_media ADD COLUMN article_url text;
  END IF;
END $$;

-- Add helpful comments to columns
COMMENT ON COLUMN public.media.video_url IS 'YouTube video URL (e.g., https://www.youtube.com/watch?v=...)';
COMMENT ON COLUMN public.media.article_url IS 'Article/webpage URL for media coverage';
COMMENT ON COLUMN public.exhibition_media.video_url IS 'YouTube video URL for exhibition media';
COMMENT ON COLUMN public.exhibition_media.article_url IS 'Article/webpage URL for exhibition media';