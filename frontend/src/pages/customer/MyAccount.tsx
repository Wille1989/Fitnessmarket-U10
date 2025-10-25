import { useUserManager } from "../../hooks/useUserManager";
import { useMessage } from "../../context/MessageProvider";
import { Alert } from "../../components/alert/Alert";
import { useEffect } from "react";
import Logout from "../../components/navigation/button/Logout";


export function MyAccount() {
    const { showMyAccount, userAccount } = useUserManager();
    const { errorMessage } = useMessage();

    // LÄGG TILL EN CALLBACK I HOOKEN
    useEffect(() => {
      showMyAccount();
    }, [])

    return (
        <>
            <h2>PROFILSIDAN</h2>

            {userAccount ? (
            <div>
              <p><strong>Namn:</strong> {userAccount.name}</p>
              <p><strong>Email:</strong> {userAccount.email}</p>
            </div>
          ) : (
            <p>Ingen användare inloggad</p>
          )}

          <Logout />

            {errorMessage && < Alert type="error" message={errorMessage} />}
        </>
    )
}

export default MyAccount;