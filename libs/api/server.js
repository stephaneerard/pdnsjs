const got = require('got');
const url = require('../utils/serverurl').url;

class ServerObject {
  constructor({ description, config }) {
    Reflect.defineProperty(this, 'description', {
      value: Object.assign(Object.create(null), description),
      enumerable: false,
      writable: false,
    });
    Reflect.defineProperty(this, 'config', {
      value: Object.assign(Object.create(null), config),
      enumerable: false,
      writable: false,
    });
    this.g = got.extend({
      baseUrl: url(this.config.endpoint),
      headers: this.config.api.headers,
    });
  }

  get zones() {
    return new Promise(async (resolve, reject) => {
      const response = await this.g(`/servers/${this.description.id}/zones`, this.config.api);
      resolve(JSON.parse(response.body));
    });
  }

  async create_zone(zoneConfig) {
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

  async delete_zone(id) {
    const deleteURL = `/servers/${this.description.id}/zones/${id}`;
    const options = Object.create(null);
    const response = await this.g.delete(deleteURL, options);

    return response.statusCode === 204;
  }

}


module.exports = ServerObject;
