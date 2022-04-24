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

// deploy();

async function createCampaign() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("Creating campaign");
    await factory.methods
        .createCampaign(
            web3.utils.toWei("0.001", "ether"),
            "ABC",//"data.campaignName",
            "ABC",//data.description",
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fbaked-chicken-wings-with-sesame-seeds-and-sweet-chili-sauce-on-white-picture-id835903320%3Fk%3D20%26m%3D835903320%26s%3D612x612%26w%3D0%26h%3DWp2m7pcihAU4g7RcVW4Pabex1skrouzJwvWCR1-cGUs%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fchicken-wing&tbnid=_4J1dGmTbTWPUM&vet=12ahUKEwi75OT93Zn3AhUBomoFHZFoCQgQMygBegUIARCvAg..i&docid=iJN_zY001bWu3M&w=612&h=490&q=chicken%20wings%20image&ved=2ahUKEwi75OT93Zn3AhUBomoFHZFoCQgQMygBegUIARCvAg",//imageUrl,
            web3.utils.toWei("1", "ether")
        )
        .send({
            from: accounts[0],
        });
    console.log("Creating camaign: Successful");
 }

 createCampaign();
 createCampaign();
 createCampaign();