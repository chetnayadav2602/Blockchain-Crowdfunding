
const web3 = require("./web3.js");
const factory = require("./factory");
const campaign = require("./campaign");

// Fetching the accounts of web3


// Whitelist methods
async function addAddressToFundRaiser() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log("Adding Address to fund raiser");
    await whitelist.methods
        .addAddressToFundRaiser(accounts[0])
        .send({
            from: accounts[0],
        });

    console.log("Adding Address to fund raiser : Sucessful");
}


// Create Campaign Methods
async function createCampaign(cname,cdesc,cimage) {
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

async function getSummary() {
    console.log("Fetching Deployed Campaigns");
    const val = await campaign.methods.getSummary().call();
    console.log(typeof val);
    console.log( val);
    console.log("Fetching Deployed Campaigns : Successful");
    return val;
}

module.exports = {
    createCampaign: createCampaign,
    fetchDeployedCampaigns : fetchDeployedCampaigns,
    getSummary : getSummary
}