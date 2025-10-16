import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserManager } from '../hooks/useUserManager';
import { Alert } from '../components/alert/Alert';

function RegisterPage() {
    const { register, loading, errorMessage, successMessage } = useUserManager();
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const [formError, setFormError] = useState<string | null>(null);
        const navigate = useNavigate();

        async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            if(password !== confirmPassword){
                    setFormError('Lösenorden matchar inte');
                    return;
                }
            if (await register({ email, password })) 

                await new Promise((resolve) => setTimeout(resolve, 1500));

                navigate('/login')
    
        }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                type='email'
                name='email'
                placeholder='Fyll i e-post'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                type='password'
                name='password'
                placeholder='Ange ett lösenord'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <input 
                type='password'
                name='confirmPassword'
                placeholder='Upprepa lösenordet'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button type='submit' 
                disabled={loading}>{ loading ? 'Skapar Konto' : 'Skapa Konto' }
                </button>

            </form>

            { successMessage && <Alert type='success' message={successMessage}/> }
            { errorMessage && <Alert type='error' message={errorMessage}/> }
            { formError && <Alert type='error' message={formError}/> }
            
        </div>
    )
}

export default RegisterPage;