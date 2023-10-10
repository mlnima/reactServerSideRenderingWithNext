import React, {FC} from "react";
import TextInput from "../common/TextInput";

interface VideoTypeFieldsPropTypes {
    onChangeHandler:any,
    editingPost: Record<string, string>
}

const VideoTypeFields: FC<VideoTypeFieldsPropTypes> = ({onChangeHandler,editingPost}) => {

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
