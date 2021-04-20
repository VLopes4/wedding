import React, { useEffect, useState } from 'react';
import { moneyMask } from '../../services/mask';

export default function ProductItem(){
    const [amount, setAmount] = useState(1);
    const [value, setValue] = useState(2300);
    const [total, setTotal] = useState(value * amount);

    return(
        <div className="product-item">
            <img className="product-img" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg" alt=""/>
            <div className="product-detail">
                <h4 className="product-title">
                    Samsung Smart TV
                </h4>
                <h6 className="product-price">
                    {value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                </h6>
            </div>
            <div className="product-amount">
                <h6 className="product-label">
                    Quantidade
                </h6>
                <span className="btn-amount" onClick={() => setAmount(amount === 1 ? amount : amount - 1)}>
                    -
                </span>
                <input className="amount" disabled type="text" value={amount}/>
                <span className="btn-amount" onClick={() => setAmount(amount + 1)}>
                    +
                </span>
            </div>
            <div className="product-value">
                <h6 className="product-label">
                    Valor Total
                </h6>
                <h5 className="product-price color-d">
                    {(value * amount).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                </h5>
            </div>
        </div>
    );
}