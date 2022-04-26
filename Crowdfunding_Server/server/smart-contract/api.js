
const web3 = require("./web3.js");
const factory = require("./factory");
const campaign = require("./campaign");
const whitelist = require("./whitelist");

const Campaign = require('./build/Campaign.json');



// Whitelist methods
async function addAddressToFundRaiser(user_address) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("Adding Address to fund raiser");
    await whitelist.methods
        .addAddressToFundRaiser(user_address)
        .send({
            from: accounts[0],
        });

    console.log("Adding Address to fund raiser : Sucessful");
}

async function addAddressToFundApprover(user_address) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("Adding Address to fund raiser");
    await whitelist.methods
        .addAddressToFundApprover(user_address)
        .send({
            from: accounts[0],
        });

    console.log("Adding Address to fund raiser : Sucessful");
}


async function getRolesOfUser(user_address) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("Calling getRolesOfUser");
    const val = await whitelist.methods
        .getRolesOfUser(user_address)
        .call();

    console.log("Calling getRolesOfUser : Sucessful");
    return val;
}


async function createKYCRequest(first_Name, last_Name, email, phone, doc_type, role_applied_for) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const val = await whitelist.methods.createKYCRequest(
        first_Name, last_Name, email, phone, doc_type, role_applied_for
    ).send({
        from: accounts[0]
    });
    console.log(val);
    console.log("Got response from contract createKYCRequest : Successful");
    return val;
}

async function fetchKYCRequests() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const val = await whitelist.methods.fetchKYCRequests().call();
    console.log(val);
    var results = [];
    for (let i = 0; i < val.length; i++) {
        var request = {};
        request['first_name'] = val[i][0];
        request['last_name'] = val[i][1];
        request['email'] = val[i][2];
        request['phone'] = val[i][3];
        request['user_address'] = val[i][4];
        request['doc_type'] = val[i][5];
        request['role_requested'] = val[i][6];
        request['status'] = val[i][7];
        results.push(request);
    }
    console.log("Got response from contract pendingKYCRequests : Successful");
    return results;
}

async function approveKYCRequest(user_address, role_applied_for) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("calling approveKYCRequest api")
    const val = await whitelist.methods.approveKYCRequest(user_address, role_applied_for).send({
        from: accounts[0]
    });
    console.log(val);
    console.log("Got response from contract approveKYCRequest : Successful");
    return val;
}

async function rejectKYCRequest(user_address, role_applied_for) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const val = await whitelist.methods.rejectKYCRequest(user_address, role_applied_for).send({
        from: accounts[0]
    });
    console.log(val);
    console.log("Got response from contract rejectKYCRequest : Successful");
    return val;
}

// Create Campaign Methods
async function createCampaign(cname, cdesc, cimage) {
    console.log("Creating campaign");
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await factory.methods
        .createCampaign(
            web3.utils.toWei("0.001", "ether"),
            cname,//"data.campaignName",
            cdesc,//data.description",
            cimage,
            // "https://www.google.com/imgres?cimage=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fbaked-chicken-wings-with-sesame-seeds-and-sweet-chili-sauce-on-white-picture-id835903320%3Fk%3D20%26m%3D835903320%26s%3D612x612%26w%3D0%26h%3DWp2m7pcihAU4g7RcVW4Pabex1skrouzJwvWCR1-cGUs%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fchicken-wing&tbnid=_4J1dGmTbTWPUM&vet=12ahUKEwi75OT93Zn3AhUBomoFHZFoCQgQMygBegUIARCvAg..i&docid=iJN_zY001bWu3M&w=612&h=490&q=chicken%20wings%20image&ved=2ahUKEwi75OT93Zn3AhUBomoFHZFoCQgQMygBegUIARCvAg",//imageUrl,
            web3.utils.toWei("1", "ether")
        )
        .send({
            from: accounts[0],
        });
    console.log("Creating camaign: Successful");
}


async function fetchDeployedCampaigns() {
    console.log("Fetching Deployed Campaigns");
    const val = await factory.methods.getDeployedCampaigns().call();
    console.log("Fetching Deployed Campaigns : Successful");
    return val;
}


async function getSummary(contract_address) {
    console.log("Fetching Summary of a campaign");
    const campaign = new web3.eth.Contract(
        Campaign.abi,
        contract_address
    );
    const val = await campaign.methods.getSummary().call();
    console.log(val);
    console.log("Fetching Summary of a campaign : Successful");
    return val;
}


async function contribute(contract_address, amount) {
    console.log("Contribute to campaign called");
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const campaign = new web3.eth.Contract(
        Campaign.abi,
        contract_address
    );
    const val = await campaign.methods.contribute().send({
        from: accounts[0],
        value : web3.utils.toWei(amount, "ether")
    });
    console.log(val);
    console.log("Contribute to campaign called : Successful");
    return val;
}


async function getDeployedCampaignsDetails() {
    const addresses = await factory.methods.getDeployedCampaigns().call();
    console.log(addresses);
    console.log("Calling getDeployedCampaignsDetails");
    const deployedCampaigns = [];
    for (let i = 0; i < addresses.length; i++) {
        const campaign = new web3.eth.Contract(
            Campaign.abi,
            addresses[i]
        );
        const val = await campaign.methods.getSummary().call();
        console.log(val);
        var request = {};
        request['min_contribution'] = web3.utils.fromWei(val["0"], 'ether');
        request['balance'] = web3.utils.fromWei(val["1"], 'ether');
        request['manager'] = val["2"];
        request['campaign_name'] = val["3"];
        request['campaign_desc'] = val["4"];
        request['image_url'] = val["5"];
        request['target_to_acheive'] = web3.utils.fromWei(val["6"], 'ether');

        deployedCampaigns.push(request);
    }

    console.log("getDeployedCampaignsDetails : Successful");
    return deployedCampaigns;
}






module.exports = {
    createCampaign: createCampaign,
    fetchDeployedCampaigns: fetchDeployedCampaigns,
    getSummary: getSummary,
    createKYCRequest: createKYCRequest,
    approveKYCRequest: approveKYCRequest,
    rejectKYCRequest: rejectKYCRequest,
    addAddressToFundRaiser: addAddressToFundRaiser,
    addAddressToFundApprover: addAddressToFundApprover,
    fetchKYCRequests: fetchKYCRequests,
    getDeployedCampaignsDetails: getDeployedCampaignsDetails,
    getRolesOfUser: getRolesOfUser,
    contribute: contribute
}
