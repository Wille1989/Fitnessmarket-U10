import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Alert } from "../components/alert/Alert";
import '../css/message.css';

function LoginPage() {
    const { login, loading, successMessage, errorMessage } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleSubmit(e: React.FormEvent ) {
        e.preventDefault;
        await login({ email, password })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                name="password"
                placeholder="lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" 
                disabled={loading}>{ loading ? 'Loggar in' : 'Logga in' }
                </button>

                { successMessage && <Alert type="success" message={successMessage} />}
                { errorMessage && <Alert type="error" message={errorMessage} />}

            </form>
        </div>
    )

}

export default LoginPage;