import React, { FormEvent, useEffect, useState } from 'react';
import { useLoad } from '../../../contexts/load';
import { Config } from '../../../models/Config';
import api from '../../../services/api';

interface ConfigProps {
    data: Config | null;
}

const FormConfig: React.FC<ConfigProps> = ({ data }) => {
    const { formHiddenT } = useLoad();
    const [date, setDate] = useState(data ? data.date : '');
    const [streaming, setStreaming] = useState(data ? data.streaming : '');
    const [album, setAlbum] = useState(data ? data.album : '');
    const [message, setMessage] = useState('');

    async function handleConfig(e: FormEvent) {
        e.preventDefault();

        console.log(date)

        try {
            await (data ? api.put(`/settings/${data.id}`, { date, streaming, album }) : api.post('/settings', { date, streaming, album }));
            formHiddenT();
        } catch (error) {
            setMessage('Erro ao cadastrar configuração')
            console.log(error);
        }
    }

    return(
        <div className={data ? "list-table-form" : ""}>
            <h5 className="subtitle text-left">
                {data ? 'Editar' : 'Cadastrar'} Configurações
            </h5>
            <form onSubmit={handleConfig}>
                <div className="form-group">
                    <input 
                        type="datetime-local"
                        className="form-control"
                        placeholder="Data do evento"
                        value={date}
                        onChange={event => setDate(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Url da plataforma de stream"
                        value={streaming}
                        onChange={event => setStreaming(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Url do álbum de música"
                        value={album}
                        onChange={event => setAlbum(event.target.value)}
                    />
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

export default FormConfig;