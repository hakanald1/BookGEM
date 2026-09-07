import { BookOpen, Utensils, Award, Users } from "lucide-react";

export function StatsBar() {
  const stats = [
    {
      icon: Utensils,
      value: "45,000+",
      label: "Recipes Organized",
      description: "From quick family meals to gourmet collections",
    },
    {
      icon: BookOpen,
      value: "8,200+",
      label: "Cookbooks Formatted",
      description: "Ready for digital download or print binding",
    },
    {
      icon: Award,
      value: "100%",
      label: "Print-Ready Output",
      description: "Compatible with Amazon KDP & print houses",
    },
    {
      icon: Users,
      value: "99.4%",
      label: "Satisfaction Rate",
      description: "Trusted by home cooks and food creators",
    },
  ];

  return (
    <section className="w-full bg-background py-12 border-y border-border transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/70 backdrop-blur-sm border border-border shadow-xs transition-all hover:shadow-md hover:border-[#CBA328]/30"
            >
              <div className="p-3 rounded-xl bg-[#CBA328]/10 text-[#CBA328] mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-3xl font-extrabold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="font-semibold text-sm text-foreground/90 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
