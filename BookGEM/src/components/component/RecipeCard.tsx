import { useNavigate } from 'react-router-dom';
import { useBookGemStore } from '@/lib/store/useBookGemStore';
import { 
  Utensils, 
  Calendar, 
  Bookmark, 
  BookmarkCheck,
  Users,
  Clock 
} from 'lucide-react';
import type { Recipe, Cookbook } from '@/types/api';

export interface ExtendedCookbook extends Cookbook {
  id?: string;
  coverImage?: string;
}

interface RecipeCardProps {
  recipe?: Recipe;
  cookbook?: ExtendedCookbook;
  onOpen?: () => void;
  showBookmark?: boolean;
  dateLabel?: string;
}

function getFullImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function RecipeCard({ recipe, cookbook, onOpen, showBookmark = true, dateLabel }: RecipeCardProps) {
  const navigate = useNavigate();
  const savedRecipes = useBookGemStore((state) => state.savedRecipes);
  const toggleSaveRecipe = useBookGemStore((state) => state.toggleSaveRecipe);
  const setActiveRecipe = useBookGemStore((state) => state.setActiveRecipe);

  const directUrl = recipe?.imageUrl || cookbook?.coverImage || cookbook?.recipes?.[0]?.imageUrl || null;

  const isSaved = recipe ? savedRecipes.some((s) => s.id === recipe.id) : false;

  const title = recipe?.title || cookbook?.title || 'Culinary Gem';
  const description = recipe?.description || cookbook?.description;
  const kindLabel = recipe ? 'Recipe' : 'Cookbook';

  const handleCardClick = () => {
    if (onOpen) {
      onOpen();
      return;
    }
    if (recipe) {
      const resolved = {
        ...recipe,
        id: recipe.id || (recipe as any).jobId,
        imageUrl: recipe.imageUrl || (recipe as any).directUrl,
      };
      setActiveRecipe(resolved);
      navigate(`/recipes/${resolved.id}`);
    } else if (cookbook?.recipes?.[0]) {
      setActiveRecipe(cookbook.recipes[0]);
      navigate(`/recipes/${cookbook.recipes[0].id || (cookbook as any).jobId}`);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recipe) {
      toggleSaveRecipe(recipe);
    }
  };

  const finalUrl = getFullImageUrl(directUrl);

  return (
    <div
      onClick={handleCardClick}
      className="overflow-hidden rounded-2xl border bg-card shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      {/* Featured Dish Cover Image with Top Left Save Icon & Top Right Date Badge */}
      <div className="relative w-full">
        {/* Layered Save Recipe Icon on Top Left */}
        {showBookmark && recipe && (
          <button
            onClick={handleBookmarkClick}
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

        {/* Dish Cover Image */}
        {finalUrl ? (
          <div className="relative h-48 w-full overflow-hidden bg-muted shadow-xs">
            <img 
              src={finalUrl} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        ) : (
          <div className="flex h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-[#CBA328]/15 via-amber-500/5 to-muted p-4 text-center">
            <Utensils className="h-10 w-10 text-[#CBA328] mb-2 opacity-80" />
            <span className="text-xs font-semibold text-foreground/80 line-clamp-1">{title}</span>
          </div>
        )}

        {/* Layered Date Badge on Top Right of Image */}
        {dateLabel && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-md border border-white/10">
            <Calendar className="h-3 w-3 text-[#CBA328]" />
            <span>{dateLabel}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Metadata */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#CBA328]">
              {kindLabel}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Footer Details / Recipes Preview */}
        <div className="space-y-3 pt-3 border-t">
          {cookbook && cookbook.recipes && (
            <div className="text-sm space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center justify-between">
                <span>Recipes ({cookbook.recipes.length})</span>
              </p>
              <ul className="space-y-1">
                {cookbook.recipes.slice(0, 3).map((r) => (
                  <li key={r.id} className="text-sm font-medium flex items-center justify-between">
                    <span className="truncate flex items-center gap-1.5">
                      <Utensils className="h-3.5 w-3.5 text-[#CBA328] shrink-0" />
                      {r.title}
                    </span>
                    {r.totalMinutes && (
                      <span className="text-xs text-muted-foreground shrink-0">{r.totalMinutes}m</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe && (
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs flex-wrap">
                {recipe.difficulty ? (
                  <span className={`px-2.5 py-0.5 rounded-md font-semibold capitalize ${
                    recipe.difficulty.toLowerCase() === 'easy'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : recipe.difficulty.toLowerCase() === 'medium'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30'
                  }`}>
                    {recipe.difficulty}
                  </span>
                ) : <div />}

                <div className="flex items-center gap-2 ml-auto">
                  {recipe.totalMinutes && (
                    <span className="bg-muted px-2 py-0.5 rounded-md font-medium text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span>{recipe.totalMinutes}m</span>
                    </span>
                  )}
                  {recipe.servings && (
                    <span className="bg-muted px-2 py-0.5 rounded-md font-medium text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span>{recipe.servings}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
