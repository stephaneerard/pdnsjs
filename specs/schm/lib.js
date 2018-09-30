const util = require('util');

module.exports.str = {
  validate: function (v, re) {
    let result = false;

    try {
      result = re.test(v);
    } catch (e) {}

    return result;
  },
};