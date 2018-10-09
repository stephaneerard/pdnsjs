module.exports.UnknownCommandError = class UnknownCommandError extends Error {
  constructor(message) {
    const M = JSON.stringify(message);

    super(M);
    this.message = `Unknown Command: ${M}`;

    Error.captureStackTrace(this, UnknownCommandError);
  }
};
