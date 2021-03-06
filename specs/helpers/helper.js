require('dotenv').config();

const { env } = require('process');
const {
  beforeEach,
  afterEach,
} = require('mocha');
const sandbox = require('sinon').createSandbox();
const { spyObject } = require('./SpyObject');
const PowerDNS = require('../../pdns');

// eslint-disable-next-line import/newline-after-import
global.logger = require('./logger').logger;
global.pdnsConfig = Object.assign(Object.create(null), {
  proto: env.PDNS_PROTO,
  host: env.PDNS_HOST,
  port: env.PDNS_PORT,
  basePath: env.PDNS_BASE_PATH,
  headers: { 'X-API-Key': env.PDNS_API_KEY },
  timeout: Number.parseInt(env.NET_TIMEOUT, 10),
  retries: Number.parseInt(env.NET_RETRIES, 10),
});

global.spyObject = spyObject;
global.defaultServerId = 'localhost';
global.defaultZoneId = 'dmx.';

beforeEach(() => {
  global.SPY = sandbox.spy(global.spyObject, 'pdnsCallback');
  global.PDNS = new PowerDNS(global.spyObject.pdnsCallback).configure(global.pdnsConfig);
});

afterEach(() => {
  sandbox.restore();
});
