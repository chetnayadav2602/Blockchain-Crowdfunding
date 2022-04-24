// import HDWalletProvider from 'truffle-hdwallet-provider';
// import Web3 from 'web3';
// import config from './config.js';
// import compiledFactory from './build/CampaignFactory.json' assert {type: 'json'};

const web3 = require('./web3.js');
const config = require('./config.js');
const HDWalletProvider = require('truffle-hdwallet-provider');
const compiledFactory = require('./build/CampaignFactory.json');

const factory = require('./factory');


const provider = new HDWalletProvider(
    config.mnemonic,
    config.link
);

// const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0] });

    console.log('Contract deploy to ', result.options.address);
};

deploy();