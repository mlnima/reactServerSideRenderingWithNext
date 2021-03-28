import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TopRight = props => {

    const quality =  props.quality === '2160p' ? '4K' :
                     props.quality === '1440p' ? '2K' :
                     props.quality === '1080p' ? 'HD' : 'SD'


    return (
        <span  className='top-right'>{quality }</span>
    );
};
export default TopRight;
