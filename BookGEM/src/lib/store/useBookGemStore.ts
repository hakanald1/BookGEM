import { create } from 'zustand';
import type { Cookbook, Recipe } from '../../types/api';

interface BookGemState {
  activeJobs: string[];
  recentCookbooks: Cookbook[];
  recentRecipes: Recipe[];
  savedRecipes: Recipe[];
  activeCookbook: Cookbook | null;
  activeRecipe: Recipe | null;
  themeFilter: string;
  dietFilter: string;
  apiKey: string;

  // Actions
  addActiveJob: (jobId: string) => void;
  removeActiveJob: (jobId: string) => void;
  addCookbook: (cookbook: Cookbook) => void;
  addRecipe: (recipe: Recipe) => void;
  toggleSaveRecipe: (recipe: Recipe) => void;
  setActiveCookbook: (cookbook: Cookbook | null) => void;
  setActiveRecipe: (recipe: Recipe | null) => void;
  setThemeFilter: (theme: string) => void;
  setDietFilter: (diet: string) => void;
  setApiKey: (key: string) => void;
}

export const useBookGemStore = create<BookGemState>((set) => ({
  activeJobs: [],
  recentCookbooks: [],
  recentRecipes: [],
  savedRecipes: [],
  activeCookbook: null,
  activeRecipe: null,
  themeFilter: '',
  dietFilter: '',
  apiKey: '',

  addActiveJob: (jobId) =>
    set((state) => ({
      activeJobs: state.activeJobs.includes(jobId) ? state.activeJobs : [...state.activeJobs, jobId],
    })),

  removeActiveJob: (jobId) =>
    set((state) => ({
      activeJobs: state.activeJobs.filter((id) => id !== jobId),
    })),

  addCookbook: (cookbook) =>
    set((state) => ({
      recentCookbooks: [cookbook, ...state.recentCookbooks],
      activeCookbook: cookbook,
    })),

  addRecipe: (recipe) =>
    set((state) => ({
      recentRecipes: [recipe, ...state.recentRecipes],
      activeRecipe: recipe,
    })),

  toggleSaveRecipe: (recipe) =>
    set((state) => {
      const exists = state.savedRecipes.some((r) => r.id === recipe.id);
      return {
        savedRecipes: exists
          ? state.savedRecipes.filter((r) => r.id !== recipe.id)
          : [...state.savedRecipes, recipe],
      };
    }),

  setActiveCookbook: (cookbook) => set({ activeCookbook: cookbook }),
  setActiveRecipe: (recipe) => set({ activeRecipe: recipe }),
  setThemeFilter: (theme) => set({ themeFilter: theme }),
  setDietFilter: (diet) => set({ dietFilter: diet }),
  setApiKey: (key) => set({ apiKey: key }),
}));
