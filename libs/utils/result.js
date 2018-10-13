// const nonceRe = new RegExp(/^(?<path>\S+)\?n:(?<nonce>\d{13})$/gmiu);
// const token = path => nonceRe.exec(path).groups;

module.exports.r = ({ error = null, result = null }) => {
  let err = null;

  if (error) {
    const {
      code,
      hostname,
      method,
      name,
      path,
      protocol,
      url,
    } = error;

    err = {
      ...Object.create(null),
      ...{
        code,
        hostname,
        method,
        name,
        path,
        protocol,
        url,
      },
      // ...token(path),
    };
  }

  return Object.assign(
    Object.create(null),
    {
      e: err,
      r: result,
    },
  );
};
