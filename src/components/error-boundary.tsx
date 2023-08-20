import React from 'react';
import { ReactNodeProps } from '../type/type';

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ReactNodeProps, ErrorBoundaryState> {
  constructor(props: ReactNodeProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update the state to render the fallback UI
    return { hasError: true, errorInfo: error.message, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI as you like
      return <div style={{justifyContent:'center',color:"red",display:'flex',margin:'50px'}}>Something went wrong: {this.state.errorInfo}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
