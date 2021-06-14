import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useCart } from '../../contexts/cart';
import { Cart } from '../../models/Cart';
import { Sold } from '../../models/Order';

interface ProductItemProps {
    data: Cart;
}

interface SoldItemProps {
    data: Sold;
}

export const CartProductItem: React.FC<ProductItemProps> = ({ data }) => {
    const { addValue } = useCart();
    const [amount] = useState(data.quantity);
    const [value] = useState(data.price);
    const [total] = useState(data.total);

    async function handleRemoveValueCart(){
        if(data.quantity > 1){
            const item = { 
                sku: data.sku, 
                photograph: data.photograph, 
                name: data.name, 
                description: data.description,
                quantity: data.quantity,
                price: data.price,
                total: data.price * 1,
                currency: 'BRL',
            }
            
            await addValue(item, false);
        }
    }

    async function handleAddValueCart(){
        const item = { 
            sku: data.sku, 
            photograph: data.photograph, 
            name: data.name, 
            description: data.description,
            quantity: data.quantity,
            price: data.price,
            total: data.price * 1,
            currency: 'BRL',
        }
        
        await addValue(item, true);
    }

    return(
        <div key={data.sku} className="row product-item">
            <div className="col-md-3 mb-mobile d-flex">
                <img className="product-img" src={data.photograph} alt={data.name}/>
            </div>
            <div className="col-md-3 mb-mobile">
                <h4 className="product-title">
                    {data.name}
                </h4>
                <h6 className="product-price">
                    {value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                </h6>
            </div>
            <div className="col-md-3 mb-mobile">
                <h6 className="product-label">
                    Quantidade
                </h6>
                <div className="row">
                    <h5 className="btn-amount btn-amount-minus" onClick={handleRemoveValueCart}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </h5>
                    <input className="amount" disabled type="text" value={amount}/>
                    <h5 className="btn-amount btn-amount-plus" onClick={handleAddValueCart}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </h5>
                </div>
            </div>
            <div className="col-md-3 mb-mobile">
                <h6 className="product-label">
                    Valor Total
                </h6>
                <h5 className="product-price color-d">
                    {total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                </h5>
            </div>
        </div>
    );
}

export const OrderProductItem: React.FC<ProductItemProps> = ({ data }) => {
    return(
        <div className="media order-cart-media">
            <img src={data.photograph} className="w-25 mr-3" alt={data.name}/>
            <div className="media-body">
                <h5 className="title text-left mt-4 mb-0">
                    {data.name}
                </h5>
                <p>
                    {data.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} - {data.quantity > 1 ? `${data.quantity} unidades` : `${data.quantity} unidade`}
                </p>
            </div>
        </div>
    );
}

export const OrderSoldItem: React.FC<SoldItemProps> = ({ data }) => {
    return(
        <div className="media order-cart-media">
            <img src={data.product.photograph} className="w-25 mr-3" alt={data.product.name}/>
            <div className="media-body">
                <h5 className="title text-left mt-4 mb-0">
                    {data.product.name}
                </h5>
                <p>
                    {data.product.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} - {data.quantity > 1 ? `${data.quantity} unidades` : `${data.quantity} unidade`}
                </p>
            </div>
        </div>
    );
}