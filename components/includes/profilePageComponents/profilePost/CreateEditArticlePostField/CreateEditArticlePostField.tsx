import React, {FC} from "react";
//import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

interface CreateEditArticlePostPropTypes {
    onChangeHandler:any
}

const CreateEditArticlePostField: FC<CreateEditArticlePostPropTypes> = ({onChangeHandler}) => {
    const editingPostData = useSelector((store: Store) => store?.posts?.editingPost)

    return (
        <div>
            {/*<TextInput type={'text'} value={postData?.title} title={'Title'} onChangeHandler={onChangeHandler}/>*/}
            {/*<TextInput type={'textarea'} value={postData.description} title={'Description'} onChangeHandler={onChangeHandler}/>*/}

        </div>
    )
};
export default CreateEditArticlePostField
