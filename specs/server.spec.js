const {describe, it} = require('mocha');
const {expect} = require('chai');
const PowerDNS = require('../main');
const endpoint = require('./constants').endpoint;
const validateResponse = require('./schm/servers').check;

const config = {
  endpoint,
  api: {
    headers: {
      'X-API-Key': 'pdnsapikey'
    }
  }
};

describe('PowerDNS Server API', () => {
  let pdns = null;

  before(() => {
    pdns = new PowerDNS(config);
  })

  after(() => {
    pdns = null
  })

  it('get a list of servers', async () => {
    const asInSpec = [
      'type',
      'id',
      'daemon_type',
      'version',
      'url',
      'config_url',
      'zones_url'
    ];
    const servers = await pdns.servers.list();

    expect(servers).to.exist
    expect(Array.isArray(servers)).to.be.true;
    expect(servers).to.not.be.empty;

    for (let i = 0; i < servers.length; i += 1) {
      const server = servers[i];

      expect(server).to.have.all.keys(asInSpec);

      const validationResult = await validateResponse(server);

      expect(validationResult).to.have.all.deep.keys(server);
    }
  });
});
