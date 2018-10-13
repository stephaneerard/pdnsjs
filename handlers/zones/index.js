const {
  REQ_ZONES,
  REQ_CREATE_ZONE,
  REQ_DELETE_ZONE,
} = require('../../constants');
const { MODIFIED_OK } = require('../../constants/codes');
const { BasehandlerClass } = require('../../libs/classes/BaseHandlerClass');
const { createOptions } = require('../../libs/utils/options');
const { UnknownCommandError } = require('../../errors/UnknownCommandError');
const { r } = require('../../libs/utils/result');

module.exports = class ZonesHandler extends BasehandlerClass {
  constructor(response) {
    super({
      response,
      tokens: [REQ_ZONES, REQ_CREATE_ZONE, REQ_DELETE_ZONE],
    });
  }

  async createZone(command) {
    let result = null;
    let error = null;

    try {
      const response = await this.g.post(
        `/servers/${command.i}/zones`,
        createOptions({ value: command.z }),
      );

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

      result = Object.assign(
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
      );
    } catch (e) {
      error = Object.assign(Object.create(null), e);
      // eslint-disable-next-line no-console
      console.log(error, JSON.stringify(command));
    } finally {
      this.response(r({ error, result }));
    }
  }

  async requestZones(command) {
    let result = null;
    let error = null;

    try {
      const response = await this.g.get(`/servers/${command.i.serverId}/zones`);
      const zones = JSON.parse(response.body);
      result = zones.map(
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
    } catch (e) {
      error = Object.assign(Object.create(null), e);
    } finally {
      this.response(r({ error, result }));
    }
  }

  async deleteZone(command) {
    let result = null;
    let error = null;

    try {
      const response = await this.g.delete(
        `/servers/${command.i}/zones/${command.z}`,
        Object.create(null),
      );
      result = { result: response.statusCode === MODIFIED_OK };
    } catch (e) {
      error = Object.assign(Object.create(null), e);
    } finally {
      this.response(r({ error, result }));
    }
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
        throw new UnknownCommandError(JSON.stringify(command));
      }
    }
  }
};
