// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Escrow} from "../src/Escrow.sol";
import {Arbitrator} from "../src/Arbitrator.sol";

contract ArbitratorTest is Test {

    Arbitrator arbitratorContract;
    Escrow escrow;

    address buyer = address(1);
    address seller = address(2);
    address arbitrator = address(3);
    address attacker = address(999);

    uint256 amount = 1 ether;
    uint256 duration = 1 days;

    

    function setUp() public {
        vm.prank(arbitrator); // arbitrator becomes the owner of the Arbitrator contract.
        arbitratorContract = new Arbitrator();

        escrow = new Escrow(
            buyer,
            seller,
            address(arbitratorContract),
            amount,
            duration
        );

        // Move escrow into disputed state
        vm.deal(buyer, 10 ether);

        vm.prank(buyer);
        escrow.fundEscrow{value: amount}();

        vm.prank(seller);
        escrow.sellerAcceptWork();

        vm.prank(seller);
        escrow.submitWork();

        vm.prank(buyer);
        escrow.raiseDispute();
    }

    

    function testOnlyOwnerCanResolve() public {

        vm.prank(attacker);

        vm.expectRevert();

        arbitratorContract.resolveEscrow(
            address(escrow),
            true
        );
    }


    function testResolveDisputeBuyerWins() public {

        vm.prank(arbitrator);

        arbitratorContract.resolveEscrow(
            address(escrow),
            true
        );

        assertEq(
            uint256(escrow.state()),
            uint256(Escrow.State.RESOLVED)
        );
    }

    function testResolveDisputeSellerWins() public {

        vm.prank(arbitrator);

        arbitratorContract.resolveEscrow(
            address(escrow),
            false
        );

        assertEq(
            uint256(escrow.state()),
            uint256(Escrow.State.RESOLVED)
        );
    }

    

    function testWinnerCanWithdrawAfterResolution() public {

        vm.prank(arbitrator);
        arbitratorContract.resolveEscrow(address(escrow), true);

        uint256 buyerBalanceBefore = buyer.balance;

        vm.prank(buyer);
        escrow.withdrawFunds();

        assertEq(
            buyer.balance,
            buyerBalanceBefore + amount
        );
    }

    function testLoserCannotWithdrawAfterResolution() public {

        vm.prank(arbitrator);
        arbitratorContract.resolveEscrow(address(escrow), true);

        vm.prank(seller);
        vm.expectRevert();

        escrow.withdrawFunds();
    }
}
