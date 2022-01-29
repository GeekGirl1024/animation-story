import Engine from '../libraries/animation-objects/engine.jsx';
import AnimationMovements from '../libraries/animation-movements/animation-movemets.jsx';
import MovementObject from '../libraries/animation-objects/movement-objects/movement-object.jsx';
import Dot from '../libraries/animation-objects/dot.jsx';
import Rectangle from '../libraries/animation-objects/rectangle.jsx';
import { vector, point } from '@js-basics/vector';

/** Class representing the MyEngine. */
class MyEngine extends Engine {
  
  /**
   * Initializes the objects in the engine
   */
  Init() {
    // Create main Dot 1
    let mainDot1 = new Dot(100, 0, 4, "#FF00FF", "#000000");
    this.animationObjects.push(mainDot1);

    // Create main Dot 2
    let mainDot2 = new Dot(-100, 0, 4, "#FFFF00", "#000000");
    this.animationObjects.push(mainDot2);

    // Time + 3000
    // Dot 1 happy bounce move to middle
    // Dot 2 move to middle

    // Bounce every 300 ticks up to 30 high while moving -0.03/tick x
    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    let timeStamp = 0;

    // timeStamp + 2400
    // dot 1 bounce 7 times moving left
    // dot 2 nothing 3000
    let dotMovement = new MovementObject(null, timeStamp + 2100, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration, xSpeed: -0.03 }
      );

    mainDot1.AddUpdateFunction(dotMovement);

        dotMovement = new MovementObject(timeStamp + 2100, timeStamp + 2100 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration * 2.0/3.0, xSpeed: -0.03 }
      );

    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp + 2400, timeStamp + 2400 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration / 3.0, xSpeed: -0.03 }
      );

    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp + 2700, timeStamp + 2700 + 300, null, null, 
      AnimationMovements.BasicMove.bind(mainDot1),
      { xSpeed: -0.03 }
    );

    mainDot1.AddUpdateFunction(dotMovement);

    
    dotMovement = new MovementObject(timeStamp, timeStamp + 3000, null, null, 
      AnimationMovements.BasicMove.bind(mainDot2),
      { xSpeed: 0.03 }
    );
    mainDot2.AddUpdateFunction(dotMovement);
/*
    dotMovement = new MovementObject(null, timeStamp + 3000, null, null, 
      AnimationMovements.Nothing.bind(mainDot2),
      {}
    );
    mainDot2.AddUpdateFunction(dotMovement);
*/
    timeStamp += 3000;

    // timeStamp + 3000
    // dot 1 nothing 3000
    // dot 2 move right 3000
