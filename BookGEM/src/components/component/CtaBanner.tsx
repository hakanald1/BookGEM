import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="w-full py-16 px-6 bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-zinc-950 via-[#1c1917] to-zinc-900 text-white p-10 md:p-16 border border-[#CBA328]/30 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Soft Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#CBA328]/15 rounded-full blur-3xl opacity-60" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#CBA328]/20 text-[#CBA328] flex items-center justify-center mx-auto mb-2">
            <ChefHat className="w-6 h-6" />
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-tight text-white">
            Ready to publish your first cookbook?
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Organize scribbled recipes, scale portions effortlessly, and generate print-ready books without any design degree.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button className="px-8 py-6 rounded-full text-base font-bold bg-[#CBA328] hover:bg-[#b58f20] text-black shadow-lg gap-2 cursor-pointer">
                <span>Create Your Cookbook Free</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
