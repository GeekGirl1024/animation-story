import React from 'react';
import ReactDOM from 'react-dom'; 

/** React Component ErrorBoundary */
class ErrorBoundary extends React.Component {
  /**
   * creates the ErrorBoundary
   * @param {any} props- initial properties
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * gets the error state
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * proccesses error
   */
  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  /**
   * renders the component
   */
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;