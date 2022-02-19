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
    this.label = "";

    // updates contains a RangeArray full of update functions
    this.updates = new RangeArray();
    this.currentMovementObject = null;
    this.movementStartTime = 0;
    this.movementUpdateDeltaTime = 0

  }
  
  /**
   * Creates new MovementObjects and pushes onto the RangeArray updates
   * @param {MovementObject} movementObject - movement object to add to updates
   */
  AddUpdateFunction(movementObject){
    this.updates.Push(movementObject);
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
    try{
    let updateFunction = null

    // if current movement object exists and the t is within the time range
    if (this.currentMovementObject && this.currentMovementObject.Contains(t)) {
      // if we already have the right movement object

      updateFunction = this.currentMovementObject.updateFunction;
      
      if (updateFunction && this.currentMovementObject.movementMeta) {
        updateFunction(t - this.movementStartTime, t - this.movementStartTime - this.movementUpdateDeltaTime, this.currentMovementObject.movementMeta);

        this.movementUpdateDeltaTime = t - this.movementStartTime;
      } else {
        // should never really get here. If so something is wrong?
      }

      return;
    }

    //console.log("try to get new movement object");
    // we need to get the next movement object

    // If there is a previous movement,
    // let's finish the remaining movement of the previous movement first
    if (this.currentMovementObject) {
      updateFunction = this.currentMovementObject.updateFunction;
      
      if (updateFunction && this.currentMovementObject.movementMeta) {
        updateFunction(this.currentMovementObject.rangeEnd - this.movementStartTime, this.currentMovementObject.rangeEnd- this.movementStartTime - this.movementUpdateDeltaTime, this.currentMovementObject.movementMeta);

        this.movementUpdateDeltaTime = t - this.movementStartTime;
      } else {
        // should never really get here. If so something is wrong?
      }

      if (this.currentMovementObject.endPosition) {
        // if end position is defined, we set the position to that 
        this.position.x = this.currentMovementObject.endPosition.x;
        this.position.y = this.currentMovementObject.endPosition.y;
      }


    }

    // Get new MovementObject
    let newMovementObject = this.updates.GetRangeObject(t);
    if (newMovementObject) {
      this.movementUpdateDeltaTime = 0;
      this.currentMovementObject = newMovementObject;

      //console.log("New Range Object");
      if (newMovementObject.startPosition) {
        // if new rangeObject's startPosition is defined, reset from startPosition
        //console.log("reset start Position");
        this.position.x = newMovementObject.startPosition.x;
        this.position.y = newMovementObject.startPosition.y;
      }
      
      
      if (newMovementObject.rangeStart) {
        this.movementStartTime = newMovementObject.rangeStart;
      } else {
        // this should be at the begining of all movements
        // Also I don't think this should be hit anyhmore
        this.movementStartTime = 0;
      }

      // this is repeated code, maybe refactor
      updateFunction = this.currentMovementObject.updateFunction
      if (updateFunction && this.currentMovementObject.movementMeta) {
        updateFunction(t - this.movementStartTime, t - this.movementStartTime - this.movementUpdateDeltaTime, this.currentMovementObject.movementMeta);

        this.movementUpdateDeltaTime = t - this.movementStartTime;
      } else {
        // should never really get here. If so something is wrong?
      }

      

      

      /* this should not be set yet
      this.currentMovementObject = newMovementObject;
      this.movementUpdateDeltaTime = t - this.movementStartTime;
      */

      // At this point ready to calculate movement update.

      

    } else {
      this.currentMovementObject = null;
    }
    
    } catch (e){
      console.log(e);
      throw(e);
    }
    return;
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