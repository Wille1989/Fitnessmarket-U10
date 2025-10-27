import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react";

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        
        logout();
        setTimeout(() => {
            navigate('/'),
            navigate(0)
        },500)
    },[logout])

    return (
        <></>
    )
}

export default Logout;