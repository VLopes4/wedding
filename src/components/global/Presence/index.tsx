import React from 'react';
import './styles.css';

export default function Presence(){
    return(
        <section className="bg-presence">
            <div className="container pt-5 pb-5 mt-5 mb-5">
                <h2 className="subtitle">
                    CONFIRMAR PRESENÇA
                </h2>
                <p className="text-center">
                    Faça parte da nossa história confirmando a sua presença e a da sua família.
                </p>
                <form className="col-md-6 ml-auto mr-auto">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nome completo"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" aria-describedby="presenceNumber" placeholder="Pessoas"/>
                        <small id="presenceNumber" className="form-text text-muted">Quantidade de pessoas que irá com você.</small>
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        confirmar presença
                    </button>
                </form>
            </div>
        </section>
    );
}