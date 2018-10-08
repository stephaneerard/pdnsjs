const { cloneDeep } = require('lodash');
// const util = require('util');

class ZoneObject {
  constructor({ description, config }) {
    Reflect.defineProperty(this, 'description', {
      value: Object.freeze(Object.assign(Object.create(null), cloneDeep(description))),
      enumerable: true,
      writable: false,
    });

    Reflect.defineProperty(this, 'g', {
      value: config.g,
      enumerable: false,
      writable: false,
    });
    // // eslint-disable-next-line no-console
    // console.log(util.inspect(description, {
    //   showHidden: true,
    //   depth: null,
    //   colors: true,
    //   showProxy: true,
    //   maxArrayLength: null,
    // }));
  }

  get rrsets() {
    return this.description.rrsets;
  }
}

module.exports = ZoneObject;
