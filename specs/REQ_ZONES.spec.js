/* eslint-disable no-unused-expressions */

const {
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');

const { REQ_ZONES } = require('../constants');
const { getCommand } = require('../commands');

describe('PowerDNS', () => {
  it(`gets a list of zones in "${global.defaultServerId}"`, (done) => {
    const command = Object.assign(
      Object.create(null),
      getCommand(REQ_ZONES),
      { i: { serverId: global.defaultServerId } },
    );

    const onHandler = (data) => {
      global.spyObject.removeListener('call', onHandler);

      expect(global.SPY.calledOnce).to.be.true;
      expect(data.e).to.not.exist;
      expect(Array.isArray(data.r)).to.be.true;

      done();
    };

    global.spyObject.on('call', onHandler);
    global.PDNS.request(command);
  });
});
