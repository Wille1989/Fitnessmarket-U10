import { useState } from "react";
import useProduct from "../../hooks/useProduct";

type RateProductProps = {
  id: string;
};

function RateProduct({ id }: RateProductProps) {
  const { rate, loading } = useProduct();
  const [value, setValue] = useState<string>("");

  const handleRate = async () => {
    if (!value) return alert("Välj ett betyg först!");
    await rate(id, value);
  };

  return (
    <>
        <label htmlFor={`rating-${id}`}>Betygsätt:</label>
      <select
        id={`rating-${id}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      >
        <option value="">Välj...</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} stjärna{n > 1 ? "r" : ""}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleRate} disabled={loading}>
        {loading ? "Sparar..." : "Spara"}
      </button>
    </>
      
  );
}

export default RateProduct;