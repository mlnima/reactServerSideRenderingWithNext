import React from 'react';

const PostTitle = props => {

    if (props.editMode) {
        return (
            <div className='edit-mode'>
                <p className='editModeText'>Title :</p>
                <input type="text" value={props.title}/>
            </div>
        )
    } else {
        return (
            <h1 className='post-title'>
                {
                    props.post.translations ?
                    props.post.translations[contextData.state.activeLanguage] ?
                    props.post.translations[contextData.state.activeLanguage].title || props.post.title :
                    props.post.title :
                    props.post.title
                }
            </h1>
        )
    }
};
export default PostTitle;
