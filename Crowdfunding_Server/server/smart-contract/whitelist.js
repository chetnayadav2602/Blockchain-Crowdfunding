const web3 = require('./web3.js');
const config = require('./config.js');
const CampaignFactory = require('./build/Whitelist.json');


const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  config.whitelist_addr
);

module.exports = instance;