import { useState } from "react";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function DeleteUserAsAdmin() {
    const [loading, setLoading] = useState<boolean>(false);
    const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } = useMessage();
    const { deleteUserAccount } = useAdminMangement();
    const { id } = useParams();
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        if(id) {
            deleteUserAccount(id);
            console.log(deleteUserAccount, typeof deleteUserAccount);
        }

        setSuccessMessage('Användaren har raderats!')
        setErrorMessage(errorMessage);
        setTimeout(() => {
            setErrorMessage(null)
        }, 1500)

        navigate('adminDashboard/users');

        setLoading(false);

    }

    return (

        <>
            <button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Raderar användaren' : 'Radera användaren'}
            </button>

            {successMessage && < Alert type="success" message={successMessage} />}
            {errorMessage && < Alert type="error" message={errorMessage} />}
        </>
    )
}