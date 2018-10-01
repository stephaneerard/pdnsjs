const got = require('got');
const { url } = require('./libs/utils/serverurl');
const serverHandler = require('./libs/proxies/server');
const serversHandler = require('./libs/proxies/servers');

const PowerDNS = Object.create(null);

Reflect.defineProperty(PowerDNS, 'servers', {
  get() {
    return serversHandler;
  },
  enumerable: true,
  configurable: false,
});

Reflect.defineProperty(PowerDNS, 'server', {
  value: serverHandler,
  enumerable: true,
  writable: false,
  configurable: false,
});

PowerDNS.configure = function configure(config) {
  const conf = Object.create(null);

  conf.g = got.extend({
    baseUrl: url(config.endpoint),
    headers: config.api.headers,
  });

  PowerDNS.config = conf;
  PowerDNS.server.config = conf;
  PowerDNS.servers.config = conf;
};

module.exports = PowerDNS;
