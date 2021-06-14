import React, { FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/global/Header';
import { Product } from '../../components/global/Product';
import api from '../../services/api';
import './styles.css';
import { Category } from '../../models/Category';
import { Gift } from '../../models/Gift';
import Footer from '../../components/global/Footer';

export default function Gifts() {
    const [gifts, setGifts] = useState([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        getCategories()
        getProducts();
    },[]);

    async function getCategories() {
        const response = await api.get('/category');
        setCategories(response.data);
    }

    async function getProducts() {
        const response = await api.get('/product/query');
        setGifts(response.data);
        setCategory(0);
    }

    async function handleQuey(e: FormEvent) {
        e.preventDefault();

        if(category > 0){
            try {
                const response = await api.get(`/product/query?${name && `&name=${name}`}${category > 0 && `&category_id=${category}`}`);
                setGifts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <>
            <Header isActive={3} isDark={true}/>
            <article className="background-gift">
                <div className="container py-5">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto mt-20">
                            <h1 className="title color-w">
                                LUA DE MEL EM MORRO DE SÃO PAULO
                            </h1>
                        </div>
                    </div>
                </div>
            </article>
            <main className="container mt-5">
                <div className="row">
                    <div className="mb-5 mx-auto">
                        <h4 className="card-title mt-2">
                            Filtros
                        </h4>
                    </div>
                    <div className="mb-5 mx-auto">
                        <form>
                            <div className="row">
                                <div className="form-group col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nome"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group col">
                                    <select 
                                        className="form-control"
                                        value={category}
                                        onChange={event => setCategory(Number(event.target.value))}
                                        onClick={handleQuey}
                                    >
                                        <option value={0} disabled hidden>Categoria</option>
                                        {categories.map((category: Category) => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        })}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary h-form">
                                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                                </button>
                            </div>
                        </form>
                    </div>
                    {category > 0 && (
                        <div className="mb-5 mx-auto">
                            <p className="kill-filter" onClick={getProducts}>
                                <FontAwesomeIcon icon={faTimes}/> Limpar Filtros
                            </p>
                        </div>
                    )}
                </div>
                <div className="border-bottom mb-5 mx-auto">
                    <h2 className="subtitle">
                        {category > 0 ? categories[(category - 1)].name : 'Todos os Presentes'}
                    </h2>
                </div>
                <div className="row">
                    {
                        gifts.map((gift: Gift) => {
                            return <Product key={gift.id} data={gift}/>
                        })
                    }
                </div>
            </main>
            <Footer/>
        </>
    );
}