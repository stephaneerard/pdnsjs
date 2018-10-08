const {
  REQ_SERVERS,
  REQ_ZONES,
  REQ_CREATE_ZONE,
  REQ_DELETE_ZONE,
  REQ_CREATE_HOST,
} = require('../constants');

const COMMANDS = Object.assign(Object.create(null), {
  /**
   * @param {String} t - type of the command {@link REQ_SERVERS}.
   */
  [REQ_SERVERS]: Object.assign(Object.create(null), { t: REQ_SERVERS }),
  /**
   * @param {String} t - type of the command {@link REQ_ZONES}.
   * @param {String} i - server id.
   */
  [REQ_ZONES]: Object.assign(Object.create(null), { t: REQ_ZONES, i: null }),
  /**
   * @param {String} t - type of the command {@link REQ_CREATE_ZONE}.
   * @param {String} i - server id.
   * @param {String} z - zone info.
   */
  [REQ_CREATE_ZONE]: Object.assign(Object.create(null), { t: REQ_CREATE_ZONE, i: null, z: null }),
  /**
   * @param {String} t - type of the command {@link REQ_CREATE_ZONE}.
   * @param {String} i - server id.
   * @param {String} z - zone id.
   */
  [REQ_DELETE_ZONE]: Object.assign(Object.create(null), { t: REQ_DELETE_ZONE, i: null, z: null }),
  /**
   * @param {String} t - type of the command {@link REQ_CREATE_ZONE}.
   * @param {String} i - server id.
   * @param {String} z - zone id.
   * @param {Object} h - host info.
   */
  [REQ_CREATE_HOST]: Object.assign(Object.create(null), {
    t: REQ_DELETE_ZONE,
    i: null,
    z: null,
    h: null,
  }),
});

/**
 * Returns a command struct by its name.
 *
 * @param {string} commandName - Name of the command.
 * @example
 * // returns { t: REQ_SERVERS }
 * const command = getCommand(REQ_SERVERS);
 * @returns {Object} Command struct.
 */
module.exports.getCommand = commandName => Object.assign(
  Object.create(null), COMMANDS[commandName],
);
