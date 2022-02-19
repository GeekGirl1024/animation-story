import React from 'react';
import ReactDOM from 'react-dom';
import { vector, point } from '@js-basics/vector';

import RangeArray from '../range-array.jsx';
import RangeObject from '../range-object.jsx';
import MovementObject from './movement-objects/movement-object.jsx';
import AnimationObject from './animation-object.jsx';

/** class representing Dot, an extention of AnimationObject */
class Dot extends AnimationObject {
  /**
   * Creates a new Dot
   * @param {number} x - initial position x
   * @param {number} y - initial position y
   * @param {string} fillStyle - initial fill color Hex code
   * @param {string} strokeStyle - initial stroke color Hex code
   */
  constructor(x, y, r, fillStyle, strokeStyle) {
    super(x,y,fillStyle, strokeStyle);
    this.radius = r;
  }
  

  /**
   * Draw - Draws the dot
   * @param {any} ctx - canvas
   * @param {number} offsetX - offset value from center
   * @param {number} offsetY - offset value from center
   */
  Draw(ctx, offsetX, offsetY) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.arc(this.position.x, -this.position.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    if (this.label) {
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.fillText(this.label, this.position.x + 10, -this.position.y - 10); 
    }
    ctx.restore();
  }
}

export default Dot;