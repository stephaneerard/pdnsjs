/* eslint-disable no-unused-expressions */

require('dotenv').config();
const { env } = require('process');
const {
  describe,
  before,
  after,
  it,
} = require('mocha');
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const PowerDNS = require('../pdns');
const { REQ_SERVERS } = require('../constants');
const { getCommand } = require('../commands');

describe('PowerDNS', () => {
  const pdnsConfig = Object.assign(Object.create(null), {
    proto: env.PDNS_PROTO,
    host: env.PDNS_HOST,
    port: env.PDNS_PORT,
    basePath: env.PDNS_BASE_PATH,
    headers: { 'X-API-Key': env.PDNS_API_KEY },
  });
  const spyObject = {
    pdnsCallback: function callback() {},
  };
  let spy = null;
  let pdns = null;

  before(() => {
    spy = sandbox.spy(spyObject, 'pdnsCallback');
    pdns = new PowerDNS(spyObject.pdnsCallback).configure(pdnsConfig);
  });

  after(() => {
    sandbox.restore();
  });

  it('gets a list of servers', (done) => {
    const expectedKeys = ['id', 'daemon_type', 'version'];
    const command = getCommand(REQ_SERVERS);

    pdns.request(command);

    const timeout = setTimeout(() => {
      expect(spy.calledOnce).to.be.true;
      /**
       * no idea why [0][0][0] instead of [0][0]
       */
      const args = spy.args[0][0][0];

      expect(args).to.have.all.keys(expectedKeys);

      clearTimeout(timeout);
      done();
    }, 100);
  });
});
