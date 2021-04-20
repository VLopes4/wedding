import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/auth';
import imgProfile from '../../../assets/images/profile.png';
import '../../../assets/global/styles.css';
import './styles.css';

interface PageHeaderProps {
    isActive: number;
    isDark: boolean;
}

const Header: React.FC<PageHeaderProps> = ({ isActive, isDark }) =>{
    const { signed, profile, signOut } = useAuth();
    const [scroll, setScroll] = useState(0);
    const [header, setHeader] = useState('background-dark')
    const [navbar, setNavbar] = useState('navbar-background-trans');

    useEffect(() => {
        window.onscroll = () => handleScroll();
    }, [scroll])

    function handleScroll(){
        if(document.documentElement.scrollTop > 100){
            setNavbar('navbar-background shadow-sm');
            setHeader('background-light');
        } else {
            setNavbar('navbar-background-trans');
            setHeader('background-dark'); 
        }

        setScroll(document.documentElement.scrollTop);
    }

    return(
            <header className={isDark ? `${header}` : ''}>
                <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${navbar}`}>
                    <a className="navbar-brand title-soon" href="https://www.saddevelopment.com/" target="_blank" rel="noreferrer">
                        <span className="title-soon-detail">Sad</span> Development
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="offcanvas-header mt-3">  
                            <button className="btn btn-outline-purple btn-close float-right">
                                <FontAwesomeIcon icon={faTimes} size="lg"/>
                            </button>
                            <h5 className="py-2 title-soon">
                                <span className="title-soon-detail">Sad</span> Development
                            </h5>
                        </div>
                        <ul className="navbar-nav ml-auto mr-auto">
                            <li className={ isActive === 1 ? 'nav-item link-active' : 'nav-item' }>
                                <Link className="nav-link link-color" to="/">INÍCIO</Link>
                            </li>
                            <li className={ isActive === 2 ? 'nav-item link-active' : 'nav-item' }>
                                <Link className="nav-link link-color" to="/message">MENSAGENS</Link>
                            </li>
                            <li className={ isActive === 3 ? 'nav-item link-active' : 'nav-item' }>
                                <Link className="nav-link link-color" to="/gifts">PRESENTES</Link>
                            </li>
                            <li className={ isActive === 4 ? 'nav-item link-active' : 'nav-item' }>
                                <Link className="nav-link link-color" to="/">FESTA</Link>
                            </li>
                        </ul>
                        {signed ? (
                            <li className="user dropdown">
                                <Link className="user-link" data-toggle="dropdown" to="">
                                    <div className="user-align">
                                        <span className="user-name">
                                            {profile?.user?.name} {profile?.user?.surname}
                                        </span>
                                        <span className="user-tag">
                                            @{profile?.nickname}
                                        </span>
                                    </div>
                                    <img 
                                        src={profile?.avatar === '' || profile?.avatar === null ? imgProfile : profile?.avatar_url} 
                                        alt="Avatar" 
                                        className="user-avatar"
                                    />
                                </Link>
                                <ul className="dropdown-menu dark-drop mt-3 fade-up">
                                    <li><Link className="dropdown-item  link-color" to={`/profile/edit/${profile?.nickname}`}>Editar Perfil</Link></li>
                                    <li><Link className="dropdown-item  link-color" to={`/profile/${profile?.nickname}`}>Perfil</Link></li>
                                    <li><Link onClick={() => { signOut(); }} className="dropdown-item  link-color" to="">Sair</Link></li>
                                </ul>
                            </li>
                        ) : (
                            <Link className="icon-user" to="/singin">
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
    );
}

export default Header;