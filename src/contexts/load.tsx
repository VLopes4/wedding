import React, { createContext, useContext, useState } from 'react';

interface LoadContextData {
    loading: boolean;
    form: boolean;
    load(): void;
    loaded(): void;
    formHiddenT(): void;
    formHiddenF(): void;
}

const LoadContext = createContext<LoadContextData>({} as LoadContextData);

export const LoadProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(false);

    function load(){
        setLoading(true);
    }

    function loaded(){
        setLoading(false);
    }

    function formHiddenT(){
        setForm(true);
    }

    function formHiddenF(){
        setForm(false);
    }

    return(
        <LoadContext.Provider value={{ loading, form, load, loaded, formHiddenT, formHiddenF }}>
            {children}
        </LoadContext.Provider>
    );
}

export function useLoad(){
    const context = useContext(LoadContext);

    return context;
}