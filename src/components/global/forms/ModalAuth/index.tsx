import React, { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../contexts/auth';
import './styles.css';

export default function ModalAuth(){
    let history = useHistory();
    const { signIn, register, message, loadingForm } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const remember = localStorage.getItem('@SadBP:Remember');
        if(remember){
            setEmail(remember);
        }
    },[])

    async function handleRegister(e: FormEvent) {
        e.preventDefault()
        if(password !== confirmPassword){
            return setFormMessage('Senhas divergentes, verifique as suas senhas e tente novamente.')
        }
        try {
            await register(name, surname, email, password);
            message === '' && history.go(0)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLogin(e: FormEvent){
        e.preventDefault();
        try {
            await signIn(email, password);

            if(remember){
                localStorage.setItem('@SadBP:Remember', email);
            }

            message === '' && history.go(0)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="modal fade" id="staticAuth" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticAuthLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        {loadingForm && (
                            <div className="spinner-border color-d" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h1 className="bp">
                            B <span className="bep">&</span> P
                        </h1>
                        <h5 className="title-singin">
                            Sua conta para interagir com Bruno e Pamella
                        </h5>
                        {isLogin ? (
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <input
                                        type="email" 
                                        className="form-control"
                                        placeholder="Endere??o de e-mail"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password" 
                                        className="form-control"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"  
                                        id="connect"
                                        onChange={() => { setRemember(!remember) }}
                                        checked={remember}
                                    />
                                    <label className="form-check-label" htmlFor="connect">
                                        Mantenha-me conectado
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 my-3">
                                    ENTRAR
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <input
                                        type="text" 
                                        className="form-control"
                                        placeholder="Nome"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text" 
                                        className="form-control"
                                        placeholder="Sobrenome"
                                        value={surname}
                                        onChange={event => setSurname(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email" 
                                        className="form-control"
                                        placeholder="Endere??o de e-mail"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password" 
                                        className="form-control"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password" 
                                        className="form-control"
                                        placeholder="Confirma????o de Senha"
                                        value={confirmPassword}
                                        onChange={event => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 my-3">
                                    REGISTRAR
                                </button>
                            </form>
                        )}
                        <p className="text-center">
                            N??o est?? registrado? <span onClick={() => setIsLogin(!isLogin)} role="button"><u>Junte-se a n??s</u></span>.
                        </p>
                    </div>
                    {
                        formMessage === '' && message === '' ? null : (
                            <div className="modal-footer justify-content-center">
                                <span className="message">
                                    {formMessage === '' ? message : formMessage}
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}