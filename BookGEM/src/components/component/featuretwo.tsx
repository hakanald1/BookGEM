import featureTwoGif from "@/assets/featuretwo.gif"

export function FeatureTwo() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full py-16 px-12">
            <div className="w-full flex items-center justify-center order-2 md:order-1">
                <img 
                    src={featureTwoGif} 
                    alt="Tweak and organize recipes feature demo" 
                    className="w-full h-auto rounded-2xl"
                />
            </div>
            <div className="flex flex-col w-full order-1 md:order-2">
                <div className="rounded-2xl shadow-2xl w-fit flex p-2 mb-4">                  <svg
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
  <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
  <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
  <path d="M5 8h4" />
  <path d="M9 16h4" />
  <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
  <path d="M14 9l4 -1" />
  <path d="M16 16l3.923 -.98" />
</svg>
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair">Tweak your recipes, keep them sorted, actually find them when you need them</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">Keep your recipes in one place — old favorites, the family stuff nobody ever wrote down, whatever you're messing around with this week. Change the servings, fix the steps, mess with the seasoning until it tastes like it should.</p>
                </div>
            </div>
        </div>
    )
}