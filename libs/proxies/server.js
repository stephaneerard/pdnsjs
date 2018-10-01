const ServerObject = require('../api/server');
const { defineConfigProperty } = require('../utils/definePropertyConfig');

const Server = Object.create(null);

defineConfigProperty(Server);

const serverHandler = {
  async get(target, key) {
    const result = await target.config.g(`/servers/${key}`);
    const serverDescription = JSON.parse(result.body);

    return new ServerObject({
      description: serverDescription,
      config: target.config,
    });
  },
  set() {
    // eslint-disable-next-line
    return Reflect.set(...arguments);
  },
};

module.exports = new Proxy(Server, serverHandler);
