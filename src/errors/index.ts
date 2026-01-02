/**
 * Barrel Export für alle Error-Klassen
 * @module errors
 */

export {
  AppError,
  type ErrorSeverity,
  type ErrorCategory,
} from './AppError';

export {
  ValidationError,
  type ValidationIssue,
} from './ValidationError';

export {
  StorageError,
  type StorageErrorType,
} from './StorageError';

export {
  ExportError,
  type ExportErrorType,
} from './ExportError';
