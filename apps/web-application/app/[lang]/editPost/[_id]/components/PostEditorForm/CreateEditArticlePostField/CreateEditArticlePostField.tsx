import React, {FC} from "react";
//import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import {useAppSelector} from "@store_toolkit/hooks";

interface CreateEditArticlePostPropTypes {
    onChangeHandler: any
}

const CreateEditArticlePostField: FC<CreateEditArticlePostPropTypes> = ({onChangeHandler}) => {
    const editingPostData = useAppSelector((store) => store?.posts?.editingPost)

    return (
        <div>
            {/*<TextInput type={'text'} value={postData?.title} title={'Title'} onChangeHandler={onChangeHandler}/>*/}
            {/*<TextInput type={'textarea'} value={postData.description} title={'Description'} onChangeHandler={onChangeHandler}/>*/}

        </div>
    )
};
export default CreateEditArticlePostField
