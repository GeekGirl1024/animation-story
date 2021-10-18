import React from 'react';
import ReactDOM from 'react-dom';
import { vector, point } from '@js-basics/vector';
import Dot from './dot.jsx';
import AnimationMovements from '../animation-movements/animation-movemets.jsx';

/** Class representing the Engine. */
class Engine {
  /**
   * Creates an Engine.
   * @param {number} width - the canvas width
   * @param {number} height - the canvas height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.center = new point(width/2.0, height/2.0);
    this.animationObjects = [];
  }
  
  /**
   * Initializes the Engine.
   * meant to be over ridden
   */
  Init() {
  }
  
  /**
   * Update - for each animation object, call update for each animationObject
   * @param {number} t - absolute tinme
  */
  Update(t) {
    for(let i = 0; i < this.animationObjects.length; i++) {
      this.animationObjects[i].Update(t);
    }
  }
  
  /**
   * Draw - for each animation object, call the draw function with the canvas
   * @param {any} ctx - the canvas
   */
  Draw(ctx) {
    for(let i = 0; i < this.animationObjects.length; i++) {
      this.animationObjects[i].Draw(ctx, this.center.x, this.center.y);
    }
  }
}

export default Engine;