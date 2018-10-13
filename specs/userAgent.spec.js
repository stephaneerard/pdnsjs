/* eslint-disable no-unused-expressions */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { userAgent } = require('../libs/utils/user-agent');

describe('userAgent', () => {
  it('validates user-agent string', () => {
    const re = /^\S+\/\d+\.\d+\.\d+\s+\(.+\)$/gius;

    expect(re.test(userAgent())).to.be.true;
  });
});
