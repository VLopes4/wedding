import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faChild } from '@fortawesome/free-solid-svg-icons';
import { Guest } from '../../../../models/Guest';
import api from '../../../../services/api';

interface ItemGuestProps {
    data: Guest;
}

const CardGuest: React.FC<ItemGuestProps> = ({ data }) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(0);

    async function handleConfirm(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await api.put(`/guestlist/confirm/${data.id}`)
            setMessage(response.data.success);
            setStatus(2);
        } catch (error) {
            console.log(error);
            setMessage('Erro inesperado, tente novamente mais tarde')
        }
    }

    function handleIsDelete(e: FormEvent){
        e.preventDefault();

        setStatus(1);
        setMessage(`${data.name}, você realmente deseja recusar o convite?`)
    }

    async function handleRecused(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await api.put(`/guestlist/recuse/${data.id}`)
            setMessage(response.data.success);
            setStatus(3);
        } catch (error) {
            console.log(error);
            setMessage('Erro inesperado, tente novamente mais tarde')
        }
    }

    return(
        <div key={data.id} className="card card-border mx-auto mb-3" style={{ maxWidth: '540px'}}>
            <div className="card-body">
                <h5 className="card-title guest-name ml-0">
                    <span className="card-icon">
                        {data.person === 'Adulto' ? (
                            <>
                                <FontAwesomeIcon icon={faMale}/>
                                <FontAwesomeIcon icon={faFemale}/>
                            </>
                        ) : (
                            <FontAwesomeIcon icon={faChild}/>
                        )}
                        
                    </span>
                    {data.name}
                </h5>
                <h6 className="card-subtitle mb-2">
                    {data.type}
                </h6>
                {status < 2 && (
                    <div className="row">
                        <button className="btn btn-confirm w-45 mx-auto" type="button" onClick={handleConfirm}>
                            Confirmar convite
                        </button>
                        <button className="btn btn-recused w-45 mx-auto" type="button" onClick={handleIsDelete}>
                            Recusar convite
                        </button>
                    </div>
                )}
            </div>
            {message && (
                <div className={status === 3 ? 'card-footer guest-recused' : status === 2 ? 'card-footer guest-confirmed' : 'card-footer'}>
                    <p className={status > 1 ? 'text-confirm' : 'text-center mb-0'}>
                        {message} {status === 1 && ( <span className="text-recuse" onClick={handleRecused}> SIM, RECUSAR</span> )}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CardGuest;