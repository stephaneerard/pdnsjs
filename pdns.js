const { resolve } = require('path');
const { readdirSync } = require('fs');
const got = require('got');
const { url } = require('./libs/utils/serverurl');
const { userAgent } = require('./libs/utils/user-agent');

class PowerDNS {
  constructor(callback) {
    this.response = callback;
    this.handlerResolverTable = new Map();
    this.handlers = [];
    this.userAgent = userAgent();
  }

  configure(config) {
    this.config = Object.assign(Object.create(null), config);

    const {
      proto, host, port, basePath, headers,
    } = this.config;

    this.g = got.extend({
      baseUrl: url({
        proto, host, port, basePath,
      }),
      headers,
      timeout: this.config.timeout,
      retry: {
        retries: this.config.retries,
      },
      hooks: {
        beforeRequest: [
          async (options) => {
            // eslint-disable-next-line no-param-reassign
            options.headers['user-agent'] = this.userAgent;
            // eslint-disable-next-line no-param-reassign
            options.headers['Cache-Control'] = 'no-store';
            // eslint-disable-next-line no-param-reassign
            // options.path = `${options.path}?n:${Date.now()}`;
          },
        ],
      },
    });

    const handlersPath = resolve('./handlers');

    readdirSync(handlersPath, { withFileTypes: true }).forEach((D) => {
      if (D.isDirectory()) {
        const handlerPath = resolve(handlersPath, D.name);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const Handler = require(handlerPath);
        this.handlers.push(new Handler(this.response));
      }
    });

    this.handlers.forEach((handler) => {
      /*
        eslint no-param-reassign: ['error', {
          "props": true,
          "ignorePropertyModificationsFor": ['handler']
        }]
      */
      handler.G = this.g;
      handler.tokens.forEach((token) => {
        // TODO: can we just merge into key even if it does not exist?
        const handlersForToken = this.handlerResolverTable.get(token) || [];
        const handlerAlreadyExists = handlersForToken.some(
          existingHandler => existingHandler === handler,
        );

        if (handlerAlreadyExists === false) {
          handlersForToken.push(handler);
          this.handlerResolverTable.set(token, handlersForToken);
        }
      });
    });

    return this;
  }

  async request(command) {
    this.handlerResolverTable.get(command.t).forEach(async (handler) => {
      // TODO use RegEx!
      handler.handle(command);
    });
  }
}

module.exports = PowerDNS;
