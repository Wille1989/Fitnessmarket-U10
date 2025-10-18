import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useEffect } from "react";

function GetUsersList() {
    const { successMessage, errorMessage, arrayErrorMessage } = useMessage();
    const { getUsersList, loading, userList } = useAdminMangement();

    useEffect(() => {
        getUsersList();

    },[]);

    if(loading) return <p>Laddar data...</p>

    if(!userList) return <p>Listan kan inte laddas</p>

    return (
        <div>

            <h1>HÄMTA ANVÄNDARLISTORNA</h1>
                <ul>
                    {userList.map((u) => (
                        <li key={u.email}>
                            <strong>{u.email}</strong> - {u.name};
                        </li>
                    ))}
                </ul>

            {successMessage && < Alert type="success" message={successMessage} />}
            {errorMessage && < Alert type="error" message={errorMessage} /> }
            {arrayErrorMessage && < Alert type="error" message={arrayErrorMessage} />}
        </div>
    )
}

export default GetUsersList;