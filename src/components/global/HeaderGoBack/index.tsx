import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

export default function HeaderGoBack(){
    let history = useHistory();

    function handleGoBack(){
        history.goBack();
    }

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-background shadow-sm">
                <FontAwesomeIcon className="goback" icon={faLongArrowAltLeft} size="2x" onClick={handleGoBack}/>
                <a className="navbar-brand title-soon" href="https://www.saddevelopment.com/" target="_blank" rel="noreferrer">
                    <span className="title-soon-detail">Sad</span> Development
                </a>
            </nav>
        </header>
    );
}