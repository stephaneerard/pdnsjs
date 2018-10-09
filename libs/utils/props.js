module.exports.createHandlerProperties = ({ instance, response, tokens }) => {
  Reflect.defineProperty(instance, 'response', {
    value: response,
    enumerable: false,
    writable: false,
  });

  Reflect.defineProperty(instance, 'g', {
    enumerable: false,
    writable: true,
  });

  Reflect.defineProperty(instance, 'TOKENS', {
    value: tokens,
    enumerable: false,
    writable: false,
  });
};
