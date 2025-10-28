import { useState } from "react";
import { useOrder } from "../hooks/useOrder";
import type { ProductItem } from "../types/Order/Order";
import type { Product } from "../types/Products/Products";

export function useCart() {
    const { checkout } = useOrder();
    const [cart, setCart] = useState<ProductItem[]>([]);

        function addToCart(product: Product) {
            setCart((prevCart) => {
                const existing = prevCart.find((productItem) => productItem.productID === product._id);

                if(existing) {
                    return prevCart.map((productItem) => 
                    productItem.productID === product._id ? 
                    { ...productItem, quantity: productItem.quantity + 1 } : productItem);
                }

            return [
                ...prevCart,
                {
                    productID: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                }
            ]
        })};

        function removeFromCart(product: Product) {
            setCart((prevCart) => 
            prevCart.map((productItem) => productItem.productID === product._id ? 
            { ...productItem, quantity: productItem.quantity - 1 }: productItem )

            .filter((productItem) => productItem.quantity > 0)
            )    
        }

        const total = cart.reduce((sum, productItem) => sum + productItem.price * productItem.quantity, 0);

        async function handleCheckout() {
        if (cart.length === 0) {
        return;
        }

        const order = {
            content: cart,
            customerID: '',
            orderNumber: 0,
            sumOfOrder: total
        }

        const result = await checkout(order);
        if(result) {
            setCart([]);
        }
        }
  
        return { addToCart, removeFromCart, handleCheckout, cart,total }

}

export default useCart;
