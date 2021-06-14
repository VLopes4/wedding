import React, { useEffect } from 'react';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Post, ImagePost, Image } from '../../../models/Post';
import './styles.css';

interface PublicationProps{
    data: Post;
    classNames: string;
}

const Publication: React.FC<PublicationProps> = ({ data, classNames }) => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        getPostImages();
    },[])

    async function getPostImages(){
        try {
            const Items: React.SetStateAction<Image[]> = [];
            if(data.images.length > 0){
                data.images.map((image: ImagePost) => {
                    const item = {
                        original: image.image_url
                    }

                    Items.push(item);

                    data.images.length > 0 ? setImages([...images, item]) : setImages(Items)
                })      
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div key={data.id} className={classNames === '' ? "card card-w-50 mx-auto mt-3" : `card mx-auto ${classNames}`}>
            <div className="card-body">
                <div className="row mx-auto">
                    <img 
                        src={data.profile.avatar_url} 
                        alt="Avatar" 
                        className="user-avatar space-avatar-name"
                    />
                    <div>
                        <h5 className="m-0 color-d">
                            {data.profile.name} {data.profile.surname}
                        </h5>
                        <span className="text-muted">
                            Publicado em 27 de setembro de 2020
                        </span>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-justify">
                        {data.message}
                    </p>
                    {data.images.length > 0 && (
                        <ImageGallery 
                            items={images}
                            showNav={false}
                            showPlayButton={false}
                            showThumbnails={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Publication;