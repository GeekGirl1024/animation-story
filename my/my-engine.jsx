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
    
    dot.AddUpdateFunction(new MovementObject(0, 5000, null, null, function(absoluteT, deltaT) { AnimationMovements.Nothing(dot, absoluteT, deltaT)}));
    
    dot.AddUpdateFunction(new MovementObject(5001, null, null, null, function (absoluteT, deltaT) {
      if (!this.totalDelta) {
        this.totalDelta = 0;
      }

      this.position.x += 1 * Math.sin((this.totalDelta + deltaT)/200.0);
      this.totalDelta += deltaT;
    }.bind(dot)));
    
    dot.SortUpdates();
    
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Dot 2
   */
  CreateDot2() {
    let dot = new Dot(0, 30, 4, "#0000FF", "#000000");
    /*
    dot.AddUpdateFunction(null, 1, null, null, function (t) {
      this.position.x += -150 + 150* t/5000.0;
    }.bind(dot));
    */
    let dotMovement = new MovementObject(0, null, null, null, 
      function(absoluteT, deltaT, movementMeta) {
        AnimationMovements.HappyBounce2(dot, absoluteT, deltaT, movementMeta);
      });

    let root1 = 0.0;
    let root2 = 300.0;
    let mid = (root2 - root1)/2.0;
    let top = 30.0;
    
    let a = top/(mid**2);
    dotMovement.movementMeta.root2 = root2;
    dotMovement.movementMeta.a = a;

    dot.AddUpdateFunction(dotMovement);
    
    /*
    dot.AddUpdateFunction(10001, null, null, null, function (t) {
      if (!this.totalDelta) {
        this.totalDelta = 0;
      }
      
      this.radius = 4 + 20 + 20 * Math.sin((this.totalDelta + t)/500.0);
      this.totalDelta += t;
    }.bind(dot));
    */
    
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
      function(absoluteT, deltaT, movementMeta) {
        AnimationMovements.HappyBounce2(dot, absoluteT, deltaT, movementMeta);
      });

    let root1 = 0.0;
    let root2 = 600.0;
    let mid = (root2 - root1)/2.0;
    let top = 60.0;
    
    let a = top/(mid**2);
    dotMovement.movementMeta.root2 = root2;
    dotMovement.movementMeta.a = a;

    dot.AddUpdateFunction(dotMovement);
    
    /*
    dot.AddUpdateFunction(10001, null, null, null, function (t) {
      if (!this.totalDelta) {
        this.totalDelta = 0;
      }
      
      this.radius = 4 + 20 + 20 * Math.sin((this.totalDelta + t)/500.0);
      this.totalDelta += t;
    }.bind(dot));
    */
    
    dot.SortUpdates();
    
    this.animationObjects.push(dot);
  }
  
  /**
   * Creates Rectangle1
   */
  CreateRectangle1() {
    let rectangle = new Rectangle(0, 0, 10, 20, "#FF0000", "#000000");
    
    rectangle.AddUpdateFunction(new MovementObject(null, null, null, null, function (absoluteT, deltaT, movementMeta) {

      if (this.down) {
        this.position.y += Math.min(deltaT/5.0, 10.);
        
        if (this.position.y > 200) {
          this.down = false;
        }
      } else {
        this.position.y -= Math.min(deltaT/5.0, 10.);
        
        if (this.position.y < -200) {
          this.down = true;
        }
      }
    }.bind(rectangle)));
    
    rectangle.SortUpdates();
    
    
    this.animationObjects.push(rectangle);
  }
}

export default MyEngine; 