import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/component/sidebar";
import { useBookGemStore } from "@/lib/store/useBookGemStore";
import { useUserJobs } from "@/lib/api/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SAMPLE_RECIPES } from "./recipeDetailPage";
import { RecipeCard } from "@/components/component/RecipeCard";
import { 
  BookOpen, 
  ChefHat, 
  ChevronRight, 
  FolderPlus,
  Check,
  X
} from "lucide-react";
import type { Cookbook, Recipe } from "@/types/api";

export interface CustomCookbook {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  recipes: Recipe[];
  createdAt: string;
}

export const SAMPLE_COOKBOOKS: CustomCookbook[] = [
  {
    id: "cb-mediterranean-gourmet",
    title: "Mediterranean Gourmet Collection",
    description: "A vibrant collection of fresh, heart-healthy recipes featuring olive oil, wild seafood, aromatic herbs, and sun-ripened produce.",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    recipes: [SAMPLE_RECIPES[0], SAMPLE_RECIPES[1]],
    createdAt: new Date().toISOString()
  },
  {
    id: "cb-artisanal-brunch",
    title: "Artisanal Weekend Brunch & Cafe",
    description: "Indulgent breakfast toasts, poached eggs, golden pastries, and espresso bar pairings for perfect weekend mornings.",
    coverImage: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
    recipes: [SAMPLE_RECIPES[2]],
    createdAt: new Date().toISOString()
  }
];

export function CookbooksPage() {
  const navigate = useNavigate();
  const { data: userJobsData } = useUserJobs();

  const savedRecipes = useBookGemStore((state) => state.savedRecipes);
  const setActiveRecipe = useBookGemStore((state) => state.setActiveRecipe);

  const [selectedCookbook, setSelectedCookbook] = useState<CustomCookbook | Cookbook | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New cookbook form state
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);
  const [customCookbooks, setCustomCookbooks] = useState<CustomCookbook[]>(SAMPLE_COOKBOOKS);

  // Extract cookbooks from API jobs
  const apiCookbooks: Cookbook[] = [];
  if (userJobsData?.jobs) {
    userJobsData.jobs.forEach((job) => {
      if (job.cookbook) {
        apiCookbooks.push(job.cookbook);
      }
    });
  }

  // All recipes available for cookbook creation
  const allAvailableRecipesMap = new Map<string, Recipe>();
  SAMPLE_RECIPES.forEach((r) => allAvailableRecipesMap.set(r.id, r));
  savedRecipes.forEach((r) => allAvailableRecipesMap.set(r.id, r));
  const availableRecipes = Array.from(allAvailableRecipesMap.values());

  const handleCreateCookbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const chosenRecipes = availableRecipes.filter((r) => selectedRecipeIds.includes(r.id));
    const newCb: CustomCookbook = {
      id: `cb-${Date.now()}`,
      title: titleInput,
      description: descInput || "Custom recipe collection.",
      recipes: chosenRecipes.length > 0 ? chosenRecipes : [SAMPLE_RECIPES[0]],
      coverImage: chosenRecipes[0]?.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000&auto=format&fit=crop",
      createdAt: new Date().toISOString()
    };

    setCustomCookbooks([newCb, ...customCookbooks]);
    setShowCreateModal(false);
    setTitleInput("");
    setDescInput("");
    setSelectedRecipeIds([]);
  };

  const toggleRecipeSelection = (id: string) => {
    setSelectedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openRecipeDetail = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-row font-sans text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Full-width Hero Header */}
        <div className="relative overflow-hidden w-full bg-gradient-to-b from-[#CBA328]/15 via-[#CBA328]/5 to-transparent pt-10 pb-10 px-6 md:px-10 text-center space-y-6">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-[#CBA328]/25 via-amber-300/15 to-transparent rounded-full blur-3xl opacity-75" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground font-playfair">
              Cookbooks & Recipe Collections
            </h1>

            {/* Create Cookbook Action */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => setShowCreateModal(true)}
                className="font-semibold gap-2 shadow-sm rounded-xl px-6 py-6 bg-[#CBA328] hover:bg-[#b58f20] text-black cursor-pointer"
              >
                <FolderPlus className="h-5 w-5" /> Create New Cookbook
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">

          {/* Cookbooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customCookbooks.map((cb) => (
              <RecipeCard
                key={cb.id}
                cookbook={cb}
                onOpen={() => setSelectedCookbook(cb)}
              />
            ))}
          </div>
        </main>

        {/* View Cookbook Detail Modal */}
        {selectedCookbook && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 border shadow-2xl space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-[#CBA328]" />
                  <div>
                    <h2 className="text-2xl font-bold font-playfair">{selectedCookbook.title}</h2>
                    <p className="text-xs text-muted-foreground">Volume Collection</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCookbook(null)}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted font-bold cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedCookbook.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-base font-bold font-playfair border-b pb-2 flex items-center justify-between">
                  <span>Recipes in this Cookbook</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {selectedCookbook.recipes?.length || 0} recipes
                  </span>
                </h3>

                <div className="space-y-3">
                  {selectedCookbook.recipes?.map((recipe) => (
                    <div
                      key={recipe.id}
                      onClick={() => {
                        setSelectedCookbook(null);
                        openRecipeDetail(recipe);
                      }}
                      className="p-4 rounded-2xl border bg-muted/30 hover:bg-muted/70 hover:border-[#CBA328]/40 transition-all flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#CBA328]/15 text-[#CBA328]">
                          <ChefHat className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm group-hover:text-[#CBA328] transition-colors">
                            {recipe.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {recipe.cuisine || "Gourmet"} • {recipe.totalMinutes || 25} mins • {recipe.ingredients?.length || 0} ingredients
                          </p>
                        </div>
                      </div>

                      <Button size="sm" variant="ghost" className="gap-1 text-xs font-bold text-[#CBA328]">
                        Open <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Cookbook Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <FolderPlus className="h-6 w-6 text-[#CBA328]" />
                  <h2 className="text-xl font-bold font-playfair">Create New Cookbook</h2>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCookbook} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cookbook Title</label>
                  <Input
                    placeholder="e.g. My Favorite Weeknight Dinners"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="e.g., Quick and easy 30-minute meals for busy days"
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                  />
                </div>

                {/* Recipe Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium">Select Recipes to Include:</label>
                  <div className="max-h-48 overflow-y-auto space-y-2 border rounded-xl p-3 bg-muted/20">
                    {availableRecipes.map((r) => {
                      const isSelected = selectedRecipeIds.includes(r.id);
                      return (
                        <div
                          key={r.id}
                          onClick={() => toggleRecipeSelection(r.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#CBA328]/15 border-[#CBA328] text-foreground'
                              : 'bg-card border-border text-muted-foreground hover:border-foreground/30'
                          }`}
                        >
                          <span className="truncate">{r.title}</span>
                          {isSelected && <Check className="h-4 w-4 text-[#CBA328] shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t items-center">
                  <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!titleInput.trim()}
                    className="bg-[#CBA328] hover:bg-[#b58f20] text-black font-semibold px-5 py-5 rounded-xl cursor-pointer"
                  >
                    Create Collection
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
