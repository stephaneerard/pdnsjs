module.exports = class Zones {
  constructor(config) {
    this.conf = config;
  }

  async list(serverId) {
    const result = await this.conf.g(`/servers/${serverId}/zones`);

    return JSON.parse(result.body);
  }
};
