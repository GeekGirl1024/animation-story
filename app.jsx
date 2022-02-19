import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Examples from './examples/examples.jsx'
import ErrorBoundary from './components/error-boundary/error-boundary.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary FallbackComponent={OurFallbackComponent}>
          <Examples />
        </ErrorBoundary>
      </div>  
    )
  }
}

const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

