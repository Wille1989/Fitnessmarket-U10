import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import useProduct from "../../hooks/useProduct";
import type { CreateProduct } from '../../types/Products/Products'
import '../../css/product/CreateProduct.css';

function CreateProduct() {
    const { setSuccessMessage, successMessage, errorMessage } = useMessage();
    const { create } = useProduct();
    const [form,setForm] = useState<CreateProduct>({
        title: '',
        price: '',
        weight: '',
        imageUrl: '',
        originCountry: '',
        nutritionalContent: {
            energy: '',
            fat: '',
            saturatedfat: '',
            salt: '',
            protein: ''
        }
    })

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const success = await create(form);
        
        if(success) {
            setSuccessMessage('Produkten har skapats');
            setTimeout(() => {
                setSuccessMessage(null),
                setForm({
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
            }, 1000)
            }
    }

    return (
        <>
            <form className="form-create-product" onSubmit={handleSubmit}>
            
                <section className="form-section">
                    <h3>Produkt</h3>

                    <label htmlFor="imageUrl">Bild URL:</label>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="......"
                        value={form.imageUrl || ''}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value})}
                    />
                    <label htmlFor="title">Titel:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="......"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <label htmlFor="price">Pris:</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="......"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <label htmlFor="weight">Vikt:</label>
                    <input
                        type="number"
                        name="weight"
                        placeholder="......"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    />
                    <label htmlFor="originCountry">Ursprungsland:</label>
                    <input
                        type="text"
                        name="originCountry"
                        placeholder="......"
                        value={form.originCountry}
                        onChange={(e) => setForm({ ...form, originCountry: e.target.value })}
                    />
                </section>

                <section className="form-section">

                    <h3>Näringsinnehåll:</h3>
                    <label htmlFor="energy">Kcal</label>
                    <input
                    type="text"
                    name="energy"
                    placeholder="......"
                    value={form.nutritionalContent.energy}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, energy: e.target.value } })}
                    />
                    <label htmlFor="fat">Fett:</label>
                    <input
                    type="text"
                    name="fat"
                    placeholder="......"
                    value={form.nutritionalContent.fat}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, fat: e.target.value } })}
                    />
                    <label htmlFor="saturatedfat">Mättat Fett:</label>
                    <input
                    type="text"
                    name="saturatedfat"
                    placeholder="......"
                    value={form.nutritionalContent.saturatedfat}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, saturatedfat: e.target.value } })}
                    />
                    <label htmlFor="protein">Protein:</label>
                    <input
                    type="text"
                    name="protein"
                    placeholder="......"
                    value={form.nutritionalContent.protein}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, protein: e.target.value } })}
                    />

                    <label htmlFor="salt">Salt:</label>
                    <input
                    type="text"
                    name="salt"
                    placeholder="......"
                    value={form.nutritionalContent.salt}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, salt: e.target.value } })}
                    />
                </section>

                <button type='submit'>Skapa</button>
            </form>

            {successMessage && <Alert type='success' message={successMessage} />}
            {errorMessage && <Alert type='error' message={errorMessage}/>}

        </>
    )
}

export default CreateProduct;