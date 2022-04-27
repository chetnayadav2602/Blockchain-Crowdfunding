

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.dirname("build/Hello.json");
fs.removeSync(buildPath); // deleting the folder and all the content inside it

const campaignPath = path.resolve( "Contracts", "Campaigns.sol");
console.log(campaignPath);
const source = fs.readFileSync(campaignPath, "utf8");

fs.ensureDirSync(buildPath); // create a build folder if that folder doesn't exists

const input = {
  language: "Solidity",
  sources: {
    "Campaigns.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
console.log(input);

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Outout is");
console.log(output);

for (const [key, value] of Object.entries(output.contracts["Campaigns.sol"])) {
      fs.outputJSONSync(
      path.resolve(buildPath, key.concat(".json")),
      value
    );
}
