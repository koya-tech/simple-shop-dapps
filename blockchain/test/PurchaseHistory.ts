import { expect } from "chai";
import { ethers } from "hardhat";

describe("PurchaseHistory", function () {
    let purchaseHistory: any;
    let owner: any;
    let admin: any;

    beforeEach(async function () {
        [owner, admin] = await ethers.getSigners();
        const PurchaseHistory = await ethers.getContractFactory(
            "PurchaseHistory"
        );
        purchaseHistory = await PurchaseHistory.deploy();
    });

    it("should allow adding a purchase", async function () {
        const items = [
            { productId: 1, amount: 2 },
            { productId: 2, amount: 3 },
        ];
        const totalPrice = 150; // USD amount spent in shop

        await expect(purchaseHistory.addPurchase(items, totalPrice)).to.emit(
            purchaseHistory,
            "PurchaseEvent"
        );
    });

    it("should fetch total purchases count", async function () {
        expect(await purchaseHistory.getTotalPurchases()).to.equal(0);
    });

    it("should retrieve a single purchase", async function () {
        const items = [{ productId: 1, amount: 2 }];
        const totalPrice = 100; // USD amount spent in shop
        await purchaseHistory.addPurchase(items, totalPrice);

        const [purchase, purchaseItems] = await purchaseHistory.getPurchase(0);
        expect(purchase.buyer).to.equal(owner.address);
        expect(purchaseItems.length).to.equal(1);
        expect(purchaseItems[0].productId).to.equal(1);
    });

    it("should paginate purchases correctly", async function () {
        const items = [{ productId: 1, amount: 2 }];
        for (let i = 0; i < 5; i++) {
            await purchaseHistory.addPurchase(items, 100); // USD amount spent in shop
        }

        const [purchases, itemsBatch] = await purchaseHistory.getPurchases(
            0,
            3
        );
        expect(purchases.length).to.equal(3);
        expect(itemsBatch.length).to.equal(3);
    });
});
