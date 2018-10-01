// const got = require('got');
// const { url } = require('../utils/serverurl');

class ServerObject {
  constructor({ description, config }) {
    Reflect.defineProperty(this, 'description', {
      value: Object.assign(Object.create(null), description),
      enumerable: false,
      writable: false,
    });
    this.g = config.g;
  }

  get zones() {
    return new Promise(async (resolve) => {
      const response = await this.g(`/servers/${this.description.id}/zones`);
      resolve(JSON.parse(response.body));
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
    const response = await this.g(postURL, options);

    return JSON.parse(response.body);
  }

  async deleteZone(id) {
    const deleteURL = `/servers/${this.description.id}/zones/${id}`;
    const options = Object.create(null);
    const response = await this.g.delete(deleteURL, options);

    return response.statusCode === 204;
  }
}

module.exports = ServerObject;
