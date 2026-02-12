// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {EscrowFactory} from "../src/EscrowFactory.sol";
import {Escrow} from "../src/Escrow.sol";

contract FullLifecycle is Script {

    function run() external {

        address factoryAddress = vm.envAddress("FACTORY_ADDRESS");

        uint256 buyerKey = vm.envUint("BUYER_PRIVATE_KEY");
        uint256 sellerKey = vm.envUint("SELLER_PRIVATE_KEY");

        address buyer = vm.addr(buyerKey);
        address seller = vm.addr(sellerKey);

        uint256 amount = 0.01 ether;
        uint256 duration = 1 days;

        EscrowFactory factory = EscrowFactory(factoryAddress);

        

        vm.startBroadcast(buyerKey);

        factory.createEscrow(
            buyer,
            seller,
            amount,
            duration
        );

        vm.stopBroadcast();

        uint256 lastIndex = factory.escrowsLength() - 1;
        address escrowAddress = address(factory.escrows(lastIndex));

        console.log("Escrow deployed at:", escrowAddress);

        Escrow escrow = Escrow(payable(escrowAddress));

       

        vm.startBroadcast(buyerKey);

        escrow.fundEscrow{value: amount}();

        vm.stopBroadcast();

        console.log("Escrow funded");


        vm.startBroadcast(sellerKey);

        escrow.sellerAcceptWork();

        vm.stopBroadcast();

        console.log("Seller accepted");

      

        vm.startBroadcast(sellerKey);

        escrow.submitWork();

        vm.stopBroadcast();

        console.log("Work submitted");

       

        vm.startBroadcast(buyerKey);

        escrow.verifyWork();

        vm.stopBroadcast();

        console.log("Work approved");


        vm.startBroadcast(sellerKey);

        escrow.withdrawFunds();

        vm.stopBroadcast();

        console.log("Seller withdrew funds");
        console.log("Lifecycle complete");
    }
}
