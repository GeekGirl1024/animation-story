/** Class representing the RangeObject. */
class RangeObject {
  /**
   * Creates a RangeObject.
   * @param {number} rangeStart - start point for this RangeObject. (null indicates beginning of time)
   * @param {number} rangeEnd - end point for this RangeObject. (null indicates end of time)
   */
  constructor(rangeStart, rangeEnd){
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
  }
  
  /**
   * Checks to see if the time t is within the bounds of the RangeObject
   * @param {number} t - time
   * @return {boolean} - boolean indicating if t is within the bounds of the RangeObject
   */
  Contains(t) {
    
    if(this.rangeStart == null && this.rangeEnd == null) {
      return true;
    } else if (this.rangeStart == null) {
      if (this.rangeEnd >= t) {
        return true;
      } else {
        return false;
      }
    } else if (this.rangeEnd == null) {
      if (this.rangeStart <= t) {
        return true;
      } else {
        return false;
      }
    } else if (this.rangeStart <= t && t <= this.rangeEnd) {
      return true;
    } else {
      return false;
    }
  }
}

export default RangeObject;