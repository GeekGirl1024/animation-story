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

    let mainDot = new Dot(100, 0, 4, "#FF00FF", "#000000");

    // move -0.03/tick horizontally for 5 sec
    let dotMovement = new MovementObject(null, 3000, null, null, 
        AnimationMovements.HorizontalMove.bind(mainDot),
        { speed: -0.03 }
      );
    mainDot.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(3001, 5000, null, null, 
      AnimationMovements.Nothing.bind(mainDot)
    );
    mainDot.AddUpdateFunction(dotMovement);

    // Bounce every 300 ticks up to 30 high
    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    dotMovement = new MovementObject(5001, 8000, null, null, 
        AnimationMovements.HappyBounce2.bind(mainDot),
        { bouncePeriod: bouncePeriod, acceleration: acceleration, xSpeed: -0.03 }
      );

    mainDot.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(8001, null, null, null, 
        AnimationMovements.Nothing.bind(mainDot)
      );

    mainDot.AddUpdateFunction(dotMovement);

    mainDot.SortUpdates();
    this.animationObjects.push(mainDot);
    

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