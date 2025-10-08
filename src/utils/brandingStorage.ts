import { BrandingSettings } from "@/types/stbvv";

const BRANDING_STORAGE_KEY = 'stbvv-branding-settings';

export const saveBrandingSettings = (settings: BrandingSettings): void => {
  try {
    localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save branding settings:', error);
  }
};

export const loadBrandingSettings = (): BrandingSettings | null => {
  try {
    const stored = localStorage.getItem(BRANDING_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load branding settings:', error);
  }
  return null;
};

export const clearBrandingSettings = (): void => {
  try {
    localStorage.removeItem(BRANDING_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear branding settings:', error);
  }
};
