// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PurchaseHistory {
    struct Purchase {
        address buyer;
        uint256 productId;
        uint256 amount;
        uint256 timestamp;
    }

    address public owner;
    Purchase[] private allPurchases;

    event PurchaseEvent(
        address indexed buyer,
        uint256 productId,
        uint256 amount,
        uint256 timestamp
        );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addPurchase(uint256 productId, uint256 amount) public {
        Purchase memory purchase = Purchase(msg.sender, productId, amount, block.timestamp);
        allPurchases.push(purchase);
        emit PurchaseEvent(msg.sender, productId, amount, block.timestamp);
    }

    function getAllPurchases() public view onlyOwner returns (Purchase[] memory) {
        return allPurchases;
    }
}