import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext'
import {deleteWidgets, getMultipleWidgetWithData, updateWidgets} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName, generateAbsolutePath} from '../../../../_variables/_variables'
import WidgetsRenderer from '../../../includes/WidgetsRenderer/WidgetsRenderer'
import 'array.prototype.move';
import SortUpSvg from '../../../../static/images/fontawesome/sort-up-solid.svg'
import SortDownSvg from '../../../../static/images/fontawesome/sort-down-solid.svg'
import {DelayInput} from 'react-delay-input'
import RenderTitleAndRedirectLink from "./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink";
import WidgetPreview from "./WidgetPreview/WidgetPreview";
import SelectedMetaIdForPostWidget from "./SelectedMetaIdForPostWidget/SelectedMetaIdForPostWidget";
import CountInput from "./CountInput/CountInput";
import TextInputFieldForWidget from "./TextInputFieldForWidget/TextInputFieldForWidget";

const WidgetModel = props => {
    const contextData = useContext(AppContext);

    const [widgetData, setWidgetData] = useState({
        data: {}
    })
    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        preview: false,
        activeEditingLanguage: 'default'
    })

    const [textInputsData, setTextInputsData] = useState({
        title: '',
        redirectToTitle: '',
        redirectLink: '',
        translations: {},
        LogoText: '',
        headLine: '',
        text: '',
    })

    const onChangeLanguageHandler = e => {
        setWidgetSettings({
            ...widgetSettings,
            activeEditingLanguage: e.target.value
        })
    }

    useEffect(() => {
        console.log(widgetData)
    }, [props,widgetData]);
    const onTextInputsDataChangeHandler = (e) => {
        if (widgetSettings.activeEditingLanguage === 'default') {
            setTextInputsData({
                ...textInputsData,
                [e.target.name]: e.target.value
            })
        } else {
            setTextInputsData({
                ...textInputsData,
                translations: {
                    ...textInputsData.translations,
                    [widgetSettings.activeEditingLanguage]: {
                        ...textInputsData.translations[widgetSettings.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    useEffect(() => {
        setWidgetData({
            ...widgetData,
            ...props.data,
        })

        setTextInputsData({
            ...textInputsData,
            title: props.data.data.title,
            redirectToTitle: props.data.data.redirectToTitle,
            redirectLink: props.data.data.redirectLink,
            translations: props.data.data.translations || {},
            LogoText: props.data.data.LogoText || '',
            headLine: props.data.data.headLine || '',
            text: props.data.data.text || '',
            languageToShowBesideDropDown: props.data.data.languageToShowBesideDropDown || 'Language',
            pathURL: props.data.data.pathURL || '',
            textAlign: props.data.data.textAlign || 'center',
        })

    }, [props]);

    const languagesOptions = props.translationLanguages.map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    })

    const onOpenHandler = () => {
        widgetSettings.open ? setWidgetSettings({
            ...widgetSettings,
            open: false
        }) : setWidgetSettings({...widgetSettings, open: true})
    }

    const onDeleteHandler = () => {
        deleteWidgets(props.data._id, window.location.origin).then(() => {
            getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [...res.data.widgets]
                })
            })
        })
    }

    const onSaveHandler = () => {
        const dataToSave = {
            ...widgetData,
            data: {
                ...widgetData.data,
                ...textInputsData
            }
        }
        dataToSave.data.posts = []
        dataToSave.data.metaData = []


        updateWidgets(dataToSave).then(() => {
            getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                console.log(res.data)
                contextData.dispatchWidgetsSettings({
                    widgets: [...res.data.widgets]
                })
            })
        })
    }

    const onChangeHandler = e => {
        setWidgetData({
            ...widgetData,
            data: {
                ...widgetData.data,
                [e.target.name]: e.target.value
            }
        })

    }


    // const RenderRedirect = () => {
    //     return (
    //         <>
    //             <p>Redirect Link URL:</p>
    //             <DelayInput className='redirectLink' name='redirectLink' placeholder='Redirect'
    //                         value={widgetData.data.redirectLink} delayTimeout={1000}
    //                         onChange={e => onChangeHandler(e)}/>
    //         </>
    //     )
    // }

    // const RenderSelectedMetaForPosts = () => {
    //     return (
    //         <>
    //             <p>Selected Meta For Posts:</p>
    //             <DelayInput className='redirectLink' name='selectedMetaForPosts' placeholder='Enter the meta ID'
    //                         value={widgetData.data.selectedMetaForPosts} delayTimeout={1000}
    //                         onChange={e => onChangeHandler(e)}/>
    //         </>
    //     )
    // }

    // const RenderCount = () => {
    //     return (
    //         <>
    //             <p>Count:</p>
    //             <DelayInput name='count' type='number' value={textInputsData.count} placeholder='count'
    //                         className='count' delayTimeout={1000} onChange={e => onTextInputsDataChangeHandler(e)}/>
    //         </>
    //     )
    // }

    const RenderText = () => {
        return (
            <>
                <p>Text:</p>
                <DelayInput  element="textarea" name='text' value={
                    widgetSettings.activeEditingLanguage === 'default' ? textInputsData.text :
                        textInputsData.translations ?
                            textInputsData.translations[widgetSettings.activeEditingLanguage] ?
                                textInputsData.translations[widgetSettings.activeEditingLanguage].text || '' :
                                '' : ''
                } delayTimeout={2000}
                            onChange={e => onTextInputsDataChangeHandler(e)}/>

                <p>Text Align:</p>
                <select name='textAlign' value={textInputsData.textAlign} onChange={e => onTextInputsDataChangeHandler(e)}>
                    <option value='left'>Left</option>
                    <option value='center'>Center</option>
                    <option value='right'>Right</option>
                </select>
            </>
        )
    }

    const RenderWidgetCustomStyle = () => {
        return (
            <>
                <p>Extra ClassName for Custom Style:</p>
                <DelayInput name='extraClassName' value={widgetData.data.extraClassName || ''} delayTimeout={4000}
                            onChange={e => onChangeHandler(e)}/>
                <p>Custom Styles:</p>
                <DelayInput element="textarea" className='customStylesTextarea' name='customStyles'
                            value={widgetData.data.customStyles || ''} delayTimeout={4000}
                            onChange={e => onChangeHandler(e)}/>
            </>
        )
    }

    const RenderOptionByFormat = () => {
        switch (widgetData.data.type) {
            case 'posts':
                return (
                    <>

                        <RenderTitleAndRedirectLink textInputsData={textInputsData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <RenderText/>
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.data.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        {/*<RenderSelectedMetaForPosts/>*/}
                        <SelectedMetaIdForPostWidget onChangeHandler={onChangeHandler} widgetData={widgetData} />
                        <p>View Type:</p>
                        <select name='viewType' value={widgetData.data.viewType} onChange={e => onChangeHandler(e)}>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                        <TextInputFieldForWidget element='input' inputTitle='count :' name='count' type='number' value={widgetData.data.count} classNameValue='count' placeHolder='count' onChangeHandler={onChangeHandler} />
                    </>
                )

            case 'media':
                return (
                    <>
                        <RenderTitleAndRedirectLink textInputsData={textInputsData} widgetSettings={widgetSettings}
                                                    onChangeHandler={onChangeHandler}/>
                        <RenderText/>
                        <p>Media Type:</p>
                        <select name='mediaType' value={widgetData.data.mediaType || ''}
                                onChange={e => onChangeHandler(e)}>
                            <option value='video'>Video</option>
                            <option value='image'>Image</option>
                            <option value='audio'>Audio</option>
                            <option value='iframe'>Iframe</option>
                        </select>
                        <p>Media Url:</p>
                        <DelayInput name='mediaUrl' value={widgetData.data.mediaUrl || ''} placeholder='Media URL'
                                    className='mediaUrl' delayTimeout={1000} onChange={e => onChangeHandler(e)}/>
                    </>
                )

            case 'meta':
                return (
                    <>
                        <RenderTitleAndRedirectLink textInputsData={textInputsData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <RenderText/>
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.data.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>ID</option>
                            <option value='count'>Count</option>
                        </select>
                        <p>Meta Type:</p>
                        <select name='metaType' value={widgetData.data.metaType} onChange={e => onChangeHandler(e)}>
                            <option value=''>Select The Meta Type</option>
                            <option value='tags'>Tags</option>
                            <option value='categories'>Categories</option>
                            <option value='actors'>Actors</option>
                        </select>
                        <TextInputFieldForWidget element='input' inputTitle='Meta background Color :' name='metaBackgroundColor' type='text' value={widgetData.data.metaBackgroundColor} classNameValue='metaBackgroundColor' placeHolder='Meta background Color' onChangeHandler={onChangeHandler} />
                        <TextInputFieldForWidget element='input' inputTitle='Meta Text Color :' name='metaTextColor' type='text' value={widgetData.data.metaTextColor} classNameValue='metaTextColor' placeHolder='Meta Text Color' onChangeHandler={onChangeHandler} />
                        <TextInputFieldForWidget element='input' inputTitle='Count :' name='count' type='number' value={widgetData.data.count} classNameValue='count' placeHolder='count' onChangeHandler={onChangeHandler} />
                    </>
                )

            case 'searchBar':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Search Button Background Color :' name='searchBtnBackgroundColor' type='text' value={widgetData.data.searchBtnBackgroundColor || '#222222'} classNameValue='searchBtnBackgroundColor' placeHolder='Search Button Background Color' onChangeHandler={onChangeHandler} />
                        <TextInputFieldForWidget element='input' inputTitle='Search Button Color :' name='searchBtnColor' type='text' value={widgetData.data.searchBtnColor || 'white'} classNameValue='searchBtnColor' placeHolder='Search Button Color' onChangeHandler={onChangeHandler} />
                    </>
                )

            case 'logo':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Logo image URL :' name='LogoUrl' type='text' value={widgetData.data.LogoUrl} classNameValue='logoUrl' placeHolder='Logo image URL' onChangeHandler={onChangeHandler} />
                        <p>Logo Text</p>
                        <DelayInput name='LogoText' value={
                            widgetSettings.activeEditingLanguage === 'default' ? textInputsData.LogoText :
                                textInputsData.translations ?
                                    textInputsData.translations[widgetSettings.activeEditingLanguage] ?
                                        textInputsData.translations[widgetSettings.activeEditingLanguage].LogoText || '' :
                                        '' : ''
                        } className='LogoText'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>

                        <div className='color-section-widget'>
                            <TextInputFieldForWidget element='input' inputTitle='Logo Text Color :' name='logoTextColor' type='text' value={widgetData.data.logoTextColor} classNameValue='logoTextColor' placeHolder='Logo Text Color' onChangeHandler={onChangeHandler} />
                            <TextInputFieldForWidget element='input' inputTitle='Logo Text Font Size :' name='logoTextFontSize' type='number' value={widgetData.data.logoTextFontSize} classNameValue='logoTextFontSize' placeHolder='Logo Text Font Size' onChangeHandler={onChangeHandler} />
                        </div>

                        <TextInputFieldForWidget element='input' inputTitle='Under Logo Headline Text :' name='logoTextColor' type='text' value={widgetData.data.logoTextColor} classNameValue='logoTextColor' placeHolder='Under Logo Headline Text' onChangeHandler={onChangeHandler} />


                        <p>Under Logo Headline Text</p>
                        {/*<input name='headLine' value={ state.headLine } className='headLine' onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput name='headLine' value={
                            // widgetData.data.headLine
                            widgetSettings.activeEditingLanguage === 'default' ? textInputsData.headLine :
                                textInputsData.translations ?
                                    textInputsData.translations[widgetSettings.activeEditingLanguage] ?
                                        textInputsData.translations[widgetSettings.activeEditingLanguage].headLine || '' :
                                        '' : ''
                        } className='headLine'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>
                        <div className='color-section-widget'>
                            <TextInputFieldForWidget element='input' inputTitle='Head Line Color :' name='logoHeadLineColor' type='text' value={widgetData.data.logoHeadLineColor} classNameValue='logoHeadLineColor' placeHolder='Head Line Color' onChangeHandler={onChangeHandler} />
                            <TextInputFieldForWidget element='input' inputTitle='Head Line Font Size :' name='logoHeadLineFontSize' type='number' value={widgetData.data.logoHeadLineFontSize} classNameValue='logoHeadLineFontSize' placeHolder='Head Line Font Size' onChangeHandler={onChangeHandler} />
                        </div>
                    </>
                )

            case 'alphabeticalNumericalRange':
                return (
                    <>
                        <RenderTitleAndRedirectLink textInputsData={textInputsData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                    </>
                )
            case 'text':
                return (
                    <>
                        <RenderTitleAndRedirectLink textInputsData={textInputsData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <RenderText/>
                    </>
                )
            case 'language':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text' value={widgetData.data.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage' placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler} />

                        <p>Language To Show Beside Drop Down:</p>
                        <DelayInput name='languageToShowBesideDropDown' value={
                            widgetSettings.activeEditingLanguage === 'default' ? textInputsData.languageToShowBesideDropDown :
                                textInputsData.translations ?
                                    textInputsData.translations[widgetSettings.activeEditingLanguage] ?
                                        textInputsData.translations[widgetSettings.activeEditingLanguage].languageToShowBesideDropDown || '' :
                                        '' : ''
                        } delayTimeout={2000}
                                    onChange={e => onTextInputsDataChangeHandler(e)}/>
                    </>
                )

            default:
                return null

        }
    }

    const changeWidgetIndex = (more) => {
        const valueToSet = more ? widgetData.data.widgetIndex + 1 : widgetData.data.widgetIndex - 1
        const dataToSave = {
            ...widgetData,
            data: {
                ...widgetData.data,
                widgetIndex: valueToSet
            }
        }
        updateWidgets(dataToSave).then(() => {
            getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                console.log(res.data)
                contextData.dispatchWidgetsSettings({
                    widgets: [...res.data.widgets]
                })
            })
        })
    }


    if (widgetSettings.open) {
        return (
            <>
                <div className='widget-open-control'>
                    <p>{props.data.data.title || convertVariableNameToName(props.data.data.type)} index: {widgetData.data.widgetIndex}</p>
                    <button onClick={() => onOpenHandler()}>{widgetSettings.open ? 'close' : 'open'}</button>
                </div>
                <div className='widgetModel'>
                    <div className='widgetInfo'>
                        <label className='widgetId'><p>ID :</p> <p>{props.data._id}</p></label>
                    </div>
                    <p>Translations:</p>
                    <select name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                        <option value='default'>Default</option>
                        {languagesOptions}
                    </select>
                    <p>Type:</p>
                    <select name='type' value={widgetData.data.type} onChange={e => onChangeHandler(e)}>
                        <option value='posts'>Posts</option>
                        <option value='media'>Media</option>
                        <option value='text'>Text</option>
                        <option value='logo'>Logo</option>
                        <option value='recentComments'>Recent Comments</option>
                        <option value='searchBar'>Search</option>
                        <option value='meta'>Meta</option>
                        <option value='video'>Video</option>
                        <option value='navigationMenu'>Navigation Menu</option>
                        <option value='alphabeticalNumericalRange'>Alphabetical Numerical Range</option>
                        <option value='language'>Language</option>
                    </select>

                    <TextInputFieldForWidget element='input' inputTitle='Widget Index :' name='widgetIndex' type='number' value={widgetData.data.widgetIndex} classNameValue='widgetIndex' placeHolder='Widget Index' onChangeHandler={onChangeHandler} />

                    <p>Position:</p>
                    <select name='position' value={widgetData.data.position} onChange={e => onChangeHandler(e)}>
                        <option value='home'>Home</option>
                        <option value='header'>Header</option>
                        <option value='homePageSidebar'>Home Page Sidebar</option>
                        <option value='postPageSidebar'>Post Page SideBar</option>
                        <option value='postsPageSidebar'>Posts Page SideBar</option>
                        <option value='categoriesPageSidebar'>Categories Page SideBar</option>
                        <option value='tagsPagesSidebar'>Tags Page SideBar</option>
                        <option value='actorsPagesSidebar'>Actors Page SideBar</option>
                        <option value='footer'>footer</option>
                    </select>


                    <RenderOptionByFormat/>
                    <button onClick={() => {
                        widgetSettings.preview ? setWidgetSettings({
                            ...widgetSettings,
                            preview: false
                        }) : setWidgetSettings({...widgetSettings, preview: true})
                    }}>Preview the Widget
                    </button>

                    <WidgetPreview widgetData={widgetData} position={widgetData.data.position} preview={widgetSettings.preview}/>
                    <RenderWidgetCustomStyle/>
                    <div className='control'>
                        <button onClick={() => onSaveHandler()}>Save</button>
                        <button onClick={() => onDeleteHandler()}>Delete</button>
                    </div>

                </div>
            </>
        );
    } else {
        return (
            <div className='widget-open-control'>
                <p> {props.data.data.title || convertVariableNameToName(props.data.data.type)} index: {widgetData.data.widgetIndex}</p>
                <div>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(false)}><img
                        className='fontawesomeSvgVerySmall' src={SortUpSvg} alt=""/></button>
                    <button className='changeWidgetIndexBtn' onClick={() => changeWidgetIndex(true)}><img
                        className='fontawesomeSvgVerySmall' src={SortDownSvg} alt=""/></button>
                    <button onClick={() => onOpenHandler()}>{widgetSettings.open ? 'close' : 'open'}</button>
                </div>
            </div>
        )
    }

};
export default WidgetModel;
