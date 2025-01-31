import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PurchaseHistoryModule", (m) => {
    const purchaseHistory = m.contract("PurchaseHistory");
    return { purchaseHistory };
});
