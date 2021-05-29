import React, { FormEvent, useState } from 'react';
import { useLoad } from '../../../contexts/load';
import { Guest } from '../../../models/Guest';
import api from '../../../services/api';

interface GuestProps {
    data: Guest | null;
}

const FormGuest: React.FC<GuestProps> = ({ data }) => {
    const { formHiddenT } = useLoad();
    const [name, setName] = useState(data ? data.name : '');
    const [type, setType] = useState(data ? data.type : 'x');
    const [person, setPerson] = useState(data ? data.person : 'x');
    const [message, setMessage] = useState('');

    async function handleGuest(e: FormEvent) {
        e.preventDefault();

        try {
            if(data){
                await api.put(`/guestlist/${data.id}`, { name, type, person, is_confirm: '0' });
                setName('');
                setType('x');
                setPerson('x');
                formHiddenT();
            } else {
                const response = await api.post('/guestlist', { name, type, person });
                setMessage(response.data.success);
                setName('');
                setType('x');
                setPerson('x');
            }
        } catch (error) {
            console.log(error);
            setMessage('Ocorreu um erro inesperado, tente novamente mais tarde');
        }
    }

    return(
        <div>
            <h5 className="subtitle text-left">
                {data ? 'Editar' : 'Cadastrar'} Convidado
            </h5>
            <form onSubmit={handleGuest}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Nome Completo"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select 
                        className="form-control"
                        value={type}
                        onChange={event => setType(event.target.value)}
                    >
                        <option value="x" hidden disabled>Tipo</option>
                        <option value="Convidado">Convidado</option>
                        <option value="Padrinho">Padrinho</option>
                        <option value="Madrinha">Madrinha</option>
                    </select>
                </div>
                <div className="form-group">
                    <select 
                        className="form-control"
                        value={person}
                        onChange={event => setPerson(event.target.value)}
                    >
                        <option value="x" hidden disabled>Pessoa</option>
                        <option value="Adulto">Adulto</option>
                        <option value="Criança">Criança</option>
                    </select>
                </div>
                {data ? (  
                    <div className="row">
                        <button type="button" onClick={formHiddenT} className="btn btn-input w-45 my-3 mx-auto">
                            CANCELAR
                        </button>
                        <button type="submit" className="btn btn-primary w-45 my-3 mx-auto">
                            EDITAR
                        </button>
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary w-100 my-3">
                        CADASTRAR
                    </button>
                )}
                <p className="message mb-0">
                    {message}
                </p>
            </form>
        </div>
    );
}

export default FormGuest;