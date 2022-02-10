import React from 'react';
import ReactDOM from 'react-dom';
import Dot from '../../libraries/animation-objects/dot.jsx';
import Timer from '../../libraries/timer.jsx';
import RangeArray from '../../libraries/range-array.jsx';
import RangeObject from '../../libraries/range-object.jsx';
import Engine from '../../libraries/animation-objects/engine.jsx';

/** React Component Animation */
class Animation extends React.Component {
  /**
   * Creates an Animation
   * @param {any} props - initial props
   */
  constructor(props) {
    super(props);
    
    // these are just temp values
    this.width = 300;
    this.height = 300;
    this.backgroundColor = "#555555";
    this.timer = new Timer();
    
    this.state = { timeStamp: this.timer.currentTimeStamp };
   
    
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  /**
   * component did mount
   * gets the animation frame
   */
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  /**
   * updates the animation state
   */
  updateAnimationState() {
    
    // consider moving the timer into the engine
    this.timer.SetTimeStamp();
    this.setState({ timeStamp: this.timer.currentTimeStamp});
    this.state.timeStamp = this.timer.currentTimeStamp;
    this.state.engine.Update(this.timer.currentTimeStamp);
    
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  /**
   * cancels the animation frame
   */
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  /**
   * renders the component
   */
  render() {
    return <Canvas
      timeStamp={this.state.timeStamp}
      width={this.width}
      height={this.height}
      backgroundColor={this.backgroundColor}
      engine={this.state.engine} />
  }
}

/** React Component Canvas */
class Canvas extends React.Component {
  /**
   * Creates a Canvas
   * @param {any} props - initial props
   */
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
    
    this.width = props.width;
    this.height = props.height;
    this.backgroundColor = props.backgroundColor;    
    this.timeStamp = props.timeStamp;

    this.state = { timeStamp: props.timeStamp, engine: props.engine };
  }
  
  /**
   * gets a reference to the canvas and save it
   */
  saveContext(ctx) {
    this.ctx = ctx;
  }
  
  /**
   * gets new state from props
   */
  static getDerivedStateFromProps(props, state) {
    return { timeStamp: props.timeStamp };
  }
  
  /**
   * componentDidUpdate
   */
  componentDidUpdate() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();

    this.state.engine.Draw(this.ctx);
  }
  
  /**
   * renders the component
   */
  render() {
    return <PureCanvas width={this.width} height={this.height} timeStamp={this.timeStamp} contextRef={this.saveContext}></PureCanvas>;
  }
}

/** React Component PureCanvas */
class PureCanvas extends React.Component {
  /**
   * return false for should component update to prevent redrawing
   */
  shouldComponentUpdate() { return false; }
  
  /**
   * renders the component
   */
  render() {
    return (
      <canvas width={this.props.width} height={this.props.height}
      ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
    )
  }
}

export default Animation;