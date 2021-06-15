import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { Post, ImagePost, Image } from '../../../models/Post';
import imgProfile from '../../../assets/images/profile.png';
import './styles.css';

interface PublicationProps{
    data: Post;
    classNames: string;
}

const Publication: React.FC<PublicationProps> = ({ data, classNames }) => {
    const { profile } = useAuth();
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

    async function handleDelete(){
        try {
            await api.delete(`/message/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div key={data.id} className={classNames === '' ? "card card-w-50 mx-auto mt-3" : `card mx-auto ${classNames}`}>
            <div className="card-body">
                <div className="row">
                    <div className="row ml-1 mr-auto">
                        <img 
                            src={data.profile.avatar ? data.profile.avatar_url : imgProfile} 
                            alt="Avatar" 
                            className="user-avatar space-avatar-name"
                        />
                        <div>
                            <h5 className="publication-name">
                                {data.profile.name} {data.profile.surname}
                            </h5>
                            <span className="text-muted">
                                Publicado em 27 de setembro de 2020
                            </span>
                        </div>
                    </div>
                    {profile?.id === data.profile.id && (
                        <div className="ml-auto mr-3">
                            <FontAwesomeIcon className="cursor-pointer btn-icon-dash" onClick={handleDelete} icon={faTimes} size="lg"/>
                        </div>
                    )}
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