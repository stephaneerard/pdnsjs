const got = require('got');
const url = require('../utils/serverurl').url;
const ServerObject = require('../api/server');

const Server = Object.create(null);

Reflect.defineProperty(Server, 'config', {
  value: '',
  enumerable: true,
  writable: true,
});

const serverHandler = {
  get: async function(target, key) {
    const result = await got(`${url(target.config.endpoint)}/servers/${key}`, target.config.api);
    const serverDescription = JSON.parse(result.body);
    return new ServerObject({
      description: serverDescription,
      config: target.config,
    });
  },
  set: function(target, key, value) {
    return Reflect.set(...arguments);
  },
};

module.exports = new Proxy(Server, serverHandler);
