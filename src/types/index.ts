export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  recipesCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: User;
  ingredients: Ingredient[];
  steps: string[];
  cookTime: number;
  prepTime: number;
  servings: number;
  tags: string[];
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  calories: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: string;
  likes: number;
}

export interface MealPlan {
  day: string;
  meals: {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
    snack: Recipe | null;
  };
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  checked: boolean;
  recipeId?: string;
}
