import RangeObject from '../../range-object.jsx'

/** Class Representing Movement Object */
class MovementObject extends RangeObject {
  /**
   * Creates a MovementObject.
   * @param {number} rangeStart - start time for this update function. (null indicates beginning of time)
   * @param {number} rangeEnd - end time for this update function. (null indicates end of time)
   * @param {point} startPosition - Initial position for this update function. (null indicates no specified initial position)
   * @param {point} endPosition - End position for this update function. (null indicates no specified end position)
   * @param {function} updateFunction - actual function that updates the state of the object
   */
  constructor(rangeStart, rangeEnd, startPosition, endPosition, updateFunction) {
    super(rangeStart, rangeEnd);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.t = 0;
    this.movementMeta = { testing:"yes", updateFunction: updateFunction };
  }
}

export default MovementObject;