import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import ContactSection from "@/components/portfolio/ContactSection";

const Contact = () => {
  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Hero Header */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-primary mb-8 animate-slide-up">
            Let's Connect
          </h1>
          <p className="font-body text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Ready to discuss your vision? I'd love to hear about your project and explore how we can bring your ideas to life through art.
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold h-auto min-h-[60px] shadow-elegant hover-lift"
            >
              <a href="mailto:contact@shakart.com" className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                Email Me Directly
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold h-auto min-h-[60px] hover-lift"
            >
              <a href="tel:+1234567890" className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                Call Me Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
};

export default Contact;