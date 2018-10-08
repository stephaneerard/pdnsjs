module.exports.defineConfigProperty = (Target) => {
  Reflect.defineProperty(Target, 'config', {
    value: Object.create(null),
    enumerable: true,
    writable: true,
  });
};

/**
 * @param {Object} t - Target
 * @param {String} n - Property's name
 * @param {any} v - Property's value
 */
module.exports.ro = ({ t, n, v }) => {
  Reflect.defineProperty(t, n, {
    value: v,
    enumerable: true,
    writable: false,
  });
};
