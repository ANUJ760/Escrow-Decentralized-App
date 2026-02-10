// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Escrow} from "./Escrow.sol";

contract EscrowFactory{
    event EscrowCreated(address indexed buyer, address indexed seller, uint256 amount, uint256 deadline, address escrowContract);

    address public immutable arbitrator;

    constructor(address _arbitrator) {
        require(_arbitrator != address(0), "Invalid arbitrator");
        arbitrator = _arbitrator;
    }

    Escrow[] public escrows;
    // never store array length in state variable, always use getter function.
    function escrowsLength() external view returns (uint256) {
        return escrows.length;
    }


    function createEscrow(address _buyer, address _seller, uint256 _amount, uint _deadline) external returns (address escrowAddress) {
        require(_buyer != address(0), "Invalid buyer");
        require(_seller != address(0), "Invalid seller");
        require(_buyer != _seller, "Buyer == Seller");
        require(_amount > 0, "Amount = 0");
        require(_deadline > 0, "Invalid deadline");
        Escrow newEscrow = new Escrow(_buyer, _seller, arbitrator, _amount, _deadline);
        escrows.push(newEscrow);
        escrowAddress = address(newEscrow);
        emit EscrowCreated(_buyer, _seller, _amount, block.timestamp + _deadline, address(newEscrow));
        
    }
}