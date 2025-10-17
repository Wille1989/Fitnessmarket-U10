import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Alert } from "./alert/Alert";

function Logout() {
    const { logout, loading, successMessage, errorMessage } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        if(true) {
            setTimeout(() => navigate('/'), 1500);
        }
    }

    return (
        <div>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? 'Loggar ut' : 'Logga ut'}</button>

            { successMessage && <Alert type="success" message={successMessage} />}
            { errorMessage && <Alert type="error" message={errorMessage} />}

        </div>     
    )
}

export default Logout;