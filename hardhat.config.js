require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity:{
    version:"0.8.9",
  } ,
  networks: {
    mumbai: {
      url: process.env.TESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    localhost: {
      url: "https://127.0.0.1:8545"
    }
  }, 
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};