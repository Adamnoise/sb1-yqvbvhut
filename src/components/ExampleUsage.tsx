import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useSafeProps } from '../hooks/use-safe-props';
import { toPrimitive } from '../utils/object-helpers';

// Example of a problematic component
const ProblematicComponent: React.FC<{ data: unknown }> = ({ data }) => {
  // ❌ Bad: Direct string conversion of complex object
  // return <div>{String(data)}</div>;
  
  // ✅ Good: Safe conversion using helper
  return <div>{toPrimitive(data)}</div>;
};

// Example of a component with safe props handling
const SafeComponent: React.FC<{ config: object }> = (props) => {
  // Use the safe props hook to prevent circular reference issues
  const safeProps = useSafeProps(props);
  
  return (
    <div>
      <pre>{JSON.stringify(safeProps.config, null, 2)}</pre>
    </div>
  );
};

// Example of proper lazy loading with error handling
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export const ExampleContainer: React.FC = () => {
  const complexData = {
    id: 1,
    nested: {
      data: {
        value: 'test'
      }
    }
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-4">
          <ProblematicComponent data={complexData} />
          <SafeComponent config={complexData} />
          <LazyComponent />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};