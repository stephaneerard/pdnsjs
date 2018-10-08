/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { url } = require('../libs/utils/serverurl');

describe('utils', () => {
  describe('url', () => {
    it('should construct URL with PORT', () => {
      const expectedURL = `${global.pdnsConfig.proto}://${global.pdnsConfig.host}:${global.pdnsConfig.port}${global.pdnsConfig.basePath}`;
      const constructedURL = url(global.pdnsConfig);

      expect(constructedURL).to.equal(expectedURL);
    });

    it('should construct URL w/o PORT', () => {
      const nonePortEndpoint = Object.assign(Object.create(null), global.pdnsConfig);

      delete nonePortEndpoint.port;

      const expectedURL = `${nonePortEndpoint.proto}://${nonePortEndpoint.host}${nonePortEndpoint.basePath}`;
      const constructedURL = url(nonePortEndpoint);

      expect(constructedURL).to.equal(expectedURL);
    });
  });
});
