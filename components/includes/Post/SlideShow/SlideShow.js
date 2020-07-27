import React, { useEffect, useState, useContext, useRef } from 'react';

const SlideShow = props => {
    const [ state, setState ] = useState({
        activeImageIndex: 0,
        imagesArrayLength: 0
    });
    useEffect(() => {

        setState({
            ...state,
            imagesArrayLength: props.images.length
        })
    }, [ props ]);



    const nextImage = () => {
        setState({
            ...state,
            activeImageIndex: state.activeImageIndex + 1
        })
    }
    const previousImage = () => {
        setState({
            ...state,
            activeImageIndex: state.activeImageIndex - 1
        })
    }

    const NextBtn = () => {

        if (state.activeImageIndex >= state.imagesArrayLength - 1) {
            return null
        } else {
            return (
                <button className='product-slide-show-slide-btn product-slide-show-slide-btn-right' onClick={ () => nextImage() }>&#11208; </button>
            )
        }
    }

    const PreviousBtn = () => {
        if (state.activeImageIndex > 0 && state.imagesArrayLength > 1) {
            return (
                <button className='product-slide-show-slide-btn product-slide-show-slide-btn-left' onClick={ () => previousImage() }> &#11207; </button>
            )
        } else {
            return null
        }
    }

    if (props.postType === 'product') {
        return (
            <div className='product-slide-show'>
                <PreviousBtn/>
                <div className='product-slide-show-image-area'>
                    <img src={ props.images.length>0 ?props.images[state.activeImageIndex]:props.mainThumbnail } alt=""/>
                </div>

                <NextBtn/>
            </div>
        );
    } else return null

};
export default SlideShow;
