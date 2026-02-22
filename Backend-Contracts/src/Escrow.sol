//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//imports
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../src/Interfaces/Interface_Escrow.sol";


contract Escrow is Interface_Escrow, ReentrancyGuard {
    // Events
    event EscrowFunded(address indexed buyer, uint amount);
    event WorkSubmitted(address indexed seller);
    event WorkApproved(address indexed buyer);
    event WorkDisputed(address indexed buyer);
    event EscrowCompleted(address indexed buyer, address indexed seller, uint amount);
    event EscrowCancelled(address indexed buyer, uint amount);
    event SellerAccepted(address indexed seller);

    // Custom errors
    error OnlyBuyer();
    error OnlySeller();
    error InvalidState();
    error InvalidAmount();
    error DeadlineNotExceeded();
    error OnlyArbitrator();

    // State variables
    address public immutable buyer;
    address public immutable seller;
    address public immutable arbitrator;
    address public disputeWinner;
    string public buyerEvidenceCID;
    string public sellerEvidenceCID;
    bool public fundsWithdrawn;
    enum State {
        CREATED,
        FUNDED,
        IN_PROGRESS,
        SUBMITTED,
        DISPUTED,
        RESOLVED,
        COMPLETED,
        CANCELLED
    }
    uint deadline;
    State public state;
    uint public immutable amount;

    constructor(address _buyer, address _seller, address _arbitrator, uint256 _amount, uint _deadline) {
        require(_buyer != address(0), "Invalid buyer");
        require(_seller != address(0), "Invalid seller");
        require(_arbitrator != address(0), "Invalid arbitrator");
        require(_buyer != _seller, "Buyer and seller cannot be same");
        require(_amount > 0, "Amount must be > 0");
        buyer = _buyer;
        seller = _seller;
        arbitrator = _arbitrator;
        amount = _amount;
        deadline = block.timestamp + _deadline;
        state = State.CREATED;
    }

    // Modifiers
    modifier onlyBuyer() {
        if (msg.sender != buyer) {
            revert OnlyBuyer();
        }
        _;
    }
    modifier onlySeller() {
        if (msg.sender != seller) {
            revert OnlySeller();
        }
        _;
    }
    modifier onlyArbitrator() {
        if (msg.sender != arbitrator) {
            revert OnlyArbitrator();
        }
        _;
    }

    // Core Functions
    function fundEscrow() onlyBuyer external payable {
        if (state != State.CREATED) {
            revert InvalidState();
        }
        if (msg.value != amount) {
            revert InvalidAmount();
        }
        // Logic to fund the escrow
        // Payable automatically sends the value to the contract.
        state = State.FUNDED;
        emit EscrowFunded(msg.sender, msg.value);
    }

    function sellerAcceptWork() onlySeller external {
        if (state != State.FUNDED) {
            revert InvalidState();
        }
        state = State.IN_PROGRESS;
        emit SellerAccepted(msg.sender);
    }

    function cancelIfDeadlinePassed() external onlyBuyer {
        if (state != State.FUNDED) {
            revert InvalidState();
        }
        if (block.timestamp <= deadline) {
            revert DeadlineNotExceeded();
        }
        state = State.CANCELLED;
    }

    function submitWork() onlySeller external {
        if (state != State.IN_PROGRESS) {
            revert InvalidState();
        }
        state = State.SUBMITTED;
        emit WorkSubmitted(msg.sender);
    }

    function verifyWork() onlyBuyer external {
        if (state != State.SUBMITTED) {
            revert InvalidState();
        }
        state = State.COMPLETED;
        emit WorkApproved(msg.sender);
    }

    function raiseDispute() onlyBuyer external {
        if (state != State.SUBMITTED){
            revert InvalidState();
        }
        state = State.DISPUTED;
        emit WorkDisputed(msg.sender);
    }

    function resolveDispute(bool buyerWinner) onlyArbitrator external{
        if (state != State.DISPUTED){
            revert InvalidState();
        }

        disputeWinner = buyerWinner? buyer:seller;
        state = State.RESOLVED; // Resolved states signifies only the dispute is resolved but the funds are not yet withdrawn.

    }

    function withdrawFunds() external nonReentrant {
        if (fundsWithdrawn){
            revert InvalidState();
        }
        address withdrawer;
        if (state == State.COMPLETED && msg.sender == seller){
            withdrawer = seller;
        } else if (state == State.CANCELLED && msg.sender == buyer){
            withdrawer = buyer;
        } else if (state == State.RESOLVED && msg.sender == disputeWinner){
            withdrawer = disputeWinner;
        }
        else {
            revert InvalidState();
        }
        fundsWithdrawn = true;
        (bool success, ) = payable(withdrawer).call{value: amount}("");
        if (!success) {
            revert InvalidState();
        }

        function submitEvidence(string calldata cid) external {
            if (msg.sender == buyer){
                buyerEvidenceCID = cid;
            } else if (msg.sender == seller){
                sellerEvidenceCID = cid;
            } else {
                revert InvalidState();
            }
        }
    }

    receive() external payable{
        revert("Use fundEscrow function to fund the escrow only!");
    }
    
    
}