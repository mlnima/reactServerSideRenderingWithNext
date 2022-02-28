import React, {FC} from "react";
//import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

interface CreateEditArticlePostPropTypes {
    onChangeHandler:any
}

const CreateEditArticlePostField: FC<CreateEditArticlePostPropTypes> = ({onChangeHandler}) => {
    const editingPostData = useSelector((store: StoreTypes) => store?.posts?.editingPost)

    return (
        <div>
            {/*<TextInput type={'text'} value={postData?.title} title={'Title'} onChangeHandler={onChangeHandler}/>*/}
            {/*<TextInput type={'textarea'} value={postData.description} title={'Description'} onChangeHandler={onChangeHandler}/>*/}

        </div>
    )
};
export default CreateEditArticlePostField
