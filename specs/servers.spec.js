const {describe, it} = require('mocha');
const {expect} = require('chai');
const PowerDNS = require('../main');
const endpoint = require('./constants').endpoint;
const validateResponse = require('./schm/servers').check;


describe('PowerDNS Server API', () => {
  const serverConfig = {
    endpoint,
    api: {
      headers: {
        'X-API-Key': 'pdnsapikey'
      }
    }
  };
  let powerDNS = null;

  before(() => {
    PowerDNS.configure(serverConfig);
  })

  it('returns a list of servers', async () => {
    const servers = await PowerDNS.servers;

    expect(servers).to.exist;
    expect(Array.isArray(servers)).to.be.true;
    expect(servers).to.not.be.empty;
  });

  it('gets the "localhost" server', async() => {
    const localhost = await PowerDNS.server['localhost'];

    expect(localhost).to.exist;
    expect(localhost.config).to.deep.equal(serverConfig);
  });

  it('gets zones list of "localhost"', async() => {
    const localhost = await PowerDNS.server['localhost'];
    const zones = await localhost.zones;

    expect(zones).to.exist;
    expect(Array.isArray(zones)).to.be.true;
  });

  it('creates a root zone in "localhost"', async() => {
    const zoneName = 'dmx.';
    const zoneConfig = {
      name: zoneName,
      kind: 'NATIVE',
      api_rectify: false,
      masters: [],
      nameservers: [
        'ns1.dmx.',
        'ns2.dmx.',
      ]
    };
    const localhost = await PowerDNS.server['localhost'];
    const zone = await localhost.create_zone(zoneConfig);
    
    expect(zone).to.exist;
    expect(zone).to.not.be.empty;
    expect(zone.name).to.equal(zoneName);

    const deleteResult = await localhost.delete_zone(zone.id);

    expect(deleteResult).to.be.true;
  });
});
