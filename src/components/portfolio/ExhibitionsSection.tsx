import { Card } from "@/components/ui/card";

const exhibitions = [
  {
    id: 1,
    title: "Convergent Visions",
    gallery: "Modern Art Gallery",
    location: "New York, NY",
    date: "March 2024",
    type: "Solo Exhibition",
    status: "Current"
  },
  {
    id: 2,
    title: "Abstract Narratives",
    gallery: "Contemporary Space",
    location: "Los Angeles, CA",
    date: "September 2023",
    type: "Group Exhibition",
    status: "Past"
  },
  {
    id: 3,
    title: "Emerging Voices",
    gallery: "Art District Gallery",
    location: "San Francisco, CA",
    date: "June 2023",
    type: "Group Exhibition",
    status: "Past"
  },
  {
    id: 4,
    title: "Color & Form",
    gallery: "Cultural Arts Center",
    location: "Chicago, IL",
    date: "December 2022",
    type: "Solo Exhibition",
    status: "Past"
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
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground">
            For exhibition inquiries and collaboration opportunities, please{" "}
            <button className="text-accent hover:text-accent/80 font-medium transition-colors duration-300">
              get in touch
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;