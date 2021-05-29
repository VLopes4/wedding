import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faSearch, faLongArrowAltLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/auth';
import { useLoad } from '../../../contexts/load';

export function DashMoment(){
    const { form, formHiddenF } = useLoad();
    const [momets, setMomets] = useState([]);
    const [viewForm, setViewForm] = useState(false);
    
    return(
        <div className="border-top">
            <div className="row mt-2 mb-2">
                <div className="ml-auto">
                    <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                    </button>
                </div>
            </div>
            <div className="row">
                <ItemMoment/>
            </div>
        </div>
    );
}

export const ItemMoment: React.FC = () => {
    const { profile } = useAuth();

    return(
        <div className="moment-item">
            <label className="moment-image">
                <input 
                    type="button" 
                    name="avatar"
                />
                <div className="hover-text">
                    <span>Expandir Imagem</span>
                </div>
                <img src={profile?.avatar_url} alt="image"/>
            </label>
        </div>
    );
}