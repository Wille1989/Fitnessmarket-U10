import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import type { UpdateProduct } from "../../types/Products/Products";
import { useParams } from "react-router-dom";
import HandleDeleteProduct from "../../components/navigation/button/HandleDeleteProduct";
import '../../css/product/EditProduct.css'
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";

function EditProduct() {
  const [successMessage, setSuccessMessage] = useState<string | null>('');
  const { id } = useParams();
  const { errorMessage } = useMessage();
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
    if (!id) return;

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
      const success = await update(id, formData);

      if(success) {
        setSuccessMessage('Produkten har uppdaterats!')
        setTimeout(() => setSuccessMessage(null), 1500)
      }

    } else {
      throw new Error('Produktens ID saknas')
    }
  };

  return (
    <>
      <form className="form-edit-product" onSubmit={handleUpdate}>
       <section className="form-section">
        <h3>Redigera Produkt</h3>
        
        <label htmlFor="imageUrl">Bild URL:</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="......"
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value})}
        />
        <label htmlFor="title">Titel:</label>
        <input
          type="text"
          name="title"
          placeholder="......"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor="price">Pris:</label>
        <input
          type="text"
          name="price"
          placeholder="......"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <label htmlFor="weight">Vikt:</label>
        <input
          type="text"
          name="weight"
          placeholder="......"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
        <label htmlFor="originCountry">Ursprungsland:</label>
        <input
          type="text"
          name="originCountry"
          placeholder="......"
          value={formData.originCountry}
          onChange={(e) =>
            setFormData({ ...formData, originCountry: e.target.value })
          }
        />

        </section>

      <section className="form-section">

        <h3> Redigera Näringsinnehåll</h3>

        <label htmlFor="energy">Energi:</label>
        <input
          type="text"
          name="energy"
          placeholder="......"
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
        <label htmlFor="fat">Fett:</label>
        <input
          type="text"
          name="fat"
          placeholder="......"
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
        <label htmlFor="saturatedfat">Mättat fett:</label>
        <input
          type="text"
          name="saturatedfat"
          placeholder="......"
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
        <label htmlFor="protein">Protein:</label>
        <input
          type="text"
          name="protein"
          placeholder="......"
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
        <label htmlFor="salt">Salt:</label>
        <input
          type="text"
          name="salt"
          placeholder="......"
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
      </section>
        <button type="submit">Uppdatera</button>
        <HandleDeleteProduct/>
        {errorMessage && <Alert type="error" message={errorMessage}/>}
        {successMessage && <Alert type="success" message={successMessage}/>}
      </form>
      
    </>
  );
}

export default EditProduct;
