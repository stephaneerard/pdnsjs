/* eslint-disable no-unused-expressions */

const {
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');
const { REQ_SERVERS } = require('../constants');
const { getCommand } = require('../commands');

describe('PowerDNS', () => {
  it('gets a list of servers', (done) => {
    const expectedKeys = ['id', 'daemon_type', 'version'];
    const command = getCommand(REQ_SERVERS);

    const onHandler = (data) => {
      global.spyObject.removeListener('call', onHandler);

      expect(global.SPY.calledOnce).to.be.true;
      expect(data.e).to.not.exist;
      expect(Array.isArray(data.r)).to.be.true;
      expect(data.r).to.not.be.empty;

      data.r.forEach((server) => {
        expect(server).to.have.all.keys(expectedKeys);
      });

      done();
    };

    global.spyObject.on('call', onHandler);
    global.PDNS.request(command);
  });
});
