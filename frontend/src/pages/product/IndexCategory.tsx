import { useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import HandleDeleteCategory from "../../components/navigation/button/HandleDeleteCategory";

function IndexCategory() {
    const { categoryArray, loading, indexCategory } = useCategory();
    const { errorMessage, successMessage } = useMessage();

    useEffect(() => {
            indexCategory()
    },[indexCategory])

    if(loading) return <p>LADDAR DATA ...</p>

    if (!categoryArray || categoryArray.length === 0) {
        return <p>Inga kategorier hittades.</p>;
    }
    {successMessage && <Alert type="success" message={successMessage} />}
    {errorMessage && <Alert type='error' message={errorMessage} />}

    return (
        <>

            <ul>
                {categoryArray.map((c) => (
                    <li key={c.title}>{c.title}
                    <HandleDeleteCategory id={c._id} IndexCategory={indexCategory}/>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default IndexCategory;