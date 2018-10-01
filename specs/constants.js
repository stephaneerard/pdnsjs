

const process = require('process');

module.exports.endpoint = {
  proto: 'http',
  host: process.env.PDNS_HOST ? process.env.PDNS_HOST : '192.168.0.2',
  port: process.env.PDNS_PORT ? process.env.PDNS_PORT : '8888',
  basePath: '/api/v1',
};

module.exports.apikey = process.env.PDNS_APIKEY
  ? process.env.PDNS_APIKEY : 'pdnsapikey';
