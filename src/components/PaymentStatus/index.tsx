import React, { useState } from 'react';
import { faCheckCircle, faTimesCircle,  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/auth';
import './styles.css';
import { useEffect } from 'react';

export function Success(){
    const { profile } = useAuth();
    const [scroll, setScroll] = useState(0);
    const [status, setStatus] = useState('col-md-6')

    useEffect(() => {
        window.onscroll = () => handleScroll();
    }, [scroll])

    function handleScroll(){
        if(document.documentElement.scrollTop > 150){
            setStatus('col-md-6 success-fixed');
        } else {
            setStatus('col-md-6');
        }

        setScroll(document.documentElement.scrollTop);
    }

    useEffect(() => {
        localStorage.removeItem('@SadBP:Cart')
        localStorage.removeItem('@SadBP:CartCount');
    },[])

    return(
        <div className={status}>
            <div className="row mt-5">
                <FontAwesomeIcon className="mx-auto" icon={faCheckCircle} size="9x" color="#0e700e"/>
            </div>
            <h2 className="title-payment success">
                Pagamento aprovado
            </h2>
            <p className="text-justify">
                Parabéns {profile?.name}, seu pagamento foi aprovado, você poderá ver a lista de presentes no seu perfil e
                em caso de reembolso entre em contato com os noivos. Você poderá enviar uma mensagem de carinho (cartão presente)
                junto com o presente comprado, e essa mensagem é particular ela será exibida somente aos noivos.
            </p>
            <p className="text-center mb-0">
                Agradecemos pela sua consideração e todo carinho demonstrado
            </p>
            <h6 className="engaged">
                Bruno & Pamella
            </h6>
        </div>
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