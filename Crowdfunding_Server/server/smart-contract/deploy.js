
const web3 = require('./web3.js');
const compiledFactory = require('./build/CampaignFactory.json');


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0]});

    console.log('Contract deploy to ', result.options.address);
};

deploy();