import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import mockupHeroImg from "@/assets/mockuphero1.jpeg"
import mockupFullImg from "@/assets/mock_full.png"
import mockPage2 from "@/assets/mock-page2.jpeg"
import { FileText, ArrowRight } from "lucide-react"
import { DotGrid } from "@/components/ui/dot-grid"
import { TextType } from "@/components/ui/text-type"

const heroPhrases = [
  "The All-in-One generator for custom recipes and Cookbooks..",
  "One app for every recipe you'll ever cook, sort, or publish..",
  "From scribbled notes to a finished cookbook, in one place..",
  "Your recipes, actually organized for once..",
  "Your recipes, bound like they mean it..",
  "From kitchen notes to bookshelf, no design degree required..",
  "Turn 20 years of family recipes into one real book..",
]

export function NavHook() {
  return (
    <div 
      className="hook-section pd-5 relative w-full min-h-screen flex flex-col justify-center items-center bg-[#fdfbf7] py-[100px] pb-80 mb-24"  
    >
      <DotGrid dotColor="#cbd5e1" glowColor="#9b7606" dotSize={2} gap={24} proximity={140} />



      <h1 className= " font-playfair relative z-10 text-5xl md:text-6xl font-bold flex flex-col gap-1 text-center text-gray-900">
        Quickly craft your own<span className=""> premium <span  className="gap-0 p-0 m-0 leading-10 relative inline-block">CookBook<svg className="p-0 m-0" width="242" height="30" viewBox="0 0 242 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.500122 3H241L20.0796 11.8L203.343 7.8L30.1215 18.2H203.343L81.3349 27" stroke="#9b7606" strokeWidth="6"></path></svg></span>
  </span>
      </h1>
      <p className=" font-playfair relative z-10 mt-5 text-center text-lg md:text-xl font-medium italic text-gray-700 min-h-[3rem] flex items-center justify-center px-4">
        <TextType 
          text={heroPhrases}
          typingSpeed={40}
          deletingSpeed={20}
          pauseDuration={2200}
        />
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Link to="/signup">
          <Button className="px-10 py-6 rounded-full text-base font-bold text-black shadow-lg gap-2 cursor-pointer">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

     
      <div className= " font-playfair relative w-full max-w-6xl mx-auto pointer-events-none mt-16">
        
       
        {/* Right Card - Classic Recipe */}
        <div className="rigth_mockup pointer-events-auto hidden lg:flex absolute right-0 -bottom-48 w-72 rounded-2xl bg-white shadow-2xl animated-card-border p-4 flex-col z-20">
          <div className="flex flex-row justify-start items-center gap-2 mb-3">
           <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm ">Classic Recipe</span>
          </div>
          <div className="flex flex-row justify-center w-full">
            <img
              src={mockupHeroImg}
              alt="Cookbook mockup"
              className="w-[98%] h-[98%] rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Center Card - Full CookBook */}
        <div className="center_mockup pointer-events-auto hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-[420px] w-[60%] max-w-[90%] rounded-2xl bg-white shadow-2xl animated-card-border p-4 flex-col z-10">
          <div className="flex flex-row justify-center items-center gap-2 mb-3">
           <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm">Full CookBook</span>
          </div>
          <div className="flex flex-row justify-center w-full">
            <img
              src={mockupFullImg}
              alt="Full Cookbook mockup"
              className="w-[98%] h-[98%] rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Left Card - Minimalist Recipe Page */}
        <div className="left_mockup pointer-events-auto hidden lg:flex absolute left-0 -bottom-80 w-72 rounded-2xl bg-white shadow-2xl animated-card-border p-4 flex-col z-5">
          <div className="flex flex-row justify-start items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm">Minimalist Recipe Page</span>
          </div>
          <div className="flex flex-row justify-center w-full">
            <img
              src={mockPage2}
              alt="Recipe page mockup"
              className="w-[98%] h-[98%] rounded-2xl object-cover"
            />
          </div>
        </div>

      </div>

    </div>
  )
}