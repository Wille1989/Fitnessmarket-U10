import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/alert/Alert';
import { useMessage } from '../context/MessageProvider';
import { useUserManager } from '../hooks/useUserManager';

function Register() {
        // GLOBAL STATE
        const { formSuccessMessage, setFormSuccessMessage, 
                formErrorMessage, setFormErrorMessage, 
                successMessage, errorMessage } = useMessage();
        const { loading, register } = useUserManager();

        // LOCAL STATE
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const navigate = useNavigate();

        async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            if(password !== confirmPassword){
                    setFormErrorMessage('Lösenorden matchar inte');
                    return;
                }
            if (await register({ email, password })) 

                setFormSuccessMessage('Ditt konto har skapats, omdirigerar dig till inloggnignssidan')
                await new Promise((resolve) => setTimeout(resolve, 1500));

                navigate('/login')
    
        }

    return (
        <div>
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
            { errorMessage && <Alert type='error' message={errorMessage}/> }
            { formErrorMessage && <Alert type='error' message={formErrorMessage}/> }
            
        </div>
    )
}

export default Register;