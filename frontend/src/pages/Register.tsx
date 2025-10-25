import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/alert/Alert';
import { useMessage } from '../context/MessageProvider';
import { useUserManager } from '../hooks/useUserManager';
import NavigateHome from '../components/navigation/button/Home';

function Register() {
        // GLOBAL STATE
        const { successMessage, errorMessage, setSuccessMessage, setErrorMessage } = useMessage();
        const { loading, register } = useUserManager();

        // LOCAL STATE
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
        const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
        const navigate = useNavigate();

        async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            if(password !== confirmPassword){
                setFormErrorMessage('Lösenorden matchar inte');
                setTimeout(() => setFormErrorMessage(null), 1500);
                return;
            }
            
            const result = await register ({ email, password });

            if(result) {
                setSuccessMessage(successMessage);
                setFormSuccessMessage('Ditt konto har skapats, omdirigerar dig till inloggningssidan');
                
                await new Promise((resolve) => setTimeout(resolve, 1500));

                navigate('/login')
            } else {
                setFormErrorMessage(formErrorMessage);
                setErrorMessage(errorMessage);
            }
        }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <input
                type='email'
                name='email'
                placeholder='fyll i e-post'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                type='password'
                name='password'
                placeholder='välj ett lösenord'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <input 
                type='password'
                name='confirmPassword'
                placeholder='upprepa lösenordet'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button type='submit' 
                disabled={loading}>{ loading ? 'Skapar Konto' : 'Skapa Konto' }
                </button>

            </form>

            { successMessage && <Alert type='success' message={successMessage}/> }
            { formSuccessMessage && <Alert type='success' message={formSuccessMessage}/> }
            { formErrorMessage && <Alert type='error' message={formErrorMessage}/> }
            { errorMessage && <Alert type='error' message={errorMessage}/> }

            <NavigateHome />

        </>
    )
}

export default Register;