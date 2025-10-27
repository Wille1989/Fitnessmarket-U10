import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useCategory } from "../../hooks/useCategory";
import useProduct from "../../hooks/useProduct";
import type { CreateProduct } from '../../types/Products/Products'
import '../../components/layout/product/CreateProduct.css'

function CreateProduct() {
    const { setSuccessMessage, successMessage, errorMessage } = useMessage();
    const { create } = useProduct();
    const { categoryArray } = useCategory();
    const [form,setForm] = useState<CreateProduct>({
        category: '',
        title: '',
        price: '',
        weight: '',
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

        await create(form);
        
        setSuccessMessage('Produkten har skapats');
        setTimeout(() => {
            setSuccessMessage(null),
            setForm({
                category: "",
                title: "",
                price: "",
                weight: "",
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

    return (
        <>
            <form className="form-create-product" onSubmit={handleSubmit}>
                <section className="form-section">
                    <h3>Kategori:</h3>
                    <select
                    aria-label="categories"
                    id='categories' 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option value=''> Välj kategori </option>
                        {categoryArray.length > 0 ? (categoryArray.map((c) => (
                            <option 
                                key={c._id} 
                                value={c._id}>{c.title}</option> ))
                        ) : ( <option disabled>Laddar kategorier...</option> )}
                    </select>
                </section>
        
                <section className="form-section">
                    <h3>Produkt</h3>

                    <input
                        type="text"
                        name="title"
                        placeholder="Titel"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Pris"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <input
                        type="number"
                        name="weight"
                        placeholder="Produktvikt"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    />
                    <input
                        type="text"
                        name="originCountry"
                        placeholder="Ursprungsland"
                        value={form.originCountry}
                        onChange={(e) => setForm({ ...form, originCountry: e.target.value })}
                    />
                </section>

                <section className="form-section">

                    <h3>Näringsinnehåll:</h3>

                    <input
                    type=""
                    name=""
                    placeholder="Näringsinnehåll: Energi"
                    value={form.nutritionalContent.energy}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, energy: e.target.value } })}
                    />

                    <input
                    type=""
                    name=""
                    placeholder="Näringsinnehåll: Fett"
                    value={form.nutritionalContent.fat}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, fat: e.target.value } })}
                    />

                    <input
                    type=""
                    name=""
                    placeholder="Näringsinnehåll: Mättat fett"
                    value={form.nutritionalContent.saturatedfat}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, saturatedfat: e.target.value } })}
                    />


                    <input
                    type=""
                    name=""
                    placeholder="Näringsinnehåll: Protein"
                    value={form.nutritionalContent.protein}
                    onChange={(e) => setForm({ ...form, nutritionalContent: { ...form.nutritionalContent, protein: e.target.value } })}
                    />


                    <input
                    type=""
                    name=""
                    placeholder="Näringsinnehåll: salt"
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