import React from 'react';

import { useAuth } from '../contexts/auth';
import { useLoad } from '../contexts/load';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
    const { signed, loading } = useAuth();

    if(loading){
        return (
            <section className="container">
                <div className="d-flex justify-content-center pdt-15 m-5">
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <h3 className="text-center">Sad Development - Soluções para um mundo conectado carregando</h3>
            </section>
        );
    }

    return signed ? <AuthRoutes/> : <AppRoutes/>;
    
}

export default Routes;