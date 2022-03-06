import React, {FC} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";

interface VideoTypeFieldsPropTypes {
    onChangeHandler:any
}

const VideoTypeFields: FC<VideoTypeFieldsPropTypes> = ({onChangeHandler}) => {
    const editingPost = useSelector((store: StoreTypes)=>store?.posts?.editingPost)
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
