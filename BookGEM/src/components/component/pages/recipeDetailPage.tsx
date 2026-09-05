import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/component/sidebar";
import { useBookGemStore } from "@/lib/store/useBookGemStore";
import { useUserJobs, useJobStatus } from "@/lib/api/hooks/useJobs";
import { useFetchImage } from "@/lib/api/hooks/useGenerator";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Printer, 
  Loader2, 
  ArrowLeft, 
  Check,
  Layers,
  ChevronDown
} from "lucide-react";
import type { Recipe } from "@/types/api";
import { EditorialRecipeLayout } from "@/components/component/recipe/EditorialRecipeLayout";
import { ModernRecipeLayout } from "@/components/component/recipe/ModernRecipeLayout";
import type { RecipeLayoutProps } from "@/components/component/recipe/types";

// High quality curated sample recipes to display if job/store recipe is requested by ID or fallback
export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "rec-wild-mushroom-truffle-risotto",
    title: "Wild Mushroom & Truffle Risotto",
    description: "A sophisticated autumn classic, featuring hand-foraged earthy mushrooms, aromatic black truffle, and creamy Arborio rice finished with aged Parmigiano-Reggiano.",
    cuisine: "Italian",
    difficulty: "medium",
    prepMinutes: 15,
    cookMinutes: 35,
    totalMinutes: 50,
    servings: 4,
    tags: ["Vegetarian", "Gluten-Free", "Autumn", "Gourmet"],
    imagePrompt: "A top-down, high-end culinary photograph of Wild Mushroom and Truffle Risotto in a shallow, rustic ceramic bowl. The risotto is creamy and glossy, topped with delicately shaved black truffles, sautéed wild mushrooms, and a sprig of fresh thyme. Dark moody rustic wood table with scattered truffle shavings and coarse sea salt, Michelin star editorial photography.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDItAYLLXIryHzOwWtt_mIoQdRfCgftSBtPws7fAPRVDUerkkjcdaXA5KrbYjmTh1342GbVCqJ1AT9WgMF9eUt2crHZmhOCiSewwlSBr9CtzR5K29GUld6HILxt0pYHDU_a9yXa3z0JG2ClBDOEwVuY28bExU46ukGS0wLq6bxGUIPRzsdrpcEKV_34o6DIPsgNg-NlOpyLU9cUdi2tXduiC0cYkdAP--3MxQxpht6l-EoJNVFYWbsA",
    ingredients: [
      { item: "Arborio rice", quantity: "400", unit: "g" },
      { item: "warm vegetable stock", quantity: "1", unit: "L" },
      { item: "mixed wild mushrooms", quantity: "300", unit: "g" },
      { item: "shallots finely minced", quantity: "2", unit: "" },
      { item: "dry white wine", quantity: "150", unit: "ml" },
      { item: "unsalted butter", quantity: "50", unit: "g" },
      { item: "Parmigiano-Reggiano", quantity: "60", unit: "g" },
      { item: "truffle oil", quantity: "1", unit: "tbsp" },
      { item: "fresh thyme", quantity: "2", unit: "sprigs" }
    ],
    steps: [
      { n: 1, instruction: "Sauté Aromatics: Soften shallots in butter until translucent in a heavy-bottomed pan over medium heat, ensuring they do not brown.", durationMinutes: 5 },
      { n: 2, instruction: "Toast Rice: Add Arborio rice to the pan, stirring continuously until the edges of the grains become slightly transparent, sealing the starch.", durationMinutes: 3 },
      { n: 3, instruction: "Deglaze: Pour in the dry white wine. Simmer gently while stirring until the liquid is almost entirely absorbed by the rice.", durationMinutes: 4 },
      { n: 4, instruction: "Gradual Incorporation: Add the warm vegetable stock one ladle at a time. Stir constantly and wait until each addition is absorbed before adding the next. This creates the signature creamy texture.", durationMinutes: 20 },
      { n: 5, instruction: "Finish: Remove from heat. Gently fold in the sautéed wild mushrooms, freshly grated Parmigiano-Reggiano, and finish with a delicate drizzle of truffle oil. Serve immediately.", durationMinutes: 3 }
    ],
    nutritionPerServing: {
      calories: 480,
      protein_g: 12,
      carbs_g: 58,
      fat_g: 22
    }
  },
  {
    id: "rec-golden-saffron-risotto",
    title: "Golden Saffron & Wild Mushroom Risotto",
    description: "A luxurious, velvety Italian risotto infused with aromatic Iranian saffron, sautéed porcini mushrooms, and aged Parmigiano-Reggiano.",
    cuisine: "Italian",
    difficulty: "medium",
    prepMinutes: 15,
    cookMinutes: 30,
    totalMinutes: 45,
    servings: 4,
    tags: ["Gluten-Free", "Vegetarian", "Gourmet", "Italian"],
    imagePrompt: "Gourmet golden saffron risotto in a ceramic shallow bowl with sautéed wild mushrooms, fresh thyme sprig, fine parmesan shavings, soft dark mood lighting, professional food photography",
    imageUrl: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      { item: "Arborio or Carnaroli Rice", quantity: "1.5", unit: "cups", notes: "do not rinse" },
      { item: "Vegetable Broth", quantity: "4", unit: "cups", notes: "kept warm over low heat" },
      { item: "Saffron Threads", quantity: "0.5", unit: "tsp", notes: "steeped in 2 tbsp warm broth" },
      { item: "Wild Mushrooms (Porcini & Cremini)", quantity: "250", unit: "g", notes: "sliced" },
      { item: "Shallots", quantity: "2", unit: "medium", notes: "finely diced" },
      { item: "Garlic", quantity: "3", unit: "cloves", notes: "minced" },
      { item: "Dry White Wine (Pinot Grigio)", quantity: "0.5", unit: "cup" },
      { item: "Unsalted Butter", quantity: "3", unit: "tbsp", notes: "divided" },
      { item: "Parmigiano-Reggiano", quantity: "0.75", unit: "cup", notes: "freshly grated" },
      { item: "Fresh Thyme & Parsley", quantity: "2", unit: "tbsp", notes: "chopped for garnish" },
      { item: "Extra Virgin Olive Oil", quantity: "2", unit: "tbsp" }
    ],
    steps: [
      { n: 1, instruction: "Warm the vegetable broth in a saucepan over low heat. In a small bowl, steep saffron threads in 2 tablespoons of warm broth for 10 minutes until deeply golden.", durationMinutes: 10 },
      { n: 2, instruction: "In a heavy skillet, heat 1 tbsp olive oil and 1 tbsp butter over medium-high heat. Add sliced mushrooms and sauté until browned (5-7 mins). Season with salt and pepper, then set aside.", durationMinutes: 7 },
      { n: 3, instruction: "In a large heavy-bottomed Dutch oven, heat remaining olive oil and 1 tbsp butter over medium heat. Add diced shallots and minced garlic; cook until translucent (3-4 mins).", durationMinutes: 4 },
      { n: 4, instruction: "Add Arborio rice to the pot. Toast the grains, stirring constantly for 2 minutes until translucent at edges.", durationMinutes: 2 },
      { n: 5, instruction: "Pour in dry white wine. Stir continuously until wine is fully absorbed by rice.", durationMinutes: 3 },
      { n: 6, instruction: "Begin adding warm broth 1 ladle at a time, stirring frequently. Wait until each ladle is absorbed before adding next. Add saffron infused liquid halfway through.", durationMinutes: 18 },
      { n: 7, instruction: "Once rice is creamy and al dente, remove from heat. Stir in sautéed mushrooms, remaining 1 tbsp butter, and grated Parmigiano-Reggiano. Cover for 2 minutes before serving.", durationMinutes: 2 }
    ],
    nutritionPerServing: {
      calories: 420,
      protein_g: 12,
      carbs_g: 58,
      fat_g: 14
    }
  },
  {
    id: "rec-pan-seared-salmon-lemon-butter",
    title: "Pan-Seared Crispy Salmon with Lemon Caper Butter",
    description: "Crispy skin Atlantic salmon filet served over asparagus spears with a silky garlic lemon caper pan sauce.",
    cuisine: "Mediterranean",
    difficulty: "easy",
    prepMinutes: 10,
    cookMinutes: 15,
    totalMinutes: 25,
    servings: 2,
    tags: ["Keto", "Low-Carb", "Gluten-Free", "High-Protein"],
    imagePrompt: "Pan seared golden crispy salmon fillet on bed of green asparagus with glossy lemon butter sauce and capers, minimalist plate",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      { item: "Fresh Atlantic Salmon Fillets", quantity: "2", unit: "6oz fillets", notes: "skin on, patted dry" },
      { item: "Fresh Asparagus", quantity: "1", unit: "bunch", notes: "trimmed" },
      { item: "Unsalted Butter", quantity: "2.5", unit: "tbsp" },
      { item: "Lemon", quantity: "1", unit: "whole", notes: "juiced and zested" },
      { item: "Capers", quantity: "1.5", unit: "tbsp", notes: "drained" },
      { item: "Garlic", quantity: "2", unit: "cloves", notes: "thinly sliced" },
      { item: "Olive Oil", quantity: "1", unit: "tbsp" },
      { item: "Sea Salt & Cracked Black Pepper", quantity: "1", unit: "pinch" }
    ],
    steps: [
      { n: 1, instruction: "Pat salmon fillets thoroughly dry with paper towels. Season both sides generously with sea salt and cracked black pepper.", durationMinutes: 3 },
      { n: 2, instruction: "Heat olive oil in a stainless steel or cast iron skillet over high heat until shimmering. Place salmon skin-side down, press gently for 10 seconds to prevent curling.", durationMinutes: 1 },
      { n: 3, instruction: "Sear skin-side down undisturbed for 5 minutes until skin is golden and crispy. Flip salmon carefully and cook for another 3 minutes.", durationMinutes: 8 },
      { n: 4, instruction: "Add asparagus spears around salmon in pan during last 3 minutes of cooking. Transfer salmon and asparagus to warm plate.", durationMinutes: 3 },
      { n: 5, instruction: "Reduce skillet heat to low. Add butter, garlic, capers, lemon juice, and lemon zest. Swirl for 1 minute until sauce emulsifies. Spoon over salmon.", durationMinutes: 1 }
    ],
    nutritionPerServing: {
      calories: 510,
      protein_g: 38,
      carbs_g: 6,
      fat_g: 36
    }
  },
  {
    id: "rec-avocado-truffle-eggs-benedict",
    title: "Artisanal Avocado & Truffle Poached Egg Toast",
    description: "Sourdough toast layered with smashed heirloom avocado, poached farm eggs, microgreens, and a drizzle of white truffle oil.",
    cuisine: "Contemporary",
    difficulty: "easy",
    prepMinutes: 10,
    cookMinutes: 10,
    totalMinutes: 20,
    servings: 2,
    tags: ["Breakfast", "Vegetarian", "Quick & Easy"],
    imagePrompt: "Artisanal avocado toast topped with runny poached egg, truffle oil drizzle, microgreens and red pepper flakes on dark slate",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      { item: "Artisan Sourdough Bread", quantity: "2", unit: "thick slices" },
      { item: "Ripe Hass Avocados", quantity: "2", unit: "medium" },
      { item: "Fresh Eggs", quantity: "2", unit: "large" },
      { item: "White Truffle Oil", quantity: "1", unit: "tsp" },
      { item: "Lemon Juice", quantity: "1", unit: "tbsp" },
      { item: "Red Pepper Flakes", quantity: "0.5", unit: "tsp" },
      { item: "Microgreens or Radish Sprouts", quantity: "0.25", unit: "cup" },
      { item: "Flaky Sea Salt (Maldon)", quantity: "1", unit: "pinch" }
    ],
    steps: [
      { n: 1, instruction: "Toast sourdough slices until deep golden and sturdy.", durationMinutes: 3 },
      { n: 2, instruction: "In a bowl, coarsely mash avocados with lemon juice, sea salt, and black pepper.", durationMinutes: 3 },
      { n: 3, instruction: "Bring a shallow pot of water with 1 tbsp white vinegar to a gentle simmer. Create a vortex with spoon and drop eggs one by one. Poach for 3 minutes for soft runny yolks.", durationMinutes: 4 },
      { n: 4, instruction: "Spread smashed avocado generously onto sourdough toasts. Top each slice with a warm poached egg.", durationMinutes: 2 },
      { n: 5, instruction: "Drizzle with white truffle oil, sprinkle red pepper flakes, flaky sea salt, and top with microgreens.", durationMinutes: 1 }
    ],
    nutritionPerServing: {
      calories: 380,
      protein_g: 14,
      carbs_g: 32,
      fat_g: 22
    }
  }
];

