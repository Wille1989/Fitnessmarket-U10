import { useEffect, useState } from "react";
import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useParams } from "react-router-dom";
import { UpdateUser } from "../../types/User/User";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { DeleteUserAsAdmin } from "./AdminDelete";

function UserById() {
    const { successMessage, setSuccessMessage } = useMessage();
    const { showUserAccount, userAccount, updateUserAccount } = useAdminMangement();
    const { id }= useParams();
    const [formData, setFormData] = useState<UpdateUser | null>();
    const roles = ['admin', 'sales', 'customer']

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

        await updateUserAccount(formData);

        setSuccessMessage('Användaren har uppdaterats!');
        setTimeout(() => setSuccessMessage(null), 1500);
    }

    if(!formData) return <p>Laddar användare...</p> 

    return (
        <>
        <h1>UserById</h1>

        {successMessage && <Alert type="success" message={successMessage}/>}

        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                name="email"
                placeholder="e-post"
                value={formData?.email}
                onChange={(e) => setFormData((prev) => prev ? {...prev, email: e.target.value}: prev)}
            />
            <input
                type="text"
                name="name"
                placeholder="namn"
                value={formData?.name}
                onChange={(e) => setFormData((prev) => prev ? {...prev, name: e.target.value}: prev)} 
            />
            {roles.map((r) => (
                <label key={r} >
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
         
        </form>

        <DeleteUserAsAdmin /> 
           
        </>
    )
}

export default UserById;