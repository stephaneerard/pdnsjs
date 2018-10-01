const Servers = Object.create(null);
const { defineConfigProperty } = require('../utils/definePropertyConfig');

defineConfigProperty(Servers);

const serversHandler = {
  async get(target) {
    const response = await target.config.g('/servers');
    const serverId = JSON.parse(response.body).map(server => server.id);

    return serverId;
  },
};

module.exports = new Proxy(Servers, serversHandler);
