import ProductType from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemType {
    product: ProductType;
    quantity: number;
}

export interface CartStore {
    cartItems: CartItemType[];
    addToCart: (item: ProductType) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create(
    persist<CartStore>(
        (set) => ({
            cartItems: [] as CartItemType[],

            addToCart: (item: ProductType) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (cartItem) => cartItem.product.id === item.id
                    );

                    if (existingItem) {
                        const updatedItems = state.cartItems.map((cartItem) =>
                            cartItem.product.id === item.id
                                ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity + 1,
                                  }
                                : cartItem
                        );
                        return { cartItems: updatedItems };
                    }

                    const newItems = [
                        ...state.cartItems,
                        { product: item, quantity: 1 },
                    ];
                    return { cartItems: newItems };
                }),

            removeFromCart: (id: number) =>
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (cartItem) => cartItem.product.id !== id
                    ),
                })),

            updateQuantity: (id: number, quantity: number) => {
                if (quantity <= 0) {
                    set((state) => ({
                        cartItems: state.cartItems.filter(
                            (cartItem) => cartItem.product.id !== id
                        ),
                    }));
                    return;
                }
                set((state) => ({
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.product.id === id
                            ? { ...cartItem, quantity }
                            : cartItem
                    ),
                }));
            },
        }),
        {
            name: "cart-storage",
            // オプション: 特定のフィールドのみ永続化する場合
            partialize: (state) => ({
                cartItems: state.cartItems,
                addToCart: state.addToCart,
                removeFromCart: state.removeFromCart,
                updateQuantity: state.updateQuantity,
            }),
        }
    )
);
