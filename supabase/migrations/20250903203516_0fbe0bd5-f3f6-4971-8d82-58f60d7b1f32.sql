-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name, public) VALUES ('artwork-images', 'artwork-images', true);

-- Create artworks table
CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT NOT NULL CHECK (category IN ('painting', 'sculpture', 'streetart')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create artwork_images table for multiple images per artwork
CREATE TABLE public.artwork_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making it public for now since no auth)
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_images ENABLE ROW LEVEL SECURITY;

-- Create public policies (no auth required)
CREATE POLICY "Anyone can view artworks" ON public.artworks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert artworks" ON public.artworks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update artworks" ON public.artworks FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete artworks" ON public.artworks FOR DELETE USING (true);

CREATE POLICY "Anyone can view artwork images" ON public.artwork_images FOR SELECT USING (true);
CREATE POLICY "Anyone can insert artwork images" ON public.artwork_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update artwork images" ON public.artwork_images FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete artwork images" ON public.artwork_images FOR DELETE USING (true);

-- Create storage policies for artwork images
CREATE POLICY "Anyone can view artwork images" ON storage.objects FOR SELECT USING (bucket_id = 'artwork-images');
CREATE POLICY "Anyone can upload artwork images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artwork-images');
CREATE POLICY "Anyone can update artwork images" ON storage.objects FOR UPDATE USING (bucket_id = 'artwork-images');
CREATE POLICY "Anyone can delete artwork images" ON storage.objects FOR DELETE USING (bucket_id = 'artwork-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();