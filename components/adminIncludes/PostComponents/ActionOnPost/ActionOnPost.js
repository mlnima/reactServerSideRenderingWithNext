const ActionOnPost = props => {

    const onViewHandler = () => {
        window.open(`/post/${props.postData.postType}/${props.postData._id}`, '_blank')
    }

    return (
        <div className='action-on-the-post'>
            <style jsx>{`
              .action-on-the-post {
                width: 100%;
                background-color: white;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                
                .action-on-the-post-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  .action-on-the-post-item-select {
                    border: 1px solid #ccc;
                    margin: 10px 0;
                  }

                  .preview-button {
                    outline: none;
                    padding: 8px 10px;
                    
                    &:active {
                      background-color: white;
                      color: #24282d;
                    }
                  }

                  .save-post-button {
                    background-color: #0085ba;
                    color: white;
                    outline: none;
                    padding: 10px 40px;
                    
                    &:active {
                      background-color: white;
                      color: #24282d;
                    }
                  }
                }


              }
            `}</style>
            <div className='action-on-the-post-item'>
                <button className='preview-button' onClick={() => onViewHandler()}>View</button>
            </div>
            <div className='action-on-the-post-item'>
                <select className='action-on-the-post-item-select' name='status' value={props.postData.status} onChange={e => props.onChangeHandler(e)}>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='reported'>Reported</option>
                </select>
            </div>
            <div className='action-on-the-post-item'>
                <button className='save-post-button' onClick={() => props.onSaveHandler()}>{props.postData._id ? 'update' : 'save'}</button>
            </div>
        </div>
    );
};

export default ActionOnPost;