module.exports.str = {
  validate(v, re) {
    let result = false;

    try {
      result = re.test(v);
    } catch (e) {
      // continue regardless of error
    }

    return result;
  },
};
