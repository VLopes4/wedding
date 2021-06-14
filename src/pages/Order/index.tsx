import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { faCommentAlt, faLongArrowAltLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaymentButtons } from '../../components/global/PayPalButtons';
import { useCart } from '../../contexts/cart';
import { Cart } from '../../models/Cart';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import { OrderProductItem } from '../../components/CartProductItem';
import './styles.css';
import { PurchaseItem, Category } from '../../models/PayPal';
import HeaderNav from '../../components/global/HeaderPaymentNav';

export default function Order(){
    const { cart, setTotal } = useCart();
    const [totalValue, setTotalValue] = useState(0);
    const [products] = useState(cart);
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');
    const [order, setOrder] = useState<PurchaseItem[]>([])
    const history = useHistory();

    useEffect(() => {
        setTotalValue(cart.reduce((total, item) => total + item.total, 0));
        setTotal(totalValue);

        setCartValues()
    },[cart])

    useEffect(() => {
        if(isChecked){
            setMessage('Parabéns pelo casamento, que Deus abençoe a união de vocês.');
        } else {
            setMessage('');
        }
    },[isChecked])

    async function setCartValues(){
        let product: PurchaseItem[] = [];

        cart.map((productItem: Cart) => {
            const item = { 
                name: productItem.name, 
                quantity: String(productItem.quantity),
                unit_amount: {
                    currency_code: 'BRL',
                    value: productItem.price.toFixed(2)
                },
                description: productItem.description,
                sku: String(productItem.sku), 
                category: Category.PHYSICAL_GOODS,
            }

            product.push(item);
        });

        if(product.length > 0) setOrder(product);
    }

    return(
        <>
            <HeaderGoBack/>
            <main className="container pb-5 my-5">
                <HeaderNav active={2}/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-header order-header">
                                <div className="row px-3">
                                    <h5 className="order-cart-title">
                                        <FontAwesomeIcon icon={faShoppingCart}/> SEU CARRINHO
                                    </h5>
                                    <FontAwesomeIcon className="order-cart-icon-goback" icon={faLongArrowAltLeft} onClick={() => history.push('/cart')}/>
                                </div>
                            </div>
                            <div className="card-body">
                                {products.map((product: Cart) => {
                                    return <OrderProductItem key={product.sku} data={product}/>
                                })}
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <h6 className="mx-auto mb-0">
                                        Total a pagar
                                    </h6>
                                    <p className="title mx-auto mb-0">
                                        {totalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-header order-header">
                                <h5 className="order-cart-title">
                                    <FontAwesomeIcon icon={faCommentAlt}/> ENVIAR MENSAGEM
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <textarea 
                                        className="form-control resize-none"
                                        rows={3}
                                        onChange={event => setMessage(event.target.value)}
                                        value={message}
                                        disabled={isChecked}
                                    >
                                    </textarea>
                                </div>
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
                            </div>
                            <div className="card-footer">
                                <p className="mb-0">
                                    Envie uma mensagem de carinho junto com o presente. Essa mensagem é
                                    particular e será exibida somente aos noivos.
                                </p>
                            </div>
                        </div>
                        <PaymentButtons cart={products} order={order} message={message}/>
                    </div>
                </div>
            </main>
        </>
    );
}