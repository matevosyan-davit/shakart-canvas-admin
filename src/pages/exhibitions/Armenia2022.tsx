import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Youtube, Facebook, Play } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Armenia2022 = () => {
  const exhibitionPhotos = [
    {
      image: artwork2,
      caption: "Gallery installation recreating urban wall textures and street atmosphere"
    },
    {
      image: artwork3,
      caption: "Interactive digital display showing street art locations throughout Yerevan"
    },
    {
      image: artwork1,
      caption: "Large-scale canvases bringing street energy into gallery space"
    },
    {
      image: artwork2,
      caption: "Opening night with young artists and urban art enthusiasts"
    },
    {
      image: artwork3,
      caption: "Mixed media installations combining gallery and street art elements"
    },
    {
      image: artwork1,
      caption: "Artist demonstration of street art techniques for gallery visitors"
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      {/* Navigation */}
      <div className="p-6">
        <Link to="/exhibitions">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exhibitions
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-4">
              Urban Visions
            </h1>
            <p className="font-body text-xl text-accent font-medium mb-2">
              Yerevan, Armenia • 2022
            </p>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              A groundbreaking solo exhibition that brought street art into the gallery space 
              while maintaining its raw, authentic energy and urban connection.
            </p>
          </div>
        </div>
      </section>

      {/* Exhibition Description */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-2xl font-medium text-primary mb-6">About the Exhibition</h2>
            <div className="font-body text-foreground space-y-4 leading-relaxed">
              <p>
                "Urban Visions" represented a bold experiment in bringing street art into the gallery context 
                without losing its essential character. The exhibition featured 18 large-scale canvases inspired 
                by my street art interventions throughout Yerevan, alongside mixed media installations that 
                recreated the texture and atmosphere of urban walls.
              </p>
              <p>
                Each piece in the exhibition corresponded to a specific location in Yerevan where I had created 
                street art installations. An interactive digital map allowed visitors to explore these locations 
                and see how the street works evolved into gallery pieces. This connection between public and 
                private art spaces challenged traditional boundaries of where art belongs.
              </p>
              <p>
                The exhibition attracted a younger, more diverse audience than typical gallery shows, 
                successfully bridging the gap between street art culture and institutional art spaces. 
                It was featured on Armenia's national television and became a cover story in Yerevan Arts Quarterly.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Exhibition Photos */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-primary mb-8 text-center">
            Exhibition Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitionPhotos.map((photo, index) => (
              <Card 
                key={index}
                className="overflow-hidden border-0 shadow-card hover-lift bg-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <p className="font-body text-sm text-muted-foreground">
                    {photo.caption}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media and Videos */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-primary mb-8 text-center">
            Media Coverage
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Video Content */}
            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">Video Content</h3>
              <div className="space-y-4">
                <div className="bg-surface rounded-lg p-4 flex items-center justify-between hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-body font-medium text-foreground">From Streets to Gallery</p>
                      <p className="font-body text-sm text-muted-foreground">Artist Talk & Demo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example5" target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                
                <div className="bg-surface rounded-lg p-4 flex items-center justify-between hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-body font-medium text-foreground">Installation Time-lapse</p>
                      <p className="font-body text-sm text-muted-foreground">Behind the Scenes</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example6" target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <div className="bg-surface rounded-lg p-4 flex items-center justify-between hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-body font-medium text-foreground">Armenia TV Feature</p>
                      <p className="font-body text-sm text-muted-foreground">National Cultural Program</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example7" target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Press Coverage */}
            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">Press Reviews</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <blockquote className="font-body text-foreground italic mb-2">
                    "Urban Visions successfully challenges the traditional gallery-street art divide, 
                    creating a new model for how street art can exist in institutional spaces without 
                    losing its authentic voice."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — Yerevan Arts Quarterly (Cover Story)
                  </cite>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <blockquote className="font-body text-foreground italic mb-2">
                    "Shakart's exhibition marks a significant moment in Armenian contemporary art, 
                    proving that street art deserves serious critical attention and institutional recognition."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — Armenia Today Arts Review
                  </cite>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://facebook.com/example3" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 mr-2" />
                    View Exhibition Updates
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Armenia2022;