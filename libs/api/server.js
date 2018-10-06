const ZoneObject = require('./zone');

class ServerObject {
  constructor({ description, config }) {
    Reflect.defineProperty(this, 'description', {
      value: Object.freeze(Object.assign(Object.create(null), description)),
      enumerable: true,
      writable: false,
    });

    Reflect.defineProperty(this, 'g', {
      value: config.g,
      enumerable: false,
      writable: false,
    });
  }

  get zones() {
    return new Promise(async (resolve) => {
      const response = await this.g(`/servers/${this.description.id}/zones`);
      const zones = JSON.parse(response.body);
      resolve(
        zones.map(
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
        ),
      );
    });
  }

  async createZone(zoneConfig) {
    const postURL = `/servers/${this.description.id}/zones`;
    const options = Object.assign(
      Object.create(null),
      {
        body: JSON.stringify(zoneConfig),
        json: false,
      },
    );
    const response = await this.g.post(postURL, options);
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

    return new ZoneObject({
      description: {
        api_rectify, // eslint-disable-line camelcase
        dnssec,
        id,
        kind,
        masters,
        name,
        rrsets,
        serial,
      },
      config: { g: this.g },
    });
  }

  async deleteZone(id) {
    const deleteURL = `/servers/${this.description.id}/zones/${id}`;
    const options = Object.create(null);
    const response = await this.g.delete(deleteURL, options);

    return response.statusCode === 204;
  }
}

module.exports = ServerObject;
