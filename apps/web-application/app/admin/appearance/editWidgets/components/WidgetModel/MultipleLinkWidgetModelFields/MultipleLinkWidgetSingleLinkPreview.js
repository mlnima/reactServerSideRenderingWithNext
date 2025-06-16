import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const MultipleLinkWidgetSingleLinkPreviewStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: var(--primary-border);
  filter: opacity(90%);

  .multiple-link-widget-single-link-preview-header {
    width: 95%;

  }

  .multiple-link-widget-single-link-preview-form {
    width: 95%;

    .menu-form-field, .menu-form-textarea {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        padding: 0 10px;
        align-self: flex-start;
      }

      .primaryInput {
        width: 90%;
        background-color: #222;
        color: #ccc;
      }

      .primarySelect {
        width: 95%;
        background-color: #222;
        color: #ccc;
      }
    }

    .btn {
      margin: 10px 0;
    }
  }

`

const MultipleLinkWidgetSingleLinkPreview = props => {
    const [open, setOpen] = useState(false)

    const [editingData, setEditingData] = useState({
        translations: {}
    });
    useEffect(() => {
        setEditingData(props.linkData)
    }, [props.linkData.linkId]);


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

    const onEditHandler = e => {
        e.preventDefault()
        const findItemIndex = props.widgetData.multipleLinks.findIndex(i => i.linkId === editingData.linkId)
        const newData = [
            ...props.widgetData.multipleLinks.slice(0, findItemIndex),
            editingData,
            ...props.widgetData.multipleLinks.slice(findItemIndex + 1),
        ]

        props.setWidgetData({
            ...props.widgetData,
            multipleLinks: newData
        })
    }

    const onIndexChangeHandler = action => {
        const newLinkData = {
            ...editingData,
            linkIndex: action ? parseInt(editingData.linkIndex) + 1 : parseInt(editingData.linkIndex) - 1,
        }
        const findItemIndex = props.widgetData.multipleLinks.findIndex(i => i.linkId === editingData.linkId)
        const newData = [
            ...props.widgetData.multipleLinks.slice(0, findItemIndex),
            newLinkData,
            ...props.widgetData.multipleLinks.slice(findItemIndex + 1),
        ]
        props.setWidgetData({
            ...props.widgetData,
            multipleLinks: newData
        })
    }

    return (

        <MultipleLinkWidgetSingleLinkPreviewStyledDiv className={'multiple-link-widget-single-link-preview'}>
            <div className='multiple-link-widget-single-link-preview-header'>
                <p>{editingData.linkIndex} - {editingData?.linkTitle}</p>
                <button className={'btn btn-secondary'} onClick={() => onIndexChangeHandler(false)}>-</button>
                <button className={'btn btn-secondary'} onClick={() => onIndexChangeHandler(true)}>+</button>
                <button className={'btn btn-secondary'}
                        onClick={() => open ? setOpen(false) : setOpen(true)}>{open ? 'close' : 'open'}</button>
            </div>

            {open ?
                <form className='multiple-link-widget-single-link-preview-form' onSubmit={e => onEditHandler(e)}>
                    <div className='menu-form-field'>
                        <p>Link title :</p>
                        <input name='linkTitle'
                               type='text'
                               className={'primaryInput'}
                               onChange={e => onChangeHandlerWithTranslate(e)}
                               value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData?.linkTitle ?? '' : editingData?.translations?.[props.widgetSettings.activeEditingLanguage]?.linkTitle ?? ''}/>
                    </div>

                    <div className='menu-form-textarea'>
                        <p>Link description :</p>
                        <textarea name='linkDescription'
                                  className={'primaryInput'}
                                  onChange={e => onChangeHandlerWithTranslate(e)}
                                  value={props.widgetSettings.activeEditingLanguage === 'default' ? editingData.linkDescription ?? '' : editingData?.translations?.[props.widgetSettings.activeEditingLanguage]?.linkDescription ?? ''}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>Url :</p>
                        <input name='linkTo'
                               type='text'
                               className={'primaryInput'}
                               onChange={e => onChangeHandler(e)}
                               value={editingData.linkTo}/>
                    </div>
                    <div className='menu-form-field'>
                        <p>rel :</p>
                        <select className={'primarySelect'} name='linkRel' value={editingData.linkRel}
                                onChange={e => onChangeHandler(e)}>
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
                        <select className={'primarySelect'} name='linkToWindowType' value={editingData.linkToWindowType}
                                onChange={e => onChangeHandler(e)}>
                            <option>select</option>
                            <option value='_blank'>Open New Window</option>
                            <option value='_self'>Redirect To Link In The Same Window</option>
                        </select>
                    </div>
                    <div className='menu-form-field'>
                        <p>link Index :</p>
                        <input name='linkIndex'
                               className={'primaryInput'}
                               onChange={e => onChangeHandler(e)}
                               type='number'
                               value={editingData.linkIndex}/>
                    </div>
                    <button className={'btn btn-secondary'} type='submit'>edit</button>
                </form> : null

            }

        </MultipleLinkWidgetSingleLinkPreviewStyledDiv>
    );
};
export default MultipleLinkWidgetSingleLinkPreview;
