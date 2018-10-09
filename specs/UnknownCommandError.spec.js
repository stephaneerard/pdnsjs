/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { UnknownCommandError } = require('../errors/UnknownCommandError');
const { REQ_ZONES } = require('../constants');
const { getCommand } = require('../commands');

describe('Errors', () => {
  it('constructs a UnknownCommandError', () => {
    const command = Object.assign(
      Object.create(null),
      getCommand(REQ_ZONES),
      { i: { serverId: global.defaultServerId } },
    );
    const re = /(?<message>\{.+\})$/gius;
    const error = new UnknownCommandError(command);
    const { groups: { message } } = re.exec(error.message);
    const errorMessageObject = JSON.parse(message);

    expect(error).to.be.an('error');
    expect(errorMessageObject).to.deep.equal(command);
  });
});
