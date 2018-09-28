'use strict';

const ncu = require('npm-check-updates');

ncu.run().then((upgraded) => {
  // eslint-disable-next-line
  console.log('dependencies to upgrade:', upgraded);
});
