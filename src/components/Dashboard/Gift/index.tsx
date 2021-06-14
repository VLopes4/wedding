import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts, faList, faLongArrowAltLeft, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ItemProduct } from '../../global/Product';
import api from '../../../services/api';
import { Category } from '../../../models/Category';
import FormProduct from '../../forms/Product';
import { useLoad } from '../../../contexts/load';
import { Gift } from '../../../models/Gift';

export default function DashGift(){
    const { form, formHiddenF } = useLoad();
    const [viewGift, setViewGift] = useState(true);
    const [viewForm, setViewForm] = useState(false);
    const [gifts, setGifts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/product');
            setGifts(response.data);
        }

        async function getCategories() {
            const response = await api.get('/category');
            setCategories(response.data);
        }

        getCategories()
        getProducts();
        if(form){
            setViewForm(false);
            formHiddenF();
        }
    },[viewGift, form]);

    return(
        <div className="border-top">
            <div className="row mt-4 mb-5">
                <div className="mr-auto ml-3">
                    <form className="form-inline">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group mx-sm-3">
                            <select 
                                className="form-control"
                                value={category}
                                onChange={event => setCategory(Number(event.target.value))}
                            >
                                <option value={0} disabled hidden>Categoria</option>
                                {categories.map((category: Category) => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faSearch} size="lg"/>
                        </button>
                    </form>
                </div>
                <div className="ml-auto">
                    <button className="btn" onClick={() => { setViewGift(!viewGift) }} title={viewGift ? 'Exibir Categorias' : 'Exibir Presentes'}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewGift ? faList : faGifts} size="lg"/>
                    </button>
                    <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                    </button>
                </div>
            </div>
            {viewForm ? (
                <FormProduct data={null}/>
            ) : 
                viewGift && gifts.map((gift: Gift) => {
                    return <ItemProduct key={gift.id} data={gift}/>
                })
            }
        </div>
    );
}