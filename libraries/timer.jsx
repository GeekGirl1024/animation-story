/** class representing Timer */
class Timer {
  /**
   * Creates a Timer
   */
  constructor(){
    this.ResetTimer();
  }
  
  /**
   * Resets or Initializes Timer
   * @return {Timer} - this
   */
  ResetTimer(){
    this.startTime = Date.now();
    this.currentTimeStamp = 0;
    this.increment = 0;
    return this;
  }
  
  /**
   * Sets current Timestamp at specific time this
   * @param {number} - new currentTimeStamp time
   * @return {Timer} - this
   */
  SetTimerAt(t) {
    let tempNow = Date.now();
    
    this.currentTimeStamp = t;
    this.increment = t;
    
    // Calculate out new startTime if now is t.
    this.startTime = tempNow - t;
    return this;
  }
  
  /**
   * Mark current timestamp
   * @return {Timer} - this
   */
  SetTimeStamp(){
    let tempNow = Date.now();
    let previousTimeStamp = this.currentTimeStamp;
    this.currentTimeStamp = tempNow - this.startTime;
    this.increment = this.currentTimeStamp - previousTimeStamp;
    return this;
  }
 
  
 
}

export default Timer