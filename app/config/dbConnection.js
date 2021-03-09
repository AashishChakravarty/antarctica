const modelConfig = require('../models/index');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  bootstrap: () => {
    modelConfig.connection
      .sync()
      .then(() => {
        console.log(
          `\n######################################### MODELS SYNCED | ENVIRONMENT : ${env} #########################################\n`
        );
      })
      .catch((error) => {
        console.log(
          `\n######################################### ERROR IN SYNC | ENVIRONMENT : ${env} #########################################\n`
        );
        console.error(`ERROR ${error}}`);
      });
  },
};
