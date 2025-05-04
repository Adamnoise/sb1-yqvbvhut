import React, { Component, ErrorInfo, ReactNode } from 'react';
import { debugComponentError } from '../utils/debug';

interface Props {
  name: string;
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class DebugErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    debugComponentError(this.props.name, error, {
      componentStack: info.componentStack,
      props: this.props
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error in {this.props.name}
          </h2>
          <p className="text-sm text-red-600 mb-2">{this.state.error?.message}</p>
          <button
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}