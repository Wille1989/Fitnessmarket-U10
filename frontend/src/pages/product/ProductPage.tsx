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

            {infoMessage && <Alert type="info" message={infoMessage}/>}
            
            <ul className="product-list">

                {filteredProducts.map((p) => (
                <li className="product-card" key={p._id}>
                    <img src={p.imageUrl} alt={p.title} className="product-image" />
                    <h2>{p.title}</h2>
                    <div className="product-info">
                        <span><strong>Land:</strong></span><p>{p.originCountry}</p>
                        <span><strong>Vikt (g):</strong></span><p>{p.weight}</p>
                        <span><strong>Pris (sek):</strong></span><p>{p.price}:-</p>
                        <span><strong>Betyg (1-5):</strong></span> <p>{p.rating.average}</p>
                    </div>
                    
                    <div className="nutritionalContent">
                        <h2>Näringsinnehåll / 100g:</h2>
                        <div className="nutritionalContent-info">
                            <span><strong>Kcal / 100g: </strong></span><p>{p.nutritionalContent.energy}</p>
                            <span><strong>Fett (g): </strong></span><p>{p.nutritionalContent.fat}</p>
                            <span><strong>Mättat fett (g):</strong></span><p>{p.nutritionalContent.saturatedfat}</p>
                            <span><strong>Salt (g): </strong></span><p>{p.nutritionalContent.salt}</p>
                            <span><strong>Protein (g): </strong></span><p>{p.nutritionalContent.protein}</p>
                        </div>
                    </div>

                    <div className="product-rate-container">
                        <RateProduct id={p._id} />
                    </div>

                    <div className="to-cart-button-container">
                        {role === 'customer' && (
                            <>
                                <button type="button" onClick={() => removeFromCart(p)}>-</button>

                                <span className="cart-quantity">
                                    {cart.find((item) => item.productID === p._id)?.quantity || 0}
                                </span>          
                                                 
                                <button type="button" onClick={() => addToCart(p)}>+</button>
                            </>
                        )}
                    </div>

                    <div className="product-edit-card">
                        {role === 'admin' && (
                        <>
                            <button type="button" onClick={() => navigate(`/admin/product/${p._id}`)}>
                                ✏️
                            </button>
                        </>
                        )}
                    </div>
                </li>
                ))}
            </ul>                
            {role === "customer" && (
            <>

                {checkoutMessage && <Alert type="info" message={checkoutMessage}/>}

                <div className="checkout-container">
                        <div className="total-container">
                            <p>
                                <strong>Totalt:</strong> {total.toFixed(1)} kr
                            </p>
                             <div className="checkout-right">
                            <button type="submit" onClick={handleCheckout}>Lägg beställning</button>
                        </div>

                        </div>
                </div>   
            </>
            )}
        </div>
        </>
    )
}

export default ProductPage;