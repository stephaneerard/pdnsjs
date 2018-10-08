/* eslint-disable no-unused-expressions */

const {
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');
const { REQ_CREATE_ZONE, REQ_DELETE_ZONE } = require('../constants');
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

  it(`creates/deletes a zone in "${global.defaultServerId}"`, async () => {
    const createZone = () => new Promise((resolve) => {
      const onZoneCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onZoneCreatedHandler);
      global.PDNS.request(createZoneCommand);
    });

    const deleteZone = zoneId => new Promise((resolve) => {
      const onZoneDeletedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneDeletedHandler);
        resolve(data);
      };

      deleteZoneCommand.z = zoneId;

      global.spyObject.on('call', onZoneDeletedHandler);
      global.PDNS.request(deleteZoneCommand);
    });

    const createZoneResult = await createZone();

    expect(global.SPY.calledOnce).to.be.true;
    expect(createZoneResult).to.not.be.empty;

    const deleteZoneResult = await deleteZone(createZoneResult.id);

    expect(global.SPY.calledTwice).to.be.true;
    expect(deleteZoneResult.result).to.be.true;
  });
});
