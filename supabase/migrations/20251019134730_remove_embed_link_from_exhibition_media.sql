/*
  # Remove embed_link column from exhibition_media table
  
  This migration removes the embed_link functionality from the exhibition_media table.
  
  1. Changes
    - Drop `embed_link` column from `exhibition_media` table
  
  2. Important Notes
    - This will permanently remove all embed link data from existing exhibition media entries
    - Exhibition media entries will remain in the database but without the embed_link field
*/

-- Drop embed_link column from exhibition_media table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'exhibition_media' AND column_name = 'embed_link'
  ) THEN
    ALTER TABLE public.exhibition_media DROP COLUMN embed_link;
  END IF;
END $$;