/** Class representing the RangeObject. */
class RangeObject {
  /**
   * Creates a RangeObject.
   * @param {number} start - start time for this update function. (null indicates beginning of time)
   * @param {number} end - end time for this update function. (null indicates end of time)
   * @param {point} startPosition - Initial position for this update function. (null indicates no specified initial position)
   * @param {point} endPosition - End position for this update function. (null indicates no specified end position)
   * @param {function} data - data that is contained in the RangeObject. (TODO: remove this and just extend the object)
   */

  constructor(min, max, startPosition, endPosition, data){
    this.min = min;
    this.max = max;
    this.data = data;
  }
  
  /**
   * Checks to see if the time t is within the bounds of the RangeObject
   * @param {number} t - time
   * @return {boolean} - boolean indicating if t is within the bounds of the RangeObject
   */
  Contains(t) {
    
    if(this.min == null && this.max == null) {
      return true;
    } else if (this.min == null) {
      if (this.max >= t) {
        return true;
      } else {
        return false;
      }
    } else if (this.max == null) {
      if (this.min <= t) {
        return true;
      } else {
        return false;
      }
    } else if (this.min <= t && t <= this.max) {
      return true;
    } else {
      return false;
    }
  }
}

export default RangeObject;