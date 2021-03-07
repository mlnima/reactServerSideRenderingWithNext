import React, {useEffect, useState, useContext, useRef} from 'react';
import Image from 'next/image'


//not used yet
const CardElementImage = props => {
    const [state, setState] = useState({
        isHover: false,
    });
    const imageURL= new URL(props.image)

    // if (process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' ').includes(imageURL.hostname)){
    //     return (
    //         <Image
    //             src={props.image}
    //             alt="Picture of the author"
    //             layout="responsive"
    //             className='card-element-image'
    //             width={320}
    //             height={180}
    //             quality={100}
    //         />
    //     );
    // }else
        return (
        <img src={props.image} className='card-element-image' alt=""/>
    )

};
export default CardElementImage;
