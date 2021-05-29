import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

export default function FormProfile(){
    const { updateProfile, confirmPassword, message } = useAuth();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMessage] = useState('');

    async function handleUpdate(e: FormEvent) {
        e.preventDefault();
        if(confirmPassword(password)){
            try {
                const response = await api.put('/profile', { name, surname, email });
                console.log(response);
                if(response.data.success){
                    setMessage(response.data.success);
                    setPassword('');
                } else {
                    return setMessage(response.data.error);
                }
                updateProfile();
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessage(message);
            setPassword('');
        }
    }
    
    return(
        <div className="border-top">
            <h5 className="subtitle text-left mt-4">
                Editar Perfil
            </h5>
            <form onClick={handleUpdate}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Sobrenome"
                        value={surname}
                        onChange={event => setSurname(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Confirmar senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                {
                    msg && (
                        <p className="message mb-0">
                            {msg}
                        </p>
                    )
                }
                <button type="submit" className="btn btn-primary w-100 my-3">
                    CADASTRAR
                </button>
            </form>
        </div>
    );
}