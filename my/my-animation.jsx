import Animation from '../components/animation/animation.jsx';
import Engine from '../libraries/animation-objects/engine.jsx';
import MyEngine from './my-engine.jsx';

/** React Component MyAnimation */
class MyAnimation extends Animation {
  /**
   * Creates a MyAnimation
   * @param {any} props - initial props
   */
  constructor(props) {
    super(props);
    this.engine = new MyEngine(this.width, this.height);
    this.engine.Init();
    this.state.engine = this.engine;
  }
  
}

export default MyAnimation;