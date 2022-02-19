/** class representing AnimationMovements */
class AnimationMovements {
  /**
   * Animatoin Movement function for HappyBounce
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */
  static HappyBounce(absoluteT, deltaT, movementMeta) {
    this.position.y += (deltaT**2)/300;
    if (this.position.y > 200) {
      this.position.y = 200;
    }
  }

  static HorizontalSine(absoluteT, deltaT, movementMeta) {
    this.position.x += 1 * Math.sin((absoluteT)/200.0);
  }
   
  /**
   * Animatoin Movement function for HappyBounce2
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */ 
  static HappyBounce2(absoluteT, deltaT, movementMeta) {
    if (movementMeta.startY == null) {
      movementMeta.startY = this.position.y;
      movementMeta.startX = this.position.x;
    }
    let bounceTimeDelta = absoluteT % movementMeta.bouncePeriod;
    let height = movementMeta.acceleration * bounceTimeDelta * (bounceTimeDelta - movementMeta.bouncePeriod);

    this.position.y = movementMeta.startY + height;
    if (movementMeta.xSpeed) {
      this.position.x = movementMeta.startX + absoluteT * movementMeta.xSpeed;
    }
    //console.log(deltaT);
  }

  /** Animation Movement function for Up and Down */
  static UpAndDown (absoluteT, deltaT, movementMeta) {
      if (movementMeta.down) {
        this.position.y += Math.min(deltaT/5.0, 10.);
        
        if (this.position.y > 200) {
          movementMeta.down = false;
        }
      } else {
        this.position.y -= Math.min(deltaT/5.0, 10.);
        
        if (this.position.y < -200) {
          movementMeta.down = true;
        }
      }
    }
  
  /**
   * Animatoin Movement function for Nothing
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static Nothing(absoluteT, deltaT, movementMeta) {
  }

  /**
   * Animatoin Movement function for Moving Left
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static HorizontalMove(absoluteT, deltaT, movementMeta) {
    this.position.x += deltaT * movementMeta.speed;
        //console.log(deltaT);
  }
  /**
   * Animatoin Movement function for Basic Movement
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */
  static BasicMove(absoluteT, deltaT, movementMeta) {
    if (movementMeta.xSpeed) {
      this.position.x += deltaT * movementMeta.xSpeed;
    }
    if (movementMeta.ySpeed) {
      this.position.y += deltaT * movementMeta.ySpeed;
    }
    
        //console.log(deltaT);
  }

  static Spiral(absoluteT, deltaT, movementMeta){


    if (movementMeta.centerX == null) {
      movementMeta.centerX = 0;
    }

    if (movementMeta.centerY == null) {
      movementMeta.centerY = 0;
    }

    let sideX = this.position.x - movementMeta.centerX;
    let sideY = this.position.y - movementMeta.centerY;
    if (movementMeta.radius == null) {
      movementMeta.radius = Math.sqrt(sideY**2 + sideX**2);

    }
    
    if (movementMeta.radians == null) {
      movementMeta.radians = Math.atan((this.position.y - movementMeta.centerY)/(this.position.x - movementMeta.centerX));

      if (this.position.x - movementMeta.centerX < 0) {
        movementMeta.radians += Math.PI;
      }
    }
  
    if (movementMeta.deltaRadians == null) {
      movementMeta.deltaRadians = 0;
    }

    if (movementMeta.deltaRadius == null) {
      movementMeta.deltaRadius = 0;
    }

    

    movementMeta.radians += deltaT * movementMeta.deltaRadians;
    movementMeta.radius += deltaT * movementMeta.deltaRadius;

    this.position.x = movementMeta.radius * Math.cos(movementMeta.radians) + movementMeta.centerX;
    this.position.y = movementMeta.radius * Math.sin(movementMeta.radians) + movementMeta.centerY;

  }
  
}

export default AnimationMovements;