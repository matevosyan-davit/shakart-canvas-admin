import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Youtube, Facebook, Play } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Armenia2019 = () => {
  const exhibitionPhotos = [
    {
      image: artwork1,
      caption: "Opening night reception with local art collectors and critics"
    },
    {
      image: artwork2,
      caption: "Main gallery space featuring 'Ancient Rhythms' series"
    },
    {
      image: artwork3,
      caption: "Artist presentation during the opening ceremony"
    },
    {
      image: artwork1,
      caption: "Detail view of traditional Armenian motifs reinterpreted"
    },
    {
      image: artwork2,
      caption: "Visitors engaging with the sculptural installations"
    },
    {
      image: artwork3,
      caption: "Final gallery view showing the complete exhibition layout"
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-surface p-6">
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
              Echoes of Heritage
            </h1>
            <p className="font-body text-xl text-accent font-medium mb-2">
              Yerevan, Armenia • 2019
            </p>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              A retrospective solo exhibition showcasing traditional Armenian motifs reimagined 
              through contemporary artistic expression, featuring 25 paintings and sculptures.
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
                "Echoes of Heritage" marked a pivotal moment in my artistic journey, bringing together 
                five years of exploration into Armenian cultural identity and its place in contemporary art. 
                The exhibition featured 25 original works, including large-scale paintings and sculptural pieces.
              </p>
              <p>
                Each piece in the collection examined different aspects of Armenian heritage - from ancient 
                manuscript illuminations reinterpreted through abstract expressionism to traditional carpet 
                patterns transformed into three-dimensional sculptures. The work questioned how cultural 
                memory survives and evolves in the modern world.
              </p>
              <p>
                The exhibition ran for six weeks at the National Gallery of Armenia, attracting over 3,000 
                visitors and receiving widespread critical acclaim from both local and international art critics.
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
                      <p className="font-body font-medium text-foreground">Exhibition Opening Night</p>
                      <p className="font-body text-sm text-muted-foreground">Armenia TV Cultural Program</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example1" target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                
                <div className="bg-surface rounded-lg p-4 flex items-center justify-between hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-body font-medium text-foreground">Artist Interview</p>
                      <p className="font-body text-sm text-muted-foreground">Behind the Heritage</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://youtube.com/watch?v=example2" target="_blank" rel="noopener noreferrer">
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
                    "Shakart's 'Echoes of Heritage' is a masterful exploration of cultural continuity, 
                    bridging centuries of Armenian artistic tradition with bold contemporary vision."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — Armenian Art Today Magazine
                  </cite>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <blockquote className="font-body text-foreground italic mb-2">
                    "This exhibition establishes Shakart as one of Armenia's most promising contemporary voices, 
                    capable of honoring tradition while pushing artistic boundaries."
                  </blockquote>
                  <cite className="font-body text-sm text-muted-foreground">
                    — Yerevan Cultural Review
                  </cite>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://facebook.com/example1" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 mr-2" />
                    View Facebook Coverage
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

export default Armenia2019;