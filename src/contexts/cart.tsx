import React, { createContext, useState, useEffect, useContext } from 'react';
import { Profile } from '../models/User';

import api from '../services/api';

interface CartContextData {
    
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        function loadStorageData(){
            const storagedProfile = localStorage.getItem('@Sad:Profile');
            const storagedToken = localStorage.getItem('@Sad:Token');

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

    return (
        <CartContext.Provider value>
            {children}
        </CartContext.Provider>
    );
};

export function useCart(){
    const context = useContext(CartContext);

    return context;
}