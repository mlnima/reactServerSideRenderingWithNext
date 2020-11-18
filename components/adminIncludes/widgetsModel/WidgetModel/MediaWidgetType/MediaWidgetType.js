import React from 'react';
import RenderTitleAndRedirectLink from "../RenderTitleAndRedirectLink/RenderTitleAndRedirectLink";
import TextWidgetTypeFields from "../TextWidgetTypeFields/TextWidgetTypeFields";
import {DelayInput} from "react-delay-input";

const MediaWidgetType = props => {

    return (
        <>
            <RenderTitleAndRedirectLink widgetData={props.widgetData} widgetSettings={props.widgetSettings}
                                        onChangeHandler={props.onChangeHandler}/>
            <TextWidgetTypeFields
                widgetSettings={props.widgetSettings}
                onTextInputsDataChangeHandler={props.onTextInputsDataChangeHandler}
                widgetData={props.widgetData}
                onChangeHandler={props.onChangeHandler}
            />
            <p>Media Type:</p>
            <select name='mediaType' value={props.widgetData.mediaType }
                    onChange={e => props.onChangeHandler(e)}>
                <option >Select Media Type</option>
                <option value='video'>Video</option>
                <option value='image'>Image</option>
                <option value='document'>Document</option>
                <option value='audio'>Audio</option>
                <option value='iframe'>Iframe</option>
            </select>
            <p>Media Url:</p>
            <DelayInput name='mediaUrl' value={props.widgetData.mediaUrl || ''} placeholder='Media URL'
                        className='mediaUrl' delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
        </>
    );
};
export default MediaWidgetType;
