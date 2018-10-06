module.exports.getServers = async (g) => {
  const response = await g.get('/servers');
  const result = JSON.parse(response.body);
  // eslint-disable-next-line camelcase
  return result.map(({ id, daemon_type, version }) => Object.freeze(
    Object.assign(
      Object.create(null),
      { id, daemon_type, version },
    ),
  ));
};
