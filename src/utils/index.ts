/**
 * Barrel Export für alle Utils
 * @module utils
 */

// Calculator
export { calculatePosition, calculateTotal } from './stbvvCalculator';
export { getFeeTables } from './stbvvTables';

// Export
export { exportToCSV } from './csvExporter';
// Note: pdfGenerator and excelExporter are lazy-loaded for bundle size

// Template
export { 
  DEFAULT_TEMPLATES, 
  getTemplates, 
  saveCustomTemplate, 
  deleteTemplate 
} from './templateManager';

// Activity
export { activityPresets, getActivityPreset } from './activityPresets';

// Branding
export { loadBrandingSettings, saveBrandingSettings } from './brandingStorage';

// ID Generation
export { generateUniqueId } from './idGenerator';

// Smart Defaults
export { 
  getDefaultHourlyRate, 
  updateSmartDefaults, 
  addRecentActivity 
} from './smartDefaults';

// Formatting
export { formatBillingDetails } from './formatBillingDetails';
