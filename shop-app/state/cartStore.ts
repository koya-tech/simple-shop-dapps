import { CartItem } from "@/type";
import { create } from "zustand";

interface CartStore {
    cartItems: CartItem[];

    addToCart: (item: CartItem) => void;

    removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartItems: [] as CartItem[],
    addToCart: (item: CartItem) =>
        set((state: { cartItems: CartItem[] }) => ({
            cartItems: [...state.cartItems, item],
        })),
    removeFromCart: (id: number) =>
        set((state: { cartItems: CartItem[] }) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
}));
