const { REQ_SERVERS } = require('../../constants');
const { createHandlerProperties } = require('../../libs/utils/props');

module.exports = class ServersHandler {
/**
 * Constructor
 * @param {Function} response - The callback to be called with results.
 */
  constructor(response) {
    createHandlerProperties({
      instance: this,
      response,
      tokens: [REQ_SERVERS],
    });
  }

  set G(g) {
    this.g = g;
  }

  get tokens() {
    return this.TOKENS;
  }

  async handle() {
    const response = await this.g.get('/servers');
    const result = JSON.parse(response.body);

    // eslint-disable-next-line camelcase
    const servers = result.map(({ id, daemon_type, version }) => Object.assign(
      Object.create(null),
      { id, daemon_type, version },
    ));

    this.response(servers);
  }
};
