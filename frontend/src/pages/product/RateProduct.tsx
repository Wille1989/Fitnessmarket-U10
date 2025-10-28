import { useState } from "react";
import useProduct from "../../hooks/useProduct";
import '../../css/product/RateProduct.css';

type RateProductProps = {
  id: string;
};

function RateProduct({ id }: RateProductProps) {
  const { rate, loading } = useProduct();
  const [value, setValue] = useState<string>('');

  return (
    <>
      <label htmlFor={`rating-${id}`}>Betygsätt:</label>

      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
          key={n}
          type="button"
          onClick={async () => {setValue(String(n)); await rate(id, String(n))}}
          disabled={loading}
          >
            ★
        </button>
        ))}
        {value && <p>Du gav {value} stjärna{value !== "1" && "r"}!</p>}
      </div>
    </>
      
  );
}

export default RateProduct;