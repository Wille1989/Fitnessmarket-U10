import { useEffect, useState } from "react";
import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useParams } from "react-router-dom";
import { UpdateUser } from "../../types/User/User";

function UserById() {
    const { showUserAccount, userAccount, updateUserAccount } = useAdminMangement();
    const { id }= useParams();
    const [formData, setFormData] = useState<UpdateUser | null>();

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
    }

    const roles = ['admin', 'sales', 'customer']

    if(!formData) return <p>Laddar användare...</p> 

    return (
        <div>
        <h1>UserById</h1>

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
                        onChange={(e) => setFormData((prev) => prev ? {...prev, r: e.target.value} : prev )}
                    />
                {r}
                </label>
            ))}
            
            <button type="submit">
                Uppdatera
            </button>
         

        </form>
           
        </div>
    )
}

export default UserById;