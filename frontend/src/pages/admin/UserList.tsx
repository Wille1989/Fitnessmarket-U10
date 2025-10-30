import { useAdminManagement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useEffect } from "react";
import NavigateEdit from "../../components/navigation/button/NavigateEdit";
import { useNavigate } from "react-router-dom";
import '../../css/user/admin/UserList.css'
import NavigateCustomerOrders from "../../components/navigation/button/NavigateCustomerOrders";

function GetUsersList() {
    const { successMessage, errorMessage, arrayErrorMessage } = useMessage();
    const { getUsersList, loading, userList } = useAdminManagement();
    const navigate = useNavigate();

    useEffect(() => {
       getUsersList();
    },[]);

    const handleClick = (() => {

        navigate('/admin/users/create')

    });

    if(loading) return <p>Laddar data...</p>

    if(!userList) return <p>{arrayErrorMessage && < Alert type="error" message={arrayErrorMessage} />}</p>

    return (
        <div className="user-page">
            <h2>ANVÄNDARE</h2>
            {successMessage && < Alert type="success" message={successMessage} />}

            <div className="user-list-card">
                <ul className="user-list">
                    {userList.map((u) => (
                        <li key={u.email} className="user-key">
                            <div className="user-info">
                                <strong>{u.name}</strong>
                                <span>{u.role}</span>
                                <strong>{u.email}</strong>
                            </div>
                            <div className="user-navigation">
                                <NavigateEdit id={u.id} />
                                <NavigateCustomerOrders id={u.id} />
                            </div>
                        </li>
                    ))}
                    {errorMessage && < Alert type="error" message={errorMessage} /> }
                </ul>
                            
                <button type="submit" onClick={handleClick}>Skapa ny användare</button>
            </div>
        </div>
    )
}

export default GetUsersList;