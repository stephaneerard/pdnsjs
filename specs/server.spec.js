const {describe, it} = require('mocha');
const {expect} = require('chai');
const PowerDNS = require('../main');

const config = {
  // url: 'http://192.168.0.2:8888/api/v1/servers',
  endpoint: {
    proto: 'http',
    host: '192.168.0.2',
    port: 8888,
    basePath: '/api/v1'
  },
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

    servers.forEach(server => {
      expect(server).to.have.all.keys(asInSpec);
    });
  });
});
