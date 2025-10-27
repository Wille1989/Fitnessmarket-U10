import useProduct from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import '../../components/layout/product/ProductPage.css'
import RateProduct from "./RateProduct";
import { useNavigate } from "react-router-dom";

function ProductPage() {
    const { index, loading, productArray } = useProduct();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        index();
    },[index])

    if(loading) return <p><strong>Laddar data...</strong></p>

    const filteredProducts = productArray.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            (product.category?.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
            product.originCountry.toLowerCase().includes(search.toLowerCase()), 
        );

    return (
        <>  
        <div className="product-page">
            <input className="product-search"
            type="text"
            placeholder="Sök efter en produkt"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
            
            <ul className="product-list">

                {filteredProducts.map((p) => (
                <li className="product-card" key={p._id}>
                    <h2>{p.title}</h2>
                    <span><strong>Land:</strong> {p.originCountry}</span>
                    <span><strong>Vikt/kg:</strong> {p.weight}</span>
                    <span><strong>Pris:</strong> {p.price}</span>
                    <span><strong>Betyg:</strong> {p.rating.average}</span>
                    <div className="nutritionalContent">
                        <h4>Näringsinnehåll:</h4>
                        <span><strong>Energi: </strong>{p.nutritionalContent.energy}</span>
                        <span><strong>Fett: </strong>{p.nutritionalContent.fat}</span>
                        <span><strong>Mättat fett:</strong>{p.nutritionalContent.saturatedfat}</span>
                        <span><strong>Salt: </strong>{p.nutritionalContent.salt}</span>
                        <span><strong>Protein: </strong>{p.nutritionalContent.protein}</span>
                        <RateProduct id={p._id} />

                        <button type="button" onClick={() => navigate(`/admin/product/${p._id}`)}>
                            Redigera
                        </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ProductPage;