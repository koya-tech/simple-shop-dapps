import { expect } from "chai";
import { ethers } from "hardhat";
import { PurchaseHistory } from "../typechain-types";
import { ContractTransaction, ContractTransactionResponse } from "ethers";

describe("PurchaseHistory", () => {
    let purchaseHistory: PurchaseHistory;
    let owner: any;
    let buyer: any;
    let otherAccount: any;

    beforeEach(async () => {
        [owner, buyer, otherAccount] = await ethers.getSigners();

        const PurchaseHistoryFactory = await ethers.getContractFactory(
            "PurchaseHistory"
        );
        purchaseHistory = await PurchaseHistoryFactory.deploy();
        await purchaseHistory.waitForDeployment();
    });

    describe("デプロイ", () => {
        it("正しいオーナーがセットされるべき", async () => {
            expect(await purchaseHistory.owner()).to.equal(owner.address);
        });
    });

    describe("購入の追加", () => {
        it("購入を正しく記録できるべき", async () => {
            const productId = 1;
            const amount = 100;

            // トランザクションを実行
            const tx = await purchaseHistory
                .connect(buyer)
                .addPurchase(productId, amount);

            // イベントの検証
            await expect(tx)
                .to.emit(purchaseHistory, "PurchaseEvent")
                .withArgs(
                    buyer.address,
                    productId,
                    amount,
                    await getBlockTimestamp(tx)
                );

            // 購入履歴の検証
            const purchases = await purchaseHistory.getAllPurchases();
            expect(purchases.length).to.equal(1);
            expect(purchases[0].buyer).to.equal(buyer.address);
            expect(purchases[0].productId).to.equal(productId);
            expect(purchases[0].amount).to.equal(amount);
        });

        it("複数のユーザーが購入を記録できるべき", async () => {
            await purchaseHistory.connect(buyer).addPurchase(1, 100);
            await purchaseHistory.connect(otherAccount).addPurchase(2, 200);

            const purchases = await purchaseHistory.getAllPurchases();
            expect(purchases.length).to.equal(2);
        });
    });

    describe("購入履歴の取得", () => {
        it("オーナーのみが全購入履歴を取得できるべき", async () => {
            await purchaseHistory.connect(buyer).addPurchase(1, 100);

            // オーナーは履歴を取得できる
            const purchases = await purchaseHistory.getAllPurchases();
            expect(purchases.length).to.equal(1);

            // 非オーナーは履歴を取得できない
            await expect(
                purchaseHistory.connect(buyer).getAllPurchases()
            ).to.be.revertedWith("Not authorized");
        });
    });
});

// ヘルパー関数
async function getBlockTimestamp(
    tx: ContractTransactionResponse
): Promise<number> {
    const receipt = await tx.wait();
    if (!receipt) {
        throw new Error("Transaction receipt not found");
    }
    const block = await ethers.provider.getBlock(receipt.blockNumber);
    if (!block) {
        throw new Error("Block not found");
    }
    return block.timestamp;
}
