// import web3 from "./web3.js";
// import config from './config.js';
// import CampaignFactory from "./build/Whitelist.json" assert {type: 'json'};

const web3 = require('./web3.js');
const config = require('./config.js');
const CampaignFactory = require('./build/Whitelist.json');


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  config.whitelist_addr
);

module.exports = instance;