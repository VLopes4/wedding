import React from 'react';
import { faCheckCircle, faTimesCircle,  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/auth';
import './styles.css';

export function Success(){
    const { profile } = useAuth();

    return(
        <>
            <div className="row mt-5">
                <FontAwesomeIcon className="mx-auto" icon={faCheckCircle} size="9x" color="#0e700e"/>
            </div>
            <h2 className="title-payment success">
                Pagamento aprovado
            </h2>
            <p className="text-justify">
                Parabéns {profile?.name}, seu pagamento foi aprovado com sucesso, você poderá ver a lista de presentes no seu perfil,
                em caso de reembolso entre em contato com os noivos
            </p>
            <p className="text-center mb-0">
                Agradecemos pela sua consideração e todo carinho demonstrado por nós
            </p>
            <h6 className="engaged">
                Bruno & Pamella
            </h6>
        </>
    );
}

interface CancelProps {
    error: string
}

export const Cancel: React.FC<CancelProps> = ({ error }) => {
    const { profile } = useAuth();

    return(
        <>
            <div className="row mt-5">
                <FontAwesomeIcon className="mx-auto" icon={faTimesCircle} size="9x" color="#a70000"/>
            </div>
            <div className="col-md-7 mx-auto">
                <h2 className="title-payment cancel">
                    Pagamento Recusado
                </h2>
                <p className="text-justify">
                    {profile?.name}, infelizmente ocorreu um erro e o seu pagamento foi recusado, verifique os dados do meio
                    de pagamento usado e tente novamente. Por favor, entre em contato com os noivos se o problema persistir
                    e não for o meio de pagamento usado.
                </p>
                <p className="text-center">
                    <span className="engaged cancel">Detalhe: {error}</span>
                </p>
            </div>
        </>
    );
}