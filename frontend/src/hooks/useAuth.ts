import type { Logindata } from "../types/User/UserAuth";
import type { User } from "../types/User/User";
import { authApi } from "../api/authApi";
import { useAsyncState } from "./custom hooks/useAsyncState";

export function useAuth() {
    const { 
        data: user, setData: setUser, 
        loading, setLoading,
        errorMes, setErrorMes, 
        successMes, setSuccessMes  } = useAsyncState<User>();

        async function login(data: Logindata) {
            try {
                setLoading(true);

                const result = await authApi.login(data);
                localStorage.setItem('token', result.token);
                
                setUser(result.user);
                setSuccessMes('Du har loggats in!');

            } catch (error) {
                setErrorMes('Fel användarnamn eller lösenord');

            } finally {
                setLoading(false);
            }
        }

    return { user, loading, login, successMes, errorMes}
};