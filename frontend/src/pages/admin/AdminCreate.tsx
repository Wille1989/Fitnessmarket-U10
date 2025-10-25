import { useState } from "react";
import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";

export function CreateUserAccount() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { createUserAccount } = useAdminMangement();
    const { setSuccessMessage, successMessage, errorMessage, setErrorMessage } = useMessage();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        if(password !== confirmPassword) {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
            throw new Error('Lösenorden matachar inte');
        }

        if(password.length < 8) {
            setTimeout(() => {
                setLoading(false);
            }, 1500)
            throw new Error('Lösenordet är för kort');
        }

        if(!email.includes('@')){
            setTimeout(() => {
                setLoading(false);
            }, 1500)
            throw new Error('Email är skriven i ett felaktigt format');
        }

        const success = await createUserAccount({ email, password });

        if(success) {
            setSuccessMessage('Användaren har skapats!');
            setTimeout(() => 1500);
        } else {
            setErrorMessage('Användaren har inte kunnat skapas');
        }

        setLoading(false);
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <input
                type="email"
                name="email"
                placeholder="Ange en unik e-post"
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                />
                <input
                type="password"
                name="password"
                placeholder="Ange lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input
                type="confirmPassword"
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