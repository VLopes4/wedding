import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts } from '@fortawesome/free-solid-svg-icons';
import ProductItem from '../../components/ProductItem';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import './styles.css';
import FooterCart from '../../components/FooterCart';

export default function Cart(){
    
    return(
        <>
            <HeaderGoBack/>
            <main className="container py-5 my-5">
                <div className="card">
                    <div className="card-header cart-header">
                        <span className="cart-header-label">
                            <Link to="/gifts">
                                <FontAwesomeIcon icon={faGifts} size="sm"/> CONTINUAR COMPRANDO
                            </Link>
                        </span>
                        <span className="subtitle cart-header-label">
                            Meu Carrinho (2)
                        </span>
                    </div>
                    <div className="card-body">
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
                    </div>
                </div>
            </main>
            <FooterCart/>
        </>
    );
}