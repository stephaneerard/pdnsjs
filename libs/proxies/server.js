const ServerObject = require('../api/server');
const { defineConfigProperty, ro } = require('../utils/definePropertyConfig');

const Server = Object.create(null);

defineConfigProperty(Server);

const serverHandler = {
  async get(target, key) {
    const result = await target.config.g(`/servers/${key}`);
    // eslint-disable-next-line
    const { id, daemon_type, version } = JSON.parse(result.body);
    const serverDescription = Object.freeze(
      Object.assign(
        Object.create(null),
        { id, daemon_type, version },
      ),
    );

    ro({ t: serverDescription, n: 'id', v: id });
    ro({ t: serverDescription, n: 'daemon_type', v: daemon_type });
    ro({ t: serverDescription, n: 'version', v: version });

    return Object.freeze(
      new ServerObject({
        description: serverDescription,
        config: target.config,
      }),
    );
  },
  set() {
    // eslint-disable-next-line
    return Reflect.set(...arguments);
  },
};

module.exports = new Proxy(Server, serverHandler);
