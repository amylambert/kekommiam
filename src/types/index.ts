/**
 * @file types/index.ts
 * @description Centralized TypeScript type definitions.
 */

/**
 * Represents a category for dishes (e.g., Main, Side, Dessert).
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * Represents a raw ingredient item (e.g., Potato, Chicken wing).
 */
export interface Ingredient {
  id: number;
  name: string;
}

/**
 * Defines the structural role of a dish in a meal:
 */
export type DishRole = 'complete' | 'base' | 'protein';

/**
 * Represents a dish or component in the recipe library.
 */
export interface Dish {
  id: number;
  name: string;
  categoryId: number | null;
  role: DishRole;
  containsMeat: boolean; // Handled as 0/1 integers in SQLite
  rating: number;        // Constrained between 1 and 5
  lastEatenAt: string | null; // ISO date string (YYYY-MM-DD)
}

/**
 * Represents the association between a dish and an ingredient with quantity.
 */
export interface DishIngredient {
  dishId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
}

/**
 * Represents a scheduled meal event on the weekly calendar.
 */
export interface Meal {
  id: number;
  name: string | null;
  date: string; // YYYY-MM-DD format
  slot: 'breakfast' | 'lunch' | 'dinner';
}

/**
 * Represents the association between a scheduled meal event and its assigned dishes.
 */
export interface MealDish {
  mealId: number;
  dishId: number;
}