import  React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faHashtag, faCommentAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import api from '../../services/api';
import { Order, Sold } from '../../models/Order';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import HeaderNav from '../../components/global/HeaderPaymentNav';
import { OrderSoldItem } from '../../components/CartProductItem';
import { Cancel, Success } from '../../components/PaymentStatus';
import imgCard from '../../assets/images/cartao.png';

interface historyProps {
    id: number;
    error: string;
    success: boolean;
}

export default function Status(){
    const history = useHistory<historyProps>();
    const [message, setMessage] = useState('');
    const [order, setOrder] = useState<Order>();
    const [isChecked, setIsChecked] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const [idOrder, setIdOrder] = useState(0);
    const [msgError, setMsgError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    
    useEffect(() => {
        if(history.location.state){
            setIdOrder(history.location.state.id);
            setMsgError(history.location.state.error);
            setIsSuccess(history.location.state.success);
        }
        getOrder();
    },[]);

    useEffect(() => {
        if(isChecked){
            setMessage('Parabéns pelo casamento, que Deus abençoe a união de vocês.');
        } else {
            setMessage('');
        }
    },[isChecked])

    async function getOrder(){
        try {
            const response = await api.get(`/order/${idOrder}`);
            setOrder(response.data[0]);
        } catch (error) {
            console.log(error)   
        }
    }

    async function handleMessage(e: FormEvent) {
        e.preventDefault();

        try {
            await api.post('/message/gift', { order_id: idOrder, message });
            setSendMessage(true);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <HeaderGoBack/>
            <main className="container pb-5 my-5">
                <HeaderNav active={3}/>
                    {isSuccess ? (
                        <div className="row">
                            <Success/>
                            <div className="col-md-6 ml-auto">
                                {!sendMessage ? (
                                    <div className="card mb-3">
                                        <form onSubmit={handleMessage}>
                                            <div className="card-header order-header">
                                                <h5 className="order-cart-title">
                                                    <FontAwesomeIcon icon={faCommentAlt}/> ENVIAR MENSAGEM
                                                </h5>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="card-image">
                                                    <img className="w-100" src={imgCard} alt="cartão presente"/>
                                                    <div className="card-image-text">
                                                        <p className="text-gift-card">
                                                            {message}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <textarea 
                                                        className="form-control resize-none"
                                                        rows={3}
                                                        onChange={event => setMessage(event.target.value)}
                                                        value={message}
                                                        disabled={isChecked}
                                                        maxLength={250}
                                                    >
                                                    </textarea>
                                                </div>
                                                <div className="row mx-0">
                                                    <div className="form-check">
                                                        <input 
                                                            className="form-check-input"
                                                            id="defaultCheck"
                                                            type="checkbox"
                                                            onChange={() => setIsChecked(!isChecked)}
                                                            checked={isChecked}
                                                        />
                                                        <label className="form-check-label" htmlFor="defaultCheck">
                                                            Enviar mensagem padrão
                                                        </label>
                                                    </div>
                                                    <div className="progress-label">
                                                        <span className="color-d">
                                                            {message.length}/250
                                                        </span>
                                                        <CircularProgressbar
                                                            className="card-progress-message"
                                                            value={message.length}
                                                            strokeWidth={15}
                                                            maxValue={250}
                                                            styles={{
                                                                path: {
                                                                    stroke: '#4b006f'
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer order-message">
                                                <button type="submit" className="btn btn-primary mx-auto">
                                                    <FontAwesomeIcon className="mr-1" icon={faEnvelopeOpenText} size="lg"/> ENVIAR CARTÃO PRESENTE
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <h4 className="title-payment success">
                                        Mensagem enviada
                                    </h4>
                                )}
                                <div className="card mb-3">
                                    <div className="card-header order-header">
                                        <div className="row px-3">
                                            <h5 className="order-cart-title success">
                                                <FontAwesomeIcon icon={faFileAlt}/> SEU PEDIDO
                                            </h5>
                                            <h5 className="ml-auto">
                                                <FontAwesomeIcon icon={faHashtag}/> {order && order.number}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {order && order.solds.map((sold: Sold) => {
                                            return <OrderSoldItem key={sold.id} data={sold}/>
                                        })}
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <h6 className="mx-auto mb-0">
                                                Total a pagar
                                            </h6>
                                            <p className="title mx-auto mb-0">
                                                {order && Number(order.total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Cancel error={msgError}/>
                    )}
            </main>
        </>
    );
}