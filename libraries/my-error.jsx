/** class representing MyError */
class MyError extends Error {
  /**
   * Creates a MyError
   * @param {string} message - error message
   */
  constructor(message) {
    super(message);
    console.log(message);
  }
}

export default MyError;