import React, {useRef} from 'react';

const ActionOnPost = props => {

    const saveBtn = useRef(null)
    const onViewHandler = () => {
        window.open('/post/' +props.postData.title +'?id='+ props.postData._id, '_blank')
    }

    return (
        <div className='ActionOnPost'>
            <div className='ActionOnPostItem'>
                <button className='previewBtn' onClick={() => onViewHandler()}>View</button>
            </div>
            <div className='ActionOnPostItem'>
                <select name='status' value={props.postData.status} onChange={e => props.onChangeHandler(e)}>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='reported'>Reported</option>
                </select>
            </div>
            <div className='ActionOnPostItem'>
                <button ref={saveBtn} className='SaveBtn' onClick={() => props.onSaveHandler()}>Save</button>
            </div>
        </div>
    );
};

export default ActionOnPost;