module.exports.defineConfigProperty = (Target) => {
  Reflect.defineProperty(Target, 'config', {
    value: '',
    enumerable: true,
    writable: true,
  });
};
