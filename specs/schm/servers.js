const schema = require('schm');
const validate = require('schm');

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
      return (v.length > 0) && config_url_regex.test(v);
    },
  },
  daemon_type: {
    type: String,
    required: true,
    validate: function (v) {
      return (v.length > 0) && daemon_type_regex.test(v);
    },
  },
  id: {
    type: String,
    required: true,
    validate: function (v) {
      return (v.length > 0) && id_regex.test(v);
    },
  },
  type: {
    type: String,
    required: true,
    validate: function (v) {
      return (v.length > 0) && type_regex.test(v);
    },
  },
  url: {
    type: String,
    required: true,
    validate: function (v) {
      return (v.length > 0) && url_regex.test(v);
    },
  },
  version: {
    type: String,
    required: true,
    validate: function (v) {
      const isStringOK = (v.length > 0) && version_regex.test(v);
      
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
      return (v.length > 0) && zones_url_regex.test(v);
    },
  },
});

module.exports.check = function (v) {
  return serversSchema.validate (v);
};
