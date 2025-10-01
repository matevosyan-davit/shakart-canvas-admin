/*
  # Create Exhibitions Database Structure
  
  This migration creates comprehensive exhibition management with images and media coverage.
  
  1. Storage Bucket
    - Creates 'exhibition-images' bucket for storing exhibition photos
    - Public access enabled
  
  2. New Tables
    - `exhibitions`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Exhibition title
      - `date` (date) - Exhibition date
      - `location` (text) - Exhibition location
      - `theme` (text) - Optional theme
      - `description` (text) - Detailed description
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp
    
    - `exhibition_images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `exhibition_id` (uuid) - Links to parent exhibition
      - `image_url` (text) - Public URL to the image
      - `image_path` (text) - Storage path
      - `display_order` (integer) - Display order
      - `created_at` (timestamp) - Upload timestamp
    
    - `exhibition_media`
      - `id` (uuid, primary key) - Unique identifier
      - `exhibition_id` (uuid) - Links to parent exhibition
      - `title` (text) - Media coverage title
      - `media_name` (text) - Name of media outlet
      - `embed_link` (text) - Link to coverage
      - `display_order` (integer) - Display order
      - `created_at` (timestamp) - Creation timestamp
  
  3. Security
    - Row Level Security (RLS) enabled on all tables
    - Public access policies (no authentication required)
    - Storage policies allow public access
  
  4. Relationships
    - Cascade delete: deleting exhibition removes all related images and media
*/

-- Create storage bucket for exhibition images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('exhibition-images', 'exhibition-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create exhibitions table
CREATE TABLE IF NOT EXISTS public.exhibitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  theme TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.exhibitions ENABLE ROW LEVEL SECURITY;

-- Create policies for exhibitions
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibitions' AND policyname = 'Anyone can view exhibitions') THEN
    CREATE POLICY "Anyone can view exhibitions" ON public.exhibitions FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibitions' AND policyname = 'Anyone can insert exhibitions') THEN
    CREATE POLICY "Anyone can insert exhibitions" ON public.exhibitions FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibitions' AND policyname = 'Anyone can update exhibitions') THEN
    CREATE POLICY "Anyone can update exhibitions" ON public.exhibitions FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibitions' AND policyname = 'Anyone can delete exhibitions') THEN
    CREATE POLICY "Anyone can delete exhibitions" ON public.exhibitions FOR DELETE USING (true);
  END IF;
END $$;

-- Create exhibition_images table
CREATE TABLE IF NOT EXISTS public.exhibition_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.exhibition_images ENABLE ROW LEVEL SECURITY;

-- Create policies for exhibition images
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_images' AND policyname = 'Anyone can view exhibition images') THEN
    CREATE POLICY "Anyone can view exhibition images" ON public.exhibition_images FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_images' AND policyname = 'Anyone can insert exhibition images') THEN
    CREATE POLICY "Anyone can insert exhibition images" ON public.exhibition_images FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_images' AND policyname = 'Anyone can update exhibition images') THEN
    CREATE POLICY "Anyone can update exhibition images" ON public.exhibition_images FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_images' AND policyname = 'Anyone can delete exhibition images') THEN
    CREATE POLICY "Anyone can delete exhibition images" ON public.exhibition_images FOR DELETE USING (true);
  END IF;
END $$;

-- Create exhibition_media table for media coverage links
CREATE TABLE IF NOT EXISTS public.exhibition_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  media_name TEXT NOT NULL,
  embed_link TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.exhibition_media ENABLE ROW LEVEL SECURITY;

-- Create policies for exhibition media
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_media' AND policyname = 'Anyone can view exhibition media') THEN
    CREATE POLICY "Anyone can view exhibition media" ON public.exhibition_media FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_media' AND policyname = 'Anyone can insert exhibition media') THEN
    CREATE POLICY "Anyone can insert exhibition media" ON public.exhibition_media FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_media' AND policyname = 'Anyone can update exhibition media') THEN
    CREATE POLICY "Anyone can update exhibition media" ON public.exhibition_media FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'exhibition_media' AND policyname = 'Anyone can delete exhibition media') THEN
    CREATE POLICY "Anyone can delete exhibition media" ON public.exhibition_media FOR DELETE USING (true);
  END IF;
END $$;

-- Create policies for exhibition image storage
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can view exhibition images storage') THEN
    CREATE POLICY "Anyone can view exhibition images storage" ON storage.objects FOR SELECT USING (bucket_id = 'exhibition-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can upload exhibition images') THEN
    CREATE POLICY "Anyone can upload exhibition images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'exhibition-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can update exhibition images storage') THEN
    CREATE POLICY "Anyone can update exhibition images storage" ON storage.objects FOR UPDATE USING (bucket_id = 'exhibition-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can delete exhibition images storage') THEN
    CREATE POLICY "Anyone can delete exhibition images storage" ON storage.objects FOR DELETE USING (bucket_id = 'exhibition-images');
  END IF;
END $$;

-- Add trigger for automatic timestamp updates on exhibitions
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_exhibitions_updated_at') THEN
    CREATE TRIGGER update_exhibitions_updated_at
    BEFORE UPDATE ON public.exhibitions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;