import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function DeleteUserAsAdmin() {
    const [loading, setLoading] = useState<boolean>(false);
    const { setSuccessMessage, errorMessage, setErrorMessage } = useMessage();
    const { deleteUserAccount } = useAdminManagement();
    const { id } = useParams();
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        if(id) {
            deleteUserAccount(id);
        }

        setSuccessMessage('Användaren har raderats!')
        setErrorMessage(errorMessage);
        setTimeout(() => {
            setErrorMessage(null)
        }, 1500)

        navigate('/admin/users');

        setLoading(false);

    }

    return (

        <>
            <button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Raderar användaren' : 'Radera användaren'}
            </button>

        </>
    )
}