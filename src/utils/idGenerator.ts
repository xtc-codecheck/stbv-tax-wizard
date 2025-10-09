/**
 * Generates a unique ID with optional prefix
 * @param prefix - Optional prefix for the ID (e.g., 'pos', 'doc')
 * @returns A unique string ID
 */
export const generateUniqueId = (prefix?: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
};
