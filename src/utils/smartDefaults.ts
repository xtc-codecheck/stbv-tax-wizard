const SMART_DEFAULTS_KEY = 'stbvv_smart_defaults';

export interface SmartDefaults {
  lastHourlyRate?: number;
  lastFeeTable?: string;
  lastClientEmail?: string;
  lastBillingType?: string;
  recentActivities?: string[];
}

export function getSmartDefaults(): SmartDefaults {
  try {
    const stored = localStorage.getItem(SMART_DEFAULTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function updateSmartDefaults(updates: Partial<SmartDefaults>) {
  try {
    const current = getSmartDefaults();
    const merged = { ...current, ...updates };
    localStorage.setItem(SMART_DEFAULTS_KEY, JSON.stringify(merged));
  } catch (error) {
    console.warn('Failed to save smart defaults:', error);
  }
}

export function addRecentActivity(activity: string) {
  const defaults = getSmartDefaults();
  const recent = defaults.recentActivities || [];
  
  // Add to front, remove duplicates, keep max 10
  const updated = [activity, ...recent.filter(a => a !== activity)].slice(0, 10);
  
  updateSmartDefaults({ recentActivities: updated });
}

export function getDefaultHourlyRate(): number | undefined {
  return getSmartDefaults().lastHourlyRate;
}

export function getDefaultFeeTable(): string | undefined {
  return getSmartDefaults().lastFeeTable;
}

export function getRecentActivities(): string[] {
  return getSmartDefaults().recentActivities || [];
}
