/*
  # Remove Authentication Requirements from RLS Policies
  
  ## Purpose
  This migration updates all RLS policies to allow public access for all operations
  since authentication has been removed from the application.
  
  ## Changes
  1. Drop all existing authenticated-only policies
  2. Create new public policies allowing anyone to INSERT, UPDATE, and DELETE
  3. Keep existing SELECT policies (already public)
  
  ## Security Note
  This opens up the database for public modifications. This is intentional as the
  admin panel no longer has authentication protection.
*/

-- Drop existing authenticated-only policies for artworks
DROP POLICY IF EXISTS "Authenticated users can insert artworks" ON artworks;
DROP POLICY IF EXISTS "Authenticated users can update artworks" ON artworks;
DROP POLICY IF EXISTS "Authenticated users can delete artworks" ON artworks;

-- Create new public policies for artworks
CREATE POLICY "Anyone can insert artworks"
  ON artworks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update artworks"
  ON artworks FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete artworks"
  ON artworks FOR DELETE
  TO public
  USING (true);

-- Drop existing authenticated-only policies for artwork_images
DROP POLICY IF EXISTS "Authenticated users can insert artwork images" ON artwork_images;
DROP POLICY IF EXISTS "Authenticated users can update artwork images" ON artwork_images;
DROP POLICY IF EXISTS "Authenticated users can delete artwork images" ON artwork_images;

-- Create new public policies for artwork_images
CREATE POLICY "Anyone can insert artwork images"
  ON artwork_images FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update artwork images"
  ON artwork_images FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete artwork images"
  ON artwork_images FOR DELETE
  TO public
  USING (true);

-- Drop existing authenticated-only policies for exhibitions
DROP POLICY IF EXISTS "Authenticated users can insert exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Authenticated users can update exhibitions" ON exhibitions;
DROP POLICY IF EXISTS "Authenticated users can delete exhibitions" ON exhibitions;

-- Create new public policies for exhibitions
CREATE POLICY "Anyone can insert exhibitions"
  ON exhibitions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update exhibitions"
  ON exhibitions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete exhibitions"
  ON exhibitions FOR DELETE
  TO public
  USING (true);

-- Drop existing authenticated-only policies for exhibition_images
DROP POLICY IF EXISTS "Authenticated users can insert exhibition images" ON exhibition_images;
DROP POLICY IF EXISTS "Authenticated users can update exhibition images" ON exhibition_images;
DROP POLICY IF EXISTS "Authenticated users can delete exhibition images" ON exhibition_images;

-- Create new public policies for exhibition_images
CREATE POLICY "Anyone can insert exhibition images"
  ON exhibition_images FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update exhibition images"
  ON exhibition_images FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete exhibition images"
  ON exhibition_images FOR DELETE
  TO public
  USING (true);

-- Drop existing authenticated-only policies for exhibition_media
DROP POLICY IF EXISTS "Authenticated users can insert exhibition media" ON exhibition_media;
DROP POLICY IF EXISTS "Authenticated users can update exhibition media" ON exhibition_media;
DROP POLICY IF EXISTS "Authenticated users can delete exhibition media" ON exhibition_media;

-- Create new public policies for exhibition_media
CREATE POLICY "Anyone can insert exhibition media"
  ON exhibition_media FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update exhibition media"
  ON exhibition_media FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete exhibition media"
  ON exhibition_media FOR DELETE
  TO public
  USING (true);

-- Drop existing authenticated-only policies for media
DROP POLICY IF EXISTS "Authenticated users can insert media" ON media;
DROP POLICY IF EXISTS "Authenticated users can update media" ON media;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON media;

-- Create new public policies for media
CREATE POLICY "Anyone can insert media"
  ON media FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update media"
  ON media FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete media"
  ON media FOR DELETE
  TO public
  USING (true);
