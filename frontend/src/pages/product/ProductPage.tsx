import useProduct from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import { Alert } from "../../components/alert/Alert";
import '../../css/product/ProductPage.css';
import RateProduct from "./RateProduct";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../middleware/JwtDecode";
import useCart from "../../hooks/useCart";

function ProductPage() {
    const { index, productArray } = useProduct();
    const { addToCart, removeFromCart, handleCheckout, cart, total, infoMessage: checkoutMessage} = useCart();
    const [infoMessage, setInfoMessage] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const decoded = getDecodedToken();
    const role = decoded?.role || 'guest'

    useEffect(() => {
        index();
    },[index])

    const filteredProducts = productArray.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.originCountry.toLowerCase().includes(search.toLowerCase())
        );

    useEffect(() => {
        if(filteredProducts.length === 0) {
            setInfoMessage('Tyvärr verkar vi inte ha den produkt du söker');
        } else {
            setInfoMessage(null);
        }
    },[filteredProducts]);
   
    return (
        <>  
        <div className="product-page">
            <input className="product-search"
            type="text"
            name="search"
            placeholder="Sök efter en produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
            
            <ul className="product-list">

            {infoMessage && <Alert type="info" message={infoMessage}/>}

                {filteredProducts.map((p) => (
                <li className="product-card" key={p._id}>
                    <img src={p.imageUrl} alt={p.title} className="product-image" />
                    <h2>{p.title}</h2>
                    <div className="product-info">
                        <span><strong>Land:</strong></span><p>{p.originCountry}</p>
                        <span><strong>Vikt/kg:</strong></span> <p>{p.weight}</p>
                        <span><strong>Pris:</strong></span> <p>{p.price}</p>
                        <span><strong>Betyg:</strong></span> <p>{p.rating.average}</p>
                    </div>
                    
                    <div className="nutritionalContent">
                        <h2>Näringsinnehåll / 100g:</h2>
                        <div className="nutritionalContent-info">
                            <span><strong>Kcal: </strong></span><p>{p.nutritionalContent.energy}</p>
                            <span><strong>Fett: </strong></span><p>{p.nutritionalContent.fat}</p>
                            <span><strong>Mättat fett:</strong></span><p>{p.nutritionalContent.saturatedfat}</p>
                            <span><strong>Salt: </strong></span><p>{p.nutritionalContent.salt}</p>
                            <span><strong>Protein: </strong></span><p>{p.nutritionalContent.protein}</p>
                        </div>
                    </div>

                    <div className="product-rate-container">
                        <RateProduct id={p._id} />
                    </div>

                    <div className="to-cart-button-container">
                        {role === 'customer' && (
                            <>
                                <p>🛒</p>
                                <button type="button" onClick={() => removeFromCart(p)}>-</button>                            
                                <button type="button" onClick={() => addToCart(p)}>+</button>
                            </>
                        )}
                    </div>

                    <div className="product-edit-card">
                        {role === 'admin' && (
                        <>
                            <button type="button" onClick={() => navigate(`/admin/product/${p._id}`)}>
                                &#128393;
                            </button>
                        </>
                        )}
                    </div>
                </li>
                ))}

                 {role === "customer" && (
                <>
                    <div className="checkout-container">
                    <ul>
                        {cart.map((item) => (
                        <li key={item.productID}>
                            <p>{item.title} x{item.quantity} = {item.price * item.quantity}:-</p>
                        </li>
                        ))}
                    </ul>

                    <p><strong>Totalt:</strong> {total.toFixed(1)} kr</p>
                    {checkoutMessage && <Alert type="info" message={checkoutMessage}/>}
                    <button type="submit" onClick={handleCheckout}>Lägg beställning</button>
                    </div>    
                </>
            )}

            </ul>
        </div>
        </>
    )
}

export default ProductPage;