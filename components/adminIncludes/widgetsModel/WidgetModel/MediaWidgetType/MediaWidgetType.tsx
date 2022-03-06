import React from 'react';

const MediaWidgetType = ({widgetData,rendering,onChangeHandler}) => {

    if (rendering){
        return (
            <div className={'selectInputFieldForWidget widgetSection'}>
                <p>Media Type:</p>
                <select className={'custom-select'} name='mediaType' value={widgetData.mediaType } onChange={e => onChangeHandler(e)}>
                    <option >Select Media Type</option>
                    <option value='video'>Video</option>
                    <option value='image'>Image</option>
                    <option value='audio'>Audio</option>
                    <option value='iframe'>Iframe</option>
                </select>

            </div>
        );
    }else return null


};
export default MediaWidgetType;


