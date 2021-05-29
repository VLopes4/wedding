import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCreditCard, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLoad } from '../../../contexts/load';
import { useCart } from '../../../contexts/cart';
import { Gift } from '../../../models/Gift';
import FormProduct from '../../forms/Product';
import { useAuth } from '../../../contexts/auth';

interface ProductProps {
    data: Gift;
}

export const Product: React.FC<ProductProps> = ({ data }) => {
    const { profile } = useAuth();
    const { addProduct, addItem } = useCart();
    let history = useHistory();

    async function handleAddCart(){
        const item = { 
            sku: data.id, 
            photograph: data.photograph, 
            name: data.name, 
            description: data.description,
            quantity: 1,
            price: data.price,
            total: data.price * 1,
            currency: 'BRL',
        }
        
        await addProduct(item);
        history.push('/cart')
    }

    async function handleGoOrder() {
        if(!profile) return alert('Faça login antes de realizar uma compra, caso não tenha uma conta crie uma!');

        const item = [
            { 
                sku: data.id, 
                photograph: data.photograph, 
                name: data.name, 
                description: data.description,
                quantity: 1,
                price: data.price,
                total: data.price * 1,
                currency: 'BRL',
            }
        ]
        addItem(item);
        history.push('/order')
    }

    return(
        <div key={data.id} className="col-md-4">
            <div className="card mb-4 shadow-sm card-gift">
                <img className="card-img-top card-gift-img" alt={data.name} src={data.photograph}/>
                <div className="card-body">
                    <h5 className="card-title text-center">
                        {data.name}
                    </h5>
                    <p className="card-text text-justify">
                        {data.description}
                    </p>
                    <h6 className="card-title">
                        {data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </h6>
                </div>
                <div className="card-footer card-gift-footer">
                    <button className="btn btn-secundary w-100 mx-auto my-2" onClick={handleAddCart}>
                        <FontAwesomeIcon icon={faCartPlus}/> Adicionar
                    </button>
                    <button className="btn btn-primary w-100 mx-auto my-2" onClick={handleGoOrder}>
                        <FontAwesomeIcon icon={faCreditCard}/> Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ItemProduct: React.FC<ProductProps> = ({ data }) => {
    const { form, formHiddenF } = useLoad();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(form){
            setEdit(false);
            formHiddenF();
        }
    },[form])

    async function handleDelete(e: FormEvent) {
        e.preventDefault();

        
    }

    if(!edit){
        return(
            <div key={data.id} className="card mb-4 mx-auto" style={{maxWidth: '540px'}}>
                <div className="card-header">
                    <div className="row">
                        <button className="btn mx-auto" onClick={() => setEdit(true)}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={faPen} size="lg"/>
                        </button>
                        <button className="btn mx-auto" onClick={handleDelete}>
                            <FontAwesomeIcon className="btn-icon-dash" icon={faTimes} size="lg"/>
                        </button>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img className="w-100" src={data.photograph} alt={data.name}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                {data.name}
                            </h5>
                            <p className="card-text text-justify">
                                {data.description}
                            </p>
                            <h6 className="card-title">
                                {data.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <FormProduct data={data}/>
    }
}