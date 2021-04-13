import React, { useEffect } from 'react';
import { useNotifications } from '../Notifications';

type ErrorProps = {};
type ErrorState = { hasError: boolean };

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    useEffect(() => {
      useNotifications().showNotification({ message: error.message, severity: 'error' });
    }, []);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>We are working on the issue.</h1>;
    }
    return children;
  }
}

export default ErrorBoundary;
