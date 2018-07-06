class ProfileScoreException extends Error {
  constructor (message) {
    super(message)
    // noinspection JSAnnotator
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

module.exports = ProfileScoreException