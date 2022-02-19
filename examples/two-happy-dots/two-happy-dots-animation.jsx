import Animation from '/components/animation/animation.jsx';
import Engine from '/libraries/animation-objects/engine.jsx';
import TwoHappyDotsEngine from './two-happy-dots-engine.jsx';

/** React Component TwoHappyDotsAnimation */
class TwoHappyDotsAnimation extends Animation {
  /**
   * Creates a TwoHappyDotsAnimation
   * @param {any} props - initial props
   */
  constructor(props) {
    super(props);
    this.engine = new TwoHappyDotsEngine(this.width, this.height);
    this.engine.Init();
    this.state.engine = this.engine;
  }
}

export default TwoHappyDotsAnimation;