import React, { FormEvent, useState } from 'react';
import api from '../../../services/api';

export default function FormPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [confirmNew, setConfirmNew] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleUpdate(e: FormEvent){
        e.preventDefault();

        if(newPassword !== confirmNew){
            return setMessage('Nova senha e confirmação de nova senha são divergentes')
        }
        try {
            const response = await api.put('/user/password', { password, newpassword: newPassword });
            if(response.data.error){
                return setMessage(response.data.error);
            }

            return setMessage(response.data.successs);
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className="border-top">
            <h5 className="subtitle text-left mt-4">
                Alterar Senha
            </h5>
            <form onClick={handleUpdate}>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Confirmar nova senha"
                        value={confirmNew}
                        onChange={event => setConfirmNew(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                {
                    message && (
                        <p className="message mb-0">
                            {message}
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