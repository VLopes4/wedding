import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import imgDev from '../../../assets/images/saddevelopment.png';
import './styles.css';


export default function Footer(){

    function handlePaypal(){
        window.open('https://www.paypal.com/pt/webapps/mpp/home','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700');
        return false;
    }

    return (
        <footer className="container-fluid bg-s-dark">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="row">
                        <div className="col-md-5 row mx-0">
                            <a className="text-center" href="https://www.saddevelopment.com/" target="_blank" rel="noopener noreferrer">
                                <img className="card-gift-img" src={imgDev}/>
                            </a>
                        </div>
                        <div className="col-md-7 mt-5">
                            <div className="row">
                                <div className="footer-social">
                                    <a className="icons-social" href="https://www.facebook.com/SadDevelopment" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} size="2x" />
                                    </a>
                                    <a className="icons-social" href="https://www.instagram.com/sad_development/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                                    </a>
                                    <a className="icons-social" href="https://discord.gg/ASk6NhB8PF" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faDiscord} size="2x" />
                                    </a>
                                    <a className="icons-social" href="https://www.youtube.com/channel/UCbZjeCxEV8B1o7RsYCVIOwA" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                                    </a>
                                </div>
                            </div>
                            <h5 className="cl-s-light text-center">
                                Desenvolvido por <a className="dev-social" href="https://www.instagram.com/dev_lopes/" target="_blank">@dev_lopes</a>
                            </h5>
                            <h6 className="cl-s-light-2 text-center">
                                © Copyright 2021 - Casamento Bruno e Pamella
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mx-auto">
                    <div className="row mt-5 mx-0">
                        <img className="paypal-logo" onClick={handlePaypal} src="https://www.paypalobjects.com/webstatic/pt_PT/mktg/logo-center/pp_solution-graphic_pt.png" alt="PayPal Acceptance Mark" />
                    </div>
                    <h6 className="paypal-text">
                        Compra segura e protegida
                    </h6>
                </div>
            </div>
        </footer>
    );
}