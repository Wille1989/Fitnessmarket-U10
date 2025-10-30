import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import RateProduct from "./RateProduct";
import '../../css/product/CompareProduct.css';

function CompareProducts() {
    const { setErrorMessage, errorMessage } = useMessage();
    const { index, productArray, compare, comparison } = useProduct();
    const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    index();
  }, [index])


  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCompare = async () => {
    if (selected.length !== 2) {
      setErrorMessage('välj 2 produkter');
      return;
    }

    await compare(selected);
  };

  return (
    <>
      <div className="compare-header">
        <h2>Jämför produkter</h2>
      </div>

      {comparison && (
      <div className="comparison-result">  
        <div className="comparison-grid">

          <h3 className="comparison-grid-h3">
            Jämförelse mellan {comparison.comparedProducts[0]} och {comparison.comparedProducts[1]}
          </h3>
        <div className="product-left-side">
        <h4>{comparison.comparedProducts[0]}</h4>
        {comparison.comparison.map((item) => (
          <p key={item.field}>
            <strong>{item.field}:</strong> {item.productA}
          </p>
        ))}
        </div>

        <div className="product-difference">
          {comparison.comparison.map((item) => (
            <p key={item.field} className={
              item.comparedData > 0 ? "diff-positive" : item.comparedData < 0
                  ? "diff-negative" : "diff-neutral"
              }
            >
              {item.comparedData > 0 ? "+" : ""}
              {item.comparedData.toFixed(1)}
            </p>
          ))}
        </div>

        <div className="product-right-side">
          <h4>{comparison.comparedProducts[1]}</h4>
          {comparison.comparison.map((item) => (
            <p key={item.field}>
              <strong>{item.field}:</strong> {item.productB}
            </p>
          ))}
        </div>

        </div>
      </div>
      )}

      <div className="product-list">
      <ul className="product-list">

        {productArray.map((p) => (
        <li className="product-card" key={p._id}>
            <img src={p.imageUrl} alt={p.title} className="product-image" />
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
            </div>

            <label>
              <input
                type="checkbox"
                value={p._id}
                checked={selected.includes(p._id)}
                onChange={() => handleSelect(p._id)}
              />
                {'Välj för jämförelse'}
            </label>
        </li>
        ))}
    </ul>
    <div className="button-container">
      <button type="submit" onClick={handleCompare}>Jämför</button>
    </div>
    </div>
    
        {errorMessage && <Alert type='error' message={errorMessage}/>}
        
    </>
  );
}

export default CompareProducts;