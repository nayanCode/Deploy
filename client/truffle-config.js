//import path from "path";

module.exports = {
  //contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 5000000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/contracts/',
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
