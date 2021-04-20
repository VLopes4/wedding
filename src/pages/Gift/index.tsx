import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/global/Header';
import './styles.css';

export default function Gift() {
    let history = useHistory();

    function handleAddCart(){
        history.push('/cart')
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
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="" src="https://images-submarino.b2w.io/produtos/01/00/img/1618006/0/1618006025_1SZ.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Samsung Smart TV
                                </h5>
                                <p className="card-text text-justify">
                                    Samsung Smart TV 70" Crystal UHD 70TU7000 4K 2020, Wi-fi, Borda Infinita, Controle
                                    Remoto Único, Visual Livre de Cabos, Bluetooth, Processador Crystal 4K
                                </p>
                                <h6 className="card-title">
                                    R$ 2.300,00
                                </h6>
                                <button className="btn btn-primary w-100" onClick={handleAddCart}>
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}