import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

export default function FooterCart(){
    return(
        <footer className="shadow-sm fixed-bottom footer-cart">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <h5>
                            Total da Compra
                        </h5>
                        <span className="total-purchase">
                            2300
                        </span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mx-auto">
                        <button className="btn btn-cart-buy">
                            <FontAwesomeIcon icon={faShoppingCart} size="sm"/> Comprar
                        </button>
                        <button className="btn btn-cart-buy">
                            <FontAwesomeIcon icon={faGift} size="sm"/> Comprado
                        </button>
                        <button className="btn btn-cart-buy">
                            <FontAwesomeIcon icon={faHeart} size="sm"/> Reservar
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}