import {
    getProfile,
    login,
    logout,
    User,
    FormLogin
} from '../services/user.service';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

type ChildrenProps = {
    children: ReactNode;
};

type Context = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: ({ username, password }: FormLogin) => {};
    logout: () => {};
    isLogged: boolean;
};

const AuthContext = createContext<Context>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    login: login,
    logout: logout,
    isLogged: false
});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: ChildrenProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getProfile();
                if (res) {
                    setUser(res);
                    setIsLogged(true);
                    setIsLoading(false);
                } else {
                    setUser(null);
                    setIsLogged(false);
                    setIsLoading(false);
                }
            } catch (err) {
                setIsLoading(false);
            }
        };
        fetch();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                isLoading,
                isLogged,
                login,
                logout,
                user
            }}>
            {children}
        </AuthContext.Provider>
    );
};
