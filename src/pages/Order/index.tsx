import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { faLongArrowAltLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '../../contexts/cart';
import { useAuth } from '../../contexts/auth';
import { useLoad } from '../../contexts/load';
import { Cart } from '../../models/Cart';
import { PurchaseItem, Category } from '../../models/PayPal';
import { PaymentButtons } from '../../components/global/PayPalButtons';
import { OrderProductItem } from '../../components/CartProductItem';
import HeaderGoBack from '../../components/global/HeaderGoBack';
import HeaderNav from '../../components/global/HeaderPaymentNav';
import './styles.css';

export default function Order(){
    const { profile } = useAuth();
    const { cart, setTotal } = useCart();
    const { isLoading } = useLoad();
    const [totalValue, setTotalValue] = useState(0);
    const [products] = useState(cart);
    const [order, setOrder] = useState<PurchaseItem[]>([]);
    const history = useHistory();

    useEffect(() => {
        setTotalValue(cart.reduce((total, item) => total + item.total, 0));
        setTotal(totalValue);

        setCartValues()
    },[cart])

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
                        <h6 className="text-justify mb-3">
                            {profile?.name}, essa compra é gerenciada e protegida pelo <a href="https://www.paypal.com/br/webapps/mpp/purchase-protection" target="_blank" rel="noopener noreferrer"><span className="pay">Pay</span><span className="pal">Pal</span></a>,
                            confira os itens do seu carrinho e os detalhes do pagamento antes de confirmar a ordem do pedido.
                        </h6>
                        <PaymentButtons cart={products} order={order}/>
                        {isLoading && (
                            <h3 className="text-center color-d">
                                Processando pagamento, aguarde
                                <div className="spinner-border color-d ml-3" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </h3>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}