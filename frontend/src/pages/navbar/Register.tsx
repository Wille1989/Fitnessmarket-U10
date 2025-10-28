import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../components/alert/Alert';
import { useMessage } from '../../context/MessageProvider';
import { useUserManager } from '../../hooks/useUserManager';
import { CreateUser } from '../../types/User/User';
import '../../css/global/Form.css';

function Register() {
        const navigate = useNavigate();
        const { successMessage, errorMessage } = useMessage();
        const { loading, register } = useUserManager();
        const [form,setForm] = useState<CreateUser>({
            email: '', 
            password: '',
        });
        const [confirmPassword, setConfirmPassword] = useState<string>('');

        async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            await register (form, confirmPassword);

            navigate('/login')
        }

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="email">Mejladress:</label>
                <input
                type='email'
                name='email'
                placeholder='...'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})} 
                />
                <label htmlFor="password">Lösenord:</label>
                <input className='input' 
                type='password'
                name='password'
                placeholder='...'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <label htmlFor="confirmPassword">Upprepa Lösenord:</label>
                <input className='input' 
                type='password'
                name='confirmPassword'
                placeholder='...'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type='submit' 
                disabled={loading}>{ loading ? 'Skapar Konto' : 'Skapa Konto' }
                </button>

                { successMessage && <Alert type='success' message={successMessage}/> }
                { errorMessage && <Alert type='error' message={errorMessage}/> }
            </form>
        </>
    )
}

export default Register;