// Main Application Logic
import { database } from './database';
import type { FoodEntry, WeightEntry, GoalWeight } from './types';
import {
  getToday,
  formatDate,
  parseDate,
  getWeekRange,
  calculateDailySummary,
  calculateWeeklyAverage,
  calculateMonthlyAverage,
  formatCurrency,
  formatDisplayDate,
  calculateWeightProgress
} from './utils';
import { createIcons, icons } from 'lucide';

class CalorieTrackerApp {
  private currentDate: string = getToday();
  
  async init(): Promise<void> {
    try {
      await database.init();
      this.setupEventListeners();
      this.setCurrentDate(getToday());
      await this.refreshAll();
      this.initIcons();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showNotification('Failed to initialize app', 'error');
    }
  }

  private initIcons(): void {
    createIcons({ icons });
  }

  private setupEventListeners(): void {
    // Food form submission
    const foodForm = document.getElementById('food-form') as HTMLFormElement;
    foodForm?.addEventListener('submit', (e) => this.handleFoodSubmit(e));

    // Weight form submission
    const weightForm = document.getElementById('weight-form') as HTMLFormElement;
    weightForm?.addEventListener('submit', (e) => this.handleWeightSubmit(e));

    // Goal form submission
    const goalForm = document.getElementById('goal-form') as HTMLFormElement;
    goalForm?.addEventListener('submit', (e) => this.handleGoalSubmit(e));

    // Date navigation
    document.getElementById('prev-day')?.addEventListener('click', () => this.navigateDay(-1));
    document.getElementById('next-day')?.addEventListener('click', () => this.navigateDay(1));
    document.getElementById('today-btn')?.addEventListener('click', () => this.setCurrentDate(getToday()));

    // Date picker
    const datePicker = document.getElementById('date-picker') as HTMLInputElement;
    datePicker?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.setCurrentDate(target.value);
    });

    // Tab navigation
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.switchTab(target.dataset.tab as string);
      });
    });
  }

  private async handleFoodSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const nameInput = document.getElementById('food-name') as HTMLInputElement;
    const caloriesInput = document.getElementById('food-calories') as HTMLInputElement;
    const costInput = document.getElementById('food-cost') as HTMLInputElement;

    const name = nameInput.value.trim();
    const calories = parseInt(caloriesInput.value, 10);
    const cost = costInput.value ? parseFloat(costInput.value) : undefined;

    if (!name || isNaN(calories) || calories <= 0) {
      this.showNotification('Please enter valid food name and calories', 'error');
      return;
    }

    try {
      const entry: Omit<FoodEntry, 'id'> = {
        name,
        calories,
        cost,
        date: this.currentDate,
        timestamp: Date.now()
      };

      await database.addFoodEntry(entry);
      form.reset();
      await this.refreshAll();
      this.showNotification('Food entry added!', 'success');
      this.initIcons();
    } catch (error) {
      console.error('Failed to add food entry:', error);
      this.showNotification('Failed to add entry', 'error');
    }
  }

  private async handleWeightSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const weightInput = document.getElementById('weight-value') as HTMLInputElement;
    const dateInput = document.getElementById('weight-date') as HTMLInputElement;

    const weight = parseFloat(weightInput.value);
    const date = dateInput.value;

    if (isNaN(weight) || weight <= 0 || !date) {
      this.showNotification('Please enter valid weight and date', 'error');
      return;
    }

    try {
      const entry: Omit<WeightEntry, 'id'> = {
        weight,
        date,
        timestamp: Date.now()
      };

      await database.addOrUpdateWeightEntry(entry);
      await this.refreshWeightHistory();
      this.showNotification('Weight recorded!', 'success');
      this.initIcons();
    } catch (error) {
      console.error('Failed to add weight entry:', error);
      this.showNotification('Failed to record weight', 'error');
    }
  }

  private navigateDay(offset: number): void {
    const date = parseDate(this.currentDate);
    date.setDate(date.getDate() + offset);
    this.setCurrentDate(formatDate(date));
  }

  private setCurrentDate(date: string): void {
    this.currentDate = date;
    
    // Update date picker
    const datePicker = document.getElementById('date-picker') as HTMLInputElement;
    if (datePicker) {
      datePicker.value = date;
    }

    // Update display
    const dateDisplay = document.getElementById('current-date-display');
    if (dateDisplay) {
      dateDisplay.textContent = formatDisplayDate(date);
    }

    // Highlight today button if on today
    const todayBtn = document.getElementById('today-btn');
    if (todayBtn) {
      if (date === getToday()) {
        todayBtn.classList.add('bg-primary-500', 'text-white');
        todayBtn.classList.remove('bg-gray-200', 'text-gray-700');
      } else {
        todayBtn.classList.remove('bg-primary-500', 'text-white');
        todayBtn.classList.add('bg-gray-200', 'text-gray-700');
      }
    }

    this.refreshAll();
  }

  private async refreshAll(): Promise<void> {
    await Promise.all([
      this.refreshDailyEntries(),
      this.refreshDailySummary(),
      this.refreshWeeklyAverage(),
      this.refreshMonthlyAverage(),
      this.refreshWeightHistory(),
      this.refreshGoalProgress()
    ]);
    this.initIcons();
  }

  private async refreshDailyEntries(): Promise<void> {
    try {
      const entries = await database.getFoodEntriesByDate(this.currentDate);
      const container = document.getElementById('daily-entries');
      
      if (!container) return;

      if (entries.length === 0) {
        container.innerHTML = `
          <div class="text-center text-gray-500 py-8">
            <i data-lucide="utensils" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
            <p>No food entries for this day</p>
            <p class="text-sm mt-1">Add your first meal above!</p>
          </div>
        `;
      } else {
        container.innerHTML = entries.map(entry => `
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" data-entry-id="${entry.id}">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <i data-lucide="apple" class="w-5 h-5 text-primary-600"></i>
              </div>
              <div>
                <p class="font-medium text-gray-900">${this.escapeHtml(entry.name)}</p>
                <p class="text-sm text-gray-500">
                  ${entry.cost ? formatCurrency(entry.cost) : 'No cost recorded'}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-semibold text-primary-600">${entry.calories} cal</span>
              <button 
                onclick="window.app.deleteFood(${entry.id})" 
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete entry"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Failed to refresh daily entries:', error);
    }
  }

  private async refreshDailySummary(): Promise<void> {
    try {
      const entries = await database.getFoodEntriesByDate(this.currentDate);
      const summary = calculateDailySummary(entries, this.currentDate);

      const caloriesEl = document.getElementById('daily-calories');
      const costEl = document.getElementById('daily-cost');
      const countEl = document.getElementById('daily-count');

      if (caloriesEl) caloriesEl.textContent = summary.totalCalories.toLocaleString();
      if (costEl) costEl.textContent = formatCurrency(summary.totalCost);
      if (countEl) countEl.textContent = summary.entries.length.toString();
    } catch (error) {
      console.error('Failed to refresh daily summary:', error);
    }
  }

  private async refreshWeeklyAverage(): Promise<void> {
    try {
      const weekRange = getWeekRange(parseDate(this.currentDate));
      const entries = await database.getFoodEntriesInRange(weekRange.start, weekRange.end);
      const average = calculateWeeklyAverage(entries, weekRange.start, weekRange.end);

      const caloriesEl = document.getElementById('weekly-avg-calories');
      const costEl = document.getElementById('weekly-avg-cost');
      const daysEl = document.getElementById('weekly-days');

      if (caloriesEl) caloriesEl.textContent = average.avgCalories.toLocaleString();
      if (costEl) costEl.textContent = formatCurrency(average.avgCost);
      if (daysEl) daysEl.textContent = `${average.totalDays} days tracked`;
    } catch (error) {
      console.error('Failed to refresh weekly average:', error);
    }
  }

  private async refreshMonthlyAverage(): Promise<void> {
    try {
      const date = parseDate(this.currentDate);
      const entries = await database.getAllFoodEntries();
      const average = calculateMonthlyAverage(entries, date.getFullYear(), date.getMonth());

      const caloriesEl = document.getElementById('monthly-avg-calories');
      const costEl = document.getElementById('monthly-avg-cost');
      const periodEl = document.getElementById('monthly-period');

      if (caloriesEl) caloriesEl.textContent = average.avgCalories.toLocaleString();
      if (costEl) costEl.textContent = formatCurrency(average.avgCost);
      if (periodEl) periodEl.textContent = `${average.month} ${average.year} (${average.totalDays} days)`;
    } catch (error) {
      console.error('Failed to refresh monthly average:', error);
    }
  }

  private async refreshWeightHistory(): Promise<void> {
    try {
      const entries = await database.getAllWeightEntries();
      const container = document.getElementById('weight-history');
      const latestWeight = document.getElementById('latest-weight');

      if (latestWeight && entries.length > 0) {
        latestWeight.textContent = `${entries[0].weight.toFixed(1)} kg`;
      } else if (latestWeight) {
        latestWeight.textContent = '-- kg';
      }

      if (!container) return;

      if (entries.length === 0) {
        container.innerHTML = `
          <div class="text-center text-gray-500 py-6">
            <i data-lucide="scale" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
            <p>No weight records yet</p>
          </div>
        `;
      } else {
        container.innerHTML = entries.slice(0, 10).map((entry, index) => {
          const prevEntry = entries[index + 1];
          let changeIndicator = '';
          
          if (prevEntry) {
            const diff = entry.weight - prevEntry.weight;
            if (diff > 0) {
              changeIndicator = `<span class="text-red-500 text-sm flex items-center gap-1"><i data-lucide="trending-up" class="w-3 h-3"></i>+${diff.toFixed(1)}</span>`;
            } else if (diff < 0) {
              changeIndicator = `<span class="text-green-500 text-sm flex items-center gap-1"><i data-lucide="trending-down" class="w-3 h-3"></i>${diff.toFixed(1)}</span>`;
            } else {
              changeIndicator = `<span class="text-gray-400 text-sm">--</span>`;
            }
          }

          return `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i data-lucide="scale" class="w-4 h-4 text-blue-600"></i>
                </div>
                <span class="text-sm text-gray-600">${formatDisplayDate(entry.date)}</span>
              </div>
              <div class="flex items-center gap-3">
                ${changeIndicator}
                <span class="font-semibold text-gray-900">${entry.weight.toFixed(1)} kg</span>
                <button 
                  onclick="window.app.deleteWeight(${entry.id})" 
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    } catch (error) {
      console.error('Failed to refresh weight history:', error);
    }
  }

  private switchTab(tabId: string): void {
    // Update tab buttons
    document.querySelectorAll('[data-tab]').forEach(tab => {
      const el = tab as HTMLElement;
      if (el.dataset.tab === tabId) {
        el.classList.add('border-primary-500', 'text-primary-600');
        el.classList.remove('border-transparent', 'text-gray-500');
      } else {
        el.classList.remove('border-primary-500', 'text-primary-600');
        el.classList.add('border-transparent', 'text-gray-500');
      }
    });

    // Update tab panels
    document.querySelectorAll('[data-panel]').forEach(panel => {
      const el = panel as HTMLElement;
      if (el.dataset.panel === tabId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    this.initIcons();
  }

  async deleteFood(id: number): Promise<void> {
    if (!confirm('Delete this food entry?')) return;
    
    try {
      await database.deleteFoodEntry(id);
      await this.refreshAll();
      this.showNotification('Entry deleted', 'success');
    } catch (error) {
      console.error('Failed to delete food entry:', error);
      this.showNotification('Failed to delete entry', 'error');
    }
  }

  async deleteWeight(id: number): Promise<void> {
    if (!confirm('Delete this weight record?')) return;
    
    try {
      await database.deleteWeightEntry(id);
      await this.refreshWeightHistory();
      this.showNotification('Weight record deleted', 'success');
      this.initIcons();
    } catch (error) {
      console.error('Failed to delete weight entry:', error);
      this.showNotification('Failed to delete record', 'error');
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `
      fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50
      transform translate-y-0 transition-all duration-300
      ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
    `;
    
    notification.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
      <span>${message}</span>
    `;

    container.appendChild(notification);
    this.initIcons();

    setTimeout(() => {
      notification.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Goal Weight Methods
  showGoalModal(): void {
    const modal = document.getElementById('goal-modal');
    if (!modal) return;

    // Load existing goal if available
    database.getGoalWeight().then(goal => {
      if (goal) {
        (document.getElementById('goal-weight') as HTMLInputElement).value = goal.targetWeight.toString();
        (document.getElementById('goal-date') as HTMLInputElement).value = goal.targetDate;
        (document.getElementById('start-weight') as HTMLInputElement).value = goal.startWeight.toString();
      }
    });

    modal.classList.remove('hidden');
    this.initIcons();
  }

  closeGoalModal(): void {
    const modal = document.getElementById('goal-modal');
    modal?.classList.add('hidden');
  }

  private async handleGoalSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const targetWeight = parseFloat((document.getElementById('goal-weight') as HTMLInputElement).value);
    const targetDate = (document.getElementById('goal-date') as HTMLInputElement).value;
    const startWeight = parseFloat((document.getElementById('start-weight') as HTMLInputElement).value);

    if (isNaN(targetWeight) || isNaN(startWeight) || !targetDate) {
      this.showNotification('Please fill all fields', 'error');
      return;
    }

    const today = getToday();
    if (targetDate <= today) {
      this.showNotification('Target date must be in the future', 'error');
      return;
    }

    try {
      const goal: Omit<GoalWeight, 'id'> = {
        targetWeight,
        targetDate,
        startWeight,
        startDate: today,
        createdAt: Date.now()
      };

      await database.setGoalWeight(goal);
      this.closeGoalModal();
      await this.refreshGoalProgress();
      this.showNotification('Goal saved!', 'success');
      this.initIcons();
    } catch (error) {
      console.error('Failed to save goal:', error);
      this.showNotification('Failed to save goal', 'error');
    }
  }

  async deleteGoal(): Promise<void> {
    if (!confirm('Delete your weight goal?')) return;

    try {
      await database.deleteGoalWeight();
      this.closeGoalModal();
      await this.refreshGoalProgress();
      this.showNotification('Goal deleted', 'success');
      this.initIcons();
    } catch (error) {
      console.error('Failed to delete goal:', error);
      this.showNotification('Failed to delete goal', 'error');
    }
  }

  private async refreshGoalProgress(): Promise<void> {
    try {
      const goal = await database.getGoalWeight();
      const goalContent = document.getElementById('goal-content');
      const goalSubtitle = document.getElementById('goal-subtitle');
      const chartContainer = document.getElementById('weight-chart-container');

      if (!goal) {
        if (goalContent) {
          goalContent.innerHTML = `
            <button 
              onclick="window.app.showGoalModal()"
              class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Set Your Goal
            </button>
          `;
        }
        if (goalSubtitle) goalSubtitle.textContent = 'Set a target';
        if (chartContainer) chartContainer.style.display = 'none';
        return;
      }

      const weightEntries = await database.getAllWeightEntries();
      const currentEntry = weightEntries.length > 0 ? weightEntries[0] : null;
      
      const progress = calculateWeightProgress(
        currentEntry?.weight || null,
        goal.targetWeight,
        goal.targetDate,
        goal.startWeight,
        goal.startDate,
        weightEntries
      );

      // Update goal card
      if (goalSubtitle) {
        goalSubtitle.textContent = `${progress.daysRemaining} days remaining`;
      }

      if (goalContent) {
        const statusColors = {
          'on-track': { bg: 'bg-green-100', text: 'text-green-700', icon: 'check-circle' },
          'ahead': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'trending-up' },
          'behind': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'trending-down' },
          'insufficient-data': { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'alert-circle' }
        };

        const status = statusColors[progress.status];
        const statusText = progress.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

        goalContent.innerHTML = `
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="text-left">
              <div class="text-xs text-blue-100 mb-1">Current</div>
              <div class="text-2xl font-bold">${progress.currentWeight?.toFixed(1) || '--'} kg</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-blue-100 mb-1">Target</div>
              <div class="text-2xl font-bold">${goal.targetWeight.toFixed(1)} kg</div>
            </div>
          </div>
          
          <div class="w-full bg-white/20 rounded-full h-2 mb-3">
            <div class="bg-white rounded-full h-2 transition-all duration-500" style="width: ${Math.min(100, progress.percentComplete)}%"></div>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-blue-100">${progress.percentComplete.toFixed(0)}% complete</span>
            <span class="px-2 py-1 ${status.bg} ${status.text} rounded-lg flex items-center gap-1 text-xs font-medium">
              <i data-lucide="${status.icon}" class="w-3 h-3"></i>
              ${statusText}
            </span>
          </div>
        `;
      }

      // Show weight chart
      if (chartContainer && weightEntries.length > 0) {
        chartContainer.style.display = 'block';
        this.renderWeightChart(weightEntries, goal);
      }

    } catch (error) {
      console.error('Failed to refresh goal progress:', error);
    }
  }

  private renderWeightChart(entries: WeightEntry[], goal: GoalWeight): void {
    const chartEl = document.getElementById('weight-chart');
    if (!chartEl) return;

    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const maxWeight = Math.max(...sortedEntries.map(e => e.weight), goal.targetWeight, goal.startWeight);
    const minWeight = Math.min(...sortedEntries.map(e => e.weight), goal.targetWeight, goal.startWeight);
    const range = maxWeight - minWeight;
    const padding = range * 0.2;

    const chartHeight = 192; // h-48
    const chartWidth = chartEl.clientWidth;

    const getY = (weight: number) => {
      return chartHeight - ((weight - (minWeight - padding)) / (range + padding * 2)) * chartHeight;
    };

    const getX = (_date: string, index: number) => {
      const totalDays = sortedEntries.length - 1;
      return totalDays > 0 ? (index / totalDays) * chartWidth : chartWidth / 2;
    };

    // Draw SVG
    let svg = `<svg width="100%" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" class="overflow-visible">`;
    
    // Goal line
    const goalY = getY(goal.targetWeight);
    svg += `<line x1="0" y1="${goalY}" x2="${chartWidth}" y2="${goalY}" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>`;
    
    // Weight line
    if (sortedEntries.length > 1) {
      let pathD = `M ${getX(sortedEntries[0].date, 0)} ${getY(sortedEntries[0].weight)}`;
      sortedEntries.forEach((entry, i) => {
        if (i > 0) {
          pathD += ` L ${getX(entry.date, i)} ${getY(entry.weight)}`;
        }
      });
      svg += `<path d="${pathD}" fill="none" stroke="#10b981" stroke-width="2"/>`;
    }
    
    // Data points
    sortedEntries.forEach((entry, i) => {
      const x = getX(entry.date, i);
      const y = getY(entry.weight);
      svg += `<circle cx="${x}" cy="${y}" r="4" fill="#10b981"/>`;
    });
    
    svg += '</svg>';
    
    chartEl.innerHTML = svg;
  }

  // Data Management Methods
  async exportData(): Promise<void> {
    try {
      const jsonData = await database.exportAllData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `calorie-tracker-backup-${getToday()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showNotification('Backup exported!', 'success');
    } catch (error) {
      console.error('Failed to export data:', error);
      this.showNotification('Failed to export backup', 'error');
    }
  }

  showImportModal(): void {
    const modal = document.getElementById('import-modal');
    modal?.classList.remove('hidden');
    this.initIcons();
  }

  closeImportModal(): void {
    const modal = document.getElementById('import-modal');
    modal?.classList.add('hidden');
  }

  async importData(): Promise<void> {
    const fileInput = document.getElementById('import-file') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      this.showNotification('Please select a file', 'error');
      return;
    }

    try {
      const text = await file.text();
      await database.importData(text);
      
      this.closeImportModal();
      fileInput.value = '';
      await this.refreshAll();
      
      this.showNotification('Data imported successfully!', 'success');
    } catch (error) {
      console.error('Failed to import data:', error);
      this.showNotification('Failed to import: ' + (error as Error).message, 'error');
    }
  }
}

// Initialize app
const app = new CalorieTrackerApp();

// Expose to window for inline event handlers
declare global {
  interface Window {
    app: CalorieTrackerApp;
  }
}
window.app = app;

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());

export { app };
