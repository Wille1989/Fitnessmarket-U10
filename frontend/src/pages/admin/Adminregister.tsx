import { useState } from "react";
import { useAdminMangement } from "../../hooks/useAdminManagement";
import { Alert } from "../../components/alert/Alert";
import { useMessage } from "../../context/MessageProvider";


function registerNewUser() {
    const [loading, setLoading] = useState<boolean>(false);
    const { createUserAccount, userAccount } = useAdminMangement();
    const { setSuccessMessage, successMessage, errorMessage, setErrorMessage } = useMessage();
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        if(!userAccount) {
            throw new Error('ERROR');
        }

        await createUserAccount(userAccount);

        if(userAccount) {

            if(userAccount.password !== confirmPassword) {
                setErrorMessage('Lösenordet matcher inte');
            }

            
            setSuccessMessage('Användaren har skapats');
            setTimeout(() => setSuccessMessage(null), 1500);

            console.log('ADMINREGISTER:', userAccount)
        } else {
            setErrorMessage(errorMessage);
            setTimeout(() => setErrorMessage(null), 1500);
        }
        
        setLoading(false);

    }

    return (
        <>
        <h2>REGISTRERA NY ANVÄNDARE SOM ADMIN</h2>

        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="E-post"
                value={userAccount?.email}
                onChange={(e) => e.target.value}
            />
            <input 
                type="password"
                name="password"
                placeholder="Ange ett lösenord"
                value={userAccount?.password}
                onChange={(e) => e.target.value}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Upprepa lösenordet"               
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Skickar datan' : 'Skapa ny användare'}
            </button>
        </form>

        {successMessage && < Alert type="error" message={successMessage} />}
        {errorMessage && < Alert type="success" message={errorMessage} />}

        </>
    )

}

export default registerNewUser;