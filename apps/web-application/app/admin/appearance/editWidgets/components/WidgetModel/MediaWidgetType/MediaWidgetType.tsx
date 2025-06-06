import React, {FC} from 'react';
import {IWidgetData} from "@repo/typescript-types";

interface MediaWidgetTypePropTypes{
    widgetData:IWidgetData,
    onChangeHandler:React.ChangeEventHandler<HTMLSelectElement>
}

const MediaWidgetType:FC<MediaWidgetTypePropTypes> = ({widgetData,onChangeHandler}) => {

    return (
        <div className={'selectInputFieldForWidget widgetSection'}>
            <p>Media Type:</p>
            <select className={'primarySelect'}
                    name='mediaType'
                    value={widgetData.mediaType }
                    onChange={(e) => onChangeHandler(e)}>
                <option  value=''>Select Media Type</option>
                <option value='video'>Video</option>
                <option value='image'>Image</option>
                <option value='audio'>Audio</option>
                <option value='iframe'>Iframe</option>
            </select>

        </div>
    );


};
export default MediaWidgetType;


