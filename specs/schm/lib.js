module.exports.str = {
  validate: function (v, re) {
    return (v.length > 0) && re.test(v);
  },
};