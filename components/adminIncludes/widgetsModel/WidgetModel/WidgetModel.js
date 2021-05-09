import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext';
import dynamic from 'next/dynamic'
import {addNewWidget, deleteWidgets, getMultipleWidgetWithData, getPagesData, updateWidgets} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from "../../../../_variables/_variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DelayInput} from 'react-delay-input'
import {languagesOptions} from "../../../../_variables/_variables";
import {faDollarSign, faEuroSign, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faClone, faSave} from "@fortawesome/free-regular-svg-icons";
import MonacoEditorComponent from "../../MonacoEditorComponent/MonacoEditorComponent";
import Editor from "@monaco-editor/react";
import SearchTypeInputFields from "./SearchTypeInputFields/SearchTypeInputFields";
import MultipleLinkWidgetModelFields from "./MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields";
import _ from "lodash";

const SliderWidgetTypeFields = dynamic(() => import('./SliderWidgetTypeFields/SliderWidgetTypeFields'));
const RenderTitleAndRedirectLink = dynamic(() => import('./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'));
const WidgetPreview = dynamic(() => import('./WidgetPreview/WidgetPreview'))
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), {ssr: false})
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'))
const ImageSwiperTypeWidgetModelFields = dynamic(() => import('./ImageSwiperTypeWidgetModelFields/ImageSwiperTypeWidgetModelFields'))
const PostSwiperTypeWidgetModelFields = dynamic(() => import('./PostSwiperTypeWidgetModelFields/PostSwiperTypeWidgetModelFields'))
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'))
const TextWidgetTypeFields = dynamic(() => import('./TextWidgetTypeFields/TextWidgetTypeFields'))
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'))
const ExportWidget = dynamic(() => import('./ExportWidget/ExportWidget'))
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'))
const WidgetHeaderControl = dynamic(() => import('./WidgetHeaderControl/WidgetHeaderControl'))
const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'), {ssr: false})
import styled from "styled-components";
let StyledDiv = styled.div`
  z-index: 3;
  background-color: var(--admin-color-8);
  display: flex;
  flex-direction: column;
  color: var(--admin-text-color);
  position: initial;
  top:100px;
  width: 100%;
  p{
    width: 95%;
    margin: auto;
    font-size: .8rem;
  }
  .widgetInfo{
    margin: auto;
    width: 95%;
  }
  .customStylesTextarea{
    width: 95%;
    min-height: 250px;
    margin: auto;
  }
  .widgetSection{
    margin: auto;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    p{
      width: 40%;
      font-size: .8rem;
    }
    input,select{
      display: block;
      width: 50%;
      -ms-box-sizing:content-box;
      -moz-box-sizing:content-box;
      -webkit-box-sizing:content-box;
      box-sizing:content-box;
    }
  }
  textarea{
  min-height: 250px;
}
  button {
    @include AdminLightBtn;
  }
.media-widget{
  display:flex;
  justify-content: center;
}
  .widgetInfo {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: small;
    label {
      display: flex;
      justify-content: space-between;
    }
  }
  input, select, button {
    margin: 5px;
  }
  input, select {
    background-color: #181818;
    color: white;
  }
  .control-buttons{
  display: flex;
  justify-content: space-evenly;
  button{
    padding: 5px 5%;
  }
}
`

