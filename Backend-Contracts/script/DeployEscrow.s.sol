// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {EscrowFactory} from "../src/EscrowFactory.sol";
import {Arbitrator} from "../src/Arbitrator.sol";

// We only deploy escrow factory and it will automatically deploy escrow when called.

contract DeployEscrow is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the arbitrator contract
        Arbitrator arbitrator = new Arbitrator();

        // Deploy the escrow factory contract with the address of the arbitrator
        EscrowFactory escrowFactory = new EscrowFactory(address(arbitrator));

        vm.stopBroadcast();

        console.log("Arbitrator deployed at:", address(arbitrator));
        console.log("EscrowFactory deployed at:", address(escrowFactory));
    }
}