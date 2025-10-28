import { useState } from "react";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { CreateUser } from "../../types/User/User";
import { useNavigate } from "react-router-dom";
import '../../css/global/Form.css';

export function CreateUserAccount() {
    const { createUserAccount, loading } = useAdminManagement();
    const { successMessage, errorMessage } = useMessage();
    const [form, setForm] = useState<CreateUser>({
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        await createUserAccount(form, confirmPassword);

        navigate('/admin/users');

    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input
                type="email"
                name="email"
                placeholder="Ange en unik e-post"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <input className="input"
                type="password"
                name="password"
                placeholder="Ange lösenord"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <input className="input"
                type="password"
                name="confirmPassword"
                placeholder="Upprepa lösenordet"
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