/**
 * Result Pattern für typsichere Fehlerbehandlung
 * @module lib/result
 */

/**
 * Erfolgstyp
 */
export interface Success<T> {
  success: true;
  data: T;
}

/**
 * Fehlertyp
 */
export interface Failure<E = Error> {
  success: false;
  error: E;
}

/**
 * Result-Typ als Union von Success und Failure
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Erstellt ein Erfolgs-Result
 */
export function ok<T>(data: T): Success<T> {
  return { success: true, data };
}

/**
 * Erstellt ein Fehler-Result
 */
export function err<E = Error>(error: E): Failure<E> {
  return { success: false, error };
}

/**
 * Prüft, ob ein Result erfolgreich ist
 */
export function isOk<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success === true;
}

/**
 * Prüft, ob ein Result ein Fehler ist
 */
export function isErr<T, E>(result: Result<T, E>): result is Failure<E> {
  return result.success === false;
}

/**
 * Extrahiert den Wert aus einem Result oder wirft einen Fehler
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result)) {
    return result.data;
  }
  throw result.error;
}

/**
 * Extrahiert den Wert aus einem Result oder gibt einen Fallback zurück
 */
export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  if (isOk(result)) {
    return result.data;
  }
  return fallback;
}

/**
 * Mappt einen erfolgreichen Wert
 */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  if (isOk(result)) {
    return ok(fn(result.data));
  }
  return result;
}

/**
 * Mappt einen Fehler
 */
export function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
  if (isErr(result)) {
    return err(fn(result.error));
  }
  return result;
}

/**
 * Führt eine Funktion aus, die ein Result zurückgibt
 */
export function flatMap<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (isOk(result)) {
    return fn(result.data);
  }
  return result;
}

/**
 * Führt eine async Funktion aus und fängt Fehler ab
 */
export async function tryCatchAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T, Error>> {
  try {
    const data = await fn();
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Führt eine sync Funktion aus und fängt Fehler ab
 */
export function tryCatch<T>(fn: () => T): Result<T, Error> {
  try {
    const data = fn();
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
