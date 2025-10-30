import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMessage } from "../../context/MessageProvider";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import type{ UpdateUser } from "../../types/User/User";
import { Alert } from "../../components/alert/Alert";
import { DeleteUserAsAdmin } from "./AdminDelete";
import { useNavigate } from "react-router-dom";
import '../../css/user/admin/EditUser.css'

function UserById() {
    const { successMessage, setSuccessMessage, errorMessage } = useMessage();
    const { showUserAccount, userAccount, updateUserAccount } = useAdminManagement();
    const { id }= useParams();
    const [formData, setFormData] = useState<UpdateUser | null>();
    const roles = ['admin', 'sales', 'customer']
    const navigate = useNavigate();

    // USER ID FROM URL
    useEffect(() => {
        if(id){
            showUserAccount(id);
        }
    },[id, showUserAccount]);

    // USER DATA
    useEffect(() => {
        if(userAccount){
            setFormData(userAccount);
        }
    },[userAccount]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(!formData) return;

        const success = await updateUserAccount(formData);

        if(success) {
            setSuccessMessage('Användaren har uppdaterats!');
            setTimeout(() => {
                setSuccessMessage(null),
                navigate('/admin/users')
            }, 1500)
        }
    }

    if(!formData) return <p>Laddar användare...</p> 

    return (
        <>
        <form className="form-edit-user" onSubmit={handleSubmit}>
            <label htmlFor="email">Ändra Mejladress:</label>
            <input 
                type="email"
                name="email"
                placeholder="....."
                value={formData?.email}
                onChange={(e) => setFormData((prev) => prev ? {...prev, email: e.target.value}: prev)}
            />
            <label htmlFor="name">Ändra Namn:</label>
            <input className="input"
                type="text"
                name="name"
                placeholder="....."
                value={formData?.name}
                onChange={(e) => setFormData((prev) => prev ? {...prev, name: e.target.value}: prev)} 
            />
                <label htmlFor="role">Ändra användarens roll:</label>
                {roles.map((r) => (
                    <label key={r} className="radio-label">
                        <input
                            type="radio"
                            name="role"
                            checked={formData?.role === r}
                            value={r}
                            onChange={(e) => setFormData((prev) => prev ? {...prev, role: e.target.value} : prev )}
                        />
                    {r}
                    </label>
                ))}
            <button type="submit">
                Uppdatera
            </button>
            <DeleteUserAsAdmin /> 
            {successMessage && <Alert type="success" message={successMessage}/>}
            {errorMessage && <Alert type="error" message={errorMessage}/>}
        </form>     
        </>
    )
}

export default UserById;