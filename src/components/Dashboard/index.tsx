import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCog, faGift, faList, faMusic, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import DashGift from './Gift';
import { DashCategory } from './Category';
import { DashGuest } from './Guest';
import { DashMoment } from './Moment';
import DashConfig from './Config';
import DashParty from './Party';

export default function Dashboard(){
    const [isActive, setIsActive] = useState(0);

    return(
        <>
            <div className="row">
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(1) }} className={isActive === 1 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faCog}/>
                        <h3 className="card-dash-title">
                            Configurações
                        </h3>
                        <p className="text-left">
                            Gerencie o dia, horário, transmissão e playlist do seu evento
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(2) }} className={isActive === 2 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faClipboardList}/>
                        <h3 className="card-dash-title">
                            Convidados
                        </h3>
                        <p className="text-left">
                            Gerencie e controle os convidados do seu evento
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(3) }} className={isActive === 3 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faList}/>
                        <h3 className="card-dash-title">
                            Categoria
                        </h3>
                        <p className="text-left">
                            Gerencie as categorias para a organização dos seus presentes
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(4) }} className={isActive === 4 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faGift}/>
                        <h3 className="card-dash-title">
                            Presente
                        </h3>
                        <p className="text-left">
                            Gerencie os presentes que você deseja receber
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(5) }} className={isActive === 5 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faPhotoVideo}/>
                        <h3 className="card-dash-title">
                            Momentos
                        </h3>
                        <p className="text-left">
                            Gerencie os seus momentos com fotos e vídeos do casal
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div onClick={() => { setIsActive(6) }} className={isActive === 6 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faMusic}/>
                        <h3 className="card-dash-title">
                            Festa
                        </h3>
                        <p className="text-left">
                            Gerencie os locais e músicas do seu evento
                        </p>
                    </div>
                </div>
            </div>
            {
                isActive === 1 ? (
                    <DashConfig/>
                ) : isActive === 2 ? (
                    <DashGuest/>
                ) : isActive === 3 ? (
                    <DashCategory/>
                ) : isActive === 4 ? (
                    <DashGift/>
                ) : isActive === 5 ? (
                    <DashMoment/>
                ) : isActive === 6 && (
                    <DashParty/>
                )   
            }
        </>
    );
}