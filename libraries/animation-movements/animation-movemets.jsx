/** class representing AnimationMovements */
class AnimationMovements {
  /**
   * Animatoin Movement function for HappyBounce
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */
  static HappyBounce(animationObject, absoluteT, deltaT, movementMeta) {
    animationObject.position.y += (deltaT**2)/300;
    if (animationObject.position.y > 200) {
      animationObject.position.y = 200;
    }
  }
   
  /**
   * Animatoin Movement function for HappyBounce2
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */ 
  static HappyBounce2(animationObject, absoluteT, deltaT, movementMeta) {

    
    
    // top = -a * 200 * (200)

    /*
    console.log("absolute " + absoluteT);
    console.log("delta " + deltaT);

    console.log(animationObject);
    if (absoluteT != deltaT) {
      //exit;
    }
    */

    
    let deltat = absoluteT % movementMeta.root2;
    

    let height = -(movementMeta.a) * deltat * (deltat - movementMeta.root2);
    
    animationObject.position.y = height;

  }
  
  /**
   * Animatoin Movement function for Nothing
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static Nothing(animationObject, absoluteT, deltaT, movementMeta) {
  }

  /**
   * Animatoin Movement function for Nothing
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static MoveLeft(animationObject, absoluteT, deltaT, movementMeta) {
  }
  
}

export default AnimationMovements;