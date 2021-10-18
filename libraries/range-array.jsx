import RangeObject from './range-object.jsx';
import MyError from'./my-error.jsx';

/** class representing RangeArray */
class RangeArray {
  /**
   * Creates a new RangeArray
   */
  constructor(){
    // This is the array that contains the RangeObjects
    this.dataArray = [];
    // This is the current RangeObject. This is created for optimization
    this.current = null;
  }
  
  /**
   * calls GetRangeObject and returns the data
   * @param {number} t - time
   * @return {any} - data stored in RangeObject corresponding to t
   */
  GetData(t) {
    let rangeObject = this.GetRangeObject(t);
    
    if (rangeObject) {
      return rangeObject.data;
    }
    
    return null;
  }
  
  /**
   * Gets RangeObject corresponding to the time t
   * @param {number} t - time
   * @return {RangeObject} - RangeObject corresponding to t
   */
  GetRangeObject(t){
    if (this.dataArray.length == 0) {
      return null;
    }
    
    // This should not be hit. If there is no current, the dataArray should be empty
    if (this.current == null) {
      return null;
    }

    // check dataArray starting from current and expect the dataArray to be sorted
    for (let index = this.current; index < this.dataArray.length; index++) {
      let currentObject = this.dataArray[index];
      
      // If the currentObject contains the time t, set the current index and return the currentObject
      if (currentObject && currentObject.Contains(t)) {
        this.current = index;
        return currentObject;
      }
      
      // This can be optimized further to prevent checking to the end if t is passed.
    }
    
    // If no RangeObject is found, return null.
    return null;
  }
  
  /**
   * Pushes new RangeObject onto the dataArray and sets current to null
   * @param {RangeObject} rangeObject - new RangeObject to add onto the dataArray
   * @return {RangeArray} - this
   */
  Push(rangeObject){
    this.dataArray.push(rangeObject);
    this.current = null;
    return this;
  }
  
  /**
   * Sorts objects in dataArray
   * @return {RangeArray} - this
   */
  Sort(){
    if (this.dataArray && this.dataArray.length > 0) {
      this.dataArray.sort(function(dataObject1, dataObject2){
        let overLap = true;
      
        // detect any overlap
        // TODO: check for cleaner way to do this using the RangeObject.contains function
        if (dataObject1.min == null && dataObject2.min == null) {
          console.log("dataObject1 and dataObject2 both have negative infinity lower bounds");
          overLap = true;
        } else if (dataObject1.max == null && dataObject2.max == null) {
          console.log("dataObject1 and dataObject2 both have infinity upper bounds");
          overLap = true;
        } else if (dataObject1.min == null && dataObject1.max == null) {
          console.log("dataObject1 contains the entire spectrum ");
          overLap = true;
        } else if (dataObject2.min == null && dataObject2.max == null) {
          console.log("dataObject2 contains the entire spectrum ");
          overLap = true;
        } else if ((dataObject1.min == null || dataObject2.max == null) && dataObject2.min <= dataObject1.max) {
          console.log("dataObject1 upper bound contains dataObject2 lower bound ");
          overLap = true;
        } else if ((dataObject2.min == null || dataObject1.max == null) && dataObject1.min <= dataObject2.max) {
          console.log("dataObject2 upper bound contains dataObject1 lower bound ");
          overLap = true;
        } else if (dataObject1.min < dataObject2.min
          && dataObject1.max < dataObject2.min) {
          // dataObject1 is less than dataObject2
          overLap = false;
        } else if (dataObject2.min < dataObject1.min
          && dataObject2.max < dataObject1.min) {
          // dataObject2 is less than dataObject1
          overLap = false;
        } else {
          console.log("should never get here if above logic is correct");
          overLap = true;
        }
      
        if (overLap){
          console.log(dataObject1);
          console.log(dataObject2);
          throw new MyError("Overlapping Range Detected");        
        }
      
        return dataObject1.min > dataObject2.min;
      });
      
      this.current = 0;
    } else {
      this.current = null;
    }
    
    return this;
  }
}

export default RangeArray;