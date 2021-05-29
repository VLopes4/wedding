import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserLock } from '@fortawesome/free-solid-svg-icons';
import FormProfile from '../forms/Profile';
import FormPassword from '../forms/Password';

export default function User() {
    const [isActive, setIsActive] = useState(0);

    return(
        <>
            <div className="row">
                <div className="col-md-6">
                    <div onClick={() => { setIsActive(1) }} className={isActive === 1 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faUserEdit}/>
                        <h3 className="card-dash-title">
                            Informações
                        </h3>
                        <p className="text-left">
                            Altere informações de usuário como: nome, sobrenome e e-mail
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div onClick={() => { setIsActive(2) }} className={isActive === 2 ? 'card mb-3 card-dash card-dash-active' : 'card mb-3 card-dash'}>
                        <FontAwesomeIcon className="icon-dash" icon={faUserLock}/>
                        <h3 className="card-dash-title">
                            Segurança
                        </h3>
                        <p className="text-left">
                            Altere a sua senha secreta e não compartilhe ela com ninguém
                        </p>
                    </div>
                </div>
            </div>
            {
                isActive === 1 ? (
                    <FormProfile/>
                ) : isActive === 2 && (
                    <FormPassword/>
                )
            }
        </>
    );
}