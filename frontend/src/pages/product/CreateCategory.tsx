import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";
import { useCategory } from "../../hooks/useCategory";

function CreateCategory() {
    const { setErrorMessage, setSuccessMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { createCategory } = useCategory();
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = { title, description };

        const result = createCategory(data);

        if(!result) {
            setErrorMessage('Det gick inte att skapa kategorin');
            setTimeout(() => {
                setErrorMessage(null)
            }, 1500);
        }

        setSuccessMessage('Kategorin har skapats!');
        setTimeout(() => {
            setSuccessMessage(null),
            setDescription(''),
            setTitle('')
        }, 1000);

        setLoading(false);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Ange en titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Ange beskrivning"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Skapar...' : 'Skapa'}
                </button>
            </form>

        </>
    )
}

export default CreateCategory;