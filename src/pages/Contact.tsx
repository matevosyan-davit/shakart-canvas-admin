import { Card } from "@/components/ui/card";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {

  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Navigation */}
      <div className="sticky top-24 z-40 bg-surface p-6">
        {/* Back button removed as this is a top-level page */}
      </div>

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            Contact Me
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            I'd love to hear from you. Whether you're interested in my work, have a commission in mind, 
            or simply want to connect, please don't hesitate to reach out.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {/* Contact Details */}
              <Card className="p-8 bg-card shadow-card border-0">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Email</p>
                      <a href="mailto:contact@shakart.com" className="font-body text-foreground hover:text-accent transition-colors">
                        contact@shakart.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Phone</p>
                      <a href="tel:+1234567890" className="font-body text-foreground hover:text-accent transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Studio</p>
                      <p className="font-body text-foreground">
                        Artist Quarter<br />
                        Creative District, City<br />
                        State 12345
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-8 bg-card shadow-card border-0">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">Follow My Work</h2>
                
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/shakart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                  >
                    <Facebook className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                    <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">Facebook</span>
                  </a>
                  
                  <a
                    href="https://instagram.com/shakart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                  >
                    <Instagram className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                    <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">Instagram</span>
                  </a>
                </div>
                
                <p className="font-body text-sm text-muted-foreground mt-4">
                  Stay updated with my latest artworks, exhibitions, and creative process.
                </p>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;