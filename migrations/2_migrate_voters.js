var ListVoters = artifacts.require("./ListVoters.sol");

module.exports = function(deployer) {
    deployer.deploy(ListVoters)
};
