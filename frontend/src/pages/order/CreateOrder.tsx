import { useState, useEffect } from "react";
import useProduct from "../../hooks/useProduct";
import { useOrder } from "../../hooks/useOrder";
import { Alert } from "../../components/alert/Alert";
import { useMessage } from "../../context/MessageProvider";
import type { ProductItem } from "../../types/Order/Order";
import type { Product } from "../../types/Products/Products";

function Checkout() {
    const { productArray, index, loading } = useProduct();
    const { checkout } = useOrder();
    const { successMessage, errorMessage, setSuccessMessage, setErrorMessage } = useMessage();

    const [cart, setCart] = useState<ProductItem[]>([]);

    useEffect(() => {
        index();
    }, [index]);

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
      setErrorMessage("Du måste lägga till minst en produkt");
      setTimeout(() => setErrorMessage(null), 1000);
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
        setSuccessMessage('Ordern har skapats!');
        setCart([]);
        setTimeout(() => setSuccessMessage(null), 1000)
    }
    }

    if(loading) return <p><strong>Laddar produkter ...</strong></p>

  return (
    <>
      <h2>Skapa order</h2>

      {successMessage && <Alert type="success" message={successMessage} />}
      {errorMessage && <Alert type="error" message={errorMessage} />}

      <h3>Produkter</h3>
      <ul>
        {productArray.map((p) => (
          <li key={p._id}>
            {p.title} – {p.price} kr
            <button onClick={() => addToCart(p)}>+</button>
            <button onClick={() => removeFromCart(p)}>-</button>
          </li>
        ))}
      </ul>

      <h3>Kundvagn</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.productID}>
            {item.title} x {item.quantity} = {item.price * item.quantity} kr
          </li>
        ))}
      </ul>

      <p><strong>Totalt:</strong> {total.toFixed(1)} kr</p>

      <button type="submit" onClick={handleCheckout}>Lägg beställning</button>
    </>
  );
}

export default Checkout;
