type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

type CartItemType = {
    product: ProductType;
    quantity: number;
};

type CartStore = {
    cartItems: CartItemType[];
    addToCart: (item: ProductType) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
};

type Purchase = {
    buyer: string;
    totalPrice: number;
    timestamp: bigint;
};

type PurchaseItem = {
    productId: number;
    amount: number;
};

type PurchasesResponse = [Purchase[], PurchaseItem[][]];

export type {
    PurchasesResponse,
    Purchase,
    PurchaseItem,
    ProductType,
    CartItemType,
    CartStore,
};
