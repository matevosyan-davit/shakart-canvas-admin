import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Youtube, Facebook, Play } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Italy2020 = () => {
  const exhibitionPhotos = [
    {
      image: artwork3,
      caption: "Gallery entrance featuring 'Bridging Worlds' as the centerpiece"
    },
    {
      image: artwork1,
      caption: "International artists panel discussion during opening week"
    },
    {
      image: artwork2,
      caption: "Visitors exploring the Mediterranean Dialogues collection"
    },
    {
      image: artwork3,
      caption: "Shakart's three major works displayed in the main hall"
    },
    {
      image: artwork1,
      caption: "Cultural exchange moment with Italian and Armenian visitors"
    },
    {
      image: artwork2,
      caption: "Evening reception with Rome's art community"
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
              Mediterranean Dialogues
            </h1>
            <p className="font-body text-xl text-accent font-medium mb-2">
              Rome, Italy • 2020
            </p>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              A group exhibition bringing together artists from across the Mediterranean region 
              to explore themes of connection, migration, and cultural exchange.
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
                "Mediterranean Dialogues" was a landmark group exhibition that brought together 15 artists 
                from countries bordering the Mediterranean Sea. The exhibition explored how artists from 
                different cultures interpret shared experiences of migration, cultural exchange, and historical connection.
              </p>
              <p>
                I contributed three major works to this exhibition: "Bridging Worlds," "Eastern Winds," and 
                "Harbor Memories." Each piece examined the intersection of Eastern and Western artistic traditions, 
                drawing from my Armenian heritage while engaging with Italian Renaissance techniques learned 
                during my residency in Rome.
              </p>
              <p>
                The exhibition was particularly meaningful as it took place during a time of global isolation, 
                yet celebrated the connections that transcend borders. It received extensive coverage in Italian 
                art publications and was extended by two weeks due to popular demand.
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
                      <p className="font-body font-medium text-foreground">Artist Panel Discussion</p>
                      <p className="font-body text-sm text-muted-foreground">Mediterranean Perspectives</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example3" target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                
                <div className="bg-surface rounded-lg p-4 flex items-center justify-between hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-body font-medium text-foreground">Gallery Walkthrough</p>
                      <p className="font-body text-sm text-muted-foreground">RAI Culture Documentary</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example4" target="_blank" rel="noopener noreferrer">
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
                    "Shakart's contribution to Mediterranean Dialogues demonstrates a sophisticated 
                    understanding of cross-cultural artistic dialogue, creating works that speak both 
                    to Armenian heritage and Italian artistic tradition."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — Arte Contemporanea
                  </cite>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <blockquote className="font-body text-foreground italic mb-2">
                    "Among the 15 participating artists, Shakart's 'Bridging Worlds' stands out as 
                    a powerful metaphor for the exhibition's central theme of cultural connection."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — La Repubblica Cultural Section
                  </cite>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://facebook.com/example2" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 mr-2" />
                    View Social Coverage
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

export default Italy2020;