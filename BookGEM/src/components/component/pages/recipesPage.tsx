import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/component/sidebar";
import { useBookGemStore } from "@/lib/store/useBookGemStore";
import { useUserJobs } from "@/lib/api/hooks/useJobs";
import { useGenerateRecipe } from "@/lib/api/hooks/useGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SAMPLE_RECIPES } from "./recipeDetailPage";
import { RecipeCard } from "@/components/component/RecipeCard";
import { 
  ChefHat, 
  Loader2, 
  AlertCircle
} from "lucide-react";
import type { Recipe } from "@/types/api";

export function RecipesPage({ initialTab = "all" }: { initialTab?: "all" | "saved" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userJobsData } = useUserJobs();

  const savedRecipes = useBookGemStore((state) => state.savedRecipes);
  const recentRecipes = useBookGemStore((state) => state.recentRecipes);
  const setActiveRecipe = useBookGemStore((state) => state.setActiveRecipe);

  const generateRecipe = useGenerateRecipe();

  const activeTab: "all" | "saved" = location.pathname.includes("/saved") || initialTab === "saved" ? "saved" : "all";
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form inputs for new recipe modal
  const [themeInput, setThemeInput] = useState("");
  const [dietInput, setDietInput] = useState("");
  const [difficultyInput, setDifficultyInput] = useState<"easy" | "medium" | "hard">("easy");

  // Collect recipes from API jobs, zustand store, and curated samples
  const apiRecipes: Recipe[] = [];
  if (userJobsData?.jobs) {
    userJobsData.jobs.forEach((job) => {
      if (job.recipe) {
        apiRecipes.push({
          ...job.recipe,
          id: job.recipe.id || job.jobId,
          imageUrl: job.recipe.imageUrl || job.imageUrl,
        });
      }
      if (job.cookbook?.recipes) {
        apiRecipes.push(...job.cookbook.recipes);
      }
    });
  }

  // Combine unique recipes
  const allRecipesMap = new Map<string, Recipe>();
  
  // 1. Add curated samples first
  SAMPLE_RECIPES.forEach((r) => allRecipesMap.set(r.id, r));
  // 2. Add store recipes
  recentRecipes.forEach((r) => allRecipesMap.set(r.id, r));
  // 3. Add API recipes
  apiRecipes.forEach((r) => {
    const rid = r.id || (r as any).jobId;
    if (rid) {
      allRecipesMap.set(rid, { ...r, id: rid });
    }
  });
  const allRecipes = Array.from(allRecipesMap.values());

  // Extract dynamic tags strictly from API & user recipes
  const apiTags = new Set<string>();
  apiRecipes.forEach((r) => {
    if (r.tags) r.tags.forEach((t) => apiTags.add(t));
    if (r.cuisine) apiTags.add(r.cuisine);
  });
  recentRecipes.forEach((r) => {
    if (r.tags) r.tags.forEach((t) => apiTags.add(t));
    if (r.cuisine) apiTags.add(r.cuisine);
  });
  const availableDietTags = ["all", ...Array.from(apiTags)];

  // Filter recipes based on active tab and selected tag filter
  const displayedRecipes = allRecipes.filter((r) => {
    if (activeTab === "saved") {
      const isSaved = savedRecipes.some((saved) => saved.id === r.id);
      if (!isSaved) return false;
    }

    if (selectedTag !== "all") {
      if (selectedTag === "Quick & Easy") {
        if ((r.totalMinutes || 45) > 30) return false;
      } else {
        const hasTag = r.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
        if (!hasTag) return false;
      }
    }

    return true;
  });

  const handleCreateRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeInput.trim()) return;

    generateRecipe.mutate(
      {
        theme: themeInput,
        diet: dietInput || undefined,
        difficulty: difficultyInput,
      },
      {
        onSuccess: () => {
          setShowCreateModal(false);
          setThemeInput("");
          setDietInput("");
        },
      }
    );
  };

  const openRecipeDetail = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-row font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Full-width Hero Header with Ambient Gold Gradient */}
        <div className="relative overflow-hidden w-full bg-gradient-to-b from-[#CBA328]/15 via-[#CBA328]/5 to-transparent pt-10 pb-10 px-6 md:px-10 text-center space-y-6">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-[#CBA328]/25 via-amber-300/15 to-transparent rounded-full blur-3xl opacity-75" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground font-playfair">
              {activeTab === "saved" ? "Saved Recipe Gems" : "Explore Culinary Recipes"}
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
          
          {/* Tag Filter Bar */}
          <div className="border-b border-border/60 pb-4">

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {availableDietTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedTag === tag
                      ? "bg-[#CBA328] text-black border-[#CBA328] shadow-xs"
                      : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                  }`}
                >
                  {tag === "all" ? "All Diets" : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          {displayedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onOpen={() => openRecipeDetail(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border rounded-3xl bg-card space-y-4">
              <div className="p-4 bg-muted w-fit rounded-full mx-auto text-muted-foreground">
                <ChefHat className="h-10 w-10 text-[#CBA328]" />
              </div>
              <h3 className="text-xl font-bold font-playfair">No recipes found</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                {activeTab === "saved"
                  ? "You haven't saved any recipe gems yet. Browse recipes and click the bookmark icon to save your favorites!"
                  : "Try adjusting your dietary filters."}
              </p>
            </div>
          )}

        </main>

        {/* Generate Recipe Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <ChefHat className="h-6 w-6 text-[#CBA328]" />
                  <h2 className="text-xl font-bold font-playfair">Generate AI Recipe</h2>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {generateRecipe.error && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>
                    {(generateRecipe.error as any)?.response?.data?.message ||
                      generateRecipe.error.message ||
                      "Failed to create recipe. Please try again."}
                  </span>
                </div>
              )}

              <form onSubmit={handleCreateRecipeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipe Theme or Concept</label>
                  <Input
                    placeholder="e.g. Authentic Creamy Tuscan Garlic Chicken, Japanese Ramen"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dietary Option (Optional)</label>
                    <Input
                      placeholder="e.g., Keto, Vegan, Gluten-Free"
                      value={dietInput}
                      onChange={(e) => setDietInput(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                      value={difficultyInput}
                      onChange={(e) => setDifficultyInput(e.target.value as any)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t items-center">
                  <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={generateRecipe.isPending || !themeInput.trim()}
                    className="bg-[#CBA328] hover:bg-[#b58f20] text-black font-semibold px-5 py-5 rounded-xl cursor-pointer"
                  >
                    {generateRecipe.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate Recipe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
