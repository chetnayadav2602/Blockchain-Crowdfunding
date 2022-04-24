// import HDWalletProvider from "truffle-hdwallet-provider";
// import Web3 from "web3";
// import config from './config.js';

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const config = require('./config.js');

const provider = new HDWalletProvider(
  config.mnemonic,
  config.link
);

const web3 = new Web3(provider);
// if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
//   // we are in the browser and meta mask is installed
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   // we are on the server *OR* meta mask is not running
//   // creating our own provider
//   const provider = new Web3.providers.HttpProvider(
//     process.env.link
//   );
//   console.log("Connecting to local smart contracts");
//   web3 = new Web3(provider);
// }

module.exports = web3;
