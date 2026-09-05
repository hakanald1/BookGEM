import featureThreeGif from "@/assets/featurethree.gif"

export function FeatureThree() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full py-16 px-12">
            <div className="flex flex-col w-full">
                <div>
                    <div className="rounded-2xl shadow-2xl w-fit flex p-2 mb-4">
                      
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#CBA328"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
  <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
  <path d="M17 18h2" />
  <path d="M20 15h-3v6" />
  <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
</svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair">Format & Publish Beautiful, Professional Cookbooks</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">Turn your recipes into a real cookbook, printed or digital, no design skills needed. It handles the layout and the table of contents, and it'll even work out nutrition info for you.</p>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <img 
                    src={featureThreeGif} 
                    alt="Format & Publish Beautiful, Professional Cookbooks feature demo" 
                    className="w-full h-auto rounded-2xl"
                />
            </div>
        </div>
    )
}