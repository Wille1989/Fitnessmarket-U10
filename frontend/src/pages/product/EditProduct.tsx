import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import type { UpdateProduct } from "../../types/Products/Products";
import { useParams } from "react-router-dom";
import '../../css/product/UpdateProduct.css'
import HandleDeleteProduct from "../../components/navigation/button/HandleDeleteProduct";

function EditProduct() {
  const { id } = useParams();
  const { update, show } = useProduct();
  const [formData, setFormData] = useState<UpdateProduct>({
    title: "",
    price: "",
    weight: "",
    imageUrl: '',
    originCountry: "",
    nutritionalContent: {
      energy: "",
      fat: "",
      saturatedfat: "",
      salt: "",
      protein: "",
    },
  });

  useEffect(() => {
  async function fetchProduct() {
    if (!id) return; // skydd mot tomt id

    const currentData = await show(id);
    if (currentData) {
      setFormData({
        title: currentData.title || "",
        price: String(currentData.price || ""),
        weight: String(currentData.weight || ""),
        imageUrl: String(currentData.imageUrl || ""),
        originCountry: currentData.originCountry || "",
        nutritionalContent: {
          energy: String(currentData.nutritionalContent?.energy || ""),
          fat: String(currentData.nutritionalContent?.fat || ""),
          saturatedfat: String(currentData.nutritionalContent?.saturatedfat || ""),
          salt: String(currentData.nutritionalContent?.salt || ""),
          protein: String(currentData.nutritionalContent?.protein || ""),
        },
      });
    }
  }

  fetchProduct();
}, [id]);

  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if(id) {
      await update(id, formData);
    } else {
      throw new Error('Produktens ID saknas')
    }

  };

  return (
    <>
      <form className="form" onSubmit={handleUpdate}>

        <input
          type="url"
          name="imageUrl"
          placeholder="Klistra in bildens URL"
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value})}
        />

        <input
          type="text"
          placeholder="Produkt Titel"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Pris"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Produktvikt"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />

        <input
          type="text"
          placeholder="Ursprungsland"
          value={formData.originCountry}
          onChange={(e) =>
            setFormData({ ...formData, originCountry: e.target.value })
          }
        />

        <input
          placeholder="Näringsinnehåll: Energi"
          value={formData.nutritionalContent?.energy || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              nutritionalContent: {
                ...formData.nutritionalContent,
                energy: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="Näringsinnehåll: Fett"
          value={formData.nutritionalContent?.fat || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              nutritionalContent: {
                ...formData.nutritionalContent,
                fat: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="Näringsinnehåll: Mättat fett"
          value={formData.nutritionalContent?.saturatedfat || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              nutritionalContent: {
                ...formData.nutritionalContent,
                saturatedfat: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="Näringsinnehåll: Protein"
          value={formData.nutritionalContent?.protein || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              nutritionalContent: {
                ...formData.nutritionalContent,
                protein: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="Näringsinnehåll: Salt"
          value={formData.nutritionalContent?.salt || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              nutritionalContent: {
                ...formData.nutritionalContent,
                salt: e.target.value,
              },
            })
          }
        />

        <button type="submit">Uppdatera</button>
      </form>
      <HandleDeleteProduct/>
    </>
  );
}

export default EditProduct;
