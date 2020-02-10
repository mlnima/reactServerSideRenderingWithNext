import React, { useEffect, useState, useContext } from 'react';

const ViewsLikesDisLikes = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='ViewsLikesDisLikes VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input type='number' name={ props.name } className='numberInput' onChange={ e => props.onChangeHandler(e) }/>
            </div>
        </div>
    );
};
export default ViewsLikesDisLikes;