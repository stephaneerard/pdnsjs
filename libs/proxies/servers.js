const Servers = Object.create(null);
const { defineConfigProperty } = require('../utils/definePropertyConfig');

defineConfigProperty(Servers);

const serversHandler = {
  async get(target, key) {
    if (key === 'servers') {
      // eslint-disable-next-line
      console.log('serversHandler.get:', target, key);
      const response = await target.config.g('/servers');
      const result = JSON.parse(response.body);
      const serverId = result.map((server) => {
        // eslint-disable-next-line
        const { id, daemon_type, version } = server;

        return Object.freeze(
          Object.assign(
            Object.create(null),
            { id, daemon_type, version },
          ),
        );
      });

      return serverId;
    }

    return null;
  },
};

module.exports = new Proxy(Servers, serversHandler);
