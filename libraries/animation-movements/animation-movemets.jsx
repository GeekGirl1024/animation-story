/** class representing AnimationMovements */
class AnimationMovements {
  /**
   * Animatoin Movement function for HappyBounce
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */
  static HappyBounce(animationObject, absoluteT, deltaT) {
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
  static HappyBounce2(animationObject, absoluteT, deltaT) {

    let root1 = 0.0;
    let root2 = 300.0;
    let mid = (root2 - root1)/2.0;
    let top = 30.0;
    
    let a = top/(mid**2);
    
    // top = -a * 200 * (200)
    
   

    
    let deltat = absoluteT % root2;
    

    let height = -(a) * deltat * (deltat - root2);
    
    animationObject.position.y = height;

  }
  
  /**
   * Animatoin Movement function for Nothing
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static Nothing(animationObject, absoluteT, deltaT) {
  }

  /**
   * Animatoin Movement function for Nothing
   * @param {AnimationObject} animationObject - The Animation Object
   * @param {number} absoluteT - total time since the start of this action
   * @param {number} deltaT - total time since the last call of this action
   */

  static MoveLeft(animationObject, absoluteT, deltaT) {
  }
  
}

export default AnimationMovements;