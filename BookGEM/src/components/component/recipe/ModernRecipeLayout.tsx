import { 
  ChefHat, 
  Sparkles, 
  Loader2, 
  Minus, 
  Plus, 
  Clock, 
  Utensils, 
  Users, 
  Flame, 
  Circle, 
  CheckCircle2, 
  Check, 
  Play, 
  Pause 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RecipeLayoutProps } from './types';

export function ModernRecipeLayout({
  recipe,
  fullImageUrl,
  currentServings,
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
  prepMinutes,
  cookMinutes,
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
    <div className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-12 pb-32">
      
      {/* Main Recipe Card Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image & AI Image Actions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="relative group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl aspect-4/3 bg-muted">
            {fullImageUrl ? (
              <img
                src={fullImageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#775a19]/20 via-amber-500/10 to-muted text-muted-foreground p-6 text-center space-y-3">
                <ChefHat className="h-16 w-16 text-[#775a19] opacity-80" />
                <p className="text-sm font-medium">No image generated yet</p>
              </div>
            )}

            {/* AI Image Generation Overlay Trigger */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
              <Button
                size="sm"
                disabled={isGeneratingImage}
                onClick={handleGenerateImage}
                className="w-full bg-[#775a19] hover:bg-[#5d4201] text-white font-bold gap-2 shadow-lg cursor-pointer py-2.5 rounded-xl transition-all"
              >
                {isGeneratingImage ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {recipe.imageUrl ? "Regenerate AI Food Photo" : "Generate AI Food Photo"}
              </Button>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {recipe.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-[#775a19]/15 text-[#775a19] dark:text-[#e9c176] border border-[#775a19]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Metadata & Quick Info */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                {recipe.cuisine || "Gourmet"} Cuisine
              </span>
              {recipe.difficulty && (
                <span className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                  recipe.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' :
                  recipe.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' :
                  'bg-rose-500/10 text-rose-600 border-rose-500/30'
                }`}>
                  {recipe.difficulty}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight leading-tight">
              {recipe.title}
            </h1>

            {recipe.description && (
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed pt-1">
                {recipe.description}
              </p>
            )}
          </div>

          {/* Recipe Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#775a19]/15 text-[#775a19] dark:text-[#e9c176]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase">Prep Time</p>
                <p className="text-sm font-bold">{prepMinutes != null ? `${prepMinutes} mins` : "15 mins"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#775a19]/15 text-[#775a19] dark:text-[#e9c176]">
                <Utensils className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase">Cook Time</p>
                <p className="text-sm font-bold">{cookMinutes != null ? `${cookMinutes} mins` : "30 mins"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#775a19]/15 text-[#775a19] dark:text-[#e9c176]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase">Servings</p>
                <p className="text-sm font-bold">{currentServings} people</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#775a19]/15 text-[#775a19] dark:text-[#e9c176]">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase">Calories</p>
                <p className="text-sm font-bold">
                  {nutritionCalories != null ? `${Math.round(Number(nutritionCalories))} kcal` : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Servings Scaler */}
          <div className="p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 text-[#775a19] dark:text-[#e9c176]" />
              <span className="font-semibold text-sm">Adjust Serving Size:</span>
              <span className="text-xs text-neutral-500">(Ingredients auto-scale)</span>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-1.5 shadow-xs">
              <button
                onClick={() => setServingsMultiplier((m) => Math.max(0.25, m - 0.25))}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground transition-colors cursor-pointer"
                title="Decrease Servings"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 font-bold text-base min-w-16 text-center">
                {currentServings} {currentServings === 1 ? 'serving' : 'servings'}
              </span>
              <button
                onClick={() => setServingsMultiplier((m) => m + 0.25)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground transition-colors cursor-pointer"
                title="Increase Servings"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Layout Grid: Ingredients & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        
        {/* Ingredients & Prep Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                <Utensils className="h-5 w-5 text-[#775a19]" /> Ingredients
              </h2>
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                {(recipe.ingredients || []).length} items
              </span>
            </div>

            <div className="space-y-3.5">
              {(recipe.ingredients || []).map((rawIng, idx) => {
                const isChecked = !!checkedIngredients[idx];
                const ing = parseIngredient(rawIng);
                const formattedQty = formatQuantity(ing.quantity);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isChecked 
                        ? 'bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 opacity-60 line-through' 
                        : 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="h-5 w-5 text-[#775a19]" />
                      ) : (
                        <Circle className="h-5 w-5 text-neutral-400" />
                      )}
                    </div>
                    <div className="flex-1 text-sm">
                      {(formattedQty || ing.unit) && (
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          {formattedQty ? `${formattedQty} ` : ""}{ing.unit}{" "}
                        </span>
                      )}
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{ing.item}</span>
                      {ing.notes && (
                        <span className="block text-xs text-neutral-500 italic mt-0.5">
                          ({ing.notes})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nutrition Breakdown Card */}
          {hasNutrition && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-7 shadow-xs space-y-5">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3.5">
                <Flame className="h-5 w-5 text-[#775a19]" /> Nutrition Per Serving
              </h3>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 font-semibold uppercase">Calories</p>
                  <p className="text-lg font-extrabold text-[#775a19] dark:text-[#e9c176] mt-0.5">
                    {nutritionCalories != null ? `${Math.round(Number(nutritionCalories))} kcal` : "N/A"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 font-semibold uppercase">Protein</p>
                  <p className="text-lg font-extrabold mt-0.5">
                    {nutritionProtein != null ? `${nutritionProtein}g` : "N/A"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 font-semibold uppercase">Carbs</p>
                  <p className="text-lg font-extrabold mt-0.5">
                    {nutritionCarbs != null ? `${nutritionCarbs}g` : "N/A"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 font-semibold uppercase">Fat</p>
                  <p className="text-lg font-extrabold mt-0.5">
                    {nutritionFat != null ? `${nutritionFat}g` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Cooking Steps Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-7 shadow-xs space-y-7">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-[#775a19]" /> Step-by-Step Instructions
              </h2>
              <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                {(recipe.steps || []).length} steps
              </span>
            </div>

            <div className="space-y-6">
              {(recipe.steps || []).map((step, idx) => {
                const stepNumber = typeof step?.n === "number" ? step.n : idx + 1;
                const instructionText = typeof step === "string" ? step : (step?.instruction || (step as any)?.text || (step as any)?.step || "");
                const durationMinutes = step?.durationMinutes ?? (step as any)?.duration ?? (step as any)?.minutes;
                const isDone = !!completedSteps[stepNumber];
                const isTimerActiveForThisStep = activeStepTimerIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all space-y-4 ${
                      isDone 
                        ? 'bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 opacity-60' 
                        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-[#775a19]/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleStepCheck(stepNumber)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#775a19] text-white hover:bg-[#5d4201]'
                        }`}
                      >
                        {isDone ? <Check className="h-4 w-4" /> : stepNumber}
                      </button>

                      <div className="flex-1 space-y-3">
                        <p className={`text-base leading-relaxed ${isDone ? 'line-through text-neutral-400' : 'text-neutral-800 dark:text-neutral-200 font-medium'}`}>
                          {instructionText}
                        </p>

                        {/* Timer trigger for timed steps */}
                        {durationMinutes && (
                          <div className="flex items-center gap-3 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartTimer(idx, durationMinutes)}
                              className={`gap-2 rounded-xl text-xs font-bold cursor-pointer ${
                                isTimerActiveForThisStep && isTimerRunning 
                                  ? 'border-amber-500 bg-amber-500/10 text-amber-600' 
                                  : ''
                              }`}
                            >
                              {isTimerActiveForThisStep && isTimerRunning ? (
                                <>
                                  <Pause className="h-3.5 w-3.5" /> Pause Timer
                                </>
                              ) : (
                                <>
                                  <Play className="h-3.5 w-3.5 text-[#775a19]" /> Start {durationMinutes} min timer
                                </>
                              )}
                            </Button>

                            {isTimerActiveForThisStep && (
                              <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#775a19] dark:text-[#fed488] bg-[#775a19]/10 px-3.5 py-1.5 rounded-xl">
                                <Clock className="h-4 w-4 animate-pulse" />
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
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
