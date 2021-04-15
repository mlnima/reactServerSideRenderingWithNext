import React,{useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";

const PostTitle = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    if (props.editMode) {
        return (
            <div className='edit-mode'>
                <p className='editModeText'>Title :</p>
                <input type="text" value={props?.title}/>
            </div>
        )
    } else {
        return (
            <h1 className='post-title'>
                {
                    props.post?.translations ?
                    props.post?.translations[router.locale ?? contextData.state.activeLanguage] ?
                    props.post?.translations[router.locale ?? contextData.state.activeLanguage]?.title || props.post?.title :
                    props.post?.title :
                    props.post?.title
                }
            </h1>
        )
    }
};
export default PostTitle;
