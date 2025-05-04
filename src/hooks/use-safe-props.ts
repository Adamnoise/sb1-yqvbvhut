import { useMemo } from 'react';
import { removeCircularReferences } from '../utils/object-helpers';

/**
 * Hook to safely process props that might cause type conversion errors
 */
export function useSafeProps<T extends object>(props: T): T {
  return useMemo(() => removeCircularReferences(props), [props]);
}