// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Interfaces/Interface_Escrow.sol";
// No need to use .. in src.

contract Arbitrator {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the arbitrator can call this function");
        _;
    }   

    function resolveEscrow(address escrowContract, bool buyerWins) onlyOwner external {
        require(msg.sender == owner, "Only arbitrator can resolve disputes");
        Interface_Escrow(escrowContract).resolveDispute(buyerWins);
    }
}