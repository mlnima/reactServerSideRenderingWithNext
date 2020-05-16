import React, { useEffect, useState, useContext, useRef } from 'react';

const RatingOption = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='rating-option'>
            <select name='rating' value={props.postData.rating || 'enable'} onChange={e=>{props.onChangeHandler(e)}}>
                <option value='enable'>Enable</option>
                <option value='disable'>Disable</option>
            </select>
        </div>
    );
};
export default RatingOption;
