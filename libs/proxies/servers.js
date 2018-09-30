const servers = require('../servers').servers;

const serversHandler = {
  get: function(target, key) {
    console.log('target, key:', target, key);

    switch(key) {
      case 'servers': {
        return servers(target.config);
      }
    }
  },
};

module.exports.handler = new Proxy(Object.create(null), serversHandler);
