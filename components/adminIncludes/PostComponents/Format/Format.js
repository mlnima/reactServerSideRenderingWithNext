import React, { useEffect } from 'react';

const Format = props => {

    return (
        <div className='Format'>
            <select name='postType' value={ props.postData.postType } onChange={ e => props.onChangeHandler(e) }>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='article'>Article</option>
                <option value='code'>Code</option>
            </select>
        </div>
    );
};

Format.getInitialProps = ({ req }) => {
    return {}
};

export default Format;