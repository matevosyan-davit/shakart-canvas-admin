-- Create exhibitions table
CREATE TABLE public.exhibitions (
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

-- Create policies for exhibitions (allowing public access since it's public content)
CREATE POLICY "Anyone can view exhibitions" 
ON public.exhibitions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert exhibitions" 
ON public.exhibitions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update exhibitions" 
ON public.exhibitions 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete exhibitions" 
ON public.exhibitions 
FOR DELETE 
USING (true);

-- Create exhibition_images table
CREATE TABLE public.exhibition_images (
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
CREATE POLICY "Anyone can view exhibition images" 
ON public.exhibition_images 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert exhibition images" 
ON public.exhibition_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update exhibition images" 
ON public.exhibition_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete exhibition images" 
ON public.exhibition_images 
FOR DELETE 
USING (true);

-- Create exhibition_media table for media coverage links
CREATE TABLE public.exhibition_media (
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
CREATE POLICY "Anyone can view exhibition media" 
ON public.exhibition_media 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert exhibition media" 
ON public.exhibition_media 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update exhibition media" 
ON public.exhibition_media 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete exhibition media" 
ON public.exhibition_media 
FOR DELETE 
USING (true);

-- Create storage bucket for exhibition images
INSERT INTO storage.buckets (id, name, public) VALUES ('exhibition-images', 'exhibition-images', true);

-- Create policies for exhibition image uploads
CREATE POLICY "Anyone can view exhibition images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'exhibition-images');

CREATE POLICY "Anyone can upload exhibition images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'exhibition-images');

CREATE POLICY "Anyone can update exhibition images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'exhibition-images');

CREATE POLICY "Anyone can delete exhibition images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'exhibition-images');

-- Add trigger for automatic timestamp updates on exhibitions
CREATE TRIGGER update_exhibitions_updated_at
BEFORE UPDATE ON public.exhibitions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();