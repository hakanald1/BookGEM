export interface Ingredient {
  item: string;
  quantity: string;
  unit?: string;
  notes?: string;
}

export interface Step {
  n: number;
  instruction: string;
  durationMinutes?: number;
}

export interface Nutrition {
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  cuisine?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  prepMinutes?: number;
  cookMinutes?: number;
  totalMinutes?: number;
  servings?: number;
  tags?: string[];
  ingredients: Ingredient[];
  steps: Step[];
  nutritionPerServing?: Nutrition;
  imagePrompt: string;
  imageUrl?: string | null;
}

export interface Cookbook {
  title: string;
  description?: string;
  theme?: string;
  recipes: Recipe[];
}

export interface Meta {
  model?: string;
  repaired?: boolean;
  elapsedMs?: number;
  requested?: number;
  returned?: number;
  note?: string;
  dropped?: string[];
}

export interface GenerateRequest {
  theme: string;
  count?: number;
  diet?: string;
  ingredients?: string[] | string;
  avoid?: string[];
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  maxMinutes?: number;
}

export interface ImageRequest {
  imagePrompt?: string;
  title?: string;
}

export interface ImageResponse {
  imageUrl: string;
  cached?: boolean;
  stored?: boolean;
  key?: string | null;
  meta?: {
    model?: string;
    elapsedMs?: number;
  };
}

export interface JobAccepted {
  jobId: string;
  kind: 'cookbook' | 'image' | 'recipe' | 'idea';
  status: 'queued' | 'running';
  poll: string;
  deduped?: boolean;
  meta?: Meta;
}

export interface Job {
  jobId: string;
  kind: 'cookbook' | 'image' | 'recipe' | 'idea';
  status: 'queued' | 'running' | 'done' | 'error';
  attempts: number;
  createdAt: string;
  updatedAt: string;
  cookbook?: Cookbook;
  recipe?: Recipe;
  idea?: Record<string, any>;
  imageUrl?: string;
  cached?: boolean;
  stored?: boolean;
  key?: string | null;
  meta?: Meta;
  error?: string;
  message?: string;
  hint?: string;
}

export interface Health {
  ok?: boolean;
  service?: string;
  model?: string;
  imageModel?: string;
  colo?: string | null;
  geminiBaseOverridden?: boolean;
  bindings?: {
    ai?: boolean;
    d1?: boolean;
    queue?: boolean;
    r2?: boolean;
    geminiKey?: boolean;
    apiKey?: boolean;
  };
  ready?: boolean;
}

export interface Models {
  configured?: string;
  available?: boolean;
  gemma?: string[];
  other?: string[];
  hint?: string;
}
