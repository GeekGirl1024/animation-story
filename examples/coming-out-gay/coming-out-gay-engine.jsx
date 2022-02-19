import Engine from '/libraries/animation-objects/engine.jsx';
import AnimationMovements from '/libraries/animation-movements/animation-movemets.jsx';
import MovementObject from '/libraries/animation-objects/movement-objects/movement-object.jsx';
import Dot from '/libraries/animation-objects/dot.jsx';
import { vector, point } from '@js-basics/vector';



const startingConditions = {
    boyColor: "#BBBBFF",
    girlColor: "#FFBBBB",
    pairs:[
      {
        center: { x: 0, y: 0},
        angle: 2 * Math.PI / 4,
        boy: {},
        girl: {}
      },
      {
        center: { x: 40, y: 0},
        angle: 2 * Math.PI / 3,
        boy: {},
        girl: {}
      },
      {
        center: { x: 75, y: 30},
        angle: 2 * Math.PI / 2,
        boy: {},
        girl: {}
      },
      {
        center: { x: -40, y: -10},
        angle: 2 * Math.PI * 5./6,
        boy: {},
        girl: {}
      },
      {
        center: { x: -80, y: 30},
        angle: 2 * Math.PI * 3./5,
        boy: {},
        girl: {}
      },
      {
        center: { x: -80, y: -130},
        angle: 2 * Math.PI * 3./5,
        boy: {},
        girl: {}
      },
      {
        center: { x: 60, y: -100},
        angle: 2 * Math.PI * 4./5,
        boy: {},
        girl: {}
      },
      {
        center: { x: -10, y: 130},
        angle: 2 * Math.PI * 1./5,
        boy: {},
        girl: {}
      },
      {
        center: { x: -20, y: 110},
        angle: 2 * Math.PI * 1./3,
        boy: {},
        girl: {}
      },
      {
        center: { x: 120, y: -110},
        angle: 2 * Math.PI * 13./16,
        boy: {},
        girl: {}
      }
    ]
  };

/** Class representing the ComingOutGayEngine. */
class ComingOutGayEngine extends Engine {
  
  /**
   * Initializes the objects in the engine
   */
  Init() {
    // Create boy-girl dot pairs
    
    this.boyGirlPairs = [];
    
    let dotCircleDeltaRadians = (2*Math.PI) / 1500.;

    for(let i = 0; i < startingConditions.pairs.length; i++){
      let pair = startingConditions.pairs[i];
      
      let boy = new Dot(
        pair.center.x + 10 * Math.cos(pair.angle),
        pair.center.y + 10 * Math.sin(pair.angle),
        4,
        startingConditions.boyColor,
        "#000000");

      boy.label = "Boy " + i;

      let girl = new Dot(
        pair.center.x + 10 * Math.cos(pair.angle + Math.PI),
        pair.center.y + 10 * Math.sin(pair.angle + Math.PI),
        4,
        startingConditions.girlColor,
        "#000000");
      
      girl.label = "Girl " + i;

      let dotPair = { boy:boy, girl:girl}
      this.boyGirlPairs.push(dotPair);
      this.animationObjects.push(boy);
      this.animationObjects.push(girl);

      boy.AddUpdateFunction(new MovementObject(0, 100000, null, null, 
        AnimationMovements.Spiral.bind(boy),
          {
            deltaRadians: dotCircleDeltaRadians,
            deltaRadius: 0,
            centerX: pair.center.x,
            centerY: pair.center.y
          }
        )
      );

      girl.AddUpdateFunction(new MovementObject(0, 100000, null, null, 
          AnimationMovements.Spiral.bind(girl),
          {
            deltaRadians: dotCircleDeltaRadians,
            deltaRadius: 0,
            centerX: pair.center.x,
            centerY: pair.center.y
          }
        )
      );
    }



    this.timeStamp = 0;


    for (let i = 0; i < this.animationObjects.length; i++) {
      this.animationObjects[i].SortUpdates();
    }
  }
}

export default ComingOutGayEngine;