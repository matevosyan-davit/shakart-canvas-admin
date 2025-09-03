import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const exhibitions = [
  {
    id: 1,
    title: "Echoes of Heritage",
    location: "Yerevan, Armenia",
    year: "2019",
    description: "A retrospective exhibition showcasing traditional Armenian motifs reimagined through contemporary artistic expression. This solo exhibition featured 25 paintings and sculptures exploring cultural identity and modern interpretation of heritage.",
    highlights: [
      {
        image: artwork1,
        caption: "Featured centerpiece: 'Ancient Rhythms' - Oil on Canvas, 72\" × 48\""
      },
      {
        image: artwork2,
        caption: "Installation view showing the main gallery space"
      }
    ],
    mediaLinks: [
      {
        type: "youtube",
        url: "https://youtube.com/watch?v=example1",
        title: "Exhibition Opening Night"
      },
      {
        type: "facebook",
        url: "https://facebook.com/example1",
        title: "Behind the Scenes"
      }
    ],
    press: "Featured in Armenian Art Today magazine and Yerevan Cultural Review"
  },
  {
    id: 2,
    title: "Mediterranean Dialogues",
    location: "Rome, Italy",
    year: "2020",
    description: "A group exhibition bringing together artists from across the Mediterranean region to explore themes of connection, migration, and cultural exchange. Shakart contributed three major works that examined the intersection of Eastern and Western artistic traditions.",
    highlights: [
      {
        image: artwork3,
        caption: "Shakart's contribution: 'Bridging Worlds' - Mixed Media, 60\" × 40\""
      },
      {
        image: artwork1,
        caption: "Exhibition catalog featuring critical essay on Shakart's work"
      }
    ],
    mediaLinks: [
      {
        type: "youtube",
        url: "https://youtube.com/watch?v=example2",
        title: "Artist Panel Discussion"
      },
      {
        type: "facebook",
        url: "https://facebook.com/example2",
        title: "Gallery Walk-through"
      }
    ],
    press: "Reviewed in Arte Contemporanea and featured in La Repubblica's cultural section"
  },
  {
    id: 3,
    title: "Urban Visions",
    location: "Yerevan, Armenia",
    year: "2022",
    description: "A groundbreaking exhibition that brought street art into the gallery space while maintaining its raw, authentic energy. This solo show featured large-scale canvases inspired by urban environments and public art interventions throughout Yerevan.",
    highlights: [
      {
        image: artwork2,
        caption: "Gallery installation recreating urban wall textures"
      },
      {
        image: artwork3,
        caption: "Interactive digital display showing street art locations"
      }
    ],
    mediaLinks: [
      {
        type: "youtube",
        url: "https://youtube.com/watch?v=example3",
        title: "Artist Talk: From Streets to Gallery"
      },
      {
        type: "facebook",
        url: "https://facebook.com/example3",
        title: "Time-lapse of Installation Process"
      }
    ],
    press: "Cover story in Yerevan Arts Quarterly and featured on Armenia TV cultural program"
  }
];

const Exhibitions = () => {
  return (
    <main className="min-h-screen bg-surface">
      {/* Navigation */}
      <div className="p-6">
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
            featuring highlights from shows in Armenia and Italy.
          </p>
        </div>
      </section>

      {/* Exhibitions List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {exhibitions.map((exhibition, index) => (
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
                      {exhibition.location} • {exhibition.year}
                    </p>
                  </div>
                  
                  <p className="font-body text-foreground leading-relaxed mb-6">
                    {exhibition.description}
                  </p>
                  
                  {/* Media Links */}
                  <div className="mb-6">
                    <h3 className="font-display text-lg font-medium text-primary mb-3">Media Coverage</h3>
                    <div className="flex flex-wrap gap-3">
                      {exhibition.mediaLinks.map((link, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.type === 'youtube' ? (
                              <Youtube className="w-4 h-4" />
                            ) : (
                              <Facebook className="w-4 h-4" />
                            )}
                            {link.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Press Coverage */}
                  <div>
                    <h3 className="font-display text-lg font-medium text-primary mb-2">Press Coverage</h3>
                    <p className="font-body text-muted-foreground text-sm">
                      {exhibition.press}
                    </p>
                  </div>
                </div>
                
                {/* Exhibition Highlights */}
                <div>
                  <h3 className="font-display text-lg font-medium text-primary mb-4">Exhibition Highlights</h3>
                  <div className="space-y-4">
                    {exhibition.highlights.map((highlight, idx) => (
                      <div key={idx} className="group">
                        <img
                          src={highlight.image}
                          alt={highlight.caption}
                          className="w-full rounded-lg shadow-card hover-lift transition-transform duration-300"
                        />
                        <p className="font-body text-sm text-muted-foreground mt-2">
                          {highlight.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
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