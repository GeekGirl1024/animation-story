import RangeObject from '../../range-object.jsx'

/** Class Representing Movement Object */
class MovementObject extends RangeObject {
  /**
   * Creates a MovementObject.
   * @param {number} start - start time for this update function. (null indicates beginning of time)
   * @param {number} end - end time for this update function. (null indicates end of time)
   * @param {point} startPosition - Initial position for this update function. (null indicates no specified initial position)
   * @param {point} endPosition - End position for this update function. (null indicates no specified end position)
   * @param {function} updateFunction - actual function that updates the state of the object
   */
  constructor(min, max, startPosition, endPosition, updateFunction) {
    super(min, max);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.t = 0;
    this.movementMeta = { testing:"yes", updateFunction: updateFunction };
  }
}

export default MovementObject;