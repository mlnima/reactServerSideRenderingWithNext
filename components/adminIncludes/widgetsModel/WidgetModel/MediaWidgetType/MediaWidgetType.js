import React, {useEffect, useState, useContext, useRef} from 'react';
import RenderTitleAndRedirectLink from "../RenderTitleAndRedirectLink/RenderTitleAndRedirectLink";
import TextWidgetTypeFields from "../TextWidgetTypeFields/TextWidgetTypeFields";
import {DelayInput} from "react-delay-input";

const MediaWidgetType = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <>
            <RenderTitleAndRedirectLink textInputsData={props.textInputsData} widgetSettings={props.widgetSettings}
                                        onChangeHandler={props.onChangeHandler}/>
            <TextWidgetTypeFields
                widgetSettings={props.widgetSettings}
                onTextInputsDataChangeHandler={props.onTextInputsDataChangeHandler}
                textInputsData={props.textInputsData}
                widgetData={props.widgetData}
                onChangeHandler={props.onChangeHandler}
            />
            <p>Media Type:</p>
            <select name='mediaType' value={props.widgetData.data.mediaType || 'image'}
                    onChange={e => props.onChangeHandler(e)}>
                <option value='video'>Video</option>
                <option value='image'>Image</option>
                <option value='document'>Document</option>
                <option value='audio'>Audio</option>
                <option value='iframe'>Iframe</option>
            </select>
            <p>Media Url:</p>
            <DelayInput name='mediaUrl' value={props.widgetData.data.mediaUrl || ''} placeholder='Media URL'
                        className='mediaUrl' delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
        </>
    );
};
export default MediaWidgetType;
