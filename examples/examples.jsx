import React from 'react';
import ReactDOM from 'react-dom';
import TwoHappyDotsAnimation from './two-happy-dots/two-happy-dots-animation.jsx';
import ComingOutGayAnimation from './coming-out-gay/coming-out-gay-animation.jsx';

const AnimationExamples = {
    DEFAULT: "Default",
    TWOHAPPYDOTS: "Two Happy Dots",
    COMINGOUTGAY: "Coming Out Gay"
}

class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentAnimation: AnimationExamples.DEFAULT };
  }

  RenderExample() {
    switch(this.state.currentAnimation) {
      case AnimationExamples.TWOHAPPYDOTS:
        return <>
          <div>Two Happy Dots</div>
          <TwoHappyDotsAnimation />
        </>
      case AnimationExamples.COMINGOUTGAY:
        return <>
          <div>Coming Out Gay</div>
          <ComingOutGayAnimation />
        </>
      case AnimationExamples.DEFAULT:
        return <div>Please Choose an Example</div>
    }
    return null;
  }

  render() {
    return (
      <>
        <div>
          <button type="button" onClick={() => {this.setState({ currentAnimation: AnimationExamples.DEFAULT })}}>
            Clear
          </button>
          <button type="button" onClick={() => {this.setState({ currentAnimation: AnimationExamples.TWOHAPPYDOTS })}}>
            Two Happy Dots
          </button>
          <button type="button" onClick={() => {this.setState({ currentAnimation: AnimationExamples.COMINGOUTGAY })}}>
            Coming Out Gay
          </button>
        </div>
        {
          this.RenderExample()
        }
      </>
    )
  }
}

export default Examples;