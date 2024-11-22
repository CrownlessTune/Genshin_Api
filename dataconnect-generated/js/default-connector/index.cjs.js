const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Genshin_Api',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

