import { 
  ChefHat, 
  Sparkles, 
  Loader2, 
  Minus, 
  Plus, 
  Play, 
  Pause, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RecipeLayoutProps } from './types';

export function EditorialRecipeLayout({
  recipe,
  fullImageUrl,
  currentServings,
  baseServings,
  scaleRatio,
  checkedIngredients,
  toggleIngredientCheck,
  completedSteps,
  toggleStepCheck,
  activeStepTimerIndex,
  timerSecondsLeft,
  isTimerRunning,
  handleStartTimer,
  handleGenerateImage,
  isGeneratingImage,
  setServingsMultiplier,
  displayPrepTime,
  displayCookTime,
  displayTotalTime,
  nutritionCalories,
  nutritionFat,
  nutritionCarbs,
  nutritionProtein,
  hasNutrition,
}: RecipeLayoutProps) {

  const formatQuantity = (qtyStr?: string) => {
    if (!qtyStr) return "";
    const numeric = parseFloat(qtyStr);
    if (isNaN(numeric)) return qtyStr;
    const scaled = numeric * scaleRatio;
    return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
  };

  const parseStep = (instruction: string, _stepIndex: number) => {
    if (!instruction) return { title: null, description: "" };
    const colonIndex = instruction.indexOf(":");
    if (colonIndex > 0 && colonIndex < 40) {
      return {
        title: instruction.slice(0, colonIndex).trim(),
        description: instruction.slice(colonIndex + 1).trim()
      };
    }
    return {
      title: null,
      description: instruction
    };
  };

  const parseIngredient = (ing: any) => {
    if (!ing) return { quantity: "", unit: "", item: "", notes: undefined };
    if (typeof ing === "string") {
      return { quantity: "", unit: "", item: ing, notes: undefined };
    }
    return {
      quantity: ing?.quantity || (ing as any)?.amount || (ing as any)?.qty || "",
      unit: ing?.unit || (ing as any)?.measure || "",
      item: ing?.item || (ing as any)?.name || (ing as any)?.ingredient || (ing as any)?.title || "",
      notes: ing?.notes || (ing as any)?.note || undefined,
    };
  };

  return (
    <div className="w-full flex flex-col pb-28 space-y-12 md:space-y-16">
      
      {/* Grand Hero Banner with Atmospheric Culinary Photo */}
      <header className="relative w-full h-[55vh] md:h-[70vh] min-h-[440px] flex items-center justify-center overflow-hidden bg-neutral-950 shadow-md">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-102"
          style={{ 
            backgroundImage: fullImageUrl ? `url('${fullImageUrl}')` : undefined 
          }}
        >
          {!fullImageUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-400 p-6 text-center">
              <ChefHat className="h-20 w-20 text-[#775a19] opacity-70 mb-4" />
              <p className="text-sm tracking-widest uppercase font-medium">No Image Generated Yet</p>
            </div>
          )}
          {/* Atmospheric Dark Overlays */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
        </div>

        {/* Title & Collection Kicker Centered */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-12 space-y-5">
          <p className="font-sans text-xs md:text-sm font-semibold text-[#fed488] tracking-[0.25em] uppercase drop-shadow-sm">
            The {recipe.cuisine || "Gourmet"} Collection
          </p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.12] drop-shadow-xl max-w-3xl mx-auto">
            {recipe.title}
          </h1>

          {/* Quick AI Photo Generation trigger on hero */}
          <div className="pt-3 print:hidden">
            <Button
              size="sm"
              variant="ghost"
              disabled={isGeneratingImage}
              onClick={handleGenerateImage}
              className="text-xs text-white/85 hover:text-white hover:bg-white/15 gap-2 rounded-full px-5 py-2 border border-white/25 backdrop-blur-xs cursor-pointer transition-all shadow-sm"
            >
              {isGeneratingImage ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-[#fed488]" />
              )}
              {recipe.imageUrl ? "Regenerate Culinary Photo with AI" : "Generate Photo with AI"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Editorial Content Container with Generous Spacing */}
      <main className="max-w-[1160px] w-full mx-auto px-6 sm:px-10 md:px-14 space-y-16 md:space-y-20">
        
        {/* Description Lead-in & Metadata Strip */}
        <section className="max-w-3xl mx-auto text-center space-y-10">
          {recipe.description && (
            <p className="font-sans text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {recipe.description}
            </p>
          )}

          {/* Minimalist Metadata Divider Strip */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 pt-4 pb-4 text-neutral-700 dark:text-neutral-300">
            <div className="flex flex-col items-center min-w-16">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Cuisine</span>
              <span className="text-sm font-semibold capitalize">{recipe.cuisine || "International"}</span>
            </div>

            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            <div className="flex flex-col items-center min-w-16">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Difficulty</span>
              <span className="text-sm font-semibold capitalize">{recipe.difficulty || "Easy"}</span>
            </div>

            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            <div className="flex flex-col items-center min-w-16">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Prep</span>
              <span className="text-sm font-semibold">{displayPrepTime}</span>
            </div>

            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            <div className="flex flex-col items-center min-w-16">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Cook</span>
              <span className="text-sm font-semibold">{displayCookTime}</span>
            </div>

            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            <div className="flex flex-col items-center min-w-16">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Total</span>
              <span className="text-sm font-semibold">{displayTotalTime}</span>
            </div>

            <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

            {/* Servings with quick adjuster */}
            <div className="flex flex-col items-center min-w-20">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] dark:text-[#e9c176] mb-1">Servings</span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setServingsMultiplier((m) => Math.max(0.25, m - 0.25))}
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer p-0.5 print:hidden"
                  title="Decrease servings"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-semibold px-1.5">{currentServings}</span>
                <button 
                  onClick={() => setServingsMultiplier((m) => m + 0.25)}
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer p-0.5 print:hidden"
                  title="Increase servings"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Layout with Roomy Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Ingredients Card */}
          <aside className="md:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-9 shadow-xs rounded-none space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                Ingredients
              </h2>
              <span className="text-xs text-neutral-500 font-mono">
                {(recipe.ingredients || []).length} items
              </span>
            </div>

            <ul className="space-y-4 font-sans text-sm md:text-base text-neutral-800 dark:text-neutral-200">
              {(recipe.ingredients || []).map((rawIng, idx) => {
                const isChecked = !!checkedIngredients[idx];
                const ing = parseIngredient(rawIng);
                const formattedQty = formatQuantity(ing.quantity);

                return (
                  <li 
                    key={idx} 
                    onClick={() => toggleIngredientCheck(idx)}
                    className="flex items-start gap-3.5 group cursor-pointer select-none transition-opacity"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleIngredientCheck(idx)}
                      className="mt-1 w-4 h-4 rounded-none border-neutral-400 text-[#775a19] focus:ring-0 accent-[#775a19] cursor-pointer"
                    />
                    <label 
                      className={`cursor-pointer transition-all leading-snug flex-1 ${
                        isChecked 
                          ? 'line-through text-neutral-400 dark:text-neutral-500' 
                          : 'group-hover:text-[#775a19] dark:group-hover:text-[#e9c176]'
                      }`}
                    >
                      {(formattedQty || ing.unit) && (
                        <span className="font-semibold">{formattedQty ? `${formattedQty} ` : ""}{ing.unit}{" "}</span>
                      )}
                      <span>{ing.item}</span>
                      {ing.notes && (
                        <span className="block text-xs text-neutral-500 italic mt-0.5 font-normal">
                          ({ing.notes})
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>

            {/* Servings footnote */}
            <div className="pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
              <span>Scaled for: <strong className="text-neutral-700 dark:text-neutral-300">{currentServings} {currentServings === 1 ? 'person' : 'people'}</strong></span>
              <button 
                onClick={() => setServingsMultiplier(1)}
                className="text-[#775a19] dark:text-[#e9c176] hover:underline cursor-pointer font-medium"
              >
                Reset ({baseServings})
              </button>
            </div>
          </aside>

          {/* Right Column: Preparation Steps */}
          <section className="md:col-span-7 md:pl-2 space-y-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-8">
              Preparation
            </h2>

            <div className="space-y-10">
              {(recipe.steps || []).map((step, idx) => {
                const stepNumber = typeof step?.n === "number" ? step.n : idx + 1;
                const instructionText = typeof step === "string" ? step : (step?.instruction || (step as any)?.text || (step as any)?.step || "");
                const durationMinutes = step?.durationMinutes ?? (step as any)?.duration ?? (step as any)?.minutes;
                const { title, description } = parseStep(instructionText, idx);
                const isDone = !!completedSteps[stepNumber];
                const isTimerActiveForThisStep = activeStepTimerIndex === idx;
                const stepNumFormatted = stepNumber < 10 ? `0${stepNumber}` : `${stepNumber}`;

                return (
                  <div key={idx} className="space-y-8">
                    <div className={`flex flex-col sm:flex-row gap-5 items-start transition-opacity ${isDone ? 'opacity-50' : ''}`}>
                      
                      {/* Step Number in Grand Golden Serif */}
                      <div className="shrink-0 font-serif text-3xl md:text-4xl font-semibold text-[#775a19] dark:text-[#e9c176] tracking-tighter w-12 pt-0.5">
                        {stepNumFormatted}
                      </div>

                      {/* Step Instruction & Timer Controls */}
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-serif text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                            {title || `Step ${stepNumber}`}
                          </h3>
                          <button
                            onClick={() => toggleStepCheck(stepNumber)}
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border transition-all cursor-pointer print:hidden ${
                              isDone 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                                : 'text-neutral-400 hover:text-neutral-700 border-neutral-200 dark:border-neutral-700'
                            }`}
                          >
                            {isDone ? '✓ Completed' : 'Mark done'}
                          </button>
                        </div>

                        <p className="font-sans text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {description || instructionText}
                        </p>

                        {/* Interactive Step Timer */}
                        {durationMinutes && (
                          <div className="flex items-center gap-3 pt-3 print:hidden">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartTimer(idx, durationMinutes)}
                              className={`gap-1.5 text-xs font-semibold rounded-none border-neutral-300 dark:border-neutral-700 cursor-pointer ${
                                isTimerActiveForThisStep && isTimerRunning 
                                  ? 'border-[#775a19] bg-[#775a19]/10 text-[#775a19]' 
                                  : 'hover:border-[#775a19]'
                              }`}
                            >
                              {isTimerActiveForThisStep && isTimerRunning ? (
                                <>
                                  <Pause className="h-3.5 w-3.5" /> Pause Timer
                                </>
                              ) : (
                                <>
                                  <Play className="h-3.5 w-3.5 text-[#775a19]" /> Start {durationMinutes}m timer
                                </>
                              )}
                            </Button>

                            {isTimerActiveForThisStep && (
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#775a19] dark:text-[#fed488] bg-[#775a19]/10 px-3 py-1 border border-[#775a19]/30">
                                <Clock className="h-3.5 w-3.5 animate-pulse" />
                                <span>
                                  {Math.floor(timerSecondsLeft / 60)}:
                                  {(timerSecondsLeft % 60).toString().padStart(2, "0")}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fine dividing line between steps */}
                    {idx < (recipe.steps || []).length - 1 && (
                      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Nutrition & Tags Editorial Footer Section with Luxurious Padding */}
        <section className="border-t border-b border-neutral-200 dark:border-neutral-800 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#775a19] dark:text-[#e9c176]">
              Nutrition per serving
            </h3>
            {hasNutrition ? (
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6 text-sm text-neutral-800 dark:text-neutral-200">
                <div>
                  <span className="font-bold text-base">{nutritionCalories != null ? Math.round(Number(nutritionCalories)) : "—"}</span>{" "}
                  <span className="text-neutral-500 text-xs uppercase">kcal</span>
                </div>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                <div>
                  <span className="font-bold text-base">{nutritionFat != null ? `${nutritionFat}g` : "—"}</span>{" "}
                  <span className="text-neutral-500 text-xs uppercase">Fat</span>
                </div>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                <div>
                  <span className="font-bold text-base">{nutritionCarbs != null ? `${nutritionCarbs}g` : "—"}</span>{" "}
                  <span className="text-neutral-500 text-xs uppercase">Carbs</span>
                </div>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                <div>
                  <span className="font-bold text-base">{nutritionProtein != null ? `${nutritionProtein}g` : "—"}</span>{" "}
                  <span className="text-neutral-500 text-xs uppercase">Protein</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">Nutrition values calculated upon preparation</p>
            )}
          </div>

          {/* Minimalist Editorial Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2.5">
              {recipe.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="border border-neutral-400/60 dark:border-neutral-700 px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-neutral-700 dark:text-neutral-300 bg-neutral-100/40 dark:bg-neutral-800/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
