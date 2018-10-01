/* eslint-disable no-unused-expressions */


const { describe, it } = require('mocha');
const { expect } = require('chai');
const { str } = require('./schm/lib');

describe('schm', () => {
  describe('str', () => {
    it('should successfully validate a string', () => {
      const stringToValidate = 'localhost';
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.true;
    });

    it('should fail validation on empty string', () => {
      const stringToValidate = '';
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.false;
    });

    it('should fail validation on null string', () => {
      const stringToValidate = null;
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.false;
    });

    it('should fail validation on undefined string', () => {
      let stringToValidate;
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.false;
    });

    it('should fail validation on non-string', () => {
      const stringToValidate = {};
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.false;
    });

    it('should fail validation on invalid content', () => {
      const stringToValidate = 'non-localhost';
      const validationRegEx = /^localhost$/u;
      const validationResult = str.validate(stringToValidate, validationRegEx);

      expect(validationResult).to.be.false;
    });
  });
});
