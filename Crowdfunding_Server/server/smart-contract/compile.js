// import path from "path";
// import solc from "solc";
// import fs from"fs-extra";

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.dirname("build/Hello.json");
fs.removeSync(buildPath); // deleting the folder and all the content inside it

// const whitelistPath = path.resolve( "Contracts", "Whitelist.sol");
// const source_whitelist = fs.readFileSync(whitelistPath, "utf8");
// const output_whitelist = solc.compile(source_whitelist, 1).contracts;

const campaignPath = path.resolve( "Contracts", "Campaigns.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // create a build folder if that folder doesn't exists

// for (let contract in output_whitelist) {
//     fs.outputJSONSync(
//       path.resolve(buildPath, contract.replace(":", "").concat(".json")),
//       output_whitelist[contract]
//     );
// };

for (let contract in output) {
    fs.outputJSONSync(
      path.resolve(buildPath, contract.replace(":", "").concat(".json")),
      output[contract]
    );
};