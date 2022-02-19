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
    let engine = new TwoHappyDotsEngine(this.width, this.height);
    engine.Init();
    this.state.engine = engine;
  }
}

export default TwoHappyDotsAnimation;