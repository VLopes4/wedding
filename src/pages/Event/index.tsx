import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import imgCapela from '../../assets/images/capela.jpg';
import imgCasarao from '../../assets/images/casarao.jpg';
import Header from '../../components/global/Header';
import Countdown from '../../components/Countdown';
import Presence from '../../components/global/Presence';
import './styles.css';


export default function Event(){
    const [adress, setAdress] = useState('Av. Renata, 258 - Vila Formosa, São Paulo - SP, 03377-000');

    return(
        <>
            <Header isActive={4} isDark={true}/>
            <div className="background"></div>
            <main className="container mt-5 mb-5">
                <h2 className="subtitle">
                    Cerimônia & Festa
                </h2>
                <p className="text-center">
                    Nossa felicidade é ainda maior quando compartilhada! Esperamos você para celebrar essa data tão especial junto com a gente.
                </p>
                <Countdown/>
            </main>
            <Presence/>
            <section className="container">
                <div className="card mb-5">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="w-100" src={imgCapela} alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="subtitle text-left">
                                    Mansão O Casarão
                                </h2>
                                <h5 className="text-detail text-left">
                                    1 de agosto de 2021 às 16:00
                                </h5>
                                <p className="card-text mb-5">
                                    A cerimônia será realizada no Espaço Aricanduva - O Casarão na capela e será transmitido para todos os convidados
                                    via YouTube.
                                </p>
                                <a href="https://youtu.be/Dm2Ylney3Uw">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} size="lg"/> Acessar transmissão
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe 
                                    width="1300" 
                                    height="300" 
                                    id="gmap_canvas" 
                                    src={`https://maps.google.com/maps?q=${adress}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder={0}
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-5">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="img-event" src={imgCasarao} alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="subtitle text-left">
                                    Mansão O Casarão
                                </h2>
                                <h5 className="text-detail text-left">
                                    1 de agosto de 2021 às 16:00
                                </h5>
                                <p className="card-text mb-0">
                                    Preparem-se para a diversão! A festa será realizada no Espaço Aricanduva - O Casarão após a cerimônia religiosa.
                                </p>
                            </div>
                            <div className="alert-covid">
                                <h5 className="title-alert-covid">
                                    Alerta Covid-19
                                </h5>
                                <p className="text-alert-covid">
                                    Devido as circunstâncias atuais de saúde informamos que esse evento foi cancelado. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe 
                                    width="1300" 
                                    height="300" 
                                    id="gmap_canvas" 
                                    src={`https://maps.google.com/maps?q=${adress}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                                    frameBorder={0}
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="subtitle">
                    Música
                </h2>
                <p className="text-center">
                    Queremos compartilhar as músicas que serão tocadas no evento, adicione músicas na nossa playlist do Spotify.
                </p>
                <div className="card mb-5">
                    <div className="card-body p-0">
                        <iframe 
                            className="spotify"
                            src="https://open.spotify.com/embed/playlist/13QP8wHMfsndxJGTSIssQD" 
                            frameBorder={0} 
                            allowTransparency={true} 
                            allow="encrypted-media"
                        />
                    </div>
                    <div className="card-footer">
                        <p className="text-center mb-0">
                            As músicas adicionadas estão sendo avaliadas. Algumas músicas podem ser removidas!
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}