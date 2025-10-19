/*
  # Remove embed_link column from media table
  
  This migration removes the embed_link functionality from the media table.
  
  1. Changes
    - Drop `embed_link` column from `media` table
  
  2. Important Notes
    - This will permanently remove all embed link data from existing media entries
    - Media entries will remain in the database but without the embed_link field
*/

-- Drop embed_link column from media table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'embed_link'
  ) THEN
    ALTER TABLE public.media DROP COLUMN embed_link;
  END IF;
END $$;