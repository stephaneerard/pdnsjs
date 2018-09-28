const got = require('got');
const url = require('./utils/serverurl').url;

module.exports = class Servers {
  constructor(config) {
    this.config = config;
    this.url = `${url(this.config.endpoint)}/servers`;
  }

  async list() {
    const result = await got(this.url, this.config.api);
    return JSON.parse(result.body);
  }
}
