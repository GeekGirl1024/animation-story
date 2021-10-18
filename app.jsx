import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import MyAnimation from './my/my-animation.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary FallbackComponent={OurFallbackComponent}>
          <MyAnimation/>
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

