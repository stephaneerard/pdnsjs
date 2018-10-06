const { REQ_SERVERS } = require('../constants');

const COMMANDS = Object.assign(Object.create(null), {
  [REQ_SERVERS]: Object.assign(Object.create(null), { t: REQ_SERVERS }),
});

module.exports.getCommand = commandName => Object.assign(
  Object.create(null), COMMANDS[commandName],
);
