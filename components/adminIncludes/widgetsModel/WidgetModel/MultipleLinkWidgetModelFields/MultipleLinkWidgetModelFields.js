import React, {useState} from 'react';
import MultipleLinkWidgetSingleLinkPreview from "./MultipleLinkWidgetSingleLinkPreview";
import {uniqueId} from "lodash";

import styled from "styled-components";

const MultipleLinkWidgetModelFieldsStyledForm = styled.form`
  width: 100%;

  .menu-form-field, .menu-form-textarea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      padding: 0 10px;
      align-self: flex-start;
    }

    .form-control-input {
      width: 90%;
      background-color: #333;
      color: #ccc;
    }

    .custom-select {
      width: 95%;
      background-color: #333;
      color: #ccc;
    }
  }

  .btn-secondary {
    margin: 10px;
  }
`

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
                    [props?.widgetSettings?.activeEditingLanguage]: {
                        ...editingData?.translations?.[props.widgetSettings.activeEditingLanguage] || {},
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

    const onAddHandler = e => {
        e.preventDefault()
        props.setWidgetData({
            ...props.widgetData,
            multipleLinks: [
                ...(props?.widgetData?.multipleLinks || []),
                {
                    ...editingData,
                    linkIndex: (props?.widgetData?.multipleLinks?.length ? parseInt(props?.widgetData?.multipleLinks?.length) : 0) + 1,
                    linkId: (props?.widgetData?.multipleLinks?.length ? parseInt(props?.widgetData?.multipleLinks?.length) : 0) + 1
                }
            ]
        })
    }


    const renderAddedItems = ([...props?.widgetData?.multipleLinks] || []).sort((a, b) => a.linkIndex - b.linkIndex).map(eachLink => {
        return (
            <MultipleLinkWidgetSingleLinkPreview key={uniqueId('id_')} linkData={eachLink} widgetSettings={props.widgetSettings} widgetData={props.widgetData} setWidgetData={props.setWidgetData}/>
        )
    })


    return (
        <>
            <MultipleLinkWidgetModelFieldsStyledForm className='multiple-link-widget-add-form' onSubmit={e => onAddHandler(e)}>

                <div className='menu-form-field'>
                    <p>Link title :</p>
                    <input name='linkTitle'
                           className={'form-control-input'}
                           type='text'
                           onChange={e => onChangeHandlerWithTranslate(e)}
                           value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData.linkTitle ?? '' : editingData?.translations[props.widgetSettings.activeEditingLanguage]?.linkTitle ?? ''}/>
                </div>

                <div className='menu-form-textarea'>
                    <p>Link description :</p>
                    <textarea name='linkDescription'
                              className={'form-control-input'}
                              onChange={e => onChangeHandlerWithTranslate(e)}
                              value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData.linkDescription ?? '' : editingData?.translations[props.widgetSettings.activeEditingLanguage]?.linkDescription ?? ''}/>
                </div>
                <div className='menu-form-field'>
                    <p>Url :</p>
                    <input name='linkTo'
                           type='text'
                           className={'form-control-input'}
                           onChange={e => onChangeHandler(e)}
                           value={editingData.linkTo}/>
                </div>
                {/*<div className='menu-form-field'>*/}
                {/*    <p>Link To As :</p>*/}
                {/*    <input name='linkToAs'*/}
                {/*           type='text'*/}
                {/*           className={'form-control-input'}*/}
                {/*           onChange={e => onChangeHandler(e)}*/}
                {/*           value={editingData.linkToAs}/>*/}
                {/*</div>*/}
                {/*<div className='menu-form-field'>*/}
                {/*    <p>Link Type :</p>*/}
                {/*    <select className={'custom-select'} name='linkToType' value={editingData.linkToType} onChange={e => onChangeHandler(e)}>*/}
                {/*        <option>select</option>*/}
                {/*        <option value='internal'>Internal</option>*/}
                {/*        <option value='external'>External</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className='menu-form-field'>
                    <p>rel :</p>
                    <select className={'custom-select'} name='linkRel' value={editingData.linkRel} onChange={e => onChangeHandler(e)}>
                        <option value='' >Select</option>
                        <option value='alternate'>alternate</option>
                        <option value='author'>author</option>
                        <option value='bookmark'>bookmark</option>
                        <option value='canonical'>canonical</option>
                        <option value='dns-prefetch'>dns-prefetch</option>
                        <option value='external'>external</option>
                        <option value='help'>help</option>
                        <option value='icon'>icon</option>
                        <option value='license'>license</option>
                        <option value='manifest'>manifest</option>
                        <option value='modulepreload'>modulepreload</option>
                        <option value='next'>next</option>
                        <option value='nofollow'>nofollow</option>
                        <option value='noopener'>noopener</option>
                        <option value='noreferrer'>noreferrer</option>
                        <option value='opener'>opener</option>
                        <option value='pingback'>pingback</option>
                        <option value='preconnect'>preconnect</option>
                        <option value='prefetch'>prefetch</option>
                        <option value='preload'>preload</option>
                        <option value='prerender'>prerender</option>
                        <option value='prev'>prev</option>
                        <option value='search'>search</option>
                        <option value='stylesheet'>stylesheet</option>
                        <option value='tag'>tag</option>
                    </select>
                </div>

                <div className='menu-form-field'>
                    <p>Link To Window Type :</p>
                    <select className={'custom-select'} name='linkToWindowType' value={editingData.linkToWindowType} onChange={e => onChangeHandler(e)}>
                        <option>select</option>
                        <option value='_blank'>Open New Window</option>
                        <option value='_self'>Redirect To Link In The Same Window</option>
                    </select>
                </div>

                <div className='menu-form-field'>
                    <p>link Index :</p>
                    <input name='linkIndex'
                           onChange={e => onChangeHandler(e)}
                           className={'form-control-input'}
                           type='number'
                           value={editingData.linkIndex}/>
                </div>
                <button className={'btn btn-secondary'} type='submit'>Add</button>
            </MultipleLinkWidgetModelFieldsStyledForm>

            {renderAddedItems}
        </>
    );
};
export default MultipleLinkWidgetModelFields;
