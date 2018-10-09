/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createHandlerProperties } = require('../libs/utils/props');

describe('Props', () => {
  it('creates default handler\'s properties', () => {
    const instance = {};
    const propDefinitions = {
      instance,
      response: () => {},
      tokens: ['A'],
    };

    createHandlerProperties(propDefinitions);

    expect(instance).to.have.ownPropertyDescriptor('response', {
      value: propDefinitions.response,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    expect(instance.response).to.be.a('function');

    expect(instance).to.have.ownPropertyDescriptor('g', {
      value: undefined,
      writable: true,
      enumerable: false,
      configurable: false,
    });

    expect(instance).to.have.ownPropertyDescriptor('TOKENS', {
      value: propDefinitions.tokens,
      enumerable: false,
      writable: false,
      configurable: false,
    });
  });
});
