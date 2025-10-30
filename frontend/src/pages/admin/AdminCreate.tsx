import { useState } from "react";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { CreateUser } from "../../types/User/User";
import { useNavigate } from "react-router-dom";
import '../../css/user/admin/CreateUser.css';

export function CreateUserAccount() {
    const navigate = useNavigate();
    const { createUserAccount, loading } = useAdminManagement();
    const { successMessage, setSuccessMessage, errorMessage } = useMessage();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [form, setForm] = useState<CreateUser>({
        email: '',
        password: '',
    });
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const success = await createUserAccount(form, confirmPassword);

        if(success) {
            setSuccessMessage('Användare konto skapat!');
            setTimeout(() => {
                setSuccessMessage(null),
                navigate('/admin/users')
            }, 1000)
        }
        
    };

    return (
        <>
            <form className="form-register-customer" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                name="email"
                placeholder="....."
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <label htmlFor="password">Lösenord:</label>
                <input className="input"
                type="password"
                name="password"
                placeholder="....."
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <label htmlFor="confirmPassword">Upprepa lösenordet:</label>
                <input className="input"
                type="password"
                name="confirmPassword"
                placeholder="....."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Skapar ny användare' : 'Skapa ny användare'}
                </button>
            </form>

            { successMessage && < Alert type='success' message={successMessage}/> }
            { errorMessage && < Alert type="error" message={errorMessage}/> }
        </>
    )
}