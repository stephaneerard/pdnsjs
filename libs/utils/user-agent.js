const pkg = require('../../package.json');

module.exports.userAgent = () => `${pkg.name}/${pkg.version} (${pkg.homepage})`;
