const {
  config,
  createLogger,
  format,
  transports,
} = require('winston');

const {
  combine,
  label,
  printf,
  timestamp,
} = format;

const defaultFormat = printf(
  (info) => {
    let msg = info.message;

    if (typeof info.message === 'object') {
      msg = JSON.stringify(info.message);
    }

    return `${info.timestamp} [${info.label}] ${info.level}: ${msg}`;
  },
);

module.exports.logger = createLogger({
  format: combine(
    label({ label: 'LABEL' }),
    timestamp(),
    defaultFormat,
  ),
  level: config.npm.levels.error,
  transports: [
    new transports.Console({ format: format.json() }),
  ],
});
