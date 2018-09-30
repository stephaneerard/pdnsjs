const got = require('got');
const url = require('./utils/serverurl').url;

module.exports.servers = async function servers(conf) {
  const response = await got(`${url(conf.endpoint)}/servers`, conf.api);
  return JSON.parse(response.body).map((server) => server.id);
};

// module.exports.one = async function one(conf, serverId) {
//   const result = await got(`${url(conf.endpoint)}/servers/${serverId}`, conf.api);
//   return JSON.parse(result.body);
// };

// module.exports = class Servers {
//   constructor(config) {
//     this.conf = config;
//   }

//   async list() {
//     const response = await got(`${url(this.conf.endpoint)}/servers`, this.conf.api);
//     return JSON.parse(response.body).map((server) => server.id);
//   }

//   // async list() {
//   //   const result = await got(`${url(this.conf.endpoint)}/servers`, this.conf.api);
//   //   return JSON.parse(result.body);
//   // }

//   // async one(serverId) {
//   //   const result = await got(`${url(this.conf.endpoint)}/servers/${serverId}`, this.conf.api);
//   //   return JSON.parse(result.body);
//   // }
// }
