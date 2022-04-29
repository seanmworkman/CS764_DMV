pragma solidity ^0.8.10;

contract DMV {

    // Declare state variables of the contract
    address public user;
    string[] public data;
    string public vitalDoc = "This is a vital document";
    // mapping (address => uint) public cupcakeBalances;

    // When 'DMV' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        user = msg.sender;
        // cupcakeBalances[address(this)] = 100;
    }

    function get(uint i) public view returns (string memory) {
        return data[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getArr() public view returns (string[] memory) {
        return data;
    }

    function push(string memory i) public {
        // Append to array
        // This will increase the array length by 1.
        data.push(i);
    }

    function pop() public {
        // Remove last element from array
        // This will decrease the array length by 1
        data.pop();
    }

    function getLength() public view returns (uint) {
        return data.length;
    }

    function remove(uint index) public {
        // Delete does not change the array length.
        // It resets the value at index to it's default value,
        // in this case 0
        delete data[index];
    }
}
