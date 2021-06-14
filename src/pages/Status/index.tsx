import  React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faHashtag } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import HeaderNav from '../../components/global/HeaderPaymentNav';
import { OrderSoldItem } from '../../components/CartProductItem';
import { Cancel, Success } from '../../components/PaymentStatus';
import { Order, Sold } from '../../models/Order';

interface historyProps {
    id: number;
    success: boolean;
    error: string;
}

export default function Status(){
    const history = useHistory<historyProps>();
    const [order, setOrder] = useState<Order>();
    const [idOrder, setIdOrder] = useState(history.location.state.id)
    const [isSuccess, setIsSuccess] = useState(history.location.state.success);
    const [msgError, setMsgError] = useState(history.location.state.error)

    useEffect(() => {
        getOrder();
    },[]);

    async function getOrder(){
        try {
            const response = await api.get(`/order/${idOrder}`);
            setOrder(response.data[0]);
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
                            <div className="col-md-6">
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
                            <div className="col-md-6">
                                <Success/>
                            </div>
                        </div>
                    ) : (
                        <Cancel error={msgError}/>
                    )}
            </main>
        </>
    );
}