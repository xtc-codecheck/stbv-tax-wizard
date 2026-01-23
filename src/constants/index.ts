/**
 * Barrel Export für alle Konstanten
 * @module constants
 */

// Fees
export {
  VAT_RATE,
  EXPENSE_FEE_RATE,
  EXPENSE_FEE_MAX,
  DEFAULT_DOCUMENT_FEE,
  TIME_FEE,
  DEFAULT_TENTH_RATES,
} from './fees';

// Validation
export {
  VALIDATION,
  MIN_OBJECT_VALUES,
} from './validation';

// Timing
export {
  TIMING,
} from './timing';

// Storage
export {
  STORAGE_PREFIX,
  STORAGE_KEYS,
  STORAGE_VERSION,
} from './storage';

// Blog
export {
  BLOG_CATEGORIES,
  BLOG_ROUTES,
  BLOG_SEO,
} from './blog';

// StBVV Compliance
export {
  STBVV_CURRENT_VERSION,
  STBVV_VERSION_HISTORY,
  STBVV_LEGAL_REFERENCES,
  STBVV_MINIMUM_VALUES,
  STBVV_DISCLAIMERS,
  CHECKSUM_CONFIG,
  generateDocumentChecksum,
  type StBVVVersion,
  type LegalReference,
  type MinimumObjectValue,
} from './stbvv';
