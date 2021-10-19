import React from 'react';
import ReactDOM from 'react-dom';
import { vector, point } from '@js-basics/vector';

import RangeArray from '../range-array.jsx';
import RangeObject from '../range-object.jsx';
import MovementObject from './movement-objects/movement-object.jsx';
import AnimationObject from './animation-object.jsx';

/** class representing Rectangle, an extention of AnimationObject */
class Rectangle extends AnimationObject {
  /**
   * Creates a new Animation Object
   * @param {number} x - initial position x
   * @param {number} y - initial position y
   * @param {string} fillStyle - initial fill color Hex code
   * @param {string} strokeStyle - initial stroke color Hex code
   */
  constructor(x, y, width, height, fillStyle, strokeStyle) {
    super(x,y,fillStyle, strokeStyle);
    this.width = width;
    this.height = height;
  }
  
    /**
   * Draw - Draws the Rectangle
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
    //ctx.arc(this.position.x, -this.position.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillRect(this.position.x, -this.position.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export default Rectangle;