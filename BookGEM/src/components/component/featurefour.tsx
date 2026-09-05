import featureFourGif from "@/assets/feauturefour.gif"

export function FeatureFour() {
    return (
        <div className="  grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full py-16 px-12">
            <div className="w-full flex items-center justify-center order-2 md:order-1">
                <img 
                    src={featureFourGif} 
                    alt="Share & Monetize Your Custom Cookbooks feature demo" 
                    className="w-full h-auto rounded-2xl"
                />
            </div>
            <div className="flex flex-col w-full order-1 md:order-2">
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
  <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M8.7 10.7l6.6 -3.4" />
  <path d="M8.7 13.3l6.6 3.4" />
</svg>
                </div>
                <div>
                    <h2 className=" font-playfair text-3xl md:text-4xl font-bold">Share & Monetize Your Custom Cookbooks</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">Take your culinary passion to the next level. Export print-ready PDFs for Amazon KDP, self-publish custom cookbooks, or share digital downloads with your audience to build your food brand and earn income.</p>
                </div>
            </div>
        </div>
    )
}