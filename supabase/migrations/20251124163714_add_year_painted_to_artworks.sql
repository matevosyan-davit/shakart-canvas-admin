/*
  # Add Year Painted Field to Artworks

  ## Changes
  1. New Column
    - `year_painted` (integer) - The year when the artwork was painted/created by the artist
    - Nullable to support existing artworks without this information
    - Default: NULL

  ## Purpose
  This field stores the actual year the artwork was created by the artist, 
  separate from the `created_at` field which tracks when it was added to the database.
*/

-- Add year_painted column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'year_painted'
  ) THEN
    ALTER TABLE artworks ADD COLUMN year_painted integer;
  END IF;
END $$;

-- Add a check constraint to ensure reasonable year values (e.g., 1900-2100)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'artworks' AND constraint_name = 'year_painted_check'
  ) THEN
    ALTER TABLE artworks ADD CONSTRAINT year_painted_check 
    CHECK (year_painted IS NULL OR (year_painted >= 1900 AND year_painted <= 2100));
  END IF;
END $$;
