/*
  # Create Artworks Database Structure
  
  This migration creates the foundation for managing artwork content in the artist portfolio.
  
  1. Storage Bucket
    - Creates 'artwork-images' bucket for storing artwork photos
    - Public access enabled for viewing portfolio images
  
  2. New Tables
    - `artworks`
      - `id` (uuid, primary key) - Unique identifier for each artwork
      - `title` (text) - Artwork title
      - `description` (text) - Detailed description of the artwork
      - `price` (decimal) - Price in USD
      - `category` (text) - Type: painting, sculpture, or streetart
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp
    
    - `artwork_images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `artwork_id` (uuid) - Links to parent artwork
      - `image_url` (text) - Public URL to the image
      - `image_path` (text) - Storage path for the image
      - `display_order` (integer) - Order for displaying multiple images
      - `created_at` (timestamp) - Upload timestamp
  
  3. Security
    - Row Level Security (RLS) enabled on all tables
    - Public access policies (no authentication required)
    - Anyone can view, insert, update, and delete artworks
    - Storage policies allow public access to artwork images
  
  4. Functions & Triggers
    - Automatic timestamp update function
    - Trigger to update 'updated_at' on artwork changes
*/

-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artwork-images', 'artwork-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create artworks table
CREATE TABLE IF NOT EXISTS public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT NOT NULL CHECK (category IN ('painting', 'sculpture', 'streetart')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create artwork_images table for multiple images per artwork
CREATE TABLE IF NOT EXISTS public.artwork_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_images ENABLE ROW LEVEL SECURITY;

-- Create public policies for artworks
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artworks' AND policyname = 'Anyone can view artworks') THEN
    CREATE POLICY "Anyone can view artworks" ON public.artworks FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artworks' AND policyname = 'Anyone can insert artworks') THEN
    CREATE POLICY "Anyone can insert artworks" ON public.artworks FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artworks' AND policyname = 'Anyone can update artworks') THEN
    CREATE POLICY "Anyone can update artworks" ON public.artworks FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artworks' AND policyname = 'Anyone can delete artworks') THEN
    CREATE POLICY "Anyone can delete artworks" ON public.artworks FOR DELETE USING (true);
  END IF;
END $$;

-- Create public policies for artwork_images
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artwork_images' AND policyname = 'Anyone can view artwork images') THEN
    CREATE POLICY "Anyone can view artwork images" ON public.artwork_images FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artwork_images' AND policyname = 'Anyone can insert artwork images') THEN
    CREATE POLICY "Anyone can insert artwork images" ON public.artwork_images FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artwork_images' AND policyname = 'Anyone can update artwork images') THEN
    CREATE POLICY "Anyone can update artwork images" ON public.artwork_images FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'artwork_images' AND policyname = 'Anyone can delete artwork images') THEN
    CREATE POLICY "Anyone can delete artwork images" ON public.artwork_images FOR DELETE USING (true);
  END IF;
END $$;

-- Create storage policies for artwork images
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can view artwork images storage') THEN
    CREATE POLICY "Anyone can view artwork images storage" ON storage.objects FOR SELECT USING (bucket_id = 'artwork-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can upload artwork images') THEN
    CREATE POLICY "Anyone can upload artwork images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artwork-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can update artwork images storage') THEN
    CREATE POLICY "Anyone can update artwork images storage" ON storage.objects FOR UPDATE USING (bucket_id = 'artwork-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anyone can delete artwork images storage') THEN
    CREATE POLICY "Anyone can delete artwork images storage" ON storage.objects FOR DELETE USING (bucket_id = 'artwork-images');
  END IF;
END $$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_artworks_updated_at') THEN
    CREATE TRIGGER update_artworks_updated_at
      BEFORE UPDATE ON public.artworks
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;