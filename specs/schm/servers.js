const schema = require('schm');
const { str } = require('./lib');

const configUrlRegex = /^\/api\/v\d{1}\/servers\/localhost\/config\{\/config_setting\}$/u;
const daemonTypeRegex = /^(authoritative|recursor)$/u;
const idRegex = /^localhost$/u;
const typeRegex = /^Server$/u;
const urlRegex = /^\/api\/v\d{1}\/servers\/localhost$/u;
const versionRegex = /^(?<major>\d).(?<minor>\d).(?<patch>\d)$/u;
const zonesUrlRegex = /^\/api\/v\d{1}\/servers\/localhost\/zones\{\/zone\}$/u;

const stringValidator = function define(regEx) {
  return {
    type: String,
    required: true,
    validate(v) {
      return str.validate(v, regEx);
    },
  };
};

const serversSchema = schema({
  config_url: stringValidator(configUrlRegex),
  daemon_type: stringValidator(daemonTypeRegex),
  id: stringValidator(idRegex),
  type: stringValidator(typeRegex),
  url: stringValidator(urlRegex),
  version: {
    type: String,
    required: true,
    validate(v) {
      const isStringOK = str.validate(v, versionRegex);

      if (isStringOK === false) { return false; }

      const { groups: { major, minor, patch } } = versionRegex.exec(v);

      return (
        Number.parseInt(major, 10) === 4
      ) && (
        Number.parseInt(minor, 10) === 1
      ) && (
        Number.parseInt(patch, 10) === 4
      );
    },
  },
  zones_url: stringValidator(zonesUrlRegex),
});

module.exports.check = function check(v) {
  return serversSchema.validate(v);
};