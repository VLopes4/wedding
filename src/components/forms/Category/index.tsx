import React, { FormEvent, useEffect, useState } from 'react';
import { useLoad } from '../../../contexts/load';
import { Category } from '../../../models/Category';
import api from '../../../services/api';

interface ProductProps {
    data: Category | null;
}

const FormCategory: React.FC<ProductProps> = ({ data }) => {
    const { formHiddenT } = useLoad();
    const [name, setName] = useState(data ? data.name : '');
    const [isActive, setIsActive] = useState(data ? data.is_active : 0);
    const [message, setMessage] = useState('');

    async function handleCategory(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await (data ? api.put(`/category/${data.id}`, { name, is_active: isActive }) : api.post('/category', { name }));
            if(response.data.error){
                return setMessage(response.data.error);
            } 
        } catch (error) {
            console.log(error);
        }

        if(message === ''){
            formHiddenT();
        }
    }

    return(
        <div className={data ? "list-table-form" : ""}>
            <h5 className="subtitle text-left">
                {data ? 'Editar' : 'Cadastrar'} Categoria
            </h5>
            <form onSubmit={handleCategory}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                {data ? (
                    <>
                        <div className="form-group">
                            <select 
                                className="form-control"
                                value={isActive}
                                onChange={event => setIsActive(Number(event.target.value))}
                            >
                                <option value={0}>Inativo</option>
                                <option value={1}>Ativo</option>
                            </select>
                        </div>
                        <div className="row">
                            <button type="button" onClick={formHiddenT} className="btn btn-input w-45 my-3 mx-auto">
                                CANCELAR
                            </button>
                            <button type="submit" className="btn btn-primary w-45 my-3 mx-auto">
                                EDITAR
                            </button>
                        </div>
                    </>
                ) : (
                    <button type="submit" className="btn btn-primary w-100 my-3">
                        CADASTRAR
                    </button>
                )}
                <p className="message mb-0">
                    {message}
                </p>
            </form>
        </div>
    );
}

export default FormCategory;