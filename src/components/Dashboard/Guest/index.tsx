import React, { FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltLeft, faPlus, faPen, faMale, faFemale, faChild, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import FormGuest from '../../forms/Guest';
import api from '../../../services/api';
import { Guest } from '../../../models/Guest';
import { ExportExcel } from '../../../services/download';
import { useLoad } from '../../../contexts/load';

interface ItemGuestProps {
    data: Guest;
}

export function DashGuest() {
    const { form, formHiddenF } = useLoad();
    const [viewForm, setViewForm] = useState(false);
    const [name, setName] = useState('');
    const [person, setPerson] = useState('');
    const [type, setType] = useState('');
    const [isConfirm, setIsConfirm] = useState(-1);
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        getGuests();
        if(form){
            formHiddenF();
        }
    },[viewForm, form]);

    async function getGuests() {
        try {
            const response = await api.get('/guestlist');
            setGuests(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleQuery(e: FormEvent) {
        e.preventDefault();

        if(name === '' && type === '' && person === '' && isConfirm < 0){
            return getGuests();
        }

        try {
            const response = await api.get(`/guestlist/query?${name && `name=${name}`}${type && `&type=${type}`}${person && `&person=${person}`}${isConfirm > -1 && `&is_confirm=${String(isConfirm)}`}`)
            setGuests(response.data);
            setName('');
            setPerson('');
            setType('');
            setIsConfirm(-1);
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <div className="border-top">
            <div className="row mt-4 mb-5">
                <div className="mx-auto ml-3">
                    <form className="form-inline" onSubmit={handleQuery}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group ml-sm-3">
                            <select 
                                className="form-control"
                                value={isConfirm}
                                onChange={event => setIsConfirm(Number(event.target.value))}
                            >
                                <option value={-1} disabled hidden>Presença</option>
                                <option value={0}>Pendente</option>
                                <option value={1}>Confirmado</option>
                                <option value={2}>Rejeitado</option>
                            </select>
                        </div>
                        <div className="form-group ml-sm-3">
                            <select 
                                className="form-control"
                                value={type}
                                onChange={event => setType(event.target.value)}
                            >
                                <option value="" disabled hidden>Tipo</option>
                                <option value="Convidado">Convidado</option>
                                <option value="Padrinho">Padrinho</option>
                                <option value="Madrinha">Madrinha</option>
                            </select>
                        </div>
                        <div className="form-group mx-sm-3">
                            <select 
                                className="form-control"
                                value={person}
                                onChange={event => setPerson(event.target.value)}
                            >
                                <option value="" disabled hidden>Pessoa</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Criança">Criança</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faSearch} size="lg"/>
                        </button>
                    </form>
                </div>
                <div className="mx-auto">
                    <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                    </button>
                    <button className="btn" onClick={() => ExportExcel(guests, 'lista-de-convidados')}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={faFileDownload} size="lg"/>
                    </button>
                </div>
            </div>
            {viewForm ? (
                <FormGuest data={null}/>
            ) : guests.map((guest: Guest) => {
                return <ItemGuest key={guest.id} data={guest}/>
            })}
        </div>
    );
}

export const ItemGuest: React.FC<ItemGuestProps> = ({ data }) => {
    const [edit, setEdit] = useState(false);
    const { form, formHiddenF } = useLoad();

    useEffect(() => {
        if(form){
            setEdit(false);
            formHiddenF();
        }
    },[form]);

    if(!edit){
        return(
            <div key={data.id} className="card card-border mx-auto mb-3" style={{ maxWidth: '540px'}}>
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title guest-name">
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
                        <div className="ml-auto">
                            <button className="btn mx-auto" onClick={() => setEdit(true)}>
                                <FontAwesomeIcon className="btn-icon-dash" icon={faPen} size="lg"/>
                            </button>
                        </div>
                    </div>
                    <h6 className="card-subtitle mb-2">
                        {data.type}
                    </h6>
                </div>
                <div className={Number(data.is_confirm) === 2 ? 'card-footer guest-recused' : Number(data.is_confirm) === 1 ? 'card-footer guest-confirmed' : 'card-footer'}></div>
            </div>
        );
    } else {
        return <FormGuest key={data.id} data={data}/>
    }
}