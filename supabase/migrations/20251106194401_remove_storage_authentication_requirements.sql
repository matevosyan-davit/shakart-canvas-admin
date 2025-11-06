/*
  # Remove Authentication Requirements from Storage Policies
  
  ## Purpose
  Update storage bucket policies to allow public uploads, updates, and deletes
  since authentication has been removed from the application.
  
  ## Changes
  1. Drop authenticated-only storage policies
  2. Create new public storage policies for INSERT, UPDATE, DELETE
  
  ## Tables Affected
  - storage.objects (artwork-images and exhibition-images buckets)
*/

-- Drop existing authenticated-only policies for artwork images storage
DROP POLICY IF EXISTS "Authenticated users can upload artwork images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update artwork images storage" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete artwork images storage" ON storage.objects;

-- Create new public policies for artwork images storage
CREATE POLICY "Anyone can upload artwork images"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Anyone can update artwork images storage"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'artwork-images')
  WITH CHECK (bucket_id = 'artwork-images');

CREATE POLICY "Anyone can delete artwork images storage"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'artwork-images');

-- Drop existing authenticated-only policies for exhibition images storage
DROP POLICY IF EXISTS "Authenticated users can upload exhibition images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update exhibition images storage" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete exhibition images storage" ON storage.objects;

-- Create new public policies for exhibition images storage
CREATE POLICY "Anyone can upload exhibition images"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Anyone can update exhibition images storage"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'exhibition-images')
  WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Anyone can delete exhibition images storage"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'exhibition-images');
