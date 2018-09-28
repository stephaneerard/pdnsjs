const schema = require('schm');
const validate = require('schm');
const { str } = require('./lib');

const config_url_regex = /^\/api\/v\d{1}\/servers\/localhost\/config\{\/config_setting\}$/u;
const daemon_type_regex = /^(authoritative|recursor)$/u;
const id_regex = /^localhost$/u;
const type_regex = /^Server$/u;
const url_regex = /^\/api\/v\d{1}\/servers\/localhost$/u;
const version_regex = /^(?<major>\d).(?<minor>\d).(?<patch>\d)$/u;
const zones_url_regex = /^\/api\/v\d{1}\/servers\/localhost\/zones\{\/zone\}$/u;

const serversSchema = schema({
  config_url: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, config_url_regex);
    },
  },
  daemon_type: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, daemon_type_regex);
    },
  },
  id: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, id_regex);
    },
  },
  type: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, type_regex);
    },
  },
  url: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, url_regex);
    },
  },
  version: {
    type: String,
    required: true,
    validate: function (v) {
      const isStringOK = str.validate(v, version_regex);
      
      if (isStringOK === false) { return false; }
      
      const {groups: { major, minor, patch }} = version_regex.exec(v);

      return (
        Number.parseInt(major) === 4
      ) && (
        Number.parseInt(minor) === 1
      ) && (
        Number.parseInt(patch) === 4
      );
    },
  },
  zones_url: {
    type: String,
    required: true,
    validate: function (v) {
      return str.validate(v, zones_url_regex);
    },
  },
});

module.exports.check = function (v) {
  return serversSchema.validate (v);
};
