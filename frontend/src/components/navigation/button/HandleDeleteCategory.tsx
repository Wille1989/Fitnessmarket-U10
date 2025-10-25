import { useState } from "react"
import { useCategory } from "../../../hooks/useCategory";
import { useMessage } from "../../../context/MessageProvider";
import { Alert } from "../../alert/Alert";

type localProps = {
    id: string
    IndexCategory: () => Promise<void>
}

function HandleDeleteCategory({id, IndexCategory}: localProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const { deleteCategory } = useCategory();
    const { setSuccessMessage, successMessage, setErrorMessage, errorMessage } = useMessage();

    const handleOnClick = async(id: string) => {
        setLoading(true);

        if(id) {
            await deleteCategory(id);
            await IndexCategory();
            setSuccessMessage('Kategorin har tagits bort!');
            setTimeout(() => setSuccessMessage(null), 1000);
        } else {
            setErrorMessage(errorMessage);
            setTimeout(() => setErrorMessage(null), 1000);
        }

        setLoading(false);
    }

    return (
        <>
            <button type="submit" onClick={() => handleOnClick(id)} disabled={loading}>
                {loading ? 'Raderar...' : 'Radera'}
            </button>

            {successMessage && <Alert type='success' message={successMessage}/>}
            {errorMessage && <Alert type='error' message={errorMessage}/>}

        </>
    )
}

export default HandleDeleteCategory;