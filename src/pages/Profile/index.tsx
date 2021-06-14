import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faComment, faGifts, faTh, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import OrderUser from '../../components/User/Order';
import Dashboard from '../../components/Dashboard';
import User from '../../components/User';
import MessageUser from '../../components/User/Message';
import imgProfile from '../../assets/images/profile.png';
import './styles.css';

export default function Profile(){
    const { profile, signOut, updateProfile } = useAuth();
    const [scroll, setScroll] = useState(0);
    const [card, setCard] = useState('col-md-4')
    const [isActive, setIsActive] = useState(0);

    useEffect(() => {
        window.onscroll = () => handleScroll();
    }, [scroll])

    function handleScroll(){
        if(document.documentElement.scrollTop > 150){
            setCard('col-md-4 card-fixed');
        } else {
            setCard('col-md-4');
        }

        setScroll(document.documentElement.scrollTop);
    }

    async function UpdateAvatar(file: File | undefined){
        const data = new FormData();

        if(file){
            data.append('avatar', file, file.name);
        }

        try {
            const response = await api.put('/profile', data);

            if(!response.data.avatar){
                return alert('ocorreu um erro inesperado');
            }

            updateProfile();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <HeaderGoBack/>
            <main className="container py-3 my-3">
                <div className="row">
                    <div className={card}>
                        <div className="card card-dark">
                            <div className="card-header">
                                <div className="row">
                                    <button className="btn ml-auto">
                                        <FontAwesomeIcon className="btn-icon-profile" onClick={() => { setIsActive(0) }} icon={faEdit} size="lg"/>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="ml-auto mr-auto">
                                        <label className="profile-photo">
                                            <input 
                                                type="file" 
                                                name="avatar" 
                                                accept="image/*"
                                                onChange={(event) => { 
                                                    const file = event.target.files?.[0];
                                                    UpdateAvatar(file);
                                                }}
                                            />
                                            <div className="hover-text">
                                                <span>Trocar Imagem</span>
                                            </div>
                                            <img src={ profile?.avatar ? profile.avatar_url  : imgProfile } alt="Avatar"/>
                                        </label>
                                    </div>
                                </div>
                                <h5 className="profile-social-title text-center mt-4">
                                    {profile?.name} {profile?.surname} 
                                </h5>
                            </div>
                        </div>
                        <nav className="nav flex-column mt-3">
                            <Link to="#" onClick={() => { setIsActive(1) }} className={isActive === 1 ? 'link-profile link-profile-active' : 'link-profile'}>
                                <span>Mensagens</span>
                                <FontAwesomeIcon icon={faComment} size="lg"/>
                            </Link>
                            <Link to="#" onClick={() => { setIsActive(2) }} className={isActive === 2 ? 'link-profile link-profile-active' : 'link-profile'}>
                                <span>Presentes</span>
                                <FontAwesomeIcon icon={faGifts} size="lg"/>
                            </Link>
                            <Link to="#" onClick={() => { setIsActive(3) }} className={isActive === 3 ? 'link-profile link-profile-active' : 'link-profile'}>
                                <span>Dashboard</span>
                                <FontAwesomeIcon icon={faTh} size="lg"/>
                            </Link>
                            <Link to="#" onClick={() => { signOut(); }} className="link-profile link-logoff">
                                <span>SAIR DA MINHA CONTA</span>
                                <FontAwesomeIcon icon={faPowerOff} size="lg"/>
                            </Link>
                        </nav>
                    </div>
                    <div className="col-md-8 ml-auto">
                        {
                            isActive === 0 ? (
                                <User/>
                            ) : isActive === 1 ? (
                                <MessageUser/>
                            ) : isActive === 2 ? (
                                <OrderUser/>
                            ) : isActive === 3 ? (
                                <Dashboard/>
                            ) : null
                        }
                    </div>
                </div>
            </main>
        </>
    );
}