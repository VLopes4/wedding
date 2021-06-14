import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import api from '../../services/api';
import { Moment, Image } from '../../models/Moment';
import Countdown from '../../components/Countdown';
import Footer from '../../components/global/Footer';
import Header from '../../components/global/Header';
import Presence from '../../components/global/Presence';
import './styles.css';

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        getMoments();
    },[])

    async function getMoments(){
        try {
            const Items: React.SetStateAction<Image[]> = [];
            const response = await api.get('/moment');
            if(response.data.length > 0){
                response.data.map((moment: Moment) => {
                    const item = {
                        original: moment.moment_url,
                        thumbnail: moment.moment_url,
                    }

                    Items.push(item);

                    images.length > 0 ? setImages([...images, item]) : setImages(Items)
                })      
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <Header isActive={0} isDark={true}/>
            <div className="background"></div>
            <main className="container mt-5 mb-5">
                <h1 className="title">
                    SEJAM BEM-VINDOS AO NOSSO SITE!
                </h1>
                <p className="text-center">
                    O amor é bondoso, suporta todas as coisas, acredita em todas as coisas, espera todas as coisas, persevera em todas as coisas. O amor nunca acaba!
                    (<a href="https://www.jw.org/pt/biblioteca/biblia/nwt/livros/1-Cor%C3%ADntios/13/#v46013004" target="_blank" rel="noreferrer">1 Coríntios 13:4-8</a>)
                    Queridos familiares, amigos e convidados, agradecemos a todos pelo amor e carinho demonstrado por todos vocês, por isso nosso desejo é que dia 1 de agosto
                    seja especial não só para nós mas para vocês também, e para isso acontecer pedimos que confirmem a presença de vocês, queremos compartilhar boas lembranças
                    com vocês nesse dia tão especial para nós.
                </p>
                <Countdown/>
            </main>
            <Presence/>
            <section className="container mt-5 mb-5">
                <h2 className="subtitle">
                    Nossos momentos
                </h2>
                <p className="text-center">
                    Veja alguns dos momentos mais marcantes da nossa história de amor.
                </p>
                <ImageGallery 
                    items={images}
                    slideDuration={1000}
                    slideInterval={5000}
                    autoPlay
                    showIndex
                />
            </section>
            <Footer/>
        </>
    )
}