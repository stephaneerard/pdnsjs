module.exports.url = function url(endpoint) {
  return `${endpoint.proto}://${endpoint.host}${endpoint.port ? `:${endpoint.port}` : ''}${endpoint.basePath}`;
};
