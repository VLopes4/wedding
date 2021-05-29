import React, { FormEvent, useEffect, useState } from 'react';
import { useLoad } from '../../../contexts/load';
import { Category } from '../../../models/Category';
import { Gift } from '../../../models/Gift';
import api from '../../../services/api';

interface ProductProps {
    data: Gift | null;
}

const FormProduct: React.FC<ProductProps> = ({ data }) => {
    const { formHiddenT } = useLoad();
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [photograph, setPhotograph] = useState('');
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        async function getCategories() {
            const response = await api.get('/category');
            setCategories(response.data);
            setMessage('');
        }

        function setStates() {
            
            if(data){
                setDescription(data.description);
                setPhotograph(data.photograph);
                setCategory(data.category.id);
                setPrice(String(data.price));
                setName(data.name);
            }
        }

        getCategories();
        setStates();
    })

    async function handleProduct(e: FormEvent) {
        e.preventDefault();
        
        try {
            const response = await (data ? api.put(`/product/${data.id}`, { photograph, category_id: category, name, description, price: Number(price) }) : api.post('/product', { photograph, category_id: category, name, description, price: Number(price) }));
            if(response.data.error){
                return setMessage(response.data.error);
            } else {
                setPhotograph('');
                setCategory(0);
                setName('');
                setDescription('');
                setPrice('');
            }
        } catch (error) {
            console.log(error);
        }

        if(message === ''){
            formHiddenT();
        }
    }

    return(
        <div>
            <h5 className="subtitle text-left">
                {data ? 'Editar' : 'Cadastrar'} Presente
            </h5>
            <div className={photograph !== '' ? 'row' : ''}>
                <div className={photograph !== '' ? 'col-md-8' : ''}>
                    <form onSubmit={handleProduct}>
                        <div className="form-group">
                            <input 
                                type="url" 
                                className="form-control" 
                                placeholder="Endereço da imagem"
                                value={photograph}
                                onChange={event => setPhotograph(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
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
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Descrição"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Preço"
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </div>
                        {!data ? (
                            <button type="submit" className="btn btn-primary w-100 my-3">
                                CADASTRAR
                            </button>
                        ) : (
                            <div className="row">
                                <button type="button" onClick={formHiddenT} className="btn btn-input w-45 my-3 mx-auto">
                                    CANCELAR
                                </button>
                                <button type="submit" className="btn btn-primary w-45 my-3 mx-auto">
                                    EDITAR
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                {photograph !== '' && (
                    <div className="col-md-4">
                        <img className="w-100" src={photograph} alt="image"/>
                    </div>
                )}
            </div>
            <p className="message mb-0">
                {message}
            </p>
        </div>
    );
}

export default FormProduct;