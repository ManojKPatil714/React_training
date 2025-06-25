import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = () => this.setState({ hasError: false, errorInfo: null });

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return Fallback
        ? <Fallback resetError={this.resetError} />
        : (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <h2>Something went wrong.</h2>
            <button onClick={this.resetError}>Try again</button>
          </div>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;