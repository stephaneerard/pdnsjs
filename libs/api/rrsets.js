class RRSets {
  constructor(config) {
    Reflect.defineProperty(this, 'g', {
      value: config.g,
      enumerable: false,
      writable: false,
    });

    this.zoneId = config.zoneId;
  }
  // async add({
  //   name, type, records, comments,
  // }) {
  //   const response = await this.g(`/servers/${this.description.id}/zones/${this.zoneId}`);
  //   const zones = JSON.parse(response.body);
  // }
}

module.exports = RRSets;
