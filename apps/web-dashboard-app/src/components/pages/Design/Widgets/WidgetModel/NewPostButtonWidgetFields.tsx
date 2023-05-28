import React, {FC} from "react";
import styled from "styled-components";
import {UniqueDataTypes, WidgetSettingsPropTypes} from "typescript-types";
import TextInputFieldForWidget
    from "@components/pages/Design/Widgets/WidgetModel/TextInputFieldForWidget/TextInputFieldForWidget";
import {postTypes} from "data-structures";

const Style = styled.div``;

interface PropTypes {
    widgetSettings: WidgetSettingsPropTypes,
    uniqueData: UniqueDataTypes,
    onUniqueDataChangeHandler: any,
    onUniqueDataChangeHandlerWithTranslate: any,
}

const NewPostButtonWidgetFields: FC<PropTypes> =
    ({
         uniqueData,
         widgetSettings,
         onUniqueDataChangeHandler,
         onUniqueDataChangeHandlerWithTranslate
     })  => {




    return (
        <>
            <div className='selectInputFieldForWidget widgetSection'>
                <p>Post Type:</p>
                <TextInputFieldForWidget
                    inputTitle='New Post Button Text:'
                    name='newPostButtonPostType'
                    type='text'
                    value={
                        widgetSettings.activeEditingLanguage === 'default' ? uniqueData?.linkToText:
                            uniqueData?.translations?.[widgetSettings?.activeEditingLanguage]?.linkToText || ''
                    }
                    classNameValue='linkToText'
                    placeHolder='Link To Text'
                    onChangeHandler={onUniqueDataChangeHandlerWithTranslate}
                />
            </div>
            <div className='selectInputFieldForWidget widgetSection'>
                <p>Post Type:</p>
                <select className={'custom-select'}
                        name='newPostButtonPostType'
                        value={uniqueData.newPostButtonPostType}
                        onChange={e => onUniqueDataChangeHandler(e)}>

                    <option>select</option>
                    {postTypes.map((postType, index) => {
                        return <option key={index} value={postType}>{postType}</option>
                    }  )}
                </select>
            </div>
        </>
    )
};
export default NewPostButtonWidgetFields;
