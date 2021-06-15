import React, { createContext, useContext, useState } from 'react';

interface LoadContextData {
    isLoading: boolean;
    form: boolean;
    load(): void;
    loaded(): void;
    formHiddenT(): void;
    formHiddenF(): void;
}

const LoadContext = createContext<LoadContextData>({} as LoadContextData);

export const LoadProvider: React.FC = ({ children }) => {
    const [form, setForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        <LoadContext.Provider value={{ isLoading, form, load, loaded, formHiddenT, formHiddenF }}>
            {children}
        </LoadContext.Provider>
    );
}

export function useLoad(){
    const context = useContext(LoadContext);

    return context;
}