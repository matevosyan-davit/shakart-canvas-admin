/*
  # Create Media Table
  
  This migration creates the structure for managing media content like interviews and press coverage.
  
  1. New Tables
    - `media`
      - `id` (uuid, primary key) - Unique identifier for each media item
      - `title` (text) - Title of the interview or media piece
      - `media_name` (text) - Name of the media outlet (e.g., "Armenia TV")
      - `embed_link` (text) - YouTube URL, embed code, or article link
      - `type` (text) - Type of media (default: 'interview')
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp
  
  2. Security
    - Row Level Security (RLS) enabled
    - Public access policies (no authentication required)
    - Anyone can view, insert, update, and delete media items
  
  3. Triggers
    - Automatic timestamp update on changes
*/

-- Create media table for interviews and other media content
CREATE TABLE IF NOT EXISTS public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  media_name TEXT NOT NULL,
  embed_link TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'interview',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Create policies for media access
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'Anyone can view media') THEN
    CREATE POLICY "Anyone can view media" ON public.media FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'Anyone can insert media') THEN
    CREATE POLICY "Anyone can insert media" ON public.media FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'Anyone can update media') THEN
    CREATE POLICY "Anyone can update media" ON public.media FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'Anyone can delete media') THEN
    CREATE POLICY "Anyone can delete media" ON public.media FOR DELETE USING (true);
  END IF;
END $$;

-- Create trigger for automatic timestamp updates
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_media_updated_at') THEN
    CREATE TRIGGER update_media_updated_at
    BEFORE UPDATE ON public.media
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;