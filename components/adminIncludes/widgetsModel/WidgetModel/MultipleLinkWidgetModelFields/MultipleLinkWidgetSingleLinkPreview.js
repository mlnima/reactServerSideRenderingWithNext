import React, {useEffect, useState, useContext, useRef} from 'react';

const MultipleLinkWidgetSingleLinkPreview = props => {
    const [open,setOpen] = useState(false)

    const [editingData, setEditingData] = useState({
        translations: {}
    });
    useEffect(() => {
        setEditingData(props.linkData)
    }, [props.linkData.linkId]);

    useEffect(() => {
        console.log(props)
    }, [props]);

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
        //console.log(newLinkData)
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

        <>
            <div key={editingDataa.linkId} className='multiple-link-widget-single-link-preview-header'>
                <p>{editingData.linkTitle}</p>
                <p>index : {editingData.linkIndex}</p>
                <button onClick={() => onIndexChangeHandler(false)}>-</button>
                <button onClick={() => onIndexChangeHandler(true)}>+</button>
                <button onClick={() => open ? setOpen(false) : setOpen(true)}>{open ? 'close' : 'open'}</button>
            </div>

            {open ?
                <form className='multiple-link-widget-single-link-preview-form' onSubmit={e => onEditHandler(e)}>
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
                    <button type='submit'>edit</button>
                </form>:null

            }

</>
    );
};
export default MultipleLinkWidgetSingleLinkPreview;
