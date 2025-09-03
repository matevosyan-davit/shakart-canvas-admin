import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import artistPortrait from "@/assets/artist-portrait.jpg";

const About = () => {
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

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6">
                About Shakart
              </h1>
              <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8">
                Contemporary artist exploring the delicate balance between emotion and abstraction, 
                creating works that speak to the soul through color and form.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={artistPortrait}
                alt="Shakart - Artist Portrait"
                className="w-full rounded-lg shadow-elegant hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-3xl font-medium text-primary mb-6">Artistic Journey</h2>
            <div className="font-body text-foreground space-y-4 leading-relaxed">
              <p>
                Born in Armenia, Shakart discovered their passion for visual arts at an early age. 
                Their work spans multiple mediums including traditional paintings, contemporary sculptures, 
                and urban street art, each piece reflecting a unique perspective on modern life and human emotion.
              </p>
              <p>
                With over a decade of experience, Shakart has developed a distinctive style that bridges 
                the gap between classical techniques and contemporary expression. Their work has been 
                featured in galleries across Armenia and Italy, earning recognition for innovative 
                approaches to color theory and emotional storytelling through abstract forms.
              </p>
              <p>
                "Art is not just about what you see, but what you feel. Each brushstroke carries 
                the weight of human experience, transforming canvas into a window to the soul."
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">Education</h3>
              <div className="font-body text-muted-foreground space-y-2">
                <p>• Fine Arts Academy, Yerevan (2010-2014)</p>
                <p>• Contemporary Art Workshop, Rome (2018)</p>
                <p>• Urban Art Residency, Milan (2020)</p>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">Recognition</h3>
              <div className="font-body text-muted-foreground space-y-2">
                <p>• Emerging Artist Award, Armenia (2019)</p>
                <p>• Contemporary Vision Prize, Italy (2020)</p>
                <p>• Urban Art Excellence, Armenia (2022)</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;