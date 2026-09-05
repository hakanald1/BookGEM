import type { Recipe } from '@/types/api';

export interface RecipeLayoutProps {
  recipe: Recipe;
  fullImageUrl: string | null;
  currentServings: number;
  baseServings: number;
  scaleRatio: number;
  checkedIngredients: Record<string, boolean>;
  toggleIngredientCheck: (idx: number) => void;
  completedSteps: Record<number, boolean>;
  toggleStepCheck: (stepNum: number) => void;
  activeStepTimerIndex: number | null;
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  handleStartTimer: (stepIndex: number, durationMinutes: number) => void;
  handleGenerateImage: () => void;
  isGeneratingImage: boolean;
  setServingsMultiplier: React.Dispatch<React.SetStateAction<number>>;
  prepMinutes?: number;
  cookMinutes?: number;
  totalMinutes?: number;
  displayPrepTime: string;
  displayCookTime: string;
  displayTotalTime: string;
  nutritionCalories?: number;
  nutritionFat?: number;
  nutritionCarbs?: number;
  nutritionProtein?: number;
  hasNutrition: boolean;
}
