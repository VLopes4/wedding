import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import { Moment } from '../../../models/Moment';
import './styles.css';

export function DashMoment(){

    async function addMoment(file: File | undefined){
        const data = new FormData();

        if(file){
            data.append('moment', file, file.name);
        }

        try {
            const response = await api.post('/moment', data);

            if(!response.data.moment){
                return alert('ocorreu um erro inesperado');
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div className="border-top">
            <div className="row mt-2 mb-2">
                <div className="moment-btn">
                    <label htmlFor="image" className="btn">
                        <FontAwesomeIcon className="btn-icon-dash" icon={faImages} size="lg"/>
                    </label>
                    <input 
                        id="image"
                        type="file" 
                        name="moment" 
                        accept="image/*"
                        onChange={(event) => { 
                            const file = event.target.files?.[0];
                            addMoment(file);
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <ItemMoment/>
            </div>
        </div>
    );
}

export const ItemMoment: React.FC = () => {
    const [moments, setMoments] = useState([]);

    useEffect(() => {
        getMoments();
    },[moments])

    async function getMoments() {
        try {
            const response = await api.get('/moment');
            setMoments(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            {moments.length > 0 && moments.map((moment: Moment) => {
                return(
                    <div className="moment-item">
                        <label className="moment-image">
                            <div className="hover-text">
                                <span>Excluir Imagem</span>
                            </div>
                            <img src={moment.moment_url} alt="Bruno & Pamella"/>
                        </label>
                    </div>
                );
            })}
        </>
    );
}