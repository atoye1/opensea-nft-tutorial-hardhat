const { ethers } = require('ethers');
const { getContractAt } = require('@nomiclabs/hardhat-ethers/internal/helpers');

// require('dotenv').config({ path: '../.env' });

function getEnvVariable(key, defaultValue) {
  if (process.env[key]) {
    return process.env[key];
  }
  if (!defaultValue) {
    throw `${key} is not defined and no default value was provided`;
  }
  return defaultValue;
}

function getProvider() {
  const network = getEnvVariable('NETWORK', 'local');
  if (network === 'goerli') {
    return ethers.getDefaultProvider(network, {
      alchemy: getEnvVariable('ALCHEMY_KEY'),
    });
  } else if (network === 'local') {
    return new ethers.providers.JsonRpcProvider(
      getEnvVariable('LOCAL_ENDPOINT')
    );
  } else if (network === 'remote') {
    return new ethers.providers.JsonRpcProvider(
      getEnvVariable('REMOTE_ENDPOINT')
    );
  } else {
    throw `unknown network provided : ${network}`;
  }
}

function getAccount() {
  const network = getEnvVariable('NETWORK', 'local');
  return new ethers.Wallet(
    getEnvVariable(`${network.toUpperCase()}_ACCOUNT_PRIVATE_KEY`),
    getProvider()
  );
}

function getContract(contractName, hre) {
  const network = getEnvVariable('NETWORK', 'local');
  const contractAddress = getEnvVariable(
    `${network.toUpperCase()}_CONTRACT_ADDRESS`
  );
  const account = getAccount();
  return getContractAt(hre, contractName, contractAddress, account);
}

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
};