/*
    dotMovement = new MovementObject(timeStamp, timeStamp + 3000, null, null, 
      AnimationMovements.Nothing.bind(mainDot1),
      {}
    );
    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp, timeStamp + 3000, null, null, 
      AnimationMovements.BasicMove.bind(mainDot2),
      { xSpeed: 0.03 }
    );
    mainDot2.AddUpdateFunction(dotMovement);
    timeStamp += 3000;
*/
    
    // Time + 1000
    // Dot 1 pause 1 sec
    // Dot 2 pause 1 sec + 1.2 sec
    
    dotMovement = new MovementObject(timeStamp, timeStamp + 1000, null, null, 
      AnimationMovements.Nothing.bind(mainDot1)
    );
    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp, timeStamp + 2200, null, null, 
      AnimationMovements.Nothing.bind(mainDot2)
    );
    mainDot2.AddUpdateFunction(dotMovement);
    timeStamp += 1000;

    // time + 1200
    // Dot 1 happy bounce 3 times and pause 300ms
    // (Dot 2 continue to pause)
    
    dotMovement = new MovementObject(timeStamp, timeStamp + 900, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      );

    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp + 900, timeStamp + 1200, null, null, 
      AnimationMovements.Nothing.bind(mainDot1),
      {}
    );

    mainDot1.AddUpdateFunction(dotMovement);

    timeStamp += 1200;

    // time + 1900
    // Dot 2 happy bounce 3 times 900ms pause 1 sec
    // Dot 1 pause
    

    dotMovement = new MovementObject(timeStamp, timeStamp + 900, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      );

    mainDot2.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp + 900, timeStamp + 900 + 1000, null, null, 
      AnimationMovements.Nothing.bind(mainDot2)
    );
    mainDot2.AddUpdateFunction(dotMovement);
    

    dotMovement = new MovementObject(timeStamp, timeStamp + 1900, null, null, 
        AnimationMovements.Nothing.bind(mainDot1)
      );
    mainDot1.AddUpdateFunction(dotMovement);

    timeStamp += 1900;
    

    // time - to end
    
    dotMovement = new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      );

    mainDot1.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      );

    mainDot2.AddUpdateFunction(dotMovement);

    

    mainDot1.SortUpdates();

    mainDot2.SortUpdates();
    
    

    /*
    this.CreateDot1();
    this.CreateDot2();
    this.CreateDot3();
    this.CreateRectangle1();

    this.CreateBounceLine();
    */
    
  }


  /**
   * Creates Bounceing dots
   */
  CreateBounceLine() {
      let bouncePeriod = 1000.0;
      let mid = (bouncePeriod)/2.0;
      let bounceHeight = 200.0;
      
      let acceleration = -bounceHeight/(mid**2);
      
    
    for (let i = 0; i < 40; i++) {
      let dot = new Dot(-100 + i * 5, -230, 4, "#FFAAAA", "#000000");

      // Do nothing the first i sec
      let dotMovement = new MovementObject(0, i*100, null, null, 
        AnimationMovements.Nothing.bind(dot)
      );
      dot.AddUpdateFunction(dotMovement);

      dotMovement = new MovementObject(i*100 + 1, null, null, null, 
        AnimationMovements.HappyBounce2.bind(dot),
        { bouncePeriod : bouncePeriod, acceleration: acceleration }
      );

      dot.AddUpdateFunction(dotMovement);
      
      dot.SortUpdates();
      
      this.animationObjects.push(dot);
    }
    
  }
  
  /**
   * Creates Dot 1
   */
  CreateDot1() {
    let dot = new Dot(0, 0, 4, "#FFFF00", "#000000");
    
    // Do nothing the first 5 sec
    let dotMovement = new MovementObject(0, 5000, null, null, 
      AnimationMovements.Nothing.bind(dot)
    );
    dot.AddUpdateFunction(dotMovement);

    // Horizontal osilation in sine pattern
    dotMovement = new MovementObject(5001, null, null, null,
      AnimationMovements.HorizontalSine.bind(dot)
    );
    dot.AddUpdateFunction(dotMovement);
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Dot 2
   */
  CreateDot2() {
    let dot = new Dot(100, 20, 4, "#0000FF", "#000000");

    // move -0.03/tick horizontally for 5 sec
    let dotMovement = new MovementObject(null, 5000, null, null, 
        AnimationMovements.HorizontalMove.bind(dot),
        { speed: -0.03 }
      );
    dot.AddUpdateFunction(dotMovement);

    // pause for 3 seconds
    dotMovement = new MovementObject(5001, 8000, null, null, 
      AnimationMovements.Nothing.bind(dot)
    );

    dot.AddUpdateFunction(dotMovement);
    
    // Bounce every 300 ticks up to 30 high
    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    dotMovement = new MovementObject(8001, null, null, null, 
        AnimationMovements.HappyBounce2.bind(dot),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      );

    dot.AddUpdateFunction(dotMovement);
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }

    /**
   * Creates Dot 3
   */
  CreateDot3() {
    let dot = new Dot(30, 100, 4, "#00FF00", "#000000");

    // bounce every 600 ticks to a hight of 60.
    let bouncePeriod = 600.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 60.0;
    
    let acceleration = -bounceHeight/(mid**2);

    let dotMovement = new MovementObject(0, null, null, null, 
      AnimationMovements.HappyBounce2.bind(dot),
      { bouncePeriod: bouncePeriod, acceleration: acceleration}
    );

    dot.AddUpdateFunction(dotMovement);
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Rectangle1
   */
  CreateRectangle1() {
    let rectangle = new Rectangle(0, 0, 10, 20, "#FF0000", "#000000");

    // move up and down
    let movementObject = new MovementObject(null, null, null, null,
      AnimationMovements.UpAndDown.bind(rectangle)
    );
    
    rectangle.AddUpdateFunction(movementObject);
    
    rectangle.SortUpdates();
    
    
    this.animationObjects.push(rectangle);
  }
}

export default MyEngine; 