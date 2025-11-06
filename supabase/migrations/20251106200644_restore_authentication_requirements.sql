/*
  # Restore Authentication Requirements to RLS Policies
  
  ## Purpose
  Update all RLS policies to require authentication for INSERT, UPDATE, and DELETE operations
  while keeping SELECT operations public for viewing.
  
  ## Changes
  1. Drop public write policies
  2. Create authenticated-only policies for INSERT, UPDATE, DELETE
  3. Keep SELECT policies public for viewing content
  
  ## Security
  - Only authenticated admin can modify data
  - Public can still view all content
*/

-- ============================================================================
-- ARTWORKS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert artworks" ON artworks;
DROP POLICY IF EXISTS "Anyone can update artworks" ON artworks;
DROP POLICY IF EXISTS "Anyone can delete artworks" ON artworks;

CREATE POLICY "Authenticated users can insert artworks"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artworks"
  ON artworks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artworks"
  ON artworks FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- ARTWORK_IMAGES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert artwork images" ON artwork_images;
DROP POLICY IF EXISTS "Anyone can update artwork images" ON artwork_images;
DROP POLICY IF EXISTS "Anyone can delete artwork images" ON artwork_images;

CREATE POLICY "Authenticated users can insert artwork images"
  ON artwork_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artwork images"
  ON artwork_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artwork images"
  ON artwork_images FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITIONS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Anyone can update exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Anyone can delete exhibitions" ON exhibitions;

CREATE POLICY "Authenticated users can insert exhibitions"
  ON exhibitions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibitions"
  ON exhibitions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibitions"
  ON exhibitions FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITION_IMAGES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert exhibition images" ON exhibition_images;
DROP POLICY IF EXISTS "Anyone can update exhibition images" ON exhibition_images;
DROP POLICY IF EXISTS "Anyone can delete exhibition images" ON exhibition_images;

CREATE POLICY "Authenticated users can insert exhibition images"
  ON exhibition_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibition images"
  ON exhibition_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibition images"
  ON exhibition_images FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITION_MEDIA TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert exhibition media" ON exhibition_media;
DROP POLICY IF EXISTS "Anyone can update exhibition media" ON exhibition_media;
DROP POLICY IF EXISTS "Anyone can delete exhibition media" ON exhibition_media;

CREATE POLICY "Authenticated users can insert exhibition media"
  ON exhibition_media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibition media"
  ON exhibition_media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibition media"
  ON exhibition_media FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- MEDIA TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert media" ON media;
DROP POLICY IF EXISTS "Anyone can update media" ON media;
DROP POLICY IF EXISTS "Anyone can delete media" ON media;

CREATE POLICY "Authenticated users can insert media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
  ON media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON media FOR DELETE
  TO authenticated
  USING (true);
