import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faSearch, faLongArrowAltLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../models/Category';
import api from '../../../services/api';
import { useLoad } from '../../../contexts/load';
import FormCategory from '../../forms/Category';

interface ItemCategoryProps {
    data: Category;
}

export function DashCategory() {
    const { form, formHiddenF } = useLoad();
    const [categories, setCategories] = useState([]);
    const [viewForm, setViewForm] = useState(false);
    const [name, setName] = useState('');
    const [status, setStatus] = useState(2);

    useEffect(() => {
        async function getCategories() {
            const response = await api.get('/category');
            setCategories(response.data);
        }

        getCategories();
        if(form){
            formHiddenF();
        }
    },[form])

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
                                value={status}
                                onChange={event => setStatus(Number(event.target.value))}
                            >
                                <option value={0}>Inativo</option>
                                <option value={1}>Ativo</option>
                                <option value={2} disabled hidden>Status</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faSearch} size="lg"/>
                        </button>
                    </form>
                </div>
                <div className="ml-auto">
                    <button className="btn" onClick={() => { setViewForm(!viewForm) }}>
                        <FontAwesomeIcon className="btn-icon-dash" icon={viewForm ? faLongArrowAltLeft : faPlus} size="lg"/>
                    </button>
                </div>
            </div>
            {viewForm ? (
                <FormCategory data={null}/>
            ) : (
                <>
                    <div className="list-table-header">
                        <span>Nome</span>
                        <span>Status</span>
                        <span>Editar</span>
                        <span>Deletar</span>
                    </div>
                    {categories.map((category: Category) => {
                        return <ItemCategory key={category.id} data={category}/>
                    })}
                </>
            )}
        </div>
    );
}

export const ItemCategory: React.FC<ItemCategoryProps> = ({ data }) => {
    const { form, formHiddenF } = useLoad();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(form){
            setEdit(false);
            formHiddenF();
        }
    },[form])

    if(!edit){
        return(
            <div key={data.id} className="list-table-item">
                <span className="col">
                    {data.name}
                </span>
                <span className="col">
                    {data.is_active === 1 ? 'Ativo' : 'Inativo'}
                </span>
                <span className="col">
                    <FontAwesomeIcon className="btn-icon-dash cursor-pointer" onClick={() => setEdit(true)} icon={faPen} size="lg"/>
                </span>
                <span className="col">
                    <FontAwesomeIcon className="btn-icon-dash cursor-pointer" icon={faTimes} size="lg"/>
                </span>
            </div>
        );
    } else {
        return <FormCategory data={data}/>
    }
}