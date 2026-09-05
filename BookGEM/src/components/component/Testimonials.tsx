import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Eleanor Vance",
      role: "Home Baker & Heritage Collector",
      quote:
        "I had 30 years of my mother's handwritten cards in a tin box. BookGEM helped me clean them up, scale ingredients, and print 15 copies for family last Christmas.",
    },
    {
      name: "Chef Marcus Thorne",
      role: "Culinary Educator & Author",
      quote:
        "Formatting recipe books used to take weeks of frustrating InDesign work. Now I generate clean layouts and KDP-ready PDFs in an afternoon.",
    },
    {
      name: "Sophia Chen",
      role: "Food Blogger & Recipe Creator",
      quote:
        "The recipe engine is brilliant for dietary substitutions. When readers ask for vegan or gluten-free variations, BookGEM handles the adjustments instantly.",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#fdfbf7] border-t border-[#CBA328]/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9b7606] bg-[#CBA328]/10 px-3.5 py-1 rounded-full border border-[#CBA328]/20">
            Community Stories
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900">
            Loved By Home Cooks & Food Creators
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Discover how creators use BookGEM to preserve traditions, publish books, and share their culinary passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all hover:border-[#CBA328]/30"
            >
              <div>
                <div className="flex items-center gap-1 text-[#CBA328] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#CBA328]/40 mb-3" />
                <p className="text-gray-700 text-sm leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-playfair font-bold text-gray-900 text-base">
                  {review.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
