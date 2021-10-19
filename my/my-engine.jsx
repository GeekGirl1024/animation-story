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
    this.CreateDot1();
    this.CreateDot2();
    this.CreateDot3();
    this.CreateRectangle1();
  }
  
  /**
   * Creates Dot 1
   */
  CreateDot1() {
    let dot = new Dot(0, 0, 4, "#FFFF00", "#000000");
    
    let dotMovement = new MovementObject(0, 5000, null, null, 
      AnimationMovements.Nothing.bind(dot)
    );

    dot.AddUpdateFunction(dotMovement);

    
    dot.AddUpdateFunction(new MovementObject(5001, null, null, null,
      AnimationMovements.HorizontalSine.bind(dot))
    );
    
    dot.SortUpdates();
    
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Dot 2
   */
  CreateDot2() {
    let dot = new Dot(100, 20, 4, "#0000FF", "#000000");


    let dotMovement = new MovementObject(null, 5000, null, null, 
        AnimationMovements.Left.bind(dot)
      );

    dot.AddUpdateFunction(dotMovement);

    dotMovement = new MovementObject(5001, 8000, null, null, 
        AnimationMovements.Nothing.bind(dot)
      );

    dot.AddUpdateFunction(dotMovement);
    
    dotMovement = new MovementObject(8001, null, null, null, 
        AnimationMovements.HappyBounce2.bind(dot)
      );

    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    
    let acceleration = -bounceHeight/(mid**2);
    dotMovement.movementMeta.bouncePeriod = bouncePeriod;
    dotMovement.movementMeta.acceleration = acceleration;

    dot.AddUpdateFunction(dotMovement);
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }

    /**
   * Creates Dot 3
   */
  CreateDot3() {
    let dot = new Dot(30, 30, 4, "#00FF00", "#000000");
    /*
    dot.AddUpdateFunction(null, 1, null, null, function (t) {
      this.position.x += -150 + 150* t/5000.0;
    }.bind(dot));
    */
    let dotMovement = new MovementObject(0, null, null, null, 
      
        AnimationMovements.HappyBounce2.bind(dot)
        );

    let bouncePeriod = 600.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 60.0;
    
    let acceleration = -bounceHeight/(mid**2);
    dotMovement.movementMeta.bouncePeriod = bouncePeriod;
    dotMovement.movementMeta.acceleration = acceleration;

    dot.AddUpdateFunction(dotMovement);
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Rectangle1
   */
  CreateRectangle1() {
    let rectangle = new Rectangle(0, 0, 10, 20, "#FF0000", "#000000");
    
    rectangle.AddUpdateFunction(new MovementObject(null, null, null, null, AnimationMovements.UpAndDown.bind(rectangle)));
    
    rectangle.SortUpdates();
    
    
    this.animationObjects.push(rectangle);
  }
}

export default MyEngine; 