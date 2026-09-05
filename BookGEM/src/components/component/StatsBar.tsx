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
    <section className="w-full bg-[#fdfbf7] py-12 border-y border-[#CBA328]/15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-[#CBA328]/30"
            >
              <div className="p-3 rounded-xl bg-[#CBA328]/10 text-[#9b7606] mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-3xl font-extrabold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="font-semibold text-sm text-gray-800 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
