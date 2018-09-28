const Servers = require('./libs/servers');

let servers = null;

module.exports = class PowerDNS {
  constructor(config) {
    this.config = Object.assign(Object.create(null), config);

    if (servers === null) {
      servers = new Servers(this.config);
    }
  }

  get servers() {
    return servers;
  };
}

