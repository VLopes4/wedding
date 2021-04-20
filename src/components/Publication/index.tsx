import React from 'react';
import ImageGallery from 'react-image-gallery';
import imgProfile from '../../assets/images/profile.png';
import './styles.css';

const Publication: React.FC = () => {

    const images = [
        {
          original: 'https://api.saddevelopment.com/sadserve/files/news/1610817723987.png',
          thumbnail: 'https://api.saddevelopment.com/sadserve/files/news/1610817723987.png',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    return(
        <div className="card card-w-50 mx-auto mt-3">
            <div className="card-body">
                <div className="row mx-auto">
                    <img 
                        src={imgProfile} 
                        alt="Avatar" 
                        className="user-avatar space-avatar-name"
                    />
                    <div>
                        <h5 className="m-0 color-d">
                            Vinicius Lopes
                        </h5>
                        <span className="text-muted">
                            Publicado em 27 de setembro de 2020
                        </span>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-justify">
                        Talvez não haja atitude mais nobre e humanitária do que resolver doar seus órgãos. Isso porque cada pessoa que decide
                        ser um doador pode salvar 8 vidas ou mais, já que de cada doador podem ser utilizados 2 córneas, 2 pulmões, 2 rins, coração,
                        fígado, pâncreas, intestino, pele, ossos e tendões.
                    </p>
                    <ImageGallery 
                        items={images}
                        showNav={false}
                        autoPlay={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Publication;