import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const exhibitions = [
  {
    id: 1,
    title: "Echoes of Heritage",
    gallery: "National Gallery of Armenia",
    location: "Yerevan, Armenia",
    date: "2019",
    type: "Solo Exhibition",
    status: "Past",
    link: "/exhibitions/armenia-2019"
  },
  {
    id: 2,
    title: "Mediterranean Dialogues",
    gallery: "Contemporary Arts Center",
    location: "Rome, Italy",
    date: "2020",
    type: "Group Exhibition",
    status: "Past",
    link: "/exhibitions/italy-2020"
  },
  {
    id: 3,
    title: "Urban Visions",
    gallery: "Yerevan Modern Gallery",
    location: "Yerevan, Armenia",
    date: "2022",
    type: "Solo Exhibition",
    status: "Past",
    link: "/exhibitions/armenia-2022"
  }
];

const ExhibitionsSection = () => {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
            Exhibitions
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Recent solo and group exhibitions showcasing my artistic evolution and growing presence in the contemporary art scene.
          </p>
        </div>
        
        <div className="space-y-6">
          {exhibitions.map((exhibition, index) => (
            <Card 
              key={exhibition.id}
              className="p-8 border-0 shadow-card hover-lift bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-display text-2xl font-medium text-primary">
                      {exhibition.title}
                    </h3>
                    {exhibition.status === "Current" && (
                      <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="font-body text-muted-foreground space-y-1">
                    <p className="text-lg">{exhibition.gallery}</p>
                    <p>{exhibition.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end gap-2">
                  <span className="font-body text-primary font-medium text-lg">
                    {exhibition.date}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {exhibition.type}
                  </span>
                  <Link 
                    to={exhibition.link}
                    className="mt-2"
                  >
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground">
            For exhibition inquiries and collaboration opportunities, please{" "}
            <Link to="/contact" className="text-accent hover:text-accent/80 font-medium transition-colors duration-300">
              get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;