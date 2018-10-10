const { REQ_CREATE_DOMAIN, REQ_DELETE_DOMAIN } = require('../../constants');
const { MODIFIED_OK } = require('../../constants/codes');
const { BasehandlerClass } = require('../../libs/classes/BaseHandlerClass');
const { createOptions } = require('../../libs/utils/options');
const { UnknownCommandError } = require('../../errors/UnknownCommandError');

module.exports = class RSSetsHandler extends BasehandlerClass {
  constructor(response) {
    super({
      response,
      tokens: [REQ_CREATE_DOMAIN, REQ_DELETE_DOMAIN],
    });
  }

  async operateDomain(command) {
    const response = await this.g.patch(
      `/servers/${command.i}/zones/${command.z}`,
      createOptions({ value: command.h }),
    );

    this.response({ result: response.statusCode === MODIFIED_OK });
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
