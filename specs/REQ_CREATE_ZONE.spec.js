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

  it(`creates/deletes "${global.defaultZoneId}" zone in "${global.defaultServerId}" server`, async () => {
    const createZone = () => new Promise((resolve) => {
      const onZoneCreatedHandler = (data) => {
        global.spyObject.removeListener('call', onZoneCreatedHandler);
        resolve(data);
      };

      global.spyObject.on('call', onZoneCreatedHandler);
      global.PDNS.request(createZoneCommand);
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
    expect(createZoneResult.e).to.not.exist;
    expect(createZoneResult).to.not.be.empty;

    deleteZoneCommand.z = createZoneResult.r.id;

    const deleteZoneResult = await deleteZone();

    expect(global.SPY.calledTwice).to.be.true;
    expect(deleteZoneResult.e).to.not.exist;
    expect(deleteZoneResult.r.result).to.be.true;
  });
});
