import { useEffect, useRef } from 'react';
import { debugRender } from '../utils/debug';

export function useDebugRender(componentName: string, props: unknown) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    debugRender(componentName, {
      renderCount: renderCount.current,
      props
    });
  });
}