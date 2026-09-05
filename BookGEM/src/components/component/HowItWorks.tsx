import { Sparkles, SlidersHorizontal, BookCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Sparkles,
      title: "Input Your Culinary Ideas",
      description:
        "Type in a theme, dietary goal, or leftover ingredients. Tell BookGEM what you feel like cooking or compiling.",
    },
    {
      step: "02",
      icon: SlidersHorizontal,
      title: "AI Measurement & Layout Scaling",
      description:
        "BookGEM handles portion math, formats step-by-step instructions, and crafts elegant dish covers automatically.",
    },
    {
      step: "03",
      icon: BookCheck,
      title: "Export, Share or Publish",
      description:
        "Download print-ready PDFs for self-publishing on Amazon KDP, print physical copies, or export digital downloads.",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9b7606] bg-[#CBA328]/10 px-3.5 py-1 rounded-full border border-[#CBA328]/20">
            Simple 3-Step Process
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900">
            How BookGEM Brings Your Recipes To Life
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            No design experience required. Turn your favorite kitchen creations and scribbled family notes into a publication-worthy cookbook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all group hover:border-[#CBA328]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#CBA328]/10 text-[#9b7606] flex items-center justify-center group-hover:bg-[#CBA328] group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-playfair text-3xl font-extrabold text-gray-300 group-hover:text-[#9b7606] transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
