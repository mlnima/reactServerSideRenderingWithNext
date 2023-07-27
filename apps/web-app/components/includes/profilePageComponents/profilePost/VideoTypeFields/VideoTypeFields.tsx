import React, {FC} from "react";
import TextInput from "../common/TextInput";
import {useAppSelector} from "@store_toolkit/hooks";

interface VideoTypeFieldsPropTypes {
    onChangeHandler:any
}

const VideoTypeFields: FC<VideoTypeFieldsPropTypes> = ({onChangeHandler}) => {
    const editingPost = useAppSelector((store)=>store?.posts?.editingPost)
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
