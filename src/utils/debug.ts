import debug from 'debug';

// Create namespaced debuggers
export const debugComponent = debug('app:component');
export const debugProps = debug('app:props');
export const debugError = debug('app:error');

// Enable debugging in development
if (process.env.NODE_ENV === 'development') {
  debug.enable('app:*');
}

// Helper to safely stringify objects
export function safeStringify(obj: unknown): string {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (value === window) return '[Window]';
      if (value instanceof Element) return '[Element]';
      if (typeof value === 'function') return '[Function]';
      if (typeof value === 'symbol') return value.toString();
      return value;
    }, 2);
  } catch (error) {
    return '[Unable to stringify]';
  }
}

// Debug component render with props
export function debugRender(componentName: string, props: unknown): void {
  debugComponent('Rendering %s with props: %O', componentName, safeStringify(props));
}

// Debug errors with context
export function debugComponentError(componentName: string, error: unknown, context?: unknown): void {
  debugError(
    'Error in %s:\nError: %O\nContext: %O',
    componentName,
    error,
    context ? safeStringify(context) : 'No context'
  );
}