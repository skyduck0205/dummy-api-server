export default class ApiResponseError extends Error {
  constructor(options = {}) {
    super(options.message);
    this.code = options.code;
    this.message = options.message;
    this.data = options.data;
  }
}
