import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faGift, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { OrderSoldItem } from '../../CartProductItem';
import { Order, Sold } from '../../../models/Order';
import { Link } from 'react-router-dom';

export default function OrderUser(){
    const { profile } = useAuth();
    const [order, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        getOrder();
    },[]);

    async function getOrder(){
        try {
            const response = await api.get(`/order/user/${profile?.id}`);
            setOrder(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)   
        }
    }

    return(
        <div className="row">
            {order.length > 0 ? order.map((order: Order) => {
                return(
                    <>
                        <h2 className="subtitle text-left">
                            Presentes enviados para os noivos
                        </h2>
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
                    </>
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
    );
}