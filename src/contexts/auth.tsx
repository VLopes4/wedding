import React, { createContext, useState, useEffect, useContext } from 'react';
import { Profile } from '../models/User';

import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    profile: Profile | null;
    loading: boolean;
    loadingForm: boolean;
    message: string;
    updateProfile(): Promise<void>
    signIn(
        email: string,
        password: string,
    ): Promise<void>;
    signOut(): void;
    confirmPassword(
        password: string
    ): Promise<boolean | void>;
    forgotIt(
        email: string
    ): Promise<void>;
    reset(
        token: string | null,
        password: string
    ): Promise<void>;
    register(
        name: string,
        surname: string,
        email: string,
        password: string,
    ): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        function loadStorageData(){
            const storagedProfile = localStorage.getItem('@SadBP:Profile');
            const storagedToken = localStorage.getItem('@SadBP:Token');

            if(storagedProfile && storagedToken){
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

                setProfile(JSON.parse(storagedProfile));
                setLogin(true)
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function updateProfile() {
        try {
            if(profile?.id){

                const response = await api.get(`/profile/${profile.id}`);

                if(response.data.error){
                    console.log(response.data.error);
                }

                localStorage.removeItem('@SadBP:Profile');
                setProfile(response.data);
                localStorage.setItem('@SadBP:Profile', JSON.stringify(response.data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function signIn(email: string, password: string){
        if(email === "" || password === "") {
            return setMsg('Preencha todos os campos corretamente antes de continuar.')
        }
        setLoadingForm(true);

        try {
            const response = await api.post('/session', { email, password });
        
            if(response.data.error){
                setLoadingForm(false);
                return setMsg(response.data.error);
            }

            const userId = Number(response.data.user_id);

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            localStorage.setItem('@SadBP:Token', response.data.token);

            const responseProfile = await api.get(`/profile/${userId}`);
            setProfile(responseProfile.data);
            localStorage.setItem('@SadBP:Profile', JSON.stringify(responseProfile.data));
            
            setLoadingForm(false);
            setLogin(true);
        } catch (error) {
            setMsg('Endere??o de email ou senha n??o encontrado.');
            setLoadingForm(false);
        }
    }

    function signOut() {
        setProfile(null);
        setLogin(false);
        localStorage.removeItem('@SadBP:Cart')
        localStorage.removeItem('@SadBP:Token');
        localStorage.removeItem('@SadBP:Profile');
        localStorage.removeItem('@SadBP:Remember');
        localStorage.removeItem('@SadBP:CartCount');
    }

    async function confirmPassword(password: string) {
        try {
            const response = await api.post('/user/confirm', { password });
            if(response.data.error){
                setMsg(response.data.error);
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async function forgotIt(email: string) {
        if(email === "") {
            return setMsg('Preencha o campo corretamente antes de continuar.')
        }

        try {
            const response = await api.post('/forgot', { email });
            setMsg(response.data.ok)
        } catch (error) {
            console.log(error);
            setMsg('Falha no envio, tente novamente.');
        }
    }

    async function reset(token: string, password: string){
        try {
            await api.post('/reset', { token, password });
            setMsg('Senha resetada com sucesso!');
        } catch (error) {
            console.log(error)
            setMsg('Falha ao resetar a senha, tente novamente mais tarde com uma nova solicita????o!')
        }
    }

    async function register(name: string, surname: string, email: string, password: string) {
        if(name === "" || surname === "" || email === "" || password === "") {
            return setMsg('Preencha todos os campos corretamente antes de continuar.')
        }

        setLoadingForm(true);

        try {
            const response = await api.post('/register', { name, surname, email, password });

            if(response.data.error){
                setMsg(response.data.error);
            }

            const userId = Number(response.data.id);

            const responseSession = await api.post('/session', { email, password });
        
            if(responseSession.data.error){
                setMsg(responseSession.data.error);
            }

            api.defaults.headers.Authorization = `Bearer ${responseSession.data.token}`;
            localStorage.setItem('@SadBP:Token', responseSession.data.token);

            const responseProfile = await api.get(`/profile/${userId}`);
            setProfile(responseProfile.data);
            localStorage.setItem('@SadBP:Profile', JSON.stringify(responseProfile.data));
            
            setLogin(true);
            setLoadingForm(false);
        } catch (error) {
            setLoadingForm(false);
            setLoading(false);
            setMsg('Erro ao realizar o seu registro, tente novamente.')
        }
    }

    return (
        <AuthContext.Provider
            value={{ signed: login, profile, loading, loadingForm, message: msg, updateProfile, signIn, signOut, confirmPassword, forgotIt, reset, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}