const WidgetModel = props => {
    const contextData = useContext(AppContext);
    const languageElement = useRef(null)

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        preview: false,
        renderDeleteBtn: false,
        activeEditingLanguage: 'default'
    })

    const [widgetData, setWidgetData] = useState({
        translations: {},
    })

    useEffect(() => {
        setWidgetData({
            ...widgetData,
            ...props.data,
        })
    }, [props]);

    const onChangeLanguageHandler = e => {
        setWidgetSettings({
            ...widgetSettings,
            activeEditingLanguage: e.target.value
        })
    }

    const onTextInputsDataChangeHandler = (e) => {

        if (widgetSettings.activeEditingLanguage === 'default') {
            setWidgetData({
                ...widgetData,
                [e.target.name]: e.target.value
            })
        } else {
            const currentData = widgetData.translations ?
                widgetData.translations[widgetSettings.activeEditingLanguage] ?
                    widgetData :
                    {
                        ...widgetData,
                        translations: {
                            ...widgetData.translations,
                            [widgetSettings.activeEditingLanguage]: {}
                        }
                    }
                : {
                    ...widgetData,
                    translations: {
                        [widgetSettings.activeEditingLanguage]: {}
                    }
                }
            //const currentData = widgetData.translations ? widgetData ? widgetData.translations[widgetSettings.activeEditingLanguage]: {...widgetData, translation:{[widgetSettings.activeEditingLanguage]:{} } }   : {...widgetData, translation:{[widgetSettings.activeEditingLanguage]:{} } }
            setWidgetData({
                ...currentData,
                translations: {
                    ...currentData.translations,
                    [widgetSettings.activeEditingLanguage]: {
                        ...currentData.translations[widgetSettings.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }


    const onTextEditorChangeHandler = value => {
        if (languageElement?.current?.value === 'default') {
            setWidgetData({
                ...widgetData,
                text: value
            })

        } else {
            setWidgetData({
                ...widgetData,
                translations: {
                    ...(widgetData?.translations || {}),
                    [languageElement?.current?.value]: {
                        ...(widgetData?.translations?.[languageElement?.current?.value] || {}),
                        text: value
                    }
                }
            })
        }
    }
    const onChangeHandler = e => {
        const value = e.target.value
        setWidgetData({
            ...widgetData,
            [e.target.name]: value === 'true' ? true : value === 'false' ? false : value
        })
    };

    useEffect(() => {
        console.log(widgetData)
    }, [widgetData]);


    const onChangeHandlerByName = (name, value) => {
        setWidgetData({
            ...widgetData,
            [name]: value
        })
    };
    // const languagesOptions = (process.env.REACT_APP_LOCALS.split(' ').filter(lang=>lang!== process.env.REACT_APP_DEFAULT_LOCAL)||[]).map(lang => {
    //     return (
    //         <option key={lang} value={lang}>{lang}</option>
    //     )
    // });
    const onOpenHandler = () => {
        widgetSettings.open ? setWidgetSettings({
            ...widgetSettings,
            open: false
        }) : setWidgetSettings({...widgetSettings, open: true})
    };

    const onCloneHandler = () => {
        addNewWidget({
            data: {
                ...widgetData,
                //  ...textInputsData
            }
        }).then(() => {
            getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                contextData.dispatchWidgetsSettings({
                    ...contextData.widgetsSettings,
                    widgets: [...res.data.widgets]
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const onDeleteHandler = () => {
        if (props.isPost) {
            props.setState({
                ...props.state,
                widgets: props.state.widgets.filter(i => i.widgetIndex !== props.widgetIndex)
            })
        } else {
            deleteWidgets(props.widgetId, window.location.origin).then(() => {
                getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                    contextData.dispatchWidgetsSettings({
                        widgets: [...res.data.widgets]
                    })
                    setWidgetSettings({
                        ...widgetSettings,
                        open: false
                    })
                })
            })
        }
    };

    const changeWidgetIndex = (action) => {
        const valueToSet = action ? parseInt(widgetData.widgetIndex) + 1 : parseInt(widgetData.widgetIndex) - 1
        if (props.isPost) {
            const findIndexOfTheWidget = props.state.widgets.findIndex(w => {
                return ((w.widgetIndex === props.data.widgetIndex) && (w.type === props.data.type) && (w.widgetId === props.data.widgetId))
            })

            const updatedWidget = {...widgetData, widgetIndex: valueToSet}
            let widgets = props.state.widgets
            widgets[findIndexOfTheWidget] = updatedWidget
        } else {
            const dataToSave = {
                _id: props.widgetId || '',
                data: {
                    ...widgetData,
                    widgetIndex: valueToSet
                }
            }
            updateWidgets(dataToSave).then(() => {
                setTimeout(() => {
                    props.getAndSetWidgetsData()
                }, 0)

            })
        }
    };

    const onSaveHandler = () => {
        const dataToSave = {
            _id: props.widgetId ? props.widgetId : '',
            data: {
                ...widgetData,
            }
        }

        dataToSave.data.posts = []
        dataToSave.data.metaData = []
        if (props.isPost) {
            const findIndexOfTheWidget = props.state.widgets.findIndex(w => {
                return ((w.widgetIndex === props.widgetIndex) && (w.type === props.data.type))
            })
            const updatedWidgets = [
                ...props.state.widgets.slice(0, findIndexOfTheWidget),
                widgetData,
                ...props.state.widgets.slice(findIndexOfTheWidget + 1),
            ];
            props.setState({
                ...props.state,
                widgets: updatedWidgets
            })
        } else {
            updateWidgets(dataToSave).then(() => {
                props.getAndSetWidgetsData()
            })
        }
    };


    if (widgetSettings.open) {
        return (

            <>
                <WidgetHeaderControl setKey={false} widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} changeWidgetIndex={changeWidgetIndex}
                                     onOpenHandler={onOpenHandler}/>
                <StyledDiv className='widgetModel'>

                    <div className='widgetInfo'>
                        <label className='widgetId'>
                            <p>ID :</p>
                            <p>{props.widgetId || props.state.widgetId || 'XXX'}</p>
                        </label>
                    </div>
                    <TextInputFieldForWidget inputTitle='Name:' name='name' type='text' value={widgetData.name} classNameValue='name' placeHolder='name'
                                             onChangeHandler={e => onChangeHandler(e)}
                                             rendering={true}
                    />
                    <TextInputFieldForWidget inputTitle='index:' name='widgetIndex' type='number' value={widgetData.widgetIndex} classNameValue='widgetIndex' placeHolder='widgetIndex'
                                             onChangeHandler={e => onChangeHandler(e)}
                                             rendering={true}
                    />
                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Translations:</p>
                        <select ref={languageElement} name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                            <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? 'default'}</option>
                            {languagesOptions}
                        </select>
                    </div>

                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Device Type To Render:</p>
                        <select name='deviceTypeToRender' value={widgetData.deviceTypeToRender} onChange={e => onChangeHandler(e)}>
                            <option value='all'>All</option>
                            <option value='mobile'>Mobile</option>
                            <option value='desktop'>Desktop ( >= 768px)</option>
                        </select>
                    </div>

                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Language To Render:</p>
                        <select name='languageToRender' value={widgetData.languageToRender} onChange={e => onChangeHandler(e)}>
                            <option value='all'>All</option>
                            <option value='default'>Default</option>
                            {languagesOptions}
                        </select>
                    </div>

                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Position:</p>
                        <select name='position' value={widgetData.position} onChange={e => onChangeHandler(e)}>
                            <option value='topBar'>Top Bar</option>
                            <option value='navigation'>Navigation</option>
                            <option value='header'>Header</option>
                            <option value='home'>Home</option>
                            <option value='homePageLeftSidebar'>Home Page Left Sidebar</option>
                            <option value='homePageRightSidebar'>Home Page Right Sidebar</option>

                            <option value='postPageLeftSidebar'>Post Page Left SideBar</option>
                            <option value='postPageRightSidebar'>Post Page Right SideBar</option>

                            <option value='postsPageLeftSidebar'>Posts Page Left SideBar</option>
                            <option value='postsPageRightSidebar'>Posts Page Right SideBar</option>

                            <option value='metaPageLeftSidebar'>Meta Page Left SideBar</option>
                            <option value='metaPageRightSidebar'>Meta Page Right SideBar</option>
                            <option value='underPost'>Under Post</option>

                            <option value='footer'>Footer</option>
                            <option value='deactivate'>Deactivate</option>
                            {(props.customPages || []).map(customPage => {
                                return (
                                    <React.Fragment key={_.uniqueId('id_')}>
                                        <option value={customPage} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage)}</option>
                                        <option value={customPage + 'LeftSidebar'} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</option>
                                        <option value={customPage + 'RightSidebar'} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</option>
                                    </React.Fragment>
                                )
                            })}
                        </select>
                    </div>


                    {/*<TextInputFieldForWidget inputTitle='Widget Index :' name='widgetIndex' type='number' value={widgetData.widgetIndex} classNameValue='widgetIndex'*/}
                    {/*                         placeHolder='Widget Index' onChangeHandler={onChangeHandler}/>*/}


                    <RenderTitleAndRedirectLink
                        widgetData={widgetData}
                        widgetSettings={widgetSettings}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                        onChangeHandlerForBoolean={onChangeHandler}
                        rendering={
                            widgetData.type === 'posts' ||
                            widgetData.type === 'postsSwiper' ||
                            widgetData.type === 'imageSwiper' ||
                            widgetData.type === 'meta' ||
                            widgetData.type === 'alphabeticalNumericalRange' ||
                            widgetData.type === 'text' ||
                            widgetData.type === 'textEditor' ||
                            widgetData.type === 'media' ||
                            widgetData.type === 'recentComments'}
                    />
                    <TextWidgetTypeFields
                        widgetSettings={widgetSettings}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}

                        widgetData={widgetData}
                        onChangeHandler={onChangeHandlerByName}
                        rendering={
                            widgetData.type === 'posts' ||
                            widgetData.type === 'form' ||
                            widgetData.type === 'postsSwiper' ||
                            widgetData.type === 'imageSwiper' ||
                            widgetData.type === 'meta' ||
                            widgetData.type === 'media' ||
                            widgetData.type === 'alphabeticalNumericalRange' ||
                            widgetData.type === 'linkTo' ||
                            widgetData.type === 'multipleLinkTo' ||
                            widgetData.type === 'text' ||
                            widgetData.type === 'recentComments'}
                    />

                    <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text'
                                             value={widgetData.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage'
                                             placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler} rendering={widgetData.type === 'language'}/>

                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' ?
                        <>
                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Sort By:</p>
                                <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                                    <option value='lastModify'>Last Modified</option>
                                    <option value='-lastModify'>Oldest Modified</option>
                                    <option value='_id'>Newest</option>
                                    <option value='-_id'>Oldest</option>
                                    <option value='views'>Views</option>
                                    <option value='likes'>Likes</option>
                                    <option value='random'>Random</option>
                                </select>
                            </div>

                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Post Element Size:</p>
                                <select name='postElementSize' value={widgetData.postElementSize} onChange={e => onChangeHandler(e)}>
                                    <option>select</option>
                                    <option value='list'>List</option>
                                    <option value='smaller'>smaller</option>
                                    <option value='small'>small</option>
                                    <option value='medium'>medium</option>
                                    <option value='large'>large</option>
                                    <option value='larger'>larger</option>
                                </select>
                            </div>
                        </>

                        : null
                    }

                    {widgetData.type === 'meta' ?
                        <>
                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Sort By:</p>
                                <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                                    <option value='_id'>ID</option>
                                    <option value='count'>Count</option>
                                </select>
                            </div>
                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Meta Type:</p>
                                <select name='metaType' value={widgetData.metaType} onChange={e => onChangeHandler(e)}>
                                    <option value=''>Select The Meta Type</option>
                                    <option value='tags'>Tags</option>
                                    <option value='categories'>Categories</option>
                                    <option value='actors'>Actors</option>
                                </select>
                            </div>
                        </>
                        : null
                    }
                    {widgetData.type === 'logo' ?
                        <>
                            <div className='textInputFieldForWidget widgetSection'>
                                <p>Logo Text :</p>
                                <input name='LogoText'
                                       value={
                                           widgetSettings.activeEditingLanguage === 'default' ? widgetData.LogoText :
                                               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.LogoText || ''
                                       }
                                       className='LogoText'
                                       onChange={e => onTextInputsDataChangeHandler(e)}/>
                            </div>
                            <div className='textInputFieldForWidget widgetSection'>
                                <p>Under Logo Headline Text:</p>
                                <input name='headLine'
                                       value={
                                           widgetSettings.activeEditingLanguage === 'default' ? widgetData.headLine :
                                               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.headLine || ''

                                       }
                                       className='headLine'
                                       onChange={e => onTextInputsDataChangeHandler(e)}/>
                            </div>
                        </>
                        : null
                    }
                    {widgetData.type === 'language' ?
                        <>
                            <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text'
                                                     value={widgetData.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage'
                                                     placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler}/>

                            <div className='textInputFieldForWidget widgetSection'>
                                <p>Language To Show Beside Drop Down:</p>
                                <input name='languageToShowBesideDropDown'
                                       value={
                                           widgetSettings.activeEditingLanguage === 'default' ? widgetData.languageToShowBesideDropDown :
                                               widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.languageToShowBesideDropDown || ''
                                       }

                                       onChange={e => onTextInputsDataChangeHandler(e)}/>
                            </div>
                        </>
                        : null
                    }
                    {widgetData.type === 'imageSwiper' ?
                        <ImageSwiperTypeWidgetModelFields imageSwiperData={widgetData.imageSwiperData || []}
                                                          onChangeHandler={onChangeHandler}
                        />
                        : null
                    }


                    <FormTypeWidgetModelFields widgetSettings={widgetSettings} widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler}
                                               mobileNavigation={widgetData.mobileNavigation} rendering={widgetData.type === 'form'}/>
                    <MenuWidgetModelFields widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler} mobileNavigation={widgetData.mobileNavigation}
                                           rendering={widgetData.type === 'menu'}/>
                    <LinkTypeWidgetModelFields
                        widgetSettings={widgetSettings}
                        widgetData={widgetData}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                        onChangeHandler={onChangeHandler}
                        linkToText={widgetData.linkToText}
                        linkToWindowType={widgetData.linkToWindowType}
                        linkTo={widgetData.linkTo}
                        linkToType={widgetData.linkToType}
                        linkToAs={widgetData.linkToAs} rendering={widgetData.type === 'linkTo'}/>


                    <MediaWidgetType
                        rendering={widgetData.type === 'media'}
                        widgetSettings={widgetSettings}
                        onChangeHandler={onChangeHandler}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                        widgetData={widgetData}
                    />


                    <TextInputFieldForWidget
                        inputTitle='Media Url:'
                        name='mediaUrl'
                        value={widgetData.mediaUrl}
                        classNameValue='mediaUrl'
                        type='text'
                        placeHolder='mediaUrl'
                        //widgetSettings={widgetSettings}
                        onChangeHandler={onChangeHandler}
                        rendering={
                            widgetData.type === 'media'}
                    />

                    <TextInputFieldForWidget
                        inputTitle='count :'
                        name='count'
                        type='number'
                        value={widgetData.count}
                        classNameValue='count'
                        placeHolder='count'
                        onChangeHandler={onChangeHandler}
                        rendering={
                            widgetData.type === 'posts' ||
                            widgetData.type === 'postsSwiper' ||
                            widgetData.type === 'meta'
                        }/>


                    <TextEditor
                        state={widgetData}
                        activeEditingLanguage={widgetSettings.activeEditingLanguage}
                        onChangeHandler={onTextEditorChangeHandler}
                        valueData={
                            (languageElement?.current?.value === 'default' || !languageElement?.current?.value) ? widgetData.text :
                                widgetData?.translations?.[languageElement?.current?.value]?.text || ''
                        }
                        rendering={
                            widgetData.type === 'textEditor'
                        }
                    />

                    <TextInputFieldForWidget inputTitle='Selected Meta For Posts:' name='selectedMetaForPosts' type='text' value={widgetData.selectedMetaForPosts}
                                             classNameValue='selectedMetaForPosts' placeHolder='selectedMetaForPosts'
                                             onChangeHandler={onChangeHandler} rendering={widgetData.type === 'posts' || widgetData.type === 'postsSwiper'}/>

                    <TextInputFieldForWidget inputTitle='Logo image URL :' name='LogoUrl' type='text' value={widgetData.LogoUrl} classNameValue='logoUrl'
                                             placeHolder='Logo image URL' onChangeHandler={onChangeHandler} rendering={widgetData.type === 'logo'}/>

                    <SliderWidgetTypeFields
                        rendering={widgetData.type === 'imageSwiper' || widgetData.type === 'postsSwiper'}
                        onChangeHandler={onChangeHandler}
                        widgetData={widgetData}
                    />


                    {widgetData.type === 'searchBar' ? <SearchTypeInputFields widgetData={widgetData} widgetSettings={widgetSettings} onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                                                                              onChangeHandler={onChangeHandler}/> : null}
                    {widgetData.type === 'multipleLinkTo' ? <MultipleLinkWidgetModelFields widgetSettings={widgetSettings} widgetData={widgetData} setWidgetData={setWidgetData}/> : null}


                    <div className='textInputFieldForWidget widgetSection'>
                        <p>Extra ClassName:</p>
                        <input type='text' name='extraClassName' value={widgetData.extraClassName || ''}
                               onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className='textInputFieldForWidget widgetSection'>
                        <p>Extra Id:</p>
                        <input type='text' name='extraId' value={widgetData.extraId || ''}
                               onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button onClick={() => {
                        widgetSettings.preview ? setWidgetSettings({
                            ...widgetSettings,
                            preview: false
                        }) : setWidgetSettings({...widgetSettings, preview: true})
                    }}>Preview the Widget
                    </button>
                    {widgetSettings.preview ? <WidgetPreview widgetData={widgetData} position={widgetData.position} preview={widgetSettings.preview}/> : null}

                    <p>Custom Styles:</p>

                    <MonacoEditorComponent
                        language='scss'
                        nameValue='customStyles'
                        defaultValue={widgetData.customStyles || ''}
                        value={widgetData.customStyles || ''}
                        setWidgetData={setWidgetData}
                        widgetData={widgetData}
                        classNameValue='customStylesTextarea'
                    />


                    {/*<textarea className='customStylesTextarea' name='customStyles'*/}
                    {/*          value={widgetData.customStyles || ''}*/}
                    {/*          onChange={e => onChangeHandler(e)}/>*/}

                    <div className='control-buttons'>
                        <button title="save" onClick={() => onSaveHandler()}><FontAwesomeIcon icon={faSave} style={{width: '15px', height: '15px'}}/></button>
                        <ExportWidget data={{...widgetData}}/>
                        <button title="clone" onClick={() => onCloneHandler()}><FontAwesomeIcon icon={faClone} style={{width: '15px', height: '15px'}}/></button>
                        <button title="delete" onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({...widgetSettings, renderDeleteBtn: false}) : setWidgetSettings({
                            ...widgetSettings,
                            renderDeleteBtn: true
                        })}>
                            <FontAwesomeIcon icon={faTrash} style={{width: '15px', height: '15px'}}/>
                        </button>
                        {widgetSettings.renderDeleteBtn ? <button onClick={() => onDeleteHandler()}>Delete</button> : null}

                    </div>

                </StyledDiv>
            </>

        );
    } else {
        return (
            <WidgetHeaderControl widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} changeWidgetIndex={changeWidgetIndex} onOpenHandler={onOpenHandler}/>
        )
    }

};
export default WidgetModel;


// <option value='categoriesPageLeftSidebar'>Categories Page Left SideBar</option>
// <option value='categoriesPageRightSidebar'>Categories Page Right SideBar</option>
//
// <option value='tagsPagesLeftSidebar'>Tags Page Left SideBar</option>
// <option value='tagsPagesRightSidebar'>Tags Page Right SideBar</option>
//
// <option value='actorsPagesLeftSidebar'>Actors Page Left SideBar</option>
// <option value='actorsPagesRightSidebar'>Actors Page Right SideBar</option>
// <div className='selectInputFieldForWidget widgetSection'>
//     <p>View Type:</p>
//     <select name='viewType' value={widgetData.viewType} onChange={e => onChangeHandler(e)}>
//         <option value='standard'>Standard</option>
//         <option value='small'>Small</option>
//         <option value='list'>List</option>
//     </select>
// </div>