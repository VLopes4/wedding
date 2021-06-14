import React, { FormEvent, useState } from 'react';
import { useLoad } from '../../../contexts/load';
import { Location } from '../../../models/Event';
import api from '../../../services/api';

interface LocationProps {
    data: Location | null;
}

const FormLocation: React.FC<LocationProps> = ({ data }) => {
    const { formHiddenT } = useLoad();
    const [photograph, setPhotograph] = useState(data ? data.photograph : '');
    const [name, setName] = useState(data ? data.name : '');
    const [description, setDescription] = useState(data ? data.description : '');
    const [linkName, setLinkName] = useState(data ? data.link : '');
    const [linkUrl, setLinkUrl] = useState(data ? data.url : '');
    const [date, setDate] = useState(data ? data.date : '');
    const [address, setAddress] = useState(data ? data.address : '');
    const [covid, setCovid] = useState(data ? data.covid : '');
    const [message, setMessage] = useState('');

    async function handleLocation(e: FormEvent) {
        e.preventDefault();
        
        try {
            const response = await (data ? api.put(`/location/${data.id}`, { photograph, name, description, link: linkName, url: linkUrl, date, address, covid }) : api.post('/location', { photograph, name, description, link: linkName, url: linkUrl, date, address, covid }));
            if(response.data.error){
                return setMessage(response.data.error);
            } else {
                setPhotograph('');
                setName('');
                setDescription('');
                setLinkName('');
                setLinkUrl('');
                setDate('');
                setAddress('');
                setCovid('');
                formHiddenT();
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div>
            <h5 className="subtitle text-left">
                {data ? 'Editar' : 'Cadastrar'} Local do Evento
            </h5>
            <div className={photograph !== '' ? 'row' : ''}>
                <div className={photograph !== '' ? 'col-md-8' : ''}>
                    <form onSubmit={handleLocation}>
                        <div className="form-group">
                            <input 
                                type="url" 
                                className="form-control" 
                                placeholder="Endereço da imagem"
                                value={photograph}
                                onChange={event => setPhotograph(event.target.value)}
                            />
                        </div>
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
                                placeholder="Descrição"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome do link"
                                value={linkName}
                                onChange={event => setLinkName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="url" 
                                className="form-control" 
                                placeholder="Endereço do link"
                                value={linkUrl}
                                onChange={event => setLinkUrl(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="datetime-local" 
                                className="form-control" 
                                placeholder="Endereço do link"
                                value={date}
                                onChange={event => setDate(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Endereço do local"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Alerta de covid"
                                value={covid}
                                onChange={event => setCovid(event.target.value)}
                            />
                        </div>
                        {!data ? (
                            <button type="submit" className="btn btn-primary w-100 my-3">
                                CADASTRAR
                            </button>
                        ) : (
                            <div className="row">
                                <button type="button" onClick={formHiddenT} className="btn btn-input w-45 my-3 mx-auto">
                                    CANCELAR
                                </button>
                                <button type="submit" className="btn btn-primary w-45 my-3 mx-auto">
                                    EDITAR
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                {photograph !== '' && (
                    <div className="col-md-4">
                        <img className="w-100" src={photograph} alt="image"/>
                    </div>
                )}
            </div>
            <p className="message mb-0">
                {message}
            </p>
        </div>
    )
}

export default FormLocation;