import React, {useEffect, useState, useContext, useRef} from 'react';
import CardElementImage from "./CardElementImage";


const CardElement = props => {
    const [state, setState] = useState({});

    return (
        <div className='card-element'>
                 <CardElementImage image={props.image}/>
        </div>
    );
};
export default CardElement;
