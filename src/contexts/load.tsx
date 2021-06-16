import React, { createContext, useContext, useState, useEffect } from 'react';
import { Config } from '../models/Config';
import api from '../services/api';

interface LoadContextData {
    config: Config | null;
    isLoading: boolean;
    form: boolean;
    load(): void;
    loaded(): void;
    formHiddenT(): void;
    formHiddenF(): void;
}

const LoadContext = createContext<LoadContextData>({} as LoadContextData);

export const LoadProvider: React.FC = ({ children }) => {
    const [config, setConfig] = useState<Config | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState(false);

    useEffect(() => {
        getConfig();
    },[])

    async function getConfig() {
        try {
            const response = await api.get('/settings');
            setConfig(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    async function load(){
        setIsLoading(true);
    }

    async function loaded(){
        setIsLoading(false);
    }

    function formHiddenT(){
        setForm(true);
    }

    function formHiddenF(){
        setForm(false);
    }

    return(
        <LoadContext.Provider value={{ config, isLoading, form, load, loaded, formHiddenT, formHiddenF }}>
            {children}
        </LoadContext.Provider>
    );
}

export function useLoad(){
    const context = useContext(LoadContext);

    return context;
}