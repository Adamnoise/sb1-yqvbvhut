/**
 * Safely converts an object to a primitive value
 */
export function toPrimitive(obj: unknown): string {
  try {
    // Handle null/undefined
    if (obj == null) return '';
    
    // Handle primitive values
    if (typeof obj !== 'object') return String(obj);
    
    // Handle Date objects
    if (obj instanceof Date) return obj.toISOString();
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return JSON.stringify(obj.map(item => toPrimitive(item)));
    }
    
    // Handle objects
    const simpleObj = Object.entries(obj).reduce((acc, [key, value]) => {
      // Skip functions and symbols
      if (typeof value === 'function' || typeof value === 'symbol') return acc;
      
      // Recursively convert nested objects
      acc[key] = toPrimitive(value);
      return acc;
    }, {} as Record<string, string>);
    
    return JSON.stringify(simpleObj);
  } catch (error) {
    console.error('Error converting object to primitive:', error);
    return '[Object]';
  }
}

/**
 * Checks if an object has circular references
 */
export function hasCircularReferences(obj: unknown, seen = new WeakSet()): boolean {
  // Handle non-objects
  if (obj === null || typeof obj !== 'object') return false;
  
  // Check for circular reference
  if (seen.has(obj)) return true;
  
  // Add current object to seen set
  seen.add(obj);
  
  // Check all nested properties
  return Object.values(obj).some(value => hasCircularReferences(value, seen));
}

/**
 * Creates a safe copy of an object without circular references
 */
export function removeCircularReferences<T>(obj: T, seen = new WeakSet()): T {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (seen.has(obj)) return '[Circular]' as unknown as T;
  
  seen.add(obj);
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeCircularReferences(item, seen)) as unknown as T;
  }
  
  const result = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      (result as any)[key] = removeCircularReferences(value, seen);
    } else {
      (result as any)[key] = value;
    }
  }
  
  return result;
}