/*
  # Add Artwork Dimensions

  1. Changes
    - Add `width_cm` column to artworks table (decimal, nullable)
    - Add `height_cm` column to artworks table (decimal, nullable)
    - Add `depth_cm` column to artworks table (decimal, nullable)
  
  2. Purpose
    - Allow admins to specify artwork dimensions
    - Display sizes to potential buyers on the website
    - Help visitors determine if artwork fits their space
  
  3. Notes
    - Dimensions are stored in centimeters
    - All dimension fields are optional (nullable)
    - Existing artworks will have NULL dimensions until updated
*/

DO $$
BEGIN
  -- Add width_cm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'width_cm'
  ) THEN
    ALTER TABLE artworks ADD COLUMN width_cm NUMERIC(10, 2);
  END IF;

  -- Add height_cm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'height_cm'
  ) THEN
    ALTER TABLE artworks ADD COLUMN height_cm NUMERIC(10, 2);
  END IF;

  -- Add depth_cm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'depth_cm'
  ) THEN
    ALTER TABLE artworks ADD COLUMN depth_cm NUMERIC(10, 2);
  END IF;
END $$;