import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faGift, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { Order, Sold } from '../../../models/Order';
import { OrderSoldItem } from '../../CartProductItem';
import imgProfile from '../../../assets/images/profile.png';

export const OrderUser: React.FC = () => {
    const { profile } = useAuth();
    const [order, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        getOrder();
    },[]);

    async function getOrder(){
        try {
            const response = await api.get(`/order/user/${profile?.id}`);
            setOrder(response.data);
        } catch (error) {
            console.log(error)   
        }
    }

    return(
        <>
            <h2 className="subtitle text-left">
                Presentes enviados para os noivos
            </h2>
            <div className="row">
                {order.length > 0 ? order.map((order: Order) => {
                    return(
                        <div key={order.id} className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-header order-header">
                                    <div className="row px-3">
                                        <h5 className="order-cart-title">
                                            <FontAwesomeIcon icon={faFileAlt}/> SEU PEDIDO
                                        </h5>
                                        <h5 className="ml-auto">
                                            <FontAwesomeIcon icon={faHashtag}/> {order && order.number}
                                        </h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {order.solds.map((sold: Sold) => {
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
                    );
                }) : (
                    <div className="col mt-5">
                        <div className="row">
                            <Link className="mx-auto" to="/gifts">
                                <FontAwesomeIcon className="btn-icon-dash" icon={faGift} size="9x"/><br/>
                            </Link> 
                        </div> 
                        <h3 className="text-center">
                            Presenteie os noivos para ver a lista de presentes dados
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
}

export const OrderAdmin: React.FC = () => {
    const [order, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        getOrder();
    },[]);

    async function getOrder(){
        try {
            const response = await api.get('/order');
            setOrder(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)   
        }
    }

    return(
        <>
            <h2 className="subtitle text-left">
                Presentes recebidos
            </h2>
            <div className="row">
                {order.length > 0 ? order.map((order: Order) => {
                    return(
                        <div key={order.id} className="col-md-6">
                            <div className={`card ${!order.message && 'mb-3'}`}>
                                <div className="card-header order-header">
                                    <div className="card-message-header">
                                        <img 
                                            src={order.profile.avatar ? order.profile.avatar_url : imgProfile } 
                                            alt="Avatar" 
                                            className="user-avatar space-avatar-name"
                                        />
                                        <div>
                                            <h6 className="publication-name">
                                                {order.profile.name} {order.profile.surname}
                                            </h6>
                                            <span className="text-muted">
                                                {format(new Date(order.created_at), "'Presenteado em' dd 'de' MMMM", { locale: ptBR })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row px-3">
                                        <h5 className="order-cart-title">
                                            <FontAwesomeIcon icon={faFileAlt}/> SEU PEDIDO
                                        </h5>
                                        <h5 className="ml-auto">
                                            <FontAwesomeIcon icon={faHashtag}/> {order && order.number}
                                        </h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {order.solds.map((sold: Sold) => {
                                        return <OrderSoldItem key={sold.id} data={sold}/>
                                    })}
                                    {order.message && (
                                        <div className="order-card-message">
                                            <h6 className="title">
                                                Cartão presente
                                            </h6>
                                            <p className="text-justify mb-0">
                                                {order.message.message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <h6 className="mx-auto mb-0">
                                            Total pago
                                        </h6>
                                        <p className="title mx-auto mb-0">
                                            {order && Number(order.total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col mt-5">
                        <div className="row">
                            <Link className="mx-auto" to="/gifts">
                                <FontAwesomeIcon className="btn-icon-dash" icon={faGift} size="9x"/><br/>
                            </Link> 
                        </div> 
                        <h3 className="text-center">
                            Presenteie os noivos para ver a lista de presentes dados
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
}