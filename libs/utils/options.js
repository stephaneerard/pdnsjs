module.exports.createOptions = ({ value }) => Object.assign(
  Object.create(null),
  {
    body: JSON.stringify(value),
    json: false,
  },
);
