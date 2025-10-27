import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";

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
      <h3>Välj två produkter att jämföra</h3>
      <ul>
        {productArray.map((p) => (
          <li key={p._id}>
            <label>
              <input
                type="checkbox"
                value={p._id}
                checked={selected.includes(p._id)}
                onChange={() => handleSelect(p._id)}
              />
              {p.title}
            </label>
          </li>
        ))}
      </ul>

      <button type="submit" onClick={handleCompare}>Jämför</button>

        {errorMessage && <Alert type='error' message={errorMessage}/>}

        {comparison && (
  <div className="comparison-result">
    <h3>Jämförelse mellan {comparison.comparedProducts[0]} och {comparison.comparedProducts[1]}</h3>

    <table border={1}>
      <thead>
        <tr>
          <th>Ämne</th>
          <th>{comparison.comparedProducts[0]}</th>
          <th>{comparison.comparedProducts[1]}</th>
          <th>Skillnad</th>
        </tr>
      </thead>
      <tbody>
        {comparison.comparison.map((item) => (
          <tr key={item.field}>
            <td>{item.field}</td>
            <td>{item.productA}</td>
            <td>{item.productB}</td>
            <td style={{ color: item.comparedData > 0 ? "green" : "red" }}>
              {item.comparedData > 0 ? "+" : ""}
              {item.comparedData.toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



    </>
  );
}

export default CompareProducts;