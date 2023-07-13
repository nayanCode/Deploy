import DataJson from '../abis/contracts/Storedata.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');
const web3 = new Web3("http://localhost:7545");

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    const { DocContract} = await loadContract(addressAccount);

    return { addressAccount, DocContract };

};

const loadContract = async (addressAccount) => {
    const theContract = contract(DataJson);
    theContract.setProvider(web3.eth.currentProvider);
    const DocContract = await theContract.deployed();
  //  const tasks = await loadTasks(DocContract, addressAccount);

    return { DocContract }
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        return true;
      }
      return false;
};