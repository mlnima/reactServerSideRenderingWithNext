import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../../../../context/AppContext";


const Format = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});

    return (
        <div className='Format'>
            <select defaultValue={contextData.editingPostData.postType?contextData.editingPostData.postType:'standard'} name='format'  onChange={ e => props.onChangeHandler(e) }>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
            </select>
        </div>
    );
};

Format.getInitialProps = ({ req }) => {
    return {}
};

export default Format;