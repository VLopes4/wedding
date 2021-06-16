import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLongArrowAltLeft, faPlus, faTv, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useLoad } from '../../../contexts/load';
import FormConfig from '../../forms/Config';
import { Config } from '../../../models/Config';
import api from '../../../services/api';

export default function DashConfig() {
    const { form, formHiddenF } = useLoad();
    const [viewForm, setViewForm] = useState(false);
    const [viewEdit, setViewEdit] = useState(false);
    const [configs, setConfigs] = useState([]);

    useEffect(() => {
        getConfig();
        if(form){
            formHiddenF();
        }
    },[form])

    async function getConfig() {
        try {
            const response = await api.get('/settings');
            setConfigs(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="border-top">
            <div className="row">
                <div className="ml-auto mt-2">
                    {configs.length > 0 ? (
                        <button className="btn" onClick={() => { setViewEdit(!viewEdit) }}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={viewEdit ? faLongArrowAltLeft : faPen} size="lg"/>
                        </button>
                    ) : (
                        <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                        </button>
                    )}
                </div>
            </div>
            {viewForm ? (
                <FormConfig data={null}/>
            ) : configs.length > 0 && configs.map((config: Config) => {
                if(!viewEdit){
                    return(
                        <div key={config.id} className="mt-2">
                            <h5 className="color-d">
                                <FontAwesomeIcon icon={faCalendarDay}/> Data e hora do evento
                            </h5>
                            <p>
                                {format(new Date(config.date), "'Dia' dd 'de' MMMM 'de' yyyy' , ás' HH:mm'h'", { locale: ptBR })}
                            </p>
                            <h5 className="color-d">
                                <FontAwesomeIcon icon={faSpotify}/> Código do álbum no Spotfy
                            </h5>
                            <p>
                                {config.album}
                            </p>
                            <h5 className="color-d">
                                <FontAwesomeIcon icon={faTv}/> Link da stream
                            </h5>
                            <a className="mb-2" href={config.streaming} target="_blank" rel="noopener noreferrer">
                                {config.streaming}
                            </a>
                        </div>
                    );
                } else {
                    return <FormConfig key={config.id} data={config}/>
                }
            })}
        </div>
    );
}