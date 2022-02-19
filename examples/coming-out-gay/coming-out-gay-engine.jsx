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
        boy: { x: 10, y: 10 },
        girl: { x: 20, y: 20}
      },
      {
        boy: { x: 40, y: 0 },
        girl: { x: 50, y: 10}
      },
      {
        boy: { x: 0, y: 40 },
        girl: { x: 10, y: 50}
      },
      {
        boy: { x: 75, y: 30 },
        girl: { x: 85, y: 40}
      },
      {
        boy: { x: -40, y: 0 },
        girl: { x: -30 , y: 10}
      },
      {
        boy: { x: -80, y: 30 },
        girl: { x: -70 , y: 40}
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
    
    let dotCircleDeltaRadians = (2*Math.PI) / 3000.;

    for(let i = 0; i < startingConditions.pairs.length; i++){
      let pair = startingConditions.pairs[i];
      let boy = new Dot(pair.boy.x, pair.boy.y, 4, startingConditions.boyColor, "#000000");
      let girl = new Dot(pair.girl.x, pair.girl.y, 4, startingConditions.girlColor, "#000000");
      let dotPair = { boy:boy, girl:girl}
      this.boyGirlPairs.push(dotPair);
      this.animationObjects.push(boy);
      this.animationObjects.push(girl);

      boy.AddUpdateFunction(new MovementObject(0, 10000, null, null, 
        AnimationMovements.Spiral.bind(boy),
          {
            deltaRadians: dotCircleDeltaRadians,
            deltaRadius: 0,
            centerX: boy.position.x + 5,
            centerY:boy.position.y + 5
          }
        )
      );

      girl.AddUpdateFunction(new MovementObject(0, 10000, null, null, 
          AnimationMovements.Spiral.bind(girl),
          {
            deltaRadians: dotCircleDeltaRadians,
            deltaRadius: 0,
            centerX: boy.position.x + 5,
            centerY:boy.position.y + 5
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