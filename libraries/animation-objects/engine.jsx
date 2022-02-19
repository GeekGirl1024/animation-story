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
    this.DrawGuideLines(ctx);
    for(let i = 0; i < this.animationObjects.length; i++) {
      this.animationObjects[i].Draw(ctx, this.center.x, this.center.y);
    }
  }

  DrawGuideLines(ctx){
    let widthDelta = this.width / 20.;
    let heightDelta = this.height / 20.
    for (let i = 0; i < 20; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = "#333333";
      ctx.moveTo(widthDelta * i, 0);
      ctx.lineTo(widthDelta * i, this.height);
      ctx.stroke();
      ctx.restore();
    }

    for (let i = 0; i < 20; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = "#333333";
      ctx.moveTo(0,heightDelta * i);
      ctx.lineTo(this.width, heightDelta * i);
      ctx.stroke();
      ctx.restore();
    }
  }
}

export default Engine;