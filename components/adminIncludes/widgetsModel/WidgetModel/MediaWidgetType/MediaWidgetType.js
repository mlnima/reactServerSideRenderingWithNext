import React from 'react';
import RenderTitleAndRedirectLink from "../RenderTitleAndRedirectLink/RenderTitleAndRedirectLink";
import TextWidgetTypeFields from "../TextWidgetTypeFields/TextWidgetTypeFields";
import {DelayInput} from "react-delay-input";

const MediaWidgetType = props => {

    if (props.rendering){
        return (
            <>
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

            </>
        );
    }else return null


};
export default MediaWidgetType;


// {props.widgetData.mediaType === 'video'?
//     <>
//         <select name='mediaType' value={props.widgetData.mediaType }
//                 onChange={e => props.onChangeHandler(e)}>
//             <option >Select Media Type</option>
//             <option value='video'>Video</option>
//             <option value='image'>Image</option>
//             <option value='document'>Document</option>
//             <option value='audio'>Audio</option>
//             <option value='iframe'>Iframe</option>
//         </select>
//     </>
//     :null}