import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Alert } from "../../components/alert/Alert";
import { useMessage } from "../../context/MessageProvider";
import { CreateUser } from "../../types/User/User";
import '../../css/auth/Login.css';

function Login() {
    const { errorMessage, successMessage } = useMessage();
    const { loading, login } = useAuth();
    const [form, setForm] = useState<CreateUser>({
        email: '',
        password: ''
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await login(form);
    };

    return (
        <>
            <form className="form-login" onSubmit={handleSubmit}>
                <label htmlFor="email">Mejladress:</label>
                <input className="input"
                type="email"
                name="email"
                placeholder="..."
                value={form.email.toLowerCase()}
                onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <label htmlFor="password">Lösenord:</label>
                <input className="input"
                type="password"
                name="password"
                placeholder="..."
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button type="submit" 
                disabled={loading}>{ loading ? 'Loggar in' : 'Logga in' }
                </button>

                {<p>Har du inget konto? Registrera dig <Link to="/register">här.</Link></p>}

                { successMessage && <Alert type="success" message={successMessage}/>}
                { errorMessage && <Alert type="error" message={errorMessage} />}
            </form>
        </>
    )
}

export default Login;