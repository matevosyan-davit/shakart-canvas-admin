import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ExhibitionImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface ExhibitionMedia {
  id: string;
  title: string;
  media_name: string;
  embed_link: string;
  display_order: number;
}

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string | null;
  description: string | null;
  created_at: string;
  exhibition_images: ExhibitionImage[];
  exhibition_media: ExhibitionMedia[];
}

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitions')
        .select(`
          *,
          exhibition_images (
            id,
            image_url,
            display_order
          ),
          exhibition_media (
            id,
            title,
            media_name,
            embed_link,
            display_order
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      
      const sortedExhibitions = data?.map(exhibition => ({
        ...exhibition,
        exhibition_images: exhibition.exhibition_images.sort((a: ExhibitionImage, b: ExhibitionImage) => a.display_order - b.display_order),
        exhibition_media: exhibition.exhibition_media.sort((a: ExhibitionMedia, b: ExhibitionMedia) => a.display_order - b.display_order)
      })) || [];
      
      setExhibitions(sortedExhibitions);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractEmbedUrl = (embedLink: string): string => {
    if (embedLink.startsWith('http')) {
      return embedLink;
    }
    
    const srcMatch = embedLink.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    return embedLink;
  };

  const convertToEmbedUrl = (url: string): string => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    if (url.includes('/embed/')) {
      return url;
    }
    
    return url;
  };

  const isVideoUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || 
           url.includes('vimeo.com') || url.includes('/embed/');
  };
  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-surface p-6">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            Exhibitions
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A journey through major exhibitions that have shaped my artistic career, 
            featuring highlights from shows in Armenia and around the world.
          </p>
        </div>
      </section>

      {/* Exhibitions List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading exhibitions...</p>
            </div>
          ) : exhibitions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No exhibitions found.</p>
            </div>
          ) : (
            exhibitions.map((exhibition, index) => (
              <Card 
                key={exhibition.id} 
                className="p-8 bg-card shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Exhibition Info */}
                  <div>
                    <div className="mb-6">
                      <h2 className="font-display text-3xl font-semibold text-primary mb-2">
                        {exhibition.title}
                      </h2>
                      <p className="font-body text-accent text-lg font-medium">
                        {exhibition.location} • {new Date(exhibition.date).getFullYear()}
                      </p>
                      {exhibition.theme && (
                        <p className="font-body text-muted-foreground italic mt-1">
                          Theme: {exhibition.theme}
                        </p>
                      )}
                    </div>
                    
                    {exhibition.description && (
                      <p className="font-body text-foreground leading-relaxed mb-6">
                        {exhibition.description}
                      </p>
                    )}
                    
                    {/* Media Coverage */}
                    {exhibition.exhibition_media.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-display text-lg font-medium text-primary mb-3">Media Coverage</h3>
                        <div className="space-y-3">
                          {exhibition.exhibition_media.map((media) => (
                            <div key={media.id} className="border border-border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-foreground">{media.title}</h4>
                                  <p className="text-sm text-muted-foreground">{media.media_name}</p>
                                </div>
                                <Play className="w-5 h-5 text-accent flex-shrink-0" />
                              </div>
                              
                              {isVideoUrl(extractEmbedUrl(media.embed_link)) ? (
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                                  <iframe
                                    src={convertToEmbedUrl(extractEmbedUrl(media.embed_link))}
                                    title={media.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2"
                                  asChild
                                >
                                  <a 
                                    href={extractEmbedUrl(media.embed_link)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    Read Article
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Exhibition Images */}
                  {exhibition.exhibition_images.length > 0 && (
                    <div>
                      <h3 className="font-display text-lg font-medium text-primary mb-4">Exhibition Highlights</h3>
                      <div className="space-y-4">
                        {exhibition.exhibition_images.map((image, idx) => (
                          <div key={image.id} className="group">
                            <img
                              src={image.image_url}
                              alt={`${exhibition.title} - Image ${idx + 1}`}
                              className="w-full rounded-lg shadow-card hover-lift transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-2xl font-medium text-primary mb-4">
              Exhibition Inquiries
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Interested in featuring my work in your gallery or collaborating on an exhibition? 
              I'm always open to discussing new opportunities and artistic partnerships.
            </p>
            <Link to="/contact">
              <Button className="font-body">
                Get in Touch
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Exhibitions;