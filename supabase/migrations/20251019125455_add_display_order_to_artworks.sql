/*
  # Add Display Order to Artworks

  1. Changes
    - Add `display_order` column to artworks table (integer, not null, default 0)
    - Create index on display_order for efficient sorting
    - Set initial display_order values based on created_at timestamp
  
  2. Purpose
    - Enable admin to customize the order of artworks
    - Allow drag-and-drop reordering in admin panel
    - Display artworks in custom order on gallery pages
  
  3. Notes
    - Lower numbers appear first (1, 2, 3, etc.)
    - Existing artworks get order based on creation date
    - New artworks default to 0 (will be set on creation)
*/

DO $$
BEGIN
  -- Add display_order column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE artworks ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Set initial display_order values for existing artworks based on created_at
-- This ensures older artworks have lower order numbers
UPDATE artworks
SET display_order = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
  FROM artworks
) AS subquery
WHERE artworks.id = subquery.id;

-- Create index for efficient sorting
CREATE INDEX IF NOT EXISTS idx_artworks_display_order ON artworks(display_order);