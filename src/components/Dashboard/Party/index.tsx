import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ItemLocation } from '../../global/Location';
import FormLocation from '../../forms/Party';
import { Location } from '../../../models/Event';
import api from '../../../services/api';


export default function DashParty() {
    const [viewForm, setViewForm] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocations();
    },[])

    async function getLocations(){
        try {
            const response = await api.get('/location');
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div className="border-top">
            <div className="row mt-2 mb-2">
                <div className="ml-auto">
                    <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                    </button>
                </div>
            </div>
            {viewForm ? (
                <FormLocation data={null}/>
            ) : locations.length > 0 && locations.map((location: Location) => {
                return <ItemLocation key={location.id} data={location}/>
            })}
        </div>
    );
}