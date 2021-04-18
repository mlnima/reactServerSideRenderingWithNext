import React, {useEffect, useState} from 'react';
import LinkTypeWidgetModelFields from "../LinkTypeWidgetModelFields/LinkTypeWidgetModelFields";
import MultipleLinkWidgetSingleLinkPreview from "./MultipleLinkWidgetSingleLinkPreview";
import _ from "lodash";

const MultipleLinkWidgetModelFields = props => {
    const [editingData, setEditingData] = useState({
        translations: {}
    });

    const onChangeHandlerWithTranslate = e => {
        if (props.widgetSettings.activeEditingLanguage === 'default') {
            setEditingData({
                ...editingData,
                [e.target.name]: e.target.value
            })
        } else {
            setEditingData({
                ...editingData,
                translations: {
                    ...editingData.translations,
                    [props.widgetSettings.activeEditingLanguage]: {
                        ...editingData.translations?.[props.widgetSettings.activeEditingLanguage] || {},
                        [e.target.name]: e.target.value
                    }
                }
            })
        }

    }

    const onChangeHandler = e => {
        setEditingData({
            ...editingData,
            [e.target.name]: e.target.value
        })
    }


    // useEffect(() => {
    //     console.log(props.widgetData)
    // }, [props]);

    const onAddHandler = e => {
        e.preventDefault()
        props.setWidgetData({
            ...props.widgetData,
            multipleLinks: [
                ...(props?.widgetData?.multipleLinks || []),
                {
                    ...editingData,
                    linkIndex: (props?.widgetData?.multipleLinks?.length ?parseInt(props?.widgetData?.multipleLinks?.length): 0) + 1,
                    linkId: (props?.widgetData?.multipleLinks?.length ?parseInt(props?.widgetData?.multipleLinks?.length): 0) + 1
                }
            ]
        })
    }


    const renderAddedItems = (props.widgetData.multipleLinks|| []).sort((a,b)=>a.linkIndex - b.linkIndex).map(eachLink=>{
        return(
            <MultipleLinkWidgetSingleLinkPreview key={_.uniqueId('id_')} linkData={eachLink} widgetSettings={props.widgetSettings} widgetData={props.widgetData} setWidgetData={props.setWidgetData}/>
        )
    })



    return (
        <>
            <form className='multiple-link-widget-add-form'
                  onSubmit={e => onAddHandler(e)}
            >

                <div className='menu-form-field'>
                    <p>Link title :</p>
                    <input name='linkTitle'
                           type='text'
                           onChange={e => onChangeHandlerWithTranslate(e)}
                           value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData.linkTitle ?? '' : editingData?.translations[props.widgetSettings.activeEditingLanguage]?.linkTitle ?? ''}/>
                </div>

                <div className='menu-form-texarea'>
                    <p>Link description :</p>
                    <textarea name='linkDescription'
                              onChange={e => onChangeHandlerWithTranslate(e)}
                              value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData.linkDescription ?? '' : editingData?.translations[props.widgetSettings.activeEditingLanguage]?.linkDescription ?? ''}/>
                </div>
                <div className='menu-form-field'>
                    <p>Link To :</p>
                    <input name='linkTo'
                           type='text'
                           onChange={e => onChangeHandler(e)}
                           value={editingData.linkTo}/>
                </div>
                <div className='menu-form-field'>
                    <p>Link To As :</p>
                    <input name='linkToAs'
                           type='text'
                           onChange={e => onChangeHandler(e)}
                           value={editingData.linkToAs}/>
                </div>
                <div className='menu-form-field'>
                    <p>Link Type :</p>
                    <select name='linkToType' value={editingData.linkToType} onChange={e => onChangeHandler(e)}>
                        <option>select</option>
                        <option value='internal'>Internal</option>
                        <option value='external'>External</option>
                    </select>
                </div>

                <div className='menu-form-field'>

                </div>


                {editingData.linkToType === 'external' ?
                    <div className='menu-form-field'>
                        <p>Link To Window Type :</p>
                        <select name='linkToWindowType' value={editingData.linkToWindowType} onChange={e => onChangeHandler(e)}>
                            <option>select</option>
                            <option value='_blank'>Open New Window</option>
                            <option value='_self'>Redirect To Link In The Same Window</option>
                        </select>
                    </div> : null
                }
                <div className='menu-form-field'>
                    <p>link Index :</p>
                    <input name='linkIndex'
                           onChange={e => onChangeHandler(e)}
                           type='number'
                           value={editingData.linkIndex}/>
                </div>
                <button type='submit'>Add</button>
            </form>

            {renderAddedItems}
        </>
    );
};
export default MultipleLinkWidgetModelFields;
