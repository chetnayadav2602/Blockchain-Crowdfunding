// import web3 from "./web3.js";
// import config from './config.js';
// import CampaignFactory from "./build/CampaignFactory.json" assert {type: 'json'};

const web3 = require('./web3.js');
const config = require('./config.js');
const Campaign = require('./build/Campaign.json');


const instance = new web3.eth.Contract(
  JSON.parse(Campaign.interface),
  "0x6626aA3DC8a0289476b5b27b1c709DE333d568aA"
);

module.exports = instance;
