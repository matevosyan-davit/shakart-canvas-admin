/*
  # Restore Authentication Requirements to Storage Policies
  
  ## Purpose
  Update storage bucket policies to require authentication for uploads, updates, and deletes
  while keeping read access public.
  
  ## Changes
  1. Drop public write storage policies
  2. Create authenticated-only storage policies for INSERT, UPDATE, DELETE
  3. Keep SELECT policies public for viewing images
  
  ## Tables Affected
  - storage.objects (artwork-images and exhibition-images buckets)
*/

-- ============================================================================
-- ARTWORK IMAGES STORAGE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can upload artwork images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update artwork images storage" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete artwork images storage" ON storage.objects;

CREATE POLICY "Authenticated users can upload artwork images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated users can update artwork images storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'artwork-images')
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated users can delete artwork images storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'artwork-images');

-- ============================================================================
-- EXHIBITION IMAGES STORAGE
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can upload exhibition images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update exhibition images storage" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete exhibition images storage" ON storage.objects;

CREATE POLICY "Authenticated users can upload exhibition images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Authenticated users can update exhibition images storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'exhibition-images')
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Authenticated users can delete exhibition images storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'exhibition-images');
