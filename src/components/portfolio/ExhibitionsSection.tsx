import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string | null;
  description: string | null;
  created_at: string;
}

const ExhibitionsSection = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setExhibitions(data || []);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading exhibitions...</p>
        </div>
      </section>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
              Exhibitions
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay tuned for upcoming exhibitions and artistic showcases.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
            Exhibitions
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Recent solo and group exhibitions showcasing my artistic evolution and growing presence in the contemporary art scene.
          </p>
        </div>
        
        <div className="space-y-6">
          {exhibitions.map((exhibition, index) => (
            <Card 
              key={exhibition.id}
              className="p-8 border-0 shadow-card hover-lift bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-display text-2xl font-medium text-primary">
                      {exhibition.title}
                    </h3>
                    {exhibition.theme && (
                      <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                        {exhibition.theme}
                      </span>
                    )}
                  </div>
                  <div className="font-body text-muted-foreground space-y-1">
                    <p className="text-lg">{exhibition.location}</p>
                    {exhibition.description && (
                      <p className="text-sm">{exhibition.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end gap-2">
                  <span className="font-body text-primary font-medium text-lg">
                    {new Date(exhibition.date).getFullYear()}
                  </span>
                  <Link 
                    to="/exhibitions"
                    className="mt-2"
                  >
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/exhibitions">
            <Button className="mb-4">View All Exhibitions</Button>
          </Link>
          <p className="font-body text-muted-foreground">
            For exhibition inquiries and collaboration opportunities, please{" "}
            <Link to="/contact" className="text-accent hover:text-accent/80 font-medium transition-colors duration-300">
              get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;