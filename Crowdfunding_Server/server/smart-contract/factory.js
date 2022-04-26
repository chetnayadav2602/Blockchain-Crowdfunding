
const web3 = require('./web3.js');
const config = require('./config.js');
const CampaignFactory = require('./build/CampaignFactory.json');


const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  config.factory_addr
);

module.exports = instance;
