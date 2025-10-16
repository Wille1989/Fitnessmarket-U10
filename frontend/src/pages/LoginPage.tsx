import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Alert } from "../components/alert/Alert";
import { getDecodedToken } from "../middleware/JwtDecode";
import '../css/message.css';

function LoginPage() {
    const { login, loading, successMessage, errorMessage } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [decodeError, setDecodeError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const success = (await login({ email, password }))

            await new Promise((resolve) => setTimeout(resolve, 800))

            if(success) {
                const decoded = getDecodedToken();

                if(!decoded) {
                    setDecodeError('Kunde inte läsa token');
                    return;
                }

                if(decoded.role === 'customer'){
                    navigate('/profile')

                } else if (decoded.role === 'admin'){
                    navigate('/admin')

                } else if(decoded.role === 'sales'){
                    navigate('/sales')
                }
            }
                 
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

                
            </form>

            { successMessage && <Alert type="success" message={successMessage} />}
            { errorMessage && <Alert type="error" message={errorMessage} />}
            { decodeError && <Alert type="error" message={decodeError} /> }

        </div>
    )

}

export default LoginPage;