import artistPortrait from "@/assets/artist-portrait.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-8">
              About the Artist
            </h2>
            <div className="font-body text-lg text-foreground leading-relaxed space-y-6">
              <p>
                Born from a deep fascination with the interplay between emotion and form, my artistic journey 
                began over two decades ago. I explore the boundaries between representation and abstraction, 
                creating works that speak to the universal human experience.
              </p>
              <p>
                My paintings are investigations into color, texture, and movement—each piece a conversation 
                between conscious intention and intuitive expression. I work primarily with oils and mixed media, 
                allowing the materials themselves to guide the creative process.
              </p>
              <p>
                Based in my studio, I continue to push the boundaries of contemporary painting, 
                seeking to create work that resonates on both intellectual and emotional levels. 
                My paintings have been exhibited in galleries across the country and are held in private collections worldwide.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-2xl font-medium text-primary mb-3">Education</h3>
                <div className="font-body text-muted-foreground space-y-2">
                  <p>MFA, Fine Arts</p>
                  <p>Academy of Art University</p>
                  <p>San Francisco, CA</p>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-primary mb-3">Recognition</h3>
                <div className="font-body text-muted-foreground space-y-2">
                  <p>Emerging Artist Award 2023</p>
                  <p>Contemporary Arts Foundation</p>
                  <p>Featured in Art Monthly</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in order-first lg:order-last">
            <div className="relative">
              <img
                src={artistPortrait}
                alt="Shakart in studio"
                className="w-full rounded-lg shadow-elegant"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20 animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;