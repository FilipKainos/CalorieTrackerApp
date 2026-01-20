// Database types for the Calorie Tracker app

export interface FoodEntry {
  id?: number;
  name: string;
  calories: number;
  cost?: number;
  date: string; // ISO date string YYYY-MM-DD
  timestamp: number;
}

export interface WeightEntry {
  id?: number;
  weight: number;
  date: string; // ISO date string YYYY-MM-DD
  timestamp: number;
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  totalCost: number;
  entries: FoodEntry[];
}

export interface WeeklyAverage {
  weekStart: string;
  weekEnd: string;
  avgCalories: number;
  avgCost: number;
  totalDays: number;
}

export interface MonthlyAverage {
  month: string;
  year: number;
  avgCalories: number;
  avgCost: number;
  totalDays: number;
}

export interface GoalWeight {
  id?: number;
  targetWeight: number;
  targetDate: string; // ISO date string YYYY-MM-DD
  startWeight: number;
  startDate: string;
  createdAt: number;
}

export type ProgressStatus = 'on-track' | 'ahead' | 'behind' | 'insufficient-data';

export interface WeightProgress {
  status: ProgressStatus;
  currentWeight: number | null;
  goalWeight: number;
  targetDate: string;
  daysRemaining: number;
  requiredWeeklyChange: number;
  actualWeeklyChange: number | null;
  percentComplete: number;
}
