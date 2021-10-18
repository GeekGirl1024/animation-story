import React from 'react';
import ReactDOM from 'react-dom';
import { vector, point } from '@js-basics/vector';
import RangeArray from '../range-array.jsx';
import RangeObject from '../range-object.jsx';
import MovementObject from './movement-objects/movement-object.jsx';

/** class representing AnimationObject */
class AnimationObject {
  /**
   * Creates a new Animation Object
   * @param {number} x - initial position x
   * @param {number} y - initial position y
   * @param {string} fillStyle - initial fill color Hex code
   * @param {string} strokeStyle - initial stroke color Hex code
   */
  constructor(x, y, fillStyle, strokeStyle) {
    this.position = point(x,y);
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;

    // updates contains a RangeArray full of update functions
    this.updates = new RangeArray();
    this.currentMovementObject = null;
    this.t = 0;

  }
  
  /**
   * Creates new MovementObjects and pushes onto the RangeArray updates
   * @param {number} start - start time for this update function. (null indicates beginning of time)
   * @param {number} end - end time for this update function. (null indicates end of time)
   * @param {point} startPosition - Initial position for this update function. (null indicates no specified initial position)
   * @param {point} endPosition - End position for this update function. (null indicates no specified end position)
   * @param {function} updateFunction - actual function that updates the state of the object
   */
  AddUpdateFunction(start, end, startPosition, endPosition, updateFunction){
    this.updates.Push(new MovementObject(start, end, startPosition, endPosition, updateFunction));
  }
  
  /**
   * Calls Sort on updates RangeArray
   * This should most likely be called after all updateFunctions have been added to ensure they are in order, as RangeArray is optimized for ordered MovementObjects
   */
  SortUpdates(){
    this.updates.Sort();
  }
  
  /**
   * Update - gets the right movementObject and run the update function on it.
   * @param {number} t - absolute time
  */
  Update(t) {
    let updateFunction = null

    if (this.currentMovementObject && this.currentMovementObject.Contains(t)) {
      // if we already have the right movement object
     
    } else {
      // if we need to get the next movement object

      // Get new MovementObject
      let newMovementObject = this.updates.GetRangeObject(t);
      if (newMovementObject && newMovementObject.startPosition) {
        // if new rangeObject's startPosition is defined, use that.
        this.position.x = newMovementObject.startPosition.x;
        this.position.y = newMovementObject.startPosition.y;
        if (newMovementObject.start) {
          this.t = newMovementObject.start;
        }
      } else if(this.currentRangeObject && this.currentRangeObject.endPosition) {
        // if new rangeObject's startPosition is not defined, and the previous rangeObject's 
        this.position.x = this.currentMovementObject.endPosition.x;
        this.position.y = this.currentMovementObject.endPosition.y;
        if (this.currentMovementObject.end) {
          this.t = this.currentMovementObject.end;
        }
      } else if(this.currentMovementObject && this.currentMovementObject.end) {
        // calculate the last position from previous movement object
        this.currentMovementObject.updateFunction(this.currentMovementObject.end - this.t);
        this.t = this.currentMovementObject.end;
      }
      
      this.currentMovementObject = newMovementObject;
    }
    
    if (this.currentMovementObject) {
      updateFunction = this.currentMovementObject.data;
    }
    
    if (updateFunction) {
      updateFunction(t, t - this.t);
    }
    
    this.t = t;
  }
  
  /**
   * Draw - Draws the animationObject. (This should be overridden)
   * @param {any} ctx - canvas
   * @param {number} offsetX - offset value from center
   * @param {number} offsetY - offset value from center
   */
  Draw(ctx, offsetX, offsetY) {
    
  }
  
}

export default AnimationObject;