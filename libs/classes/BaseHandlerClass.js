const { createHandlerProperties } = require('../../libs/utils/props');

module.exports.BasehandlerClass = class BasehandlerClass {
  constructor({ response, tokens }) {
    createHandlerProperties({
      instance: this,
      response,
      tokens,
    });
  }

  set G(g) {
    this.g = g;
  }

  get tokens() {
    return this.TOKENS;
  }
};
