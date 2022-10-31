import React, {FC} from "react";
import {useSelector} from "react-redux";
import TextInput from "../common/TextInput";
import {Store} from "typescript-types";

interface VideoTypeFieldsPropTypes {
    onChangeHandler:any
}

const VideoTypeFields: FC<VideoTypeFieldsPropTypes> = ({onChangeHandler}) => {
    const editingPost = useSelector((store: Store)=>store?.posts?.editingPost)
    return (
        <>
            <TextInput required={true} name={'videoEmbedCode'} type={'text'}
                       value={editingPost?.videoEmbedCode}
                       title={'Video Embed Code'}
                       onChangeHandler={onChangeHandler} className={'videoEmbedCode'}/>

        </>
    )
};
export default VideoTypeFields
