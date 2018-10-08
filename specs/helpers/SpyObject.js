const EventEmitter = require('events');

class SpyObject extends EventEmitter {
  constructor() {
    super();
    this.pdnsCallback = this.pdnsCallback.bind(this);
  }

  pdnsCallback(data) {
    this.emit('call', data);
  }
}

module.exports.spyObject = new SpyObject();