export function getFullImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://bookgem-api.donaldchimaobijunior.workers.dev';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

export type RecipeLayoutStyle = "editorial" | "modern";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: userJobsData, isLoading: isLoadingJobs } = useUserJobs();
  const { data: singleJobData, isLoading: isLoadingSingleJob } = useJobStatus(id || null);
  const recentRecipes = useBookGemStore((state) => state.recentRecipes);
  const savedRecipes = useBookGemStore((state) => state.savedRecipes);
  const toggleSaveRecipe = useBookGemStore((state) => state.toggleSaveRecipe);
  const activeRecipe = useBookGemStore((state) => state.activeRecipe);

  const fetchImageMutation = useFetchImage();

  // Find target recipe from store, API jobs, sample list
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeStepTimerIndex, setActiveStepTimerIndex] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // UI Layout style switcher (Editorial Gourmet from Stitch vs Modern Studio)
  const [layoutStyle, setLayoutStyle] = useState<RecipeLayoutStyle>(() => {
    const saved = localStorage.getItem("bookgem_recipe_layout_style");
    return (saved as RecipeLayoutStyle) || "editorial";
  });
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState<boolean>(false);
  const layoutDropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectLayout = (style: RecipeLayoutStyle) => {
    setLayoutStyle(style);
    localStorage.setItem("bookgem_recipe_layout_style", style);
    setIsLayoutDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layoutDropdownRef.current && !layoutDropdownRef.current.contains(event.target as Node)) {
        setIsLayoutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // 1. Check active recipe in Zustand
    if (activeRecipe && (activeRecipe.id === id || !id)) {
      setRecipe(activeRecipe);
      return;
    }

    // 2. Search in Zustand saved/recent recipes
    const foundStore = [...savedRecipes, ...recentRecipes].find((r) => r.id === id);
    if (foundStore) {
      setRecipe(foundStore);
      return;
    }

    // 3. Search in API user jobs list
    if (userJobsData?.jobs && userJobsData.jobs.length > 0) {
      for (const job of userJobsData.jobs) {
        if (job.recipe && (job.recipe.id === id || job.jobId === id || (job as any).id === id)) {
          setRecipe({
            ...job.recipe,
            id: job.recipe.id || job.jobId || id || "rec-api",
            imageUrl: job.recipe.imageUrl || job.imageUrl,
          });
          return;
        }
        if (job.cookbook?.recipes) {
          const match = job.cookbook.recipes.find((r) => r.id === id || (r as any).jobId === id);
          if (match) {
            setRecipe({
              ...match,
              imageUrl: match.imageUrl || job.imageUrl,
            });
            return;
          }
        }
      }
    }

    // 4. Check single job query if user navigated directly by jobId from API
    if (singleJobData?.recipe) {
      setRecipe({
        ...singleJobData.recipe,
        id: singleJobData.recipe.id || singleJobData.jobId || id || "rec-api",
        imageUrl: singleJobData.recipe.imageUrl || singleJobData.imageUrl,
      });
      return;
    }
    if (singleJobData?.cookbook?.recipes?.[0]) {
      const match = singleJobData.cookbook.recipes.find((r) => r.id === id || (r as any).jobId === id) || singleJobData.cookbook.recipes[0];
      setRecipe({
        ...match,
        imageUrl: match.imageUrl || singleJobData.imageUrl,
      });
      return;
    }

    // 5. Search in Sample Recipes
    const sample = SAMPLE_RECIPES.find((r) => r.id === id);
    if (sample) {
      setRecipe(sample);
      return;
    }

    // 6. If no specific ID was requested in URL, default to first sample
    if (!id) {
      setRecipe(SAMPLE_RECIPES[0]);
      return;
    }

    // 7. If still waiting for API jobs to load, wait before falling back to sample
    if (isLoadingJobs || (id && isLoadingSingleJob)) {
      return;
    }

    // 8. Fallback to first sample recipe only after all API queries have completed without finding the ID
    setRecipe(SAMPLE_RECIPES[0]);
  }, [id, activeRecipe, savedRecipes, recentRecipes, userJobsData, singleJobData, isLoadingJobs, isLoadingSingleJob]);

  // Handle active countdown timer logic
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll progress bar from inner container
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const totalScroll = el.scrollTop;
      const scrollableHeight = el.scrollHeight - el.clientHeight;
      if (scrollableHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (totalScroll / scrollableHeight) * 100)));
      }
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex flex-row font-sans">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#775a19]" />
        </div>
      </div>
    );
  }

  const baseServings = recipe.servings || 4;
  const currentServings = Math.max(1, Math.round(baseServings * servingsMultiplier));
  const scaleRatio = currentServings / baseServings;

  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepCheck = (stepNum: number) => {
    setCompletedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const handleStartTimer = (stepIndex: number, durationMinutes: number) => {
    if (activeStepTimerIndex === stepIndex && isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setActiveStepTimerIndex(stepIndex);
      setTimerSecondsLeft(durationMinutes * 60);
      setIsTimerRunning(true);
    }
  };

  const handleGenerateImage = () => {
    if (!recipe) return;
    const prompt = recipe.imagePrompt || `Gourmet culinary presentation of ${recipe.title}, Michelin star dining aesthetic, professional food photography`;
    fetchImageMutation.mutate(
      {
        imagePrompt: prompt,
        title: recipe.title,
      },
      {
        onSuccess: (data) => {
          if ('imageUrl' in data && data.imageUrl) {
            setRecipe((prev) => (prev ? { ...prev, imageUrl: data.imageUrl } : prev));
          }
        },
      }
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fullImageUrl = getFullImageUrl(recipe.imageUrl);

  const prepMinutes = recipe.prepMinutes ?? (recipe as any)?.prep_time ?? (recipe as any)?.prepTime;
  const cookMinutes = recipe.cookMinutes ?? (recipe as any)?.cook_time ?? (recipe as any)?.cookTime;
  const totalMinutes = recipe.totalMinutes ?? (recipe as any)?.total_time ?? (recipe as any)?.totalTime ?? (prepMinutes != null && cookMinutes != null ? prepMinutes + cookMinutes : undefined);

  const displayPrepTime = prepMinutes != null ? `${prepMinutes}m` : "15m";
  const displayCookTime = cookMinutes != null ? `${cookMinutes}m` : "30m";
  const displayTotalTime = totalMinutes != null ? `${totalMinutes}m` : `${(prepMinutes || 15) + (cookMinutes || 30)}m`;

  const nutritionCalories = recipe.nutritionPerServing?.calories ?? (recipe as any)?.nutrition?.calories ?? (recipe as any)?.calories;
  const nutritionFat = recipe.nutritionPerServing?.fat_g ?? (recipe as any)?.nutrition?.fat_g ?? (recipe as any)?.nutrition?.fat ?? (recipe as any)?.fat_g ?? (recipe as any)?.fat;
  const nutritionCarbs = recipe.nutritionPerServing?.carbs_g ?? (recipe as any)?.nutrition?.carbs_g ?? (recipe as any)?.nutrition?.carbs ?? (recipe as any)?.carbs_g ?? (recipe as any)?.carbs;
  const nutritionProtein = recipe.nutritionPerServing?.protein_g ?? (recipe as any)?.nutrition?.protein_g ?? (recipe as any)?.nutrition?.protein ?? (recipe as any)?.protein_g ?? (recipe as any)?.protein;
  const hasNutrition = nutritionCalories != null || nutritionFat != null || nutritionCarbs != null || nutritionProtein != null;

  const layoutProps: RecipeLayoutProps = {
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
    isGeneratingImage: fetchImageMutation.isPending,
    setServingsMultiplier,
    prepMinutes,
    cookMinutes,
    totalMinutes,
    displayPrepTime,
    displayCookTime,
    displayTotalTime,
    nutritionCalories,
    nutritionFat,
    nutritionCarbs,
    nutritionProtein,
    hasNutrition,
  };

  return (
    <div className="h-screen overflow-hidden bg-[#fbf9f8] dark:bg-[#121314] text-[#1b1c1c] dark:text-[#efeded] flex flex-row font-sans selection:bg-[#775a19]/20 selection:text-[#775a19]">
      <Sidebar className="print:hidden" />

      {/* Main Right Area - Flex column with fixed header that NEVER scrolls */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden border-l border-neutral-200/60 dark:border-neutral-800/60">
        
        {/* Fixed Top Control Bar - Docked at the top, does NOT scroll */}
        <header className="shrink-0 z-40 pl-14 pr-4 md:px-8 py-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 bg-[#fbf9f8]/95 dark:bg-[#121314]/95 backdrop-blur-md print:hidden">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white cursor-pointer text-xs uppercase tracking-wider font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Recipes
          </Button>

          {/* UI Layout Style Dropdown Switcher */}
          <div className="relative" ref={layoutDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLayoutDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-xs transition-all cursor-pointer"
              aria-expanded={isLayoutDropdownOpen}
              aria-haspopup="true"
            >
              <Layers className="h-3.5 w-3.5 text-[#775a19] dark:text-[#e9c176]" />
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">Layout:</span>
              <span>{layoutStyle === "editorial" ? "Editorial (Stitch)" : "Modern Studio"}</span>
              <ChevronDown className={`h-3 w-3 text-neutral-500 transition-transform duration-200 ${isLayoutDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isLayoutDropdownOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800/80">
                  Choose Recipe UI Layout
                </div>
                <div className="py-1 space-y-1">
                  <button
                    type="button"
                    onClick={() => handleSelectLayout("editorial")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      layoutStyle === "editorial"
                        ? "bg-[#775a19]/10 text-[#775a19] dark:text-[#e9c176]"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1.5">
                        <span>Editorial Gourmet (Stitch)</span>
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                        Michelin-style layout with culinary hero, golden accents & 2-column checklist
                      </p>
                    </div>
                    {layoutStyle === "editorial" && (
                      <Check className="h-4 w-4 shrink-0 text-[#775a19] dark:text-[#e9c176] mt-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectLayout("modern")}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      layoutStyle === "modern"
                        ? "bg-[#775a19]/10 text-[#775a19] dark:text-[#e9c176]"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1.5">
                        <span>Modern Studio</span>
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                        Card-based responsive grid with image preview and quick stats
                      </p>
                    </div>
                    {layoutStyle === "modern" && (
                      <Check className="h-4 w-4 shrink-0 text-[#775a19] dark:text-[#e9c176] mt-0.5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSaveRecipe(recipe)}
              className={`gap-1.5 text-xs font-medium cursor-pointer border-neutral-300 dark:border-neutral-700 ${
                isSaved ? 'text-[#775a19] border-[#775a19]/50 bg-[#775a19]/10' : ''
              }`}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 fill-current text-[#775a19]" /> : <Bookmark className="h-3.5 w-3.5" />}
              {isSaved ? 'Saved Gem' : 'Save'}
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare} 
              className="gap-1.5 text-xs font-medium cursor-pointer border-neutral-300 dark:border-neutral-700"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              {copiedLink ? 'Copied' : 'Share'}
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint} 
              className="gap-1.5 text-xs font-medium cursor-pointer border-neutral-300 dark:border-neutral-700"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>
          </div>
        </header>

        {/* Reading Scroll Progress Bar pinned right under fixed navbar */}
        <div className="shrink-0 w-full h-[2.5px] bg-neutral-200/50 dark:bg-neutral-800/50 z-30 pointer-events-none print:hidden">
          <div 
            className="h-full bg-[#775a19] dark:bg-[#e9c176] transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Scrollable Recipe Content Area - ONLY THIS SCROLLS */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden scroll-smooth p-10 "
        >
          <div className=" shadow-2xl">
          {layoutStyle === "editorial" ? (
            <EditorialRecipeLayout {...layoutProps} />
          ) : (
            <ModernRecipeLayout {...layoutProps} />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
