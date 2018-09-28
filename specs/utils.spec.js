const { describe, it } = require('mocha');
const { expect } = require('chai');
const url = require('../libs/utils/serverurl').url;

describe('utils', () => {
  describe('url', () => {
    const endpoint = {
      proto: 'http',
      host: '127.0.0.1',
      port: 888,
      basePath: '/api/v1',
    };

    it('should construct URL with PORT', () => {
      const expectedURL = `${endpoint.proto}://${endpoint.host}:${endpoint.port}${endpoint.basePath}`;
      const constructedURL = url(endpoint);

      expect(constructedURL).to.equal(expectedURL);
    });

    it('should construct URL w/o PORT', () => {
      const nonePortEndpoint = Object.assign(Object.create(null), endpoint);

      delete nonePortEndpoint.port;

      const expectedURL = `${nonePortEndpoint.proto}://${nonePortEndpoint.host}${nonePortEndpoint.basePath}`;
      const constructedURL = url(nonePortEndpoint);

      expect(constructedURL).to.equal(expectedURL);
    });
  });
});