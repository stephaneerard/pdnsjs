const servers = require('./libs/servers').servers;
const serverHandler = require('./libs/proxies/server');

const PowerDNS = Object.create(null);

PowerDNS.configure = function(config) {
  PowerDNS.config = config;
  PowerDNS.server.config = config;
};

Reflect.defineProperty(PowerDNS, 'servers', {
  get: function () {
    return servers(PowerDNS.config);
  },
  enumerable: true,
});

Reflect.defineProperty(PowerDNS, 'server', {
  value: serverHandler,
  enumerable: true,
  writable: false,
});

module.exports = PowerDNS;
