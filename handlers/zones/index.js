const {
  REQ_ZONES,
  REQ_CREATE_ZONE,
  REQ_DELETE_ZONE,
} = require('../../constants');
const { MODIFIED_OK } = require('../../constants/codes');

module.exports = class ZonesHandler {
  constructor(response) {
    Reflect.defineProperty(this, 'response', {
      value: response,
      enumerable: false,
      writable: false,
    });

    Reflect.defineProperty(this, 'g', {
      enumerable: false,
      writable: true,
    });

    Reflect.defineProperty(this, 'TOKENS', {
      value: [REQ_ZONES, REQ_CREATE_ZONE, REQ_DELETE_ZONE],
      enumerable: false,
      writable: false,
    });
  }

  set G(g) {
    this.g = g;
  }

  get tokens() {
    return this.TOKENS;
  }

  async createZone(command) {
    const options = Object.assign(
      Object.create(null),
      {
        body: JSON.stringify(command.z),
        json: false,
      },
    );
    const response = await this.g.post(`/servers/${command.i}/zones`, options);
    const {
      api_rectify, // eslint-disable-line camelcase
      dnssec,
      id,
      kind,
      masters,
      name,
      rrsets,
      serial,
    } = JSON.parse(response.body);

    this.response(
      Object.assign(
        Object.create(null),
        {
          api_rectify, // eslint-disable-line camelcase
          dnssec,
          id,
          kind,
          masters,
          name,
          rrsets,
          serial,
        },
      ),
    );
  }

  async requestZones(command) {
    const response = await this.g.get(`/servers/${command.i.serverId}/zones`);
    const zones = JSON.parse(response.body);
    const result = zones.map(
      ({
        // eslint-disable-next-line camelcase
        dnssec, id, kind, last_check, masters, name, serial,
      }) => Object.freeze(
        Object.assign(
          Object.create(null),
          {
            dnssec, id, kind, last_check, masters, name, serial,
          },
        ),
      ),
    );

    this.response(result);
  }

  async deleteZone(command) {
    const options = Object.create(null);
    const response = await this.g.delete(`/servers/${command.i}/zones/${command.z}`, options);

    this.response({ result: response.statusCode === MODIFIED_OK });
  }

  async handle(command) {
    switch (command.t) {
      case REQ_ZONES: {
        this.requestZones(command);
        break;
      }
      case REQ_CREATE_ZONE: {
        this.createZone(command);
        break;
      }
      case REQ_DELETE_ZONE: {
        this.deleteZone(command);
        break;
      }
      default: {
        throw new EvalError('unknown command:', JSON.stringify(command));
      }
    }
  }
};
