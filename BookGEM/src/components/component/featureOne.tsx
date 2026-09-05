import featureOneGif from "@/assets/featureone.gif"

export function FeatureOne() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full pt-32 pb-16 px-12">
            <div className="flex flex-col w-full">
                <div>
                    <div className=" rounded-2xl p-2 mb-4 flex shadow-2xl w-fit ">
                       {/*
category: Food
tags: [soup, breakfast, cereal, cutlery, utensils, dine, culinary, cookware, eat, dish]
version: "2.46"
unicode: "fd91"
*/}
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#CBA328"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z" />
  <path d="M8 7c1.657 0 3 -.895 3 -2s-1.343 -2 -3 -2s-3 .895 -3 2s1.343 2 3 2" />
  <path d="M11 5h9" />
</svg>
                    </div>
                    <h1 className="text-4xl font-bold font-playfair">Cook up new recipe ideas — even the weird, hyper-specific ones — in seconds</h1>
                <p className="mt-4 text-gray-600 leading-relaxed"> BookGEM's recipe engine throws out dish ideas, dietary swaps, and whatever's hot in food this month. Tell it what's in your fridge, and it handles the pairing and scaling math so you're not doing it by hand.

It won't taste the dish for you. But it can save you from making four mediocre versions of the same recipe before you land on the one that actually works.</p>
                </div>
                <div>
                    
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <img 
                    src={featureOneGif} 
                    alt="Cook up new recipe ideas feature demo" 
                    className="w-full h-auto rounded-2xl"
                />
            </div>
        </div>
    )
}