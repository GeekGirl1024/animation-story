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
    if (!movementMeta.startY) {
      movementMeta.startY = this.position.y;
    }
    let bounceTimeDelta = absoluteT % movementMeta.bouncePeriod;
    let height = movementMeta.acceleration * bounceTimeDelta * (bounceTimeDelta - movementMeta.bouncePeriod);
    this.position.y = movementMeta.startY + height;
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
  }
  
}

export default AnimationMovements;