import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useLoad } from '../../contexts/load';
import api from '../../services/api';
import { Location } from '../../models/Event';
import Header from '../../components/global/Header';
import Countdown from '../../components/Countdown';
import Presence from '../../components/global/Presence';
import Footer from '../../components/global/Footer';
import { LocationEvent } from '../../components/global/Location';
import './styles.css';


export default function Event(){
    const { config } = useLoad();
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
        <>
            <Header isActive={4} isDark={true}/>
            <div className="background-event">
                <div className="container py-5">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mr-auto mt-12">
                            <div className="col-mobile">
                                <h1 className="title color-w wwb">
                                    LOCAIS, MÚSICAS E DETALHES DO EVENTO
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                {locations.length > 0 && locations.map((location: Location) => {
                    return <LocationEvent key={location.id} data={location}/>
                })}
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
                            src="https://open.spotify.com/embed/playlist/1mJYzxA4dbScDOaUqMcmat" 
                            frameBorder={0} 
                            allowTransparency={true} 
                            allow="encrypted-media"
                        />
                    </div>
                    <div className="card-footer">
                        <p className="text-center mb-0">
                            Clique no <FontAwesomeIcon icon={faSpotify}/> para acessar o álbum
                        </p>
                        <p className="text-center mb-0">
                            As músicas adicionadas estão sendo avaliadas. Algumas músicas podem ser removidas!
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}