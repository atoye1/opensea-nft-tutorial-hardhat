/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('./scripts/deploy.js');
require('./scripts/mint.js');

const {
  ALCHEMY_KEY,
  GOERLI_ACCOUNT_PRIVATE_KEY,
  LOCAL_ENDPOINT,
  LOCAL_ACCOUNT_PRIVATE_KEY,
  REMOTE_ENDPOINT,
  REMOTE_ACCOUNT_PRIVATE_KEY,
} = process.env;

module.exports = {
  solidity: '0.8.13',
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {},
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [GOERLI_ACCOUNT_PRIVATE_KEY],
    },
    local: {
      url: LOCAL_ENDPOINT,
      accounts: [LOCAL_ACCOUNT_PRIVATE_KEY],
    },
    remote: {
      url: REMOTE_ENDPOINT,
      accounts: [REMOTE_ACCOUNT_PRIVATE_KEY],
    },
    // ethereum: {
    //   chainId: 1,
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    //   accounts: [ACCOUNT_PRIVATE_KEY],
    // },
  },
};
