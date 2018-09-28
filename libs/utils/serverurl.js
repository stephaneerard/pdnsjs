module.exports.url = function (endpoint) {
  return `${endpoint.proto}://${endpoint.host}${endpoint.port ? ':' + endpoint.port : ''}${endpoint.basePath}`;
}

