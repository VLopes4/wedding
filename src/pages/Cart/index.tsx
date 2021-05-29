import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartProductItem } from '../../components/CartProductItem';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import FooterCart from '../../components/FooterCart';
import { useCart } from '../../contexts/cart';
import { Cart } from '../../models/Cart';
import './styles.css';
import HeaderNav from '../../components/global/HeaderPaymentNav';

export default function CartProduct(){
    const { cart, quantity } = useCart();
    const [products, setProducts] = useState<Cart[]>([]);

    useEffect(() => {
        setProducts(cart);
    },[cart, quantity])
    
    return(
        <>
            <HeaderGoBack/>
            <main className="container pb-5 my-5">
                <HeaderNav active={1} />
                <div className="card card-cart">
                    <div className="card-header cart-header">
                        <div className="row">
                            <span className="mx-auto">
                                <Link to="/gifts">
                                    <FontAwesomeIcon icon={faGifts}/> CONTINUAR COMPRANDO
                                </Link>
                            </span>
                            <span className="subtitle mx-auto">
                                Meu Carrinho <FontAwesomeIcon icon={faShoppingCart}/> ({ quantity })
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        {products.map((product: Cart) => {
                            return <CartProductItem key={product.sku} data={product}/>
                        })}
                    </div>
                </div>
            </main>
            <FooterCart/>
        </>
    );
}