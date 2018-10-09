const { REQ_SERVERS } = require('../../constants');
const { BasehandlerClass } = require('../../libs/classes/BaseHandlerClass');

module.exports = class ServersHandler extends BasehandlerClass {
  constructor(response) {
    super({
      response,
      tokens: [REQ_SERVERS],
    });
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
