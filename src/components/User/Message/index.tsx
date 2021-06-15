import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/auth';
import Publication from '../../global/Publication';
import api from '../../../services/api';
import { useEffect } from 'react';
import { Post } from '../../../models/Post';

export default function MessageUser(){
    const { profile } = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    },[messages])

    async function getMessages(){
        try {
            const response = await api.get(`/message/${profile?.id}`);
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            {messages.length > 0 ? (
                <>
                    <h2 className="subtitle text-left">
                        Mensagens enviadas para os noivos
                    </h2>
                    {messages.map((post: Post) => {
                        return <Publication key={post.id} data={post} classNames='card-w-100 mb-3' />
                    })}
                </>
            ) : (
                <div className="col mt-5">
                    <div className="row">
                        <Link className="mx-auto" to="/message">
                            <FontAwesomeIcon className="btn-icon-dash" icon={faFileAlt} size="9x"/><br/>
                        </Link> 
                    </div> 
                    <h3 className="text-center">
                        Presenteie os noivos para ver a lista de presentes dados
                    </h3>
                </div>
            )}
            
        </>
    );
}