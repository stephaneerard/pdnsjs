const { REQ_SERVERS } = require('../../constants');
const { BasehandlerClass } = require('../../libs/classes/BaseHandlerClass');
const { r } = require('../../libs/utils/result');

module.exports = class ServersHandler extends BasehandlerClass {
  constructor(response) {
    super({
      response,
      tokens: [REQ_SERVERS],
    });
  }

  async handle() {
    let result = null;
    let error = null;

    try {
      const response = await this.g.get('/servers');
      const res = JSON.parse(response.body);

      // eslint-disable-next-line camelcase
      result = res.map(({ id, daemon_type, version }) => Object.assign(
        Object.create(null),
        { id, daemon_type, version },
      ));
    } catch (e) {
      error = Object.assign(Object.create(null), e);
    } finally {
      this.response(r({ error, result }));
    }
  }
};
