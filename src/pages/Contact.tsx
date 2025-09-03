import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card shadow-card border-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm text-foreground">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-border/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body text-sm text-foreground">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-border/20 focus:border-accent"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-body text-sm text-foreground">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-border/20 focus:border-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-sm text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-border/20 focus:border-accent resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
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

              {/* Studio Hours */}
              <Card className="p-8 bg-card shadow-card border-0">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6">Studio Hours</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-muted-foreground">Monday - Friday</span>
                    <span className="font-body text-sm text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-muted-foreground">Saturday</span>
                    <span className="font-body text-sm text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-muted-foreground">Sunday</span>
                    <span className="font-body text-sm text-foreground">By Appointment</span>
                  </div>
                </div>
                
                <p className="font-body text-xs text-muted-foreground mt-4">
                  * Studio visits welcome by appointment
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