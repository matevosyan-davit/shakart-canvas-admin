/*
  # Fix Critical Security Issues - RLS Policies
  
  This migration addresses CRITICAL security vulnerabilities by implementing proper
  Row Level Security policies. Previously, all tables allowed unrestricted public
  access for INSERT, UPDATE, and DELETE operations.
  
  ## Changes Made
  
  ### 1. Artworks Table Security
  - **SELECT**: Public read access (anyone can view artworks)
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  - Removes dangerous "Anyone can insert/update/delete" policies
  
  ### 2. Artwork Images Table Security
  - **SELECT**: Public read access
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ### 3. Exhibitions Table Security
  - **SELECT**: Public read access
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ### 4. Exhibition Images Table Security
  - **SELECT**: Public read access
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ### 5. Exhibition Media Table Security
  - **SELECT**: Public read access
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ### 6. Media Table Security
  - **SELECT**: Public read access
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ### 7. Storage Bucket Security
  - **SELECT**: Public read access (view images)
  - **INSERT/UPDATE/DELETE**: Restricted to authenticated users only
  
  ## Security Impact
  
  **Before:** Anyone could delete all artworks, upload spam, or corrupt data
  **After:** Only authenticated admin users can modify content
  
  ## Important Notes
  
  - Public users can still view all portfolio content
  - Only authenticated users (admins) can create, update, or delete content
  - This prevents data loss, spam, and malicious modifications
  - Admin authentication will be handled via Supabase Auth
*/

-- ============================================================================
-- ARTWORKS TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert artworks" ON public.artworks;
DROP POLICY IF EXISTS "Anyone can update artworks" ON public.artworks;
DROP POLICY IF EXISTS "Anyone can delete artworks" ON public.artworks;

-- Keep public read access
-- "Anyone can view artworks" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert artworks"
  ON public.artworks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artworks"
  ON public.artworks
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artworks"
  ON public.artworks
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- ARTWORK IMAGES TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert artwork images" ON public.artwork_images;
DROP POLICY IF EXISTS "Anyone can update artwork images" ON public.artwork_images;
DROP POLICY IF EXISTS "Anyone can delete artwork images" ON public.artwork_images;

-- Keep public read access
-- "Anyone can view artwork images" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert artwork images"
  ON public.artwork_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artwork images"
  ON public.artwork_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artwork images"
  ON public.artwork_images
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITIONS TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert exhibitions" ON public.exhibitions;
DROP POLICY IF EXISTS "Anyone can update exhibitions" ON public.exhibitions;
DROP POLICY IF EXISTS "Anyone can delete exhibitions" ON public.exhibitions;

-- Keep public read access
-- "Anyone can view exhibitions" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert exhibitions"
  ON public.exhibitions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibitions"
  ON public.exhibitions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibitions"
  ON public.exhibitions
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITION IMAGES TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert exhibition images" ON public.exhibition_images;
DROP POLICY IF EXISTS "Anyone can update exhibition images" ON public.exhibition_images;
DROP POLICY IF EXISTS "Anyone can delete exhibition images" ON public.exhibition_images;

-- Keep public read access
-- "Anyone can view exhibition images" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert exhibition images"
  ON public.exhibition_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibition images"
  ON public.exhibition_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibition images"
  ON public.exhibition_images
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- EXHIBITION MEDIA TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert exhibition media" ON public.exhibition_media;
DROP POLICY IF EXISTS "Anyone can update exhibition media" ON public.exhibition_media;
DROP POLICY IF EXISTS "Anyone can delete exhibition media" ON public.exhibition_media;

-- Keep public read access
-- "Anyone can view exhibition media" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert exhibition media"
  ON public.exhibition_media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibition media"
  ON public.exhibition_media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete exhibition media"
  ON public.exhibition_media
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- MEDIA TABLE
-- ============================================================================

-- Drop dangerous public policies
DROP POLICY IF EXISTS "Anyone can insert media" ON public.media;
DROP POLICY IF EXISTS "Anyone can update media" ON public.media;
DROP POLICY IF EXISTS "Anyone can delete media" ON public.media;

-- Keep public read access
-- "Anyone can view media" policy already exists and is correct

-- Add authenticated-only policies
CREATE POLICY "Authenticated users can insert media"
  ON public.media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
  ON public.media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON public.media
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- STORAGE BUCKETS SECURITY
-- ============================================================================

-- Drop dangerous public storage policies
DROP POLICY IF EXISTS "Anyone can upload artwork images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update artwork images storage" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete artwork images storage" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can upload exhibition images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update exhibition images storage" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete exhibition images storage" ON storage.objects;

-- Keep public read access for both buckets
-- "Anyone can view artwork images storage" policy already exists and is correct
-- "Anyone can view exhibition images storage" policy already exists and is correct

-- Add authenticated-only storage policies for artwork images
CREATE POLICY "Authenticated users can upload artwork images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated users can update artwork images storage"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'artwork-images')
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated users can delete artwork images storage"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'artwork-images');

-- Add authenticated-only storage policies for exhibition images
CREATE POLICY "Authenticated users can upload exhibition images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Authenticated users can update exhibition images storage"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'exhibition-images')
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Authenticated users can delete exhibition images storage"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'exhibition-images');