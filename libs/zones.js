const got = require('got');
const url = require('./utils/serverurl').url;

module.exports = class Zones {
  constructor(config) {
    this.conf = config;
  }

  async list(serverId) {
    const result = await got(`${url(this.conf.endpoint)}/servers/${serverId}/zones`, this.conf.api);
    return JSON.parse(result.body);
  }

  // async one(serverId) {
  //   const result = await got(`${url(this.conf.endpoint)}/servers/${serverId}`, this.conf.api);
  //   return JSON.parse(result.body);
  // }
}
