import React, {useEffect, useState, useContext, useRef} from 'react';
import FA from "react-fontawesome";
import BarsSvg from '../../../static/images/fontawesome/bars-solid.svg'
import {AppContext} from "../../../context/AppContext";


const NavigationItem = props => {
    const contextData = useContext(AppContext);
    const addQueryInputElKey = useRef(null)
    const addQueryInputElValue = useRef(null)
    const [state, setState] = useState({
        isOpen: false
    });

    const [data, setData] = useState({
        title: '',
        url: '',
        as: '',
        query: [],
        translations: {}
    })

    const [settings, setSettings] = useState({
        activeEditingLanguage: 'default'
    })

    useEffect(() => {
        setData({
            ...data,
            title: props.title,
            url: props.url,
            as: props.as,
            query: props.query || [],
            translations: props.translations || {}
        })
    }, [props]);

    const onOpenHandler = () => {
        state.isOpen ?
            setState({
                ...state,
                isOpen: false
            }) :
            setState({
                ...state,
                isOpen: true
            })
    };

    const onChaneHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onTextInputsDataChangeHandler = (e) => {
        if (settings.activeEditingLanguage === 'default') {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        } else {
            setData({
                ...data,
                translations: {
                    ...data.translations,
                    [settings.activeEditingLanguage]: {
                        ...data.translations[settings.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }


            })
        }
    }


    const onAddQueryHandler = e => {
        e.preventDefault()
        setData({
            ...data,
            query: [...data.query, {[addQueryInputElKey.current.value]: addQueryInputElValue.current.value}]
        })

        if (settings.activeEditingLanguage === 'default') {
            setData({
                ...data,
                query: [...data.query, {[addQueryInputElKey.current.value]: addQueryInputElValue.current.value}]
            })
        } else {
            setData({
                ...data,
                translations: {
                    ...data.translations,
                    [settings.activeEditingLanguage]: {
                        ...data.translations[settings.activeEditingLanguage],
                        query: [...data.query, {[addQueryInputElKey.current.value]: addQueryInputElValue.current.value}]
                    }
                }
            })
        }

    }

    // const renderQueries = (data.query || []).map(i => {
    //     return (
    //         <div className='query-item-admin-panel'>
    //             <p>{Object.keys(i)[0]}</p>
    //             <button onClick={() => {
    //                 setData({
    //                     ...data,
    //                     query: data.query.filter(q => Object.keys(q)[0] !== Object.keys(i)[0])
    //                 })
    //             }}>X
    //             </button>
    //         </div>
    //     )
    // })
    const renderQueries = ( settings.activeEditingLanguage === 'default'?   data.query || [] : data.translations[settings.activeEditingLanguage] ? data.translations[settings.activeEditingLanguage].query? data.translations[settings.activeEditingLanguage].query :[]    :[] ).map(i => {
        return (
            <div className='query-item-admin-panel'>
                <p>{Object.keys(i)[0]}</p>
                <button onClick={() => {
                    setData({
                        ...data,
                        query: data.query.filter(q => Object.keys(q)[0] !== Object.keys(i)[0])
                    })
                }}>X
                </button>
            </div>
        )
    })


    const languagesOptions = (contextData.siteIdentity.translationLanguages || []).map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })

    const onChangeLanguageHandler = e => {
        setSettings({
            ...settings,
            activeEditingLanguage: e.target.value
        })
    }


    if (!state.isOpen) {
        return (
            <div className='navigation-items-preview-item'>
                <div className="item-title" onClick={() => onOpenHandler()}>
                    <p>{props.title}</p>
                    {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/}
                </div>
            </div>
        )
    } else return (
        <div className='navigation-items-preview-item'>
            <div className="item-title" onClick={() => onOpenHandler()}>
                <p>{props.title}</p>
                {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/}
            </div>
            <div className="navigation-items-preview-item-edit">
                <div className="navigation-items-preview-item-edit-section">
                    <select name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                        <option value='default'>Default</option>
                        {languagesOptions}
                    </select>
                </div>
                <div className="navigation-items-preview-item-edit-section">
                    <p>Title:</p>
                    <input type="text" name='title' value={
                        // data.title
                        settings.activeEditingLanguage === 'default' ? data.title :
                            data.translations ?
                                data.translations[settings.activeEditingLanguage] ?
                                    data.translations[settings.activeEditingLanguage].title || '' : '' : ''
                    }
                           onChange={e => onTextInputsDataChangeHandler(e)}/>
                </div>
                <div className="navigation-items-preview-item-edit-section">
                    <p>Url:</p>
                    <input type="text" name='url' value={data.url} onChange={e => onChaneHandler(e)}/>
                </div>

                <div className="navigation-items-preview-item-edit-section">
                    <p>As:</p>
                    <input type="text" name='as' value={data.as} onChange={e => onChaneHandler(e)}/>
                </div>


                <form className='add-query-editing-navigation' onSubmit={e => onAddQueryHandler(e)}>
                    <h4>Adding query To the Url</h4>
                    <div className="navigation-items-preview-item-edit-section">
                        <p>QueryKey:</p>
                        <input ref={addQueryInputElKey} type="text" name='query'/>
                    </div>
                    <div className="navigation-items-preview-item-edit-section">
                        <p>QueryValue:</p>
                        <input ref={addQueryInputElValue} type="text" name='query'/>
                    </div>
                    {renderQueries}
                    <button type='submit'>Add Query</button>
                </form>
                <button name={data.title} onClick={(e) => props.onDeleteItemHandler(e)}>Del</button>
                <button name={data.title} onClick={(e) => props.onSaveHandler(data, props.itemIndex)}>save</button>
            </div>
        </div>
    )

};
//export default NavigationItem;