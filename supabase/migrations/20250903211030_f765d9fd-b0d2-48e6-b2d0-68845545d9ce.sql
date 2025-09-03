-- Create media table for interviews and other media content
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  media_name TEXT NOT NULL,
  embed_link TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'interview',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Create policies for media access (public access for viewing)
CREATE POLICY "Anyone can view media" 
ON public.media 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert media" 
ON public.media 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update media" 
ON public.media 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete media" 
ON public.media 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON public.media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();