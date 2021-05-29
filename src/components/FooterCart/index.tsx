import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { useCart } from '../../contexts/cart';
import { useHistory } from 'react-router';

export default function FooterCart(){
    const { cart, setTotal } = useCart();
    const [totalValue, setTotalValue] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setTotalValue(cart.reduce((total, item) => total + item.total, 0));
        setTotal(totalValue);
    },[cart])

    return(
        <footer className="shadow-sm fixed-bottom footer-cart">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <h5>
                            Total da Compra
                        </h5>
                        <span className="total-purchase">
                            {totalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                        </span>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <button className="btn btn-cart-footer" onClick={() => history.push('/order')}>
                            <FontAwesomeIcon className="mr-2" icon={faCreditCard}/> confirmar pedido
                        </button>
                        <h5 className="text-center mt-2">
                            Compra segura com PayPal. <a className="security" href="https://www.paypal.com/br/webapps/mpp/paypal-safety-and-security" target="_blank" rel="noopener noreferrer">Saiba mais</a>
                        </h5>
                    </div>
                </div>
            </div>
        </footer>
    );
}