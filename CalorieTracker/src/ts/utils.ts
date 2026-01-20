// Utility functions for date handling and calculations
import type { FoodEntry, DailySummary, WeeklyAverage, MonthlyAverage } from './types';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getToday(): string {
  return formatDate(new Date());
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

export function getWeekRange(date: Date): { start: string; end: string } {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    start: formatDate(monday),
    end: formatDate(sunday)
  };
}

export function getMonthRange(date: Date): { start: string; end: string } {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay)
  };
}

export function calculateDailySummary(entries: FoodEntry[], date: string): DailySummary {
  const dayEntries = entries.filter(e => e.date === date);
  
  return {
    date,
    totalCalories: dayEntries.reduce((sum, e) => sum + e.calories, 0),
    totalCost: dayEntries.reduce((sum, e) => sum + (e.cost || 0), 0),
    entries: dayEntries
  };
}

export function calculateWeeklyAverage(entries: FoodEntry[], weekStart: string, weekEnd: string): WeeklyAverage {
  const weekEntries = entries.filter(e => e.date >= weekStart && e.date <= weekEnd);
  
  // Group by date to count unique days
  const dailyTotals = new Map<string, { calories: number; cost: number }>();
  
  for (const entry of weekEntries) {
    const existing = dailyTotals.get(entry.date) || { calories: 0, cost: 0 };
    dailyTotals.set(entry.date, {
      calories: existing.calories + entry.calories,
      cost: existing.cost + (entry.cost || 0)
    });
  }
  
  const totalDays = dailyTotals.size;
  const totalCalories = Array.from(dailyTotals.values()).reduce((sum, d) => sum + d.calories, 0);
  const totalCost = Array.from(dailyTotals.values()).reduce((sum, d) => sum + d.cost, 0);
  
  return {
    weekStart,
    weekEnd,
    avgCalories: totalDays > 0 ? Math.round(totalCalories / totalDays) : 0,
    avgCost: totalDays > 0 ? Math.round(totalCost / totalDays * 100) / 100 : 0,
    totalDays
  };
}

export function calculateMonthlyAverage(entries: FoodEntry[], year: number, month: number): MonthlyAverage {
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthEntries = entries.filter(e => e.date.startsWith(monthStr));
  
  // Group by date to count unique days
  const dailyTotals = new Map<string, { calories: number; cost: number }>();
  
  for (const entry of monthEntries) {
    const existing = dailyTotals.get(entry.date) || { calories: 0, cost: 0 };
    dailyTotals.set(entry.date, {
      calories: existing.calories + entry.calories,
      cost: existing.cost + (entry.cost || 0)
    });
  }
  
  const totalDays = dailyTotals.size;
  const totalCalories = Array.from(dailyTotals.values()).reduce((sum, d) => sum + d.calories, 0);
  const totalCost = Array.from(dailyTotals.values()).reduce((sum, d) => sum + d.cost, 0);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  return {
    month: monthNames[month],
    year,
    avgCalories: totalDays > 0 ? Math.round(totalCalories / totalDays) : 0,
    avgCost: totalDays > 0 ? Math.round(totalCost / totalDays * 100) / 100 : 0,
    totalDays
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDisplayDate(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function formatWeightUnit(weight: number, unit: 'kg' | 'lbs' = 'kg'): string {
  return `${weight.toFixed(1)} ${unit}`;
}
