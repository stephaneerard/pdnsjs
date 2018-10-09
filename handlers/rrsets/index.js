const { REQ_CREATE_HOST } = require('../../constants');
const { MODIFIED_OK } = require('../../constants/codes');
const { createHandlerProperties } = require('../../libs/utils/props');

module.exports = class RSSetsHandler {
  /**
   * Constructor
   * @param {Function} response - The callback to be called with results.
   */
  constructor(response) {
    createHandlerProperties({
      instance: this,
      response,
      tokens: [REQ_CREATE_HOST],
    });
  }

  set G(g) {
    this.g = g;
  }

  get tokens() {
    return this.TOKENS;
  }

  async createHost(command) {
    const options = Object.assign(
      Object.create(null),
      {
        body: JSON.stringify(command.h),
        json: false,
      },
    );
    const response = await this.g.patch(
      `/servers/${command.i}/zones/${command.z}`,
      options,
    );

    this.response({ result: response.statusCode === MODIFIED_OK });
  }

  async handle(command) {
    switch (command.t) {
      case REQ_CREATE_HOST: {
        this.createHost(command);
        break;
      }
      default: {
        throw new EvalError('unknown command:', JSON.stringify(command));
      }
    }
  }
};
