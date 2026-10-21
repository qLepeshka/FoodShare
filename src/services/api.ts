/**
 * API Service Layer
 * 
 * Этот модуль содержит все функции для взаимодействия с бэкендом.
 * В настоящее время использует моковые данные, но готов к подключению
 * реального .NET API.
 * 
 * Для подключения к бэкенду:
 * 1. Разверните .NET API (см. /docs/DOTNET_BACKEND.md)
 * 2. Установите VITE_API_URL в переменных окружения
 * 3. Замените моковые вызовы на реальные fetch-запросы
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Типы API ответов
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// ============ RECIPES API ============

export const recipesApi = {
  /** GET /api/recipes */
  async getAll(params?: { page?: number; pageSize?: number; tag?: string; search?: string }): Promise<PaginatedResponse<any>> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes?${new URLSearchParams(params as any)}`);
    // return response.json();
    
    const { recipes } = await import('../data/mockData');
    return {
      data: recipes,
      totalCount: recipes.length,
      page: 1,
      pageSize: 10,
    };
  },

  /** GET /api/recipes/:id */
  async getById(id: string): Promise<any> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    // return response.json();
    
    const { recipes } = await import('../data/mockData');
    return recipes.find((r) => r.id === id);
  },

  /** POST /api/recipes */
  async create(recipe: any): Promise<any> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(recipe),
    // });
    // return response.json();
    
    console.log('Creating recipe:', recipe);
    return { id: Date.now().toString(), ...recipe };
  },

  /** PUT /api/recipes/:id */
  async update(id: string, recipe: any): Promise<any> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(recipe),
    // });
    // return response.json();
    
    console.log('Updating recipe:', id, recipe);
    return { id, ...recipe };
  },

  /** DELETE /api/recipes/:id */
  async delete(id: string): Promise<void> {
    // TODO: Заменить на реальный API вызов
    // await fetch(`${API_BASE_URL}/recipes/${id}`, { method: 'DELETE' });
    console.log('Deleting recipe:', id);
  },

  /** POST /api/recipes/:id/like */
  async toggleLike(id: string): Promise<{ liked: boolean; likesCount: number }> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes/${id}/like`, { method: 'POST' });
    // return response.json();
    
    return { liked: true, likesCount: 1 };
  },

  /** POST /api/recipes/:id/save */
  async toggleSave(id: string): Promise<{ saved: boolean }> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes/${id}/save`, { method: 'POST' });
    // return response.json();
    
    return { saved: true };
  },

  /** POST /api/recipes/:id/comments */
  async addComment(id: string, text: string): Promise<any> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/recipes/${id}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text }),
    // });
    // return response.json();
    
    return { id: Date.now().toString(), text, createdAt: new Date().toISOString() };
  },
};

// ============ USERS API ============

export const usersApi = {
  /** GET /api/users/me */
  async getCurrentUser(): Promise<any> {
    // TODO: Заменить на реальный API вызов
    const { currentUser } = await import('../data/mockData');
    return currentUser;
  },

  /** GET /api/users/:id */
  async getById(id: string): Promise<any> {
    // TODO: Заменить на реальный API вызов
    const { users } = await import('../data/mockData');
    return users.find((u) => u.id === id);
  },

  /** POST /api/users/follow/:id */
  async toggleFollow(userId: string): Promise<{ following: boolean }> {
    // TODO: Заменить на реальный API вызов
    return { following: true };
  },

  /** PUT /api/users/me */
  async updateProfile(data: any): Promise<any> {
    // TODO: Заменить на реальный API вызов
    console.log('Updating profile:', data);
    return data;
  },
};

// ============ MEAL PLANS API ============

export const mealPlansApi = {
  /** GET /api/meal-plans/week */
  async getWeekPlan(): Promise<any> {
    // TODO: Заменить на реальный API вызов
    return { days: [] };
  },

  /** POST /api/meal-plans */
  async addMeal(day: string, mealType: string, recipeId: string): Promise<any> {
    // TODO: Заменить на реальный API вызов
    return { day, mealType, recipeId };
  },

  /** DELETE /api/meal-plans/:id */
  async removeMeal(id: string): Promise<void> {
    // TODO: Заменить на реальный API вызов
  },
};

// ============ AUTH API ============

export const authApi = {
  /** POST /api/auth/login */
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // return response.json();
    
    return { token: 'mock-jwt-token', user: null };
  },

  /** POST /api/auth/register */
  async register(data: { name: string; email: string; password: string }): Promise<{ token: string; user: any }> {
    // TODO: Заменить на реальный API вызов
    return { token: 'mock-jwt-token', user: null };
  },

  /** POST /api/auth/refresh */
  async refreshToken(): Promise<{ token: string }> {
    // TODO: Заменить на реальный API вызов
    return { token: 'mock-jwt-token' };
  },

  /** POST /api/auth/logout */
  async logout(): Promise<void> {
    // TODO: Заменить на реальный API вызов
  },
};

// ============ SHOPPING LIST API ============

export const shoppingListApi = {
  /** GET /api/shopping-list */
  async getItems(): Promise<any[]> {
    // TODO: Заменить на реальный API вызов
    return [];
  },

  /** POST /api/shopping-list/generate */
  async generateFromPlan(weekPlanId: string): Promise<any[]> {
    // TODO: Заменить на реальный API вызов
    return [];
  },

  /** PATCH /api/shopping-list/:id */
  async toggleItem(id: string): Promise<any> {
    // TODO: Заменить на реальный API вызов
    return { id, checked: true };
  },
};
