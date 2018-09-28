const got = require('got');

module.exports = class Servers {
  constructor(config) {
    this.config = config;
  }

  async list() {
    const result = await got('http://192.168.0.2:8888/api/v1/servers', this.config.api);
    return JSON.parse(result.body);
  }
}
