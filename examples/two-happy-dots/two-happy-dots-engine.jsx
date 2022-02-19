import Engine from '/libraries/animation-objects/engine.jsx';
import AnimationMovements from '/libraries/animation-movements/animation-movemets.jsx';
import MovementObject from '/libraries/animation-objects/movement-objects/movement-object.jsx';
import Dot from '/libraries/animation-objects/dot.jsx';
import Rectangle from '/libraries/animation-objects/rectangle.jsx';
import { vector, point } from '@js-basics/vector';

/** Class representing the TwoHappyDotsEngine. */
class TwoHappyDotsEngine extends Engine {
  
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
    
    this.Main2DotsBecomeFriends();

    this.Main2DotsDanceTogether();
    
    this.DotCircleSpinsAroundMain2Dots();

    this.AllDotsSpinTogether();

    this.DotCircleSpread();

    this.MainDotsLeave();

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

  Main2DotsBecomeFriends() {

    


    let timeStamp = this.timeStamp;
    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    // Time + 1000
    // Dot 1 pause 1 sec
    // Dot 2 pause 1 sec + 1.2 sec
    // 2 Dots pause after meeting. Dot 1 breaks pause first to bounce and be happy
    
    timeStamp += 500;

    // time + 1200
    // Dot 1 happy bounce 3 times and pause 300ms
    // Dot 2 continue to pause
    // Dot 1 finishes happy bounce.
    // Both Dots pause 300ms

    TwoHappyDotsEngine.DotBouncesAndSlowsDown(this.mainDot1, timeStamp, 1500, 600, bouncePeriod, acceleration);

    timeStamp += 1500;
    // wait 500 ms
    timeStamp += 500;

    // time + 1900
    // Dot 2 happy bounce 3 times 900ms pause 1 sec
    // Dot 1 pause
    // Dot 2 tries happy bounce and afterwards pauses while looking at dot 1
    
    TwoHappyDotsEngine.DotBouncesAndSlowsDown(this.mainDot2, timeStamp, 1500, 600, bouncePeriod, acceleration);
    
    timeStamp += 1500;

    // Pause 500 ms
    timeStamp += 500;
    

    // time - + 900
    // sync bounce 3 times
    // both happy bouncing together

    // mainDot1
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 900, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      )
    );

    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + 900, timeStamp + 900 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration * 2.0/3.0 }
      )
    );

    // dot 1 1/3 height jump 1 time
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + 1200, timeStamp + 1200 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration / 3.0 }
      )
    );

    // mainDot2
    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 900, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration }
      )
    );

    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp + 900, timeStamp + 900 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration * 2.0/3.0 }
      )
    );

    // dot 1 1/3 height jump 1 time
    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp + 1200, timeStamp + 1200 + 300, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration / 3.0 }
      )
    );
    
    timeStamp += 1500;

    // time - + 1000
    // both pause 1 sec


    timeStamp += 500;


    this.timeStamp = timeStamp;
    
  }

  Main2DotsDanceTogether() {
    let timeStamp = this.timeStamp;

        // time - + 3000
    // counter clockwise spiral out 3 rotations
    // both dots happily spiral together out 3 rotations
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.Spiral.bind(this.mainDot1),
        { deltaRadians: (2*Math.PI)/1000, deltaRadius: 50./3000 }
      )
    );

    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.Spiral.bind(this.mainDot2),
        { deltaRadians: (2*Math.PI)/1000, deltaRadius: 50./3000 }
      )
    );

    timeStamp += 3000;

    // time - + 3000
    // counter clockwise spiral in 3 rotations
    // both dots happily spiral together in 3 rotations
    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.Spiral.bind(this.mainDot1),
        { deltaRadians: (2*Math.PI)/1000, deltaRadius: -50./3000 }
      )
    );

    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 3000, null, null, 
        AnimationMovements.Spiral.bind(this.mainDot2),
        { deltaRadians: (2*Math.PI)/1000, deltaRadius: -50./3000 }
      )
    );

    timeStamp += 3000;

    this.timeStamp = timeStamp;
  }

  DotCircleSpinsAroundMain2Dots() {
    let timeStamp = this.timeStamp;

    let dotCircleCount = 20;
    let dotCircleAngleDiff = 2*Math.PI/dotCircleCount;
    let dotCircleRadius = 250.0;
    let dotCircleRotationTime = 5000.0;
    let dotCircleDeltaRadians = (2*Math.PI) / 3000.
    let dotCircleColors = ["#AAFFFF", "#FFAAFF", "#FFFFAA"]; 
    this.dotCircles = [];

    

    for (let i = 0; i < 3; i++)
    {
      let circle = [];

      let dotColor = dotCircleColors[i];

      for (let j = 0; j < dotCircleCount; j++) {
        let currentRadians = dotCircleAngleDiff * j + dotCircleAngleDiff * (i / 3.);

        let newDot = new Dot((dotCircleRadius + i * 10) * Math.cos(currentRadians), (dotCircleRadius + i * 10) * Math.sin(currentRadians), 4, dotColor, "#000000");
        newDot.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + dotCircleRotationTime, null, null, 
            AnimationMovements.Spiral.bind(newDot),
            { deltaRadians: dotCircleDeltaRadians, deltaRadius: -(dotCircleRadius - 50.)/dotCircleRotationTime }
          )
        );

        newDot.AddUpdateFunction(new MovementObject(timeStamp + dotCircleRotationTime, timeStamp + dotCircleRotationTime + dotCircleRotationTime/4, null, null, 
            AnimationMovements.Spiral.bind(newDot),
            { deltaRadians: 2 * dotCircleDeltaRadians, deltaRadius: 2 * (dotCircleRadius - 50.)/dotCircleRotationTime }
          )
        );

        newDot.AddUpdateFunction(new MovementObject(timeStamp + dotCircleRotationTime + dotCircleRotationTime/4, timeStamp + dotCircleRotationTime + dotCircleRotationTime/2, null, null, 
            AnimationMovements.Spiral.bind(newDot),
            { deltaRadians: 2 * dotCircleDeltaRadians, deltaRadius: - 2 * (dotCircleRadius - 50.)/dotCircleRotationTime }
          )
        );
        
        this.animationObjects.push(newDot);
        circle.push(newDot);
      }
      this.dotCircles.push(circle);

      
    }
    

    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    TwoHappyDotsEngine.DotBouncesAndSlowsDown(this.mainDot2, timeStamp + dotCircleRotationTime, 2100, 600, bouncePeriod, acceleration);

    TwoHappyDotsEngine.DotBouncesAndSlowsDown(this.mainDot1, timeStamp + dotCircleRotationTime, 2100, 600, bouncePeriod, acceleration);

    timeStamp += dotCircleRotationTime + dotCircleRotationTime/2;

    this.timeStamp = timeStamp;
  }

  AllDotsSpinTogether() {
    function doSpins(dot, startTime, dotCircleRotationTime, radianSpeed, radiusSpeed) {
      
      dot.AddUpdateFunction(new MovementObject(startTime, startTime + dotCircleRotationTime, null, null, 
          AnimationMovements.Spiral.bind(dot),
          { deltaRadians: radianSpeed, deltaRadius: radiusSpeed }
        )
      );

      dot.AddUpdateFunction(new MovementObject(startTime + dotCircleRotationTime, startTime + 2*dotCircleRotationTime, null, null, 
          AnimationMovements.Spiral.bind(dot),
          { deltaRadians: radianSpeed, deltaRadius: -radiusSpeed }
        )
      );
    }

    let timeStamp = this.timeStamp;
    let dotCircleRotationTime = 3000;
    let radianSpeed = (2 * Math.PI)/3000;
    let radiusSpeed = 0.02;
    let dotCircleRotationEnd = timeStamp + dotCircleRotationTime;

    doSpins(this.mainDot1, timeStamp, dotCircleRotationTime, radianSpeed, radiusSpeed);

    doSpins(this.mainDot2, timeStamp, dotCircleRotationTime, radianSpeed, radiusSpeed);


    for (let i = 0; i < 3; i++)
    {
      let circle = this.dotCircles[i];
      let dotCircleCount = circle.length;

      for (let j = 0; j < dotCircleCount; j++) {

        doSpins(circle[j], timeStamp, dotCircleRotationTime, radianSpeed, radiusSpeed);

      }

    }
    this.timeStamp += 2*dotCircleRotationTime;
  }

  DotCircleSpread() {
    let timeStamp = this.timeStamp;
    for (let i = 0; i < 3; i++)
    {
      let circle = this.dotCircles[i];
      let dotCircleCount = circle.length;

      for (let j = 0; j < dotCircleCount; j++) {
        let dot = circle[j];

        dot.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + 700, null, null, 
            AnimationMovements.Spiral.bind(dot),
            { deltaRadians: 0, deltaRadius: .25 }
          )
        );

      }

    }
    this.timeStamp += 700;

  }

  MainDotsLeave() {
    let timeStamp = this.timeStamp;

    let bouncePeriod = 300.0;
    let mid = (bouncePeriod)/2.0;
    let bounceHeight = 30.0;
    let acceleration = -bounceHeight/(mid**2);

    let bounceTime = 5000;

    this.mainDot2.AddUpdateFunction(new MovementObject(timeStamp, timeStamp + bounceTime, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot2),
        { bouncePeriod: bouncePeriod, acceleration: acceleration, xSpeed: -0.03 }
      )
    );

    this.mainDot1.AddUpdateFunction(new MovementObject(timeStamp + bounceTime, timeStamp + 2 * bounceTime, null, null, 
        AnimationMovements.HappyBounce2.bind(this.mainDot1),
        { bouncePeriod: bouncePeriod, acceleration: acceleration, xSpeed: +0.03 }
      )
    );

    this.timeStamp += 2 * bounceTime;

  }

}

export default TwoHappyDotsEngine;