import Animation from '/components/animation/animation.jsx';
import Engine from '/libraries/animation-objects/engine.jsx';
import ComingOutGayEngine from './coming-out-gay-engine.jsx';

/** React Component ComingOutGayAnimation */
class ComingOutGayAnimation extends Animation {
  /**
   * Creates a ComingOutGayAnimation
   * @param {any} props - initial props
   */
  constructor(props) {
    super(props);
    let engine = new ComingOutGayEngine(this.width, this.height);
    engine.Init();
    this.state.engine = engine;
  }
}

export default ComingOutGayAnimation;