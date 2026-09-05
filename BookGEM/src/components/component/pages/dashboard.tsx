import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "@/components/component/sidebar";
import { useUserJobs, useJobStatus } from "@/lib/api/hooks/useJobs";
import { useGenerateCookbook, useGenerateRecipe, useFetchImage } from "@/lib/api/hooks/useGenerator";
import { useBookGemStore } from "@/lib/store/useBookGemStore";
import { RecipeCard } from '@/components/component/RecipeCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  BookOpen, 
  AlertCircle, 
  Plus, 
  ChefHat, 
  Utensils, 
  Calendar,
  Search,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import type { Job } from "@/types/api";

export function Dashboard() {
  const { data: userJobsData, isLoading: isLoadingJobs } = useUserJobs();
  
  const [activeTab, setActiveTab] = useState<'all' | 'cookbooks' | 'recipes'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state for creating a new project
  const [themeInput, setThemeInput] = useState('');
  const [dietInput, setDietInput] = useState('');
  const [projectKind, setProjectKind] = useState<'cookbook' | 'recipe'>('recipe');
  const [recipeCount, setRecipeCount] = useState(5);

  const generateCookbook = useGenerateCookbook();
  const generateRecipe = useGenerateRecipe();

  // Combine jobs from API with any in-memory store cookbooks
  const apiJobs = userJobsData?.jobs || [];
  const localCookbooks = useBookGemStore((state) => state.recentCookbooks);

  const recipeJobs = apiJobs.filter(j => j.kind === 'recipe');

  // Extract dynamic dietary tags strictly from API data
  const apiTags = new Set<string>();
  apiJobs.forEach((j) => {
    if (j.recipe?.tags) {
      j.recipe.tags.forEach((t) => apiTags.add(t));
    }
    if (j.recipe?.cuisine) {
      apiTags.add(j.recipe.cuisine);
    }
  });
  const availableDietTags = ["all", ...Array.from(apiTags)];

  const filteredJobs = apiJobs.filter(j => {
    const matchesTab = activeTab === 'cookbooks' ? j.kind === 'cookbook' : activeTab === 'recipes' ? j.kind === 'recipe' : true;
    const title = j.cookbook?.title || j.recipe?.title || (j as any).theme || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTag = true;
    if (selectedTag !== "all") {
      if (selectedTag === "Quick & Easy") {
        matchesTag = (j.recipe?.totalMinutes || 45) <= 30;
      } else {
        const recipeTags = j.recipe?.tags || [];
        const theme = (j as any).theme || j.cookbook?.theme || '';
        const desc = j.recipe?.description || j.cookbook?.description || '';
        matchesTag = recipeTags.some(t => t.toLowerCase() === selectedTag.toLowerCase()) ||
                     theme.toLowerCase().includes(selectedTag.toLowerCase()) ||
                     desc.toLowerCase().includes(selectedTag.toLowerCase());
      }
    }

    return matchesTab && matchesSearch && matchesTag;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeInput.trim()) return;

    generateRecipe.mutate(
      { theme: themeInput, diet: dietInput || undefined },
      { 
        onSuccess: () => {
          setShowCreateModal(false);
          setThemeInput('');
          setDietInput('');
        } 
      }
    );
  };

  const handleOpenModal = () => {
    generateRecipe.reset();
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-row font-sans">
      <Sidebar onCreateProject={handleOpenModal} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Full-width Hero Header with Light Ambient Linear Gradient Backdrop covering title, input & button */}
        <div className="relative overflow-hidden w-full bg-gradient-to-b from-[#CBA328]/15 via-[#CBA328]/5 to-transparent pt-10 pb-10 px-6 md:px-10 text-center space-y-6">
          {/* Light Ambient Radial Glow Effect */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-[#CBA328]/25 via-amber-300/15 to-transparent rounded-full blur-3xl opacity-75" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 ">
            <h1 className="flex flex-col text-3xl md:text-5xl font-extrabold tracking-tight text-foreground pb-1 font-playfair">
              What are we cooking <span className='font-playfair italic mt-3 text-[#b58f20]'>today?</span>
            </h1>

            {/* Search Input Container without Border */}
            <div className="relative group w-full max-w-2xl mx-auto">
              {/* Ambient Glow Background Effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#CBA328] via-amber-400 to-[#b58f20] opacity-50 blur-lg group-hover:opacity-80 group-focus-within:opacity-100 group-focus-within:blur-xl transition duration-500" />

              <div className="relative flex items-center gap-3 bg-card/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-2xl px-4 py-3 md:py-3.5 shadow-lg">
                <Search className="h-5 w-5 text-[#CBA328] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are we Cooking Today"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 placeholder:font-normal focus:outline-none border-none outline-none text-base font-medium"
                />
              </div>
            </div>

            {/* New Project Button Inside Full-Width Linear Gradient Container */}
            <div className="flex flex-row items-center justify-center gap-4 pt-2">
              <Button 
                size={"lg"}
                onClick={handleOpenModal}
                className="font-semibold gap-2 shadow-sm rounded-xl px-5 py-6"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">

        {/* Filter Tabs & Diet Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 md:gap-28 lg:gap-48 border-b border-border/60 pb-3 select-none">
          {/* Tabs on Left with increased gap */}
          <div className="flex items-center gap-8 md:gap-10 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-1 px-1 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'all'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>All Projects</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  activeTab === 'all'
                    ? 'bg-muted text-foreground font-bold'
                    : 'bg-muted/60 text-muted-foreground font-medium'
                }`}
              >
                {apiJobs.length}
              </span>
            </button>


            <button
              onClick={() => setActiveTab('recipes')}
              className={`pb-1 px-1 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === 'recipes'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>Recipes</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  activeTab === 'recipes'
                    ? 'bg-muted text-foreground font-bold'
                    : 'bg-muted/60 text-muted-foreground font-medium'
                }`}
              >
                {recipeJobs.length}
              </span>
            </button>
          </div>

          {/* Diet Filter Pills on Right with large left separation */}
          <div className="flex items-center gap-3 overflow-x-auto select-none shrink ml-auto pl-6 md:pl-16 lg:pl-28 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {availableDietTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedTag === tag
                    ? "bg-[#CBA328] text-black border-[#CBA328] shadow-xs font-bold"
                    : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                }`}
              >
                {tag === "all" ? "All Diets" : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Create Project Modal / Drawer */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                 
                  <h2 className="text-xl font-bold">New Project</h2>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {(generateCookbook.error || generateRecipe.error) && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>
                    {(generateCookbook.error as any)?.response?.data?.message || 
                     (generateRecipe.error as any)?.response?.data?.message || 
                     generateCookbook.error?.message || 
                     generateRecipe.error?.message || 
                     "Failed to create project. Please try again."}
                  </span>
                </div>
              )}

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled
                      className="p-3 rounded-xl border border-muted opacity-50 bg-muted/40 text-muted-foreground flex items-center justify-center gap-2 text-sm font-semibold cursor-not-allowed"
                    >
                      <BookOpen className="h-4 w-4" /> Cookbook (Disabled)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectKind('recipe')}
                      className="p-3 rounded-xl border border-[#CBA328] bg-[#CBA328]/10 text-foreground flex items-center justify-center gap-2 text-sm font-semibold transition-all"
                    >
                      <ChefHat className="h-4 w-4 text-[#CBA328]" /> Single Recipe
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme or Cuisine</label>
                  <Input
                    placeholder="e.g., Authentic Italian Pasta, Quick High-Protein Lunches"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Diet Preference (Optional)</label>
                    <Input
                      placeholder="e.g., Vegan, Keto"
                      value={dietInput}
                      onChange={(e) => setDietInput(e.target.value)}
                    />
                  </div>
                  {projectKind === 'cookbook' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recipe Count</label>
                      <Input
                        type="number"
                        min={1}
                        max={12}
                        value={recipeCount}
                        onChange={(e) => setRecipeCount(Number(e.target.value))}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t items-center">
                  <Button className="pt-5 pb-5" variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={generateCookbook.isPending || generateRecipe.isPending || !themeInput.trim()}
                    className="bg-[#CBA328] hover:bg-[#b58f20] text-black font-semibold p-5"
                  >
                    {(generateCookbook.isPending || generateRecipe.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Start Cooking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading State: Skeleton Cards */}
        {isLoadingJobs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectSkeletonCard key={i} label="Loading project..." />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoadingJobs && filteredJobs.length === 0 && localCookbooks.length === 0 && (
          <div className="text-center py-16 border rounded-2xl bg-card space-y-4">
            <div className="p-4 bg-muted w-fit rounded-full mx-auto text-muted-foreground">
              <ChefHat className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">No Projects Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You haven't generated any cookbook or recipe projects yet.
              </p>
            </div>
            
          </div>
        )}

        {/* Projects Grid */}
        {!isLoadingJobs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render API Jobs */}
            {filteredJobs.map((job) => (
              <ProjectCard key={job.jobId} job={job} />
            ))}

          {/* Fallback local session cookbooks if API list is empty */}
          {filteredJobs.length === 0 && localCookbooks.map((cb, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border bg-card shadow-xs hover:shadow-2xl hover:shadow-[#CBA328]/15 hover:border-[#CBA328]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <DishImage imageUrl={cb.recipes?.[0]?.imageUrl} imagePrompt={cb.recipes?.[0]?.imagePrompt} title={cb.title} />
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-bold uppercase tracking-wider text-[#CBA328]">Cookbook</span>
                    <span>Session Project</span>
                  </div>
                  <h3 className="text-xl font-bold">{cb.title}</h3>
                  {cb.description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{cb.description}</p>}
                </div>
                <div className="pt-3 border-t text-sm space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Recipes ({cb.recipes?.length || 0})</p>
                  <ul className="space-y-1">
                    {cb.recipes?.slice(0, 3).map((r) => (
                      <li key={r.id} className="text-sm font-medium flex items-center gap-2">
                        <Utensils className="h-3.5 w-3.5 text-[#CBA328]" /> {r.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  </div>
  );
}

// Skeleton Card component used for loading states and active processing states
function ProjectSkeletonCard({ label = "Generating Project..." }: { label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xs animate-pulse flex flex-col justify-between">
      {/* Skeleton Image Cover */}
      <div className="h-48 w-full bg-muted/80 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground/70 bg-background/70 px-3 py-1.5 rounded-full backdrop-blur-xs shadow-xs">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#CBA328]" />
          <span>{label}</span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Skeleton Header Badge */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 rounded-full bg-muted/80" />
            <div className="h-4 w-20 rounded bg-muted/60" />
          </div>

          {/* Skeleton Title & Description */}
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-[#CBA328]/20" />
            <div className="h-6 w-3/4 rounded bg-muted/80" />
            <div className="h-4 w-full rounded bg-muted/60" />
          </div>
        </div>

        {/* Skeleton Footer List */}
        <div className="pt-3 border-t space-y-2">
          <div className="h-3 w-24 rounded bg-muted/80" />
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-5/6 rounded bg-muted/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

const formatRelativeDate = (dateInput: string | number | Date): string => {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';

  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffTime = startOfToday.getTime() - startOfTarget.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(now.getDate() - dayOfWeek);

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);

  if (startOfTarget >= startOfWeek) return 'This week';
  if (startOfTarget >= startOfLastWeek) return 'Last week';

  const isSameMonth = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  if (isSameMonth) return 'This month';

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const isLastMonth = d.getFullYear() === lastMonthDate.getFullYear() && d.getMonth() === lastMonthDate.getMonth();
  if (isLastMonth) return 'Last month';

  return d.toLocaleDateString();
};

const getFullImageUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://bookgem-api.donaldchimaobijunior.workers.dev';
  return `${baseUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
};

// Subcomponent to dynamically fetch and display dish images using FLUX / R2
function DishImage({ imageUrl, imagePrompt, title }: { imageUrl?: string | null; imagePrompt?: string; title?: string }) {
  const fetchImage = useFetchImage();
  const [jobId, setJobId] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState<string | null>(imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);

  // Poll job status if a 202 jobId was returned by POST /image
  const { data: jobData } = useJobStatus(jobId);

  useEffect(() => {
    if (imageUrl) {
      setDirectUrl(imageUrl);
      return;
    }

    if (!directUrl && !jobId && !attempted && (imagePrompt || title)) {
      setAttempted(true);
      setLoading(true);
      fetchImage.mutate(
        { imagePrompt: imagePrompt || title, title },
        {
          onSuccess: (data) => {
            if ('imageUrl' in data && data.imageUrl) {
              setDirectUrl(data.imageUrl);
              setLoading(false);
            } else if ('jobId' in data && data.jobId) {
              setJobId(data.jobId);
            } else {
              setLoading(false);
            }
          },
          onError: () => setLoading(false),
        }
      );
    }
  }, [imageUrl, imagePrompt, title, directUrl, jobId, attempted]);

  useEffect(() => {
    if (jobData?.status === 'done') {
      const url = jobData.imageUrl || (jobData as any).recipe?.imageUrl;
      if (url) {
        setDirectUrl(url);
      }
      setLoading(false);
      setJobId(null);
    } else if (jobData?.status === 'error') {
      setLoading(false);
      setJobId(null);
    }
  }, [jobData]);

  const finalUrl = getFullImageUrl(directUrl);

  if (finalUrl) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-muted shadow-xs">
        <img 
          src={finalUrl} 
          alt={title || "Dish Image"} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
          onError={() => setDirectUrl(null)}
        />
      </div>
    );
  }

  if (loading || jobId) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center bg-muted/60 text-muted-foreground text-xs gap-2 p-4">
        <Loader2 className="h-5 w-5 animate-spin text-[#CBA328]" />
        <span>{jobId ? 'Rendering dish image...' : 'Initiating dish image...'}</span>
      </div>
    );
  }

  return (
    <div className="flex h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-[#CBA328]/15 via-amber-500/5 to-muted p-4 text-center">
      <Utensils className="h-10 w-10 text-[#CBA328] mb-2 opacity-80" />
      <span className="text-xs font-semibold text-foreground/80 line-clamp-1">{title || "Culinary Gem"}</span>
    </div>
  );
}

// Dedicated Sub-component for individual Project Cards with Live Status Tracking
function ProjectCard({ job: initialJob }: { job: Job }) {
  const navigate = useNavigate();
  const setActiveRecipe = useBookGemStore((state) => state.setActiveRecipe);
  const savedRecipes = useBookGemStore((state) => state.savedRecipes);
  const toggleSaveRecipe = useBookGemStore((state) => state.toggleSaveRecipe);

  const { data: currentJob } = useJobStatus(initialJob.status === 'queued' || initialJob.status === 'running' ? initialJob.jobId : null);
  const job = currentJob || initialJob;

  const isRunning = job.status === 'queued' || job.status === 'running';
  const isDone = job.status === 'done';
  const isError = job.status === 'error';

  const isSaved = isDone && job.recipe ? savedRecipes.some((s) => s.id === job.recipe!.id) : false;

  const handleCardClick = () => {
    if (isDone && job.recipe) {
      const resolvedRecipe = {
        ...job.recipe,
        id: job.recipe.id || job.jobId,
        imageUrl: job.recipe.imageUrl || job.imageUrl,
      };
      setActiveRecipe(resolvedRecipe);
      navigate(`/recipes/${resolvedRecipe.id}`);
    } else if (isDone && job.cookbook?.recipes?.[0]) {
      const firstRecipe = {
        ...job.cookbook.recipes[0],
        imageUrl: job.cookbook.recipes[0].imageUrl || job.imageUrl,
      };
      setActiveRecipe(firstRecipe);
      navigate(`/recipes/${firstRecipe.id || job.jobId}`);
    }
  };

  // Use Skeleton loader while job is processing in queue
  if (isRunning) {
    return <ProjectSkeletonCard label={`Generating ${job.kind || 'project'}...`} />;
  }

  if (isDone && (job.recipe || job.cookbook)) {
    return (
      <RecipeCard 
        recipe={job.recipe} 
        cookbook={job.cookbook} 
        dateLabel={job.createdAt ? formatRelativeDate(job.createdAt) : undefined} 
      />
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="overflow-hidden rounded-2xl border bg-card shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div className="relative w-full">
        {/* Layered Save Recipe Icon on Top Left */}
        {isDone && job.recipe && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveRecipe(job.recipe!);
            }}
            className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isSaved 
                ? "bg-[#CBA328] text-black" 
                : "bg-black/60 text-white hover:text-[#CBA328]"
            }`}
            title={isSaved ? "Remove from saved recipes" : "Save Recipe"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 fill-current text-black" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        )}

        {isDone && job.recipe && (
          <DishImage 
            imageUrl={job.recipe.imageUrl || job.imageUrl} 
            imagePrompt={job.recipe.imagePrompt} 
            title={job.recipe.title} 
          />
        )}

        {isDone && job.cookbook && (
          <DishImage 
            imageUrl={job.cookbook.recipes?.[0]?.imageUrl || job.imageUrl} 
            imagePrompt={job.cookbook.recipes?.[0]?.imagePrompt} 
            title={job.cookbook.title} 
          />
        )}

        {/* Layered Date Badge on Top Right of Image */}
        {job.createdAt && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-md border border-white/10">
            <Calendar className="h-3 w-3 text-[#CBA328]" />
            <span>{formatRelativeDate(job.createdAt)}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Metadata */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#CBA328]">
              {job.kind === 'recipe' ? 'Recipe' : job.kind === 'cookbook' ? 'Cookbook' : job.kind}
            </span>
          </div>

          {isDone && job.cookbook && (
            <div>
              <h3 className="text-xl font-bold">{job.cookbook.title}</h3>
              {job.cookbook.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{job.cookbook.description}</p>
              )}
            </div>
          )}

          {isDone && job.recipe && (
            <div>
              <h3 className="text-xl font-bold">{job.recipe.title}</h3>
              {job.recipe.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{job.recipe.description}</p>
              )}
            </div>
          )}

          {isError && (
            <div className="py-2 space-y-1">
              <h3 className="text-base font-semibold text-red-600">Generation Failed</h3>
              <p className="text-xs text-muted-foreground">{job.message || job.error || 'Failed to complete project'}</p>
            </div>
          )}
        </div>

        {/* Footer Details / Recipes Preview */}
        <div className="space-y-3 pt-3">
          {isDone && job.cookbook && job.cookbook.recipes && (
            <div className="pt-3 border-t text-sm space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center justify-between">
                <span>Recipes ({job.cookbook.recipes.length})</span>
              </p>
              <ul className="space-y-1">
                {job.cookbook.recipes.slice(0, 3).map((recipe) => (
                  <li key={recipe.id} className="text-sm font-medium flex items-center justify-between">
                    <span className="truncate flex items-center gap-1.5">
                      <Utensils className="h-3.5 w-3.5 text-[#CBA328] shrink-0" />
                      {recipe.title}
                    </span>
                    {recipe.totalMinutes && (
                      <span className="text-xs text-muted-foreground shrink-0">{recipe.totalMinutes}m</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isDone && job.recipe && (
            <div className="pt-3 border-t text-sm space-y-2">
              <div className="flex flex-wrap gap-2 text-xs">
                {job.recipe.difficulty && (
                  <span className="bg-muted px-2 py-0.5 rounded-md font-medium capitalize">
                    {job.recipe.difficulty}
                  </span>
                )}
                {job.recipe.totalMinutes && (
                  <span className="bg-muted px-2 py-0.5 rounded-md font-medium">
                    ⏱ {job.recipe.totalMinutes} mins
                  </span>
                )}
                {job.recipe.servings && (
                  <span className="bg-muted px-2 py-0.5 rounded-md font-medium">
                    🍽 {job.recipe.servings} servings
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
