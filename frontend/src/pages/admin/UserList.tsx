import { useAdminMangement } from "../../hooks/useAdminManagement";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useEffect } from "react";
import NavigateUpdate from "../../components/navigation/button/Update";

function GetUsersList() {
    const { successMessage, errorMessage, arrayErrorMessage } = useMessage();
    const { getUsersList, loading, userList } = useAdminMangement();

    useEffect(() => {
       getUsersList();
   
    },[]);

    if(loading) return <p>Laddar data...</p>

    if(!userList) return <p>{arrayErrorMessage && < Alert type="error" message={arrayErrorMessage} />}</p>

    return (
        <div>
            <h1>ANVÄNDARE</h1>
            {successMessage && < Alert type="success" message={successMessage} />}

                <ul>
                    {userList.map((u) => (
                        <li key={u.email}>
                            <strong>{u.email}</strong> - <strong>{u.name};</strong>
                            <NavigateUpdate id={u.id} />
                        </li>
                    ))}
                </ul>

            {errorMessage && < Alert type="error" message={errorMessage} /> }
        </div>
    )
}

export default GetUsersList;