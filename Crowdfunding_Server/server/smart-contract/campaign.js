

const web3 = require('./web3.js');

const Campaign = require('./build/Campaign.json');


const instance = new web3.eth.Contract(
  Campaign.abi,
  "0xED46EeF02B72984E59025D751E00aDEBCdB47aaE"
);

module.exports = instance;
