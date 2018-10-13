const { REQ_CREATE_DOMAIN, REQ_DELETE_DOMAIN } = require('../../constants');
const { MODIFIED_OK } = require('../../constants/codes');
const { BasehandlerClass } = require('../../libs/classes/BaseHandlerClass');
const { createOptions } = require('../../libs/utils/options');
const { UnknownCommandError } = require('../../errors/UnknownCommandError');
const { r } = require('../../libs/utils/result');

module.exports = class RSSetsHandler extends BasehandlerClass {
  constructor(response) {
    super({
      response,
      tokens: [REQ_CREATE_DOMAIN, REQ_DELETE_DOMAIN],
    });
  }

  async operateDomain(command) {
    let result = null;
    let error = null;

    try {
      const response = await this.g.patch(
        `/servers/${command.i}/zones/${command.z}`,
        createOptions({ value: command.h }),
      );

      result = { result: response.statusCode === MODIFIED_OK };
    } catch (e) {
      error = Object.assign(Object.create(null), e);
    } finally {
      this.response(r({ error, result }));
    }
  }

  async handle(command) {
    switch (command.t) {
      case REQ_CREATE_DOMAIN: {
        this.operateDomain(command);
        break;
      }
      case REQ_DELETE_DOMAIN: {
        this.operateDomain(command);
        break;
      }
      default: {
        throw new UnknownCommandError(JSON.stringify(command));
      }
    }
  }
};
