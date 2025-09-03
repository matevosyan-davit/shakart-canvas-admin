import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Youtube, Facebook, Play, Newspaper, Radio, Tv } from "lucide-react";
import { Link } from "react-router-dom";

const Media = () => {
  const interviews = [
    {
      id: 1,
      title: "The Evolution of Armenian Contemporary Art",
      outlet: "Armenia TV Cultural Program",
      date: "March 2024",
      type: "tv",
      description: "In-depth discussion about my artistic journey and the role of contemporary art in preserving and evolving Armenian cultural identity.",
      link: "https://youtube.com/watch?v=interview1"
    },
    {
      id: 2,
      title: "From Street to Gallery: An Artist's Journey",
      outlet: "Yerevan Arts Radio",
      date: "January 2024",
      type: "radio",
      description: "Radio interview discussing the transition from street art to gallery exhibitions and the challenges of maintaining authenticity across different contexts.",
      link: "https://youtube.com/watch?v=interview2"
    },
    {
      id: 3,
      title: "Mediterranean Connections: Art Without Borders",
      outlet: "RAI Culture (Italy)",
      date: "October 2020",
      type: "tv",
      description: "Television documentary feature exploring my participation in Mediterranean Dialogues and the role of art in cultural exchange.",
      link: "https://youtube.com/watch?v=interview3"
    }
  ];

  const pressFeatures = [
    {
      id: 1,
      title: "Shakart: Bridging Tradition and Innovation",
      outlet: "Armenian Art Today Magazine",
      date: "February 2024",
      type: "magazine",
      description: "Cover story exploring my artistic evolution and impact on contemporary Armenian art scene.",
      excerpt: "In a rapidly changing world, few artists manage to honor their cultural heritage while pushing artistic boundaries. Shakart represents a new generation of Armenian artists who understand that tradition and innovation are not opposing forces, but complementary aspects of authentic artistic expression.",
      link: "https://example.com/magazine1"
    },
    {
      id: 2,
      title: "The Street Art Revolution Comes to Yerevan Galleries",
      outlet: "Yerevan Arts Quarterly",
      date: "November 2022",
      type: "magazine",
      description: "Analysis of the Urban Visions exhibition and its impact on the local art scene.",
      excerpt: "Urban Visions represents more than just an exhibition; it's a manifesto for a new approach to street art in institutional contexts. Shakart has successfully demonstrated that street art can maintain its rebellious spirit while engaging with gallery audiences.",
      link: "https://example.com/magazine2"
    },
    {
      id: 3,
      title: "Armenian Artist Makes Mark in Rome",
      outlet: "La Repubblica Cultural Section",
      date: "September 2020",
      type: "newspaper",
      description: "Coverage of my participation in Mediterranean Dialogues exhibition in Rome.",
      excerpt: "Among the fifteen artists participating in Mediterranean Dialogues, Shakart's work stands out for its sophisticated blend of Eastern and Western artistic traditions, creating a unique voice in contemporary international art.",
      link: "https://example.com/newspaper1"
    }
  ];

  const documentaries = [
    {
      id: 1,
      title: "Artists of New Armenia",
      producer: "Armenia Cultural Foundation",
      year: "2023",
      description: "Documentary featuring contemporary Armenian artists, including an extended segment on my work and artistic philosophy.",
      link: "https://youtube.com/watch?v=documentary1"
    },
    {
      id: 2,
      title: "Mediterranean Art Connections",
      producer: "European Arts Network",
      year: "2021",
      description: "International documentary exploring cross-cultural artistic collaborations, featuring my work from the Rome exhibition.",
      link: "https://youtube.com/watch?v=documentary2"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tv':
        return <Tv className="w-5 h-5 text-accent" />;
      case 'radio':
        return <Radio className="w-5 h-5 text-accent" />;
      case 'magazine':
        return <Newspaper className="w-5 h-5 text-accent" />;
      case 'newspaper':
        return <Newspaper className="w-5 h-5 text-accent" />;
      default:
        return <Play className="w-5 h-5 text-accent" />;
    }
  };

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
            Media & Press
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Interviews, documentaries, and press coverage exploring my artistic journey 
            and contributions to contemporary art.
          </p>
        </div>
      </section>

      {/* Interviews Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-primary mb-8">Interviews</h2>
          <div className="space-y-6">
            {interviews.map((interview, index) => (
              <Card 
                key={interview.id}
                className="p-6 bg-card shadow-card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {getTypeIcon(interview.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-medium text-primary mb-1">
                          {interview.title}
                        </h3>
                        <p className="font-body text-muted-foreground">
                          {interview.outlet} • {interview.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={interview.link} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Watch/Listen
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    </div>
                    <p className="font-body text-foreground leading-relaxed">
                      {interview.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Features Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-primary mb-8">Press Features</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {pressFeatures.map((feature, index) => (
              <Card 
                key={feature.id}
                className="p-6 bg-card shadow-card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  {getTypeIcon(feature.type)}
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-medium text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {feature.outlet} • {feature.date}
                    </p>
                  </div>
                </div>
                
                <p className="font-body text-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <blockquote className="border-l-4 border-accent pl-4 mb-4">
                  <p className="font-body text-foreground italic">
                    {feature.excerpt}
                  </p>
                </blockquote>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={feature.link} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentaries Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-primary mb-8">Documentaries</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {documentaries.map((doc, index) => (
              <Card 
                key={doc.id}
                className="p-6 bg-card shadow-card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Play className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-xl font-medium text-primary mb-2">
                      {doc.title}
                    </h3>
                    <p className="font-body text-muted-foreground mb-3">
                      {doc.producer} • {doc.year}
                    </p>
                    <p className="font-body text-foreground leading-relaxed mb-4">
                      {doc.description}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer">
                        <Youtube className="w-4 h-4 mr-2" />
                        Watch Documentary
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-2xl font-medium text-primary mb-4">
              Media Inquiries
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              For interviews, press materials, or media collaborations, please reach out. 
              I'm always happy to discuss my work and artistic process with journalists and media professionals.
            </p>
            <Link to="/contact">
              <Button className="font-body">
                Contact for Media
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Media;