import { CartProduct, SummaryInformation } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    getSummaryInformation: (iva: number, sending: number, city?: string) => SummaryInformation;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            // Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            getSummaryInformation: (iva: number, sending: number, city?: string) => {
                const { cart } = get();
                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal, 0
                );

                let sendingCost = sending;
                if (city?.includes("Bogotá")) {
                    sendingCost = (subTotal > 70000) ? 0 : sendingCost;
                }

                const tax = subTotal * iva;
                const total = subTotal + tax + sendingCost;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, sendingCost, itemsInCart
                }

            },
            addProductToCart: (product: CartProduct) => {

                const { cart } = get();

                // 1. Revisar si el producto existe en el carrito de con la talla seleccionada
                const productInCart = cart.some(
                    (item) => item.id === product.id
                        && item.size === product.size
                        && item.color === product.color
                        && item.number === product.number
                        && item.letter === product.letter
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. Se que el product existe por talla tengo que incrementar 
                const updatedCartProducts = cart.map((item) => {

                    if (item.id === product.id
                        && item.size === product.size
                        && item.color === product.color
                        && item.number === product.number
                        && item.letter === product.letter
                    ) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {

                const { cart } = get();

                const updateCartProducts = cart.map(item => {
                    if (item.id === product.id
                        && item.size === product.size
                        && item.color === product.color
                        && item.number === product.number
                        && item.letter === product.letter
                    ) {
                        return { ...item, quantity: quantity }
                    }

                    return item;
                });

                set({ cart: updateCartProducts });
            },
            removeProduct: (product: CartProduct) => {

                const { cart } = get();

                const removeCartProduct = cart.filter(item =>
                    item?.id !== product.id
                    || item.size !== product.size
                    || item.color !== product.color
                    || item.number !== product.number
                    || item.letter !== product.letter
                );

                set({ cart: removeCartProduct });

            },
            clearCart: () => {
                set({ cart: [] });
            }
        })
        , {
            name: 'shopping-cart',
        }
    )
)