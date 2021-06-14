import React, { FormEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useLoad } from '../../../contexts/load';
import { Location } from '../../../models/Event';
import FormLocation from '../../forms/Party';
import { ptBR } from 'date-fns/locale';
import api from '../../../services/api';

interface LocationProps {
    data: Location;
}

export const ItemLocation: React.FC<LocationProps> = ({ data }) => {
    const { form, formHiddenT, formHiddenF } = useLoad();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(form){
            setEdit(false);
            formHiddenF();
        }
    },[form])

    async function handleDelete(e: FormEvent) {
        e.preventDefault();

        try {
            await api.delete(`/location/${data.id}`);
            formHiddenT();
        } catch (error) {
            console.log(error)
        }
    }

    if(!edit){
        return(
            <div className="card mb-5">
                <div className="card-header">
                    <div className="row">
                        <button className="btn mx-auto" onClick={() => setEdit(true)}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={faPen} size="lg"/>
                        </button>
                        <button className="btn mx-auto" onClick={handleDelete}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={faTimes} size="lg"/>
                        </button>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img className="img-event" src={data.photograph} alt={data.name}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="subtitle text-left">
                                {data.name}
                            </h2>
                            <h5 className="text-detail text-left">
                                {format(new Date(data.date), "dd 'de' MMMM', ás' HH:mm'h'", { locale: ptBR })}
                            </h5>
                            <p className="card-text mb-0">
                                {data.description}
                            </p>
                            {data.link && (
                                <a href={data.url} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} size="lg"/> {data.link}
                                </a>
                            )}
                        </div>
                        {data.covid && (
                            <div className="alert-covid">
                                <h5 className="title-alert-covid">
                                    Alerta Covid-19
                                </h5>
                                <p className="text-alert-covid">
                                    {data.covid}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {data.address && (
                    <div className="card-footer p-0">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe 
                                    width="1300" 
                                    height="300" 
                                    id="gmap_canvas" 
                                    src={`https://maps.google.com/maps?q=${data.address}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder={0}
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return <FormLocation data={data}/>
    }
}

export const LocationEvent: React.FC<LocationProps> = ({ data }) => {
    return(
        <div className="card mb-5">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img className="img-event" src={data.photograph} alt={data.name}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="subtitle text-left">
                            {data.name}
                        </h2>
                        <h5 className="text-detail text-left">
                            {format(new Date(data.date), "dd 'de' MMMM', ás' HH:mm'h'", { locale: ptBR })}
                        </h5>
                        <p className="card-text mb-0">
                            {data.description}
                        </p>
                        {data.link && (
                            <a href={data.url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faExternalLinkAlt} size="lg"/> {data.link}
                            </a>
                        )}
                    </div>
                    {data.covid && (
                        <div className="alert-covid">
                            <h5 className="title-alert-covid">
                                Alerta Covid-19
                            </h5>
                            <p className="text-alert-covid">
                                {data.covid}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {data.address && (
                <div className="card-footer p-0">
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe 
                                width="1300" 
                                height="300" 
                                id="gmap_canvas" 
                                src={`https://maps.google.com/maps?q=${data.address}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                                frameBorder={0}
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}