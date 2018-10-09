/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createOptions } = require('../libs/utils/options');

describe('Options', () => {
  it('creates a JSONless options struct', () => {
    const value = { a: 'b' };
    const options = createOptions({ value });

    expect(options).to.be.an('object');
    expect(options.body).to.be.a('string');
    expect(options.json).to.be.false;
  });
});
