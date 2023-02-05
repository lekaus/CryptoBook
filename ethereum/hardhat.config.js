import * as dotenv from "dotenv";

dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/c5d65a52fe814562a11b8fe2442faf2a", //Infura url with projectId

      accounts: [process.env.PRIVATE_KEY], // add the account that will deploy the contract (private key)
    },
  },
};
