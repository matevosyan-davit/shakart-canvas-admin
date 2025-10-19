/*
  # Add embed_link column back to media tables

  This migration restores the embed_link functionality to media tables.
  
  1. Changes
    - Add `embed_link` column back to `media` table (NOT NULL with empty string default)
    - Add `embed_link` column back to `exhibition_media` table (NOT NULL with empty string default)
  
  2. Important Notes
    - The embed_link field is required for storing video URLs and article links
    - Existing records will have empty string as default value
    - New records must provide a valid embed_link value
*/

-- Add embed_link column back to media table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'embed_link'
  ) THEN
    ALTER TABLE public.media ADD COLUMN embed_link text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Add embed_link column back to exhibition_media table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'exhibition_media' AND column_name = 'embed_link'
  ) THEN
    ALTER TABLE public.exhibition_media ADD COLUMN embed_link text NOT NULL DEFAULT '';
  END IF;
END $$;