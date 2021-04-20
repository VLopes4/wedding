import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/global/Header';
import Publication from '../../components/Publication';
import imgProfile from '../../assets/images/profile.png';
import 'react-circular-progressbar/dist/styles.css';
import './styles.css';

export default function Message(){
    const { signed, profile, signOut } = useAuth();
    const [message, setMessage] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([])

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files || event.target.files.length > 5) {
            return;
        }

        const selectedImages = Array.from(event.target.files);
        if(images.length > 0){
            for (let i = 0; i < images.length; i++) {
                selectedImages.push(images[i]);   
            }
        }
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return window.URL.createObjectURL(image);
        });
        
        setPreviewImages(selectedImagesPreview);
    }

    function handleDeletedImage(indexImage: number){
        if(indexImage < 0){
            return;
        }

        const imageDelete = images.filter((image, index) => index !== indexImage);
        setImages(imageDelete);

        const selectedImagesPreview = imageDelete.map(image => {
            return window.URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    return(
        <>
            <Header isActive={2} isDark={true}/>
            <main className="background-message">
                <div className="container py-5">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto mt-20">
                            <h1 className="title color-w">
                                DEIXE SUA MENSAGEM DE CARINHO PARA NÓS
                            </h1>
                        </div>
                    </div>
                </div>
            </main>
            <section className="container my-5">
                <div className="card card-w-50 mx-auto mb-5">
                    <div className="card-body">
                        <div className="row mx-2 py-2">
                            <img 
                                src={imgProfile} 
                                alt="Avatar" 
                                className="user-avatar mx-auto"
                            />
                            <textarea 
                                className="form-control message-text" 
                                rows={message.length < 103 ? 2 : message.length < 206 ? 4 : message.length < 309 ? 6 : message.length < 412 ? 8 : 10} 
                                placeholder={`No que você está pensando, Vinicius? Deixe uma mensagem para os noivos`}
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                maxLength={500}
                            >
                            </textarea>
                        </div>
                        <div className="images-container py-2">
                            {previewImages.map((image, index) => {
                                return(
                                    <div>
                                        <img key={index} src={image} alt=""/>
                                        <div className="d-flex">
                                            <button className="btn btn-images" onClick={() => handleDeletedImage(index)}>
                                                <FontAwesomeIcon icon={faTimes} size="lg"/>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="row mx-2 border-top py-2">
                            <div className="mt-2">
                                <label htmlFor="image[]" className="new-image">
                                    <FontAwesomeIcon icon={faImages} size="lg" color="#4b006f"/>
                                </label>
                                <CircularProgressbar
                                    className="progress-message"
                                    value={message.length}
                                    strokeWidth={15}
                                    maxValue={500}
                                    styles={{
                                        path: {
                                            stroke: '#4b006f'
                                        }
                                    }}
                                />
                                <input 
                                    multiple 
                                    id="image[]"
                                    className="file-image" 
                                    accept="image/*,video/*" 
                                    type="file" 
                                    onChange={handleSelectImages}
                                    disabled={images.length === 5}
                                />
                            </div>
                            <div className="ml-auto ">
                                <button className="btn btn-primary h-btn" type="submit">
                                    Publicar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Publication/>
            </section>
        </>
    );
}