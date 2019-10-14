pragma solidity ^0.5.0;

contract ListVoters {

    // register voters and display them on the webpage

    uint public voterNumber = 0; // the total number of registered voters

    struct Voter{
        uint id;
        uint256 age;
        string name;
        bool voted;
    }

    constructor() public{
        addVoter("Timothy Kimani");
    }

    mapping(uint256 => Voter) public voters;

    function addVoter(string memory _name) public {
        voterNumber ++;
        voters[voterNumber] = Voter(voterNumber, 23, _name,  false);
    }
}