/**
 * Barrel Export für alle Services
 * @module services
 */

export {
  StorageService,
  storageService,
} from './StorageService';

export {
  CalculatorService,
  calculatorService,
  type TotalCalculationResult,
} from './CalculatorService';

export {
  ErrorLoggingService,
  logError,
  toUserFriendlyError,
  getErrorSolutions,
  type ErrorLogEntry,
  type ErrorSolution,
  type UserFriendlyError,
} from './ErrorLoggingService';
