// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title PurchaseHistory
 * @dev Contract for tracking purchase history with improved safety and efficiency
 */
contract PurchaseHistory {
    struct PurchaseItem {
        uint256 productId;
        uint256 amount;
    }
    
    struct Purchase {
        address buyer;
        uint256 totalPrice;
        uint256 timestamp;
    }
    
    address private immutable _owner;
    Purchase[] private _purchases;
    mapping(uint256 => PurchaseItem[]) private _purchaseItems;
    
    // error Unauthorized();
    error EmptyPurchase();
    error InvalidPrice();
    error InvalidIndex();
    
    event PurchaseEvent(
        address indexed buyer,
        uint256 indexed purchaseIndex,
        uint256 totalPrice,
        uint256 timestamp
    );
    
    // modifier onlyOwner() {
    //     if (msg.sender != _owner) {
    //         revert Unauthorized();
    //     }
    //     _;
    // }
    
    // constructor() {
    //     _owner = msg.sender;
    // }
    
    /**
     * @dev Add a new purchase to the history
     * @param items Array of items being purchased
     * @param totalPrice Total price of the purchase
     */
    function addPurchase(
        PurchaseItem[] memory items,
        uint256 totalPrice
    ) external {
        if (items.length == 0) {
            revert EmptyPurchase();
        }
        if (totalPrice == 0) {
            revert InvalidPrice();
        }
        
        uint256 purchaseIndex = _purchases.length;
        _purchases.push(Purchase({
            buyer: msg.sender,
            totalPrice: totalPrice,
            timestamp: block.timestamp
        }));
        
        for (uint256 i = 0; i < items.length; i++) {
            _purchaseItems[purchaseIndex].push(items[i]);
        }
        
        emit PurchaseEvent(msg.sender, purchaseIndex, totalPrice, block.timestamp);
    }
    
    /**
     * @dev Get a specific purchase by index
     * @param index The index of the purchase
     * @return Purchase details and associated items
     */
    function getPurchase(uint256 index) 
        external 
        view
        returns (Purchase memory, PurchaseItem[] memory) 
    {
        if (index >= _purchases.length) {
            revert InvalidIndex();
        }
        return (_purchases[index], _purchaseItems[index]);
    }
    
    /**
     * @dev Get a batch of purchases with pagination
     * @param start The starting index
     * @param count The number of purchases to fetch
     * @return Array of purchases and their items
     */
    function getPurchases(uint256 start, uint256 count)
        external
        view
       returns (Purchase[] memory, PurchaseItem[][] memory)
    {
        if (start >= _purchases.length) {
            revert InvalidIndex();
        }
        
        uint256 end = start + count;
        if (end > _purchases.length) {
            end = _purchases.length;
        }
        
        Purchase[] memory purchasesBatch = new Purchase[](end - start);
        PurchaseItem[][] memory itemsBatch = new PurchaseItem[][](end - start);
        
        for (uint256 i = start; i < end; i++) {
            purchasesBatch[i - start] = _purchases[i];
            itemsBatch[i - start] = _purchaseItems[i];
        }
        
        return (purchasesBatch, itemsBatch);
    }
    
    /**
     * @dev Get the total number of purchases
     * @return The count of purchases
     */
    function getTotalPurchases() external view returns (uint256) {
        return _purchases.length;
    }
    
    // /**
    //  * @dev Get the contract owner
    //  * @return Address of the contract owner
    //  */
    // function owner() external view returns (address) {
    //     return _owner;
    // }
}
