import { useNavigate } from "react-router-dom";
import { Alert } from "./alert/Alert";
import { useMessage } from "../context/MessageProvider";
import { useAuth } from "../hooks/useAuth";

function Logout() {
    // GLOBAL STATE
    const { successMessage, errorMessage } = useMessage();
    const { logout, loading } = useAuth();

    // LOCAL STATE
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        setTimeout(() => navigate('/'), 1500);
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