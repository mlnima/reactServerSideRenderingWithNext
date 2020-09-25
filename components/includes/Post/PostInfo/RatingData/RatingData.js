import React, {useEffect, useState, useContext, useRef} from 'react';
import ProgressBar from "../../../ProgressBar/ProgressBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {AppContext} from "../../../../../context/AppContext";

const RatingData = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    if (props.rating !== 'disable') {
        return (
            <>
                <ProgressBar value={state.likeValue} percent={false}
                             backgroundColor={contextData.siteDesign.postProgressbarBackgroundColor || '#333'}
                             valueColor={contextData.siteDesign.postProgressbarValueColor || 'red'}
                             textColor={contextData.siteDesign.postProgressbarTextColor || 'white'}
                />
                <div className='post-rate' >
                    <div>
                        {state.likeValue} %
                    </div>
                    <div className='like-disLike-count'>
                            <span className='like-disLike-count-items' >
                                <FontAwesomeIcon icon={faThumbsUp} className='like-disLike-count-items-logo'/>
                                <p>  {props.likes}</p>
                            </span>
                        <span className='like-disLike-count-items' >
                                      <FontAwesomeIcon icon={faThumbsDown} className='like-disLike-count-items-logo'/>
                            <p>  {props.disLikes}</p>
                            </span>
                    </div>
                </div>
            </>
        )

    } else return null
};
export default RatingData;
