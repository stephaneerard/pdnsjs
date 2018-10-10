/* eslint-disable no-unused-expressions */

const {
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');
const {
  REQ_CREATE_DOMAIN,
  REQ_DELETE_DOMAIN,
  REQ_CREATE_ZONE,
  REQ_DELETE_ZONE,
} = require('../constants');
const { getCommand } = require('../commands');

describe('PowerDNS', () => {
  const defaultDomain = `stammgast.${global.defaultZoneId}`;
  const zoneInfo = Object.assign(Object.create(null), {
    name: global.defaultZoneId,
    kind: 'NATIVE',
    api_rectify: false,
    masters: [],
    nameservers: [
      `ns1.${global.defaultZoneId}`,
      `ns2.${global.defaultZoneId}`,
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

  const createDomainCommand = Object.assign(
    Object.create(null),
    getCommand(REQ_CREATE_DOMAIN),
    {
      i: global.defaultServerId,
      z: null,
      h: {
        rrsets: [
          {
            name: defaultDomain,
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

  const deleteDomainCommand = Object.assign(
    Object.create(null),
    getCommand(REQ_DELETE_DOMAIN),
    {
      i: global.defaultServerId,
      z: null,
      h: {
        rrsets: [
          {
            name: defaultDomain,
            type: 'A',
            changetype: 'DELETE',
          },
        ],
      },
    },
  );

  it(`creates/deletes "${defaultDomain}" domain in "${global.defaultServerId}/${global.defaultZoneId}"`, async () => {
    const createZone = () => new Promise((resolve) => {
      const onZoneCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onZoneCreatedHandler);
      global.PDNS.request(createZoneCommand);
    });

    const createDomain = () => new Promise((resolve) => {
      const onDomainCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onDomainCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onDomainCreatedHandler);
      global.PDNS.request(createDomainCommand);
    });

    const deleteDomain = () => new Promise((resolve) => {
      const onDomainDeletedHandler = (data) => {
        global.spyObject.removeListener('call', onDomainDeletedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onDomainDeletedHandler);
      global.PDNS.request(deleteDomainCommand);
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

    expect(global.SPY.callCount).to.equal(1);
    expect(createZoneResult).to.not.be.empty;

    deleteZoneCommand.z = createZoneResult.id;
    createDomainCommand.z = createZoneResult.id;
    deleteDomainCommand.z = createZoneResult.id;

    const createDomainResult = await createDomain();

    expect(global.SPY.callCount).to.equal(2);
    expect(createDomainResult.result).to.be.true;

    const deleteDomainResult = await deleteDomain();

    expect(global.SPY.callCount).to.equal(3);
    expect(deleteDomainResult.result).to.be.true;

    const deleteZoneResult = await deleteZone(createZoneResult.id);

    expect(global.SPY.callCount).to.equal(4);
    expect(deleteZoneResult.result).to.be.true;
  });
});
