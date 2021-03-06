import React, { FormEvent, useState } from 'react';
import { Guest } from '../../../models/Guest';
import api from '../../../services/api';
import CardGuest from './Guest';
import './styles.css';

export default function Presence(){
    const [name, setName] = useState('');
    const [guests, setGuests] = useState([]);
    const [message, setMessage] = useState('');
    
    async function handleSearch(e: FormEvent) {
        e.preventDefault();
        setGuests([]);

        try {
            const response = await api.get(`/guestlist/search?name=${name}`);
            if(response.data.error){
                return setMessage(response.data.error);
            }
            console.log(response.data)
            setGuests(response.data.guestList);
            setMessage(response.data.success);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <section className="bg-presence">
            <div className="container py-5 my-5">
                <h2 className="subtitle">
                    CONFIRMAR PRESENÇA
                </h2>
                <p className="text-center">
                    Faça parte da nossa história confirmando a sua presença e a da sua família.
                </p>
                <div className="row">
                    <div className={guests.length > 0 ? "col-md-6 mt-5" : "col-md-6 mx-auto"}>
                        <form onSubmit={handleSearch}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nome completo"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-100" type="submit">
                                Verificar Convidado
                            </button>
                        </form>
                        {message && (
                            <p className="message mt-3">
                                {message}
                            </p>
                        )}
                    </div>
                    {guests.length > 0 && (
                        <div className="col-md-6 mt-5">
                            {guests.map((guest: Guest) => {
                                return <CardGuest key={guest.id} data={guest}/>
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}