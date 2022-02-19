import Engine from '/libraries/animation-objects/engine.jsx';
import AnimationMovements from '/libraries/animation-movements/animation-movemets.jsx';
import MovementObject from '/libraries/animation-objects/movement-objects/movement-object.jsx';
import Dot from '/libraries/animation-objects/dot.jsx';
import Rectangle from '/libraries/animation-objects/rectangle.jsx';
import { vector, point } from '@js-basics/vector';

/** Class representing the ComingOutGayEngine. */
class ComingOutGayEngine extends Engine {
  
  /**
   * Initializes the objects in the engine
   */
  Init() {
    // Create main Dot 1
    this.mainDot1 = new Dot(100, 0, 4, "#FF00FF", "#000000");
    this.animationObjects.push(this.mainDot1);

    // Create main Dot 2
    this.mainDot2 = new Dot(-100, 0, 4, "#FFFF00", "#000000");
    this.animationObjects.push(this.mainDot2);

    // Time + 3000
    // Dot 1 happy bounce move to middle
    // Dot 2 move to middle
    // 2 dots meeting with dot 1 being happy



    this.timeStamp = 0;

    this.Main2DotsMeet();

    for (let i = 0; i < this.animationObjects.length; i++) {
      this.animationObjects[i].SortUpdates();
    }
  }

  Main2DotsMeet() {
    let timeStamp = this.timeStamp;
        // timeStamp + 2400
    // dot 1 bounce 7 times moving left
    // dot 2 move left 3000

        // Bounce every 300 ticks up to 30 high while moving -0.03/tick x
    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 2100, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration, xSpeed: -0.03 }
      )
    );

    // dot 1 2/3 height jump 1 time

    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + 2100, timeStamp + 2100 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration * 2.0/3.0, xSpeed: -0.03 }
      )
    );

    // dot 1 1/3 height jump 1 time
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + 2400, timeStamp + 2400 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration / 3.0, xSpeed: -0.03 }
      )
    );

    // dot 1 move left
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + 2700, timeStamp + 2700 + 300, null, null, 
        AnimationMovements.BasicMove.bind(this.mainDot1),
        { xSpeed: -0.03 }
      )
    );

    // dot 2 move right 3000 ms
    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.BasicMove.bind(this.mainDot2),
        { xSpeed: 0.03 }
      )
    );

    timeStamp += 3000;

    this.timeStamp = timeStamp;
  }

  static DotBouncesAndSlowsDown(dot, startTime, totalBounceTime, slowDownTime, bouncePeriod, acceleration) {

      
      dot.AddUpdateFunction(new MovementObject(startTime, startTime + totalBounceTime - slowDownTime , null, null, 
          AnimationMovements.HappyBounce2.bind(dot),
          { bouncePeriod: bouncePeriod, acceleration: acceleration }
        )
      );


      dot.AddUpdateFunction(new MovementObject(startTime + totalBounceTime - slowDownTime, startTime + totalBounceTime - slowDownTime/2., null, null, 
          AnimationMovements.HappyBounce2.bind(dot),
          { bouncePeriod: bouncePeriod, acceleration: acceleration * 2.0/3.0 }
        )
      );

      // dot 1 1/3 height jump 1 time
      dot.AddUpdateFunction(new MovementObject(startTime + totalBounceTime - slowDownTime/2.0, startTime + totalBounceTime, null, null, 
          AnimationMovements.HappyBounce2.bind(dot),
          { bouncePeriod: bouncePeriod, acceleration: acceleration / 3.0 }
        )
      );
    }



}

export default ComingOutGayEngine;