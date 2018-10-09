/* eslint-disable no-unused-expressions */

const {
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');
const {
  REQ_CREATE_DOMAIN,
  REQ_CREATE_ZONE,
  REQ_DELETE_ZONE,
} = require('../constants');
const { getCommand } = require('../commands');

describe('PowerDNS', () => {
  const zoneInfo = Object.assign(Object.create(null), {
    name: 'dmx.',
    kind: 'NATIVE',
    api_rectify: false,
    masters: [],
    nameservers: [
      'ns1.dmx.',
      'ns2.dmx.',
    ],
  });

  const createZoneCommand = Object.assign(
    Object.create(null),
    getCommand(REQ_CREATE_ZONE),
    {
      i: global.defaultServerId,
      z: zoneInfo,
    },
  );

  const deleteZoneCommand = Object.assign(
    Object.create(null),
    getCommand(REQ_DELETE_ZONE),
    {
      i: global.defaultServerId,
      z: null,
    },
  );

  const createHostCommand = Object.assign(
    Object.create(null),
    getCommand(REQ_CREATE_DOMAIN),
    {
      i: global.defaultServerId,
      z: null,
      h: {
        rrsets: [
          {
            name: 'stammgast.dmx.',
            type: 'A',
            ttl: 86400,
            changetype: 'REPLACE',
            records: [
              {
                content: '192.168.0.2',
                disabled: false,
              },
            ],
          },
        ],
      },
    },
  );

  it('adds a host to a zone', async () => {
    const createZone = () => new Promise((resolve) => {
      const onZoneCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onZoneCreatedHandler);
      global.PDNS.request(createZoneCommand);
    });

    const createHost = () => new Promise((resolve) => {
      const onHostCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onHostCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onHostCreatedHandler);
      global.PDNS.request(createHostCommand);
    });

    const deleteZone = () => new Promise((resolve) => {
      const onZoneDeletedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneDeletedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onZoneDeletedHandler);
      global.PDNS.request(deleteZoneCommand);
    });

    const createZoneResult = await createZone();

    expect(global.SPY.calledOnce).to.be.true;
    expect(createZoneResult).to.not.be.empty;

    deleteZoneCommand.z = createZoneResult.id;
    createHostCommand.z = createZoneResult.id;

    const createHostResult = await createHost();

    expect(global.SPY.calledTwice).to.be.true;
    expect(createHostResult.result).to.be.true;

    const deleteZoneResult = await deleteZone(createZoneResult.id);

    expect(global.SPY.calledThrice).to.be.true;
    expect(deleteZoneResult.result).to.be.true;
  });
});
