const Format = props => {

    return (
        <div className='format-section'>
            <style jsx>{`
              .format-section {
                select {
                  padding: 4px;
                  border: 1px solid #ccc;
                }
              }
            `}</style>
            <select name='postType' value={props.postData.postType} onChange={e => props.onChangeHandler(e)}>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='redirect'>Redirect</option>
                <option value='promotion'>promotion</option>
                <option value='article'>Article</option>
                <option value='code'>Code</option>
            </select>
        </div>
    );
};

export default Format;