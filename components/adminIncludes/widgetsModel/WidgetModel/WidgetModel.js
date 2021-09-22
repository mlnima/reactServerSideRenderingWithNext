import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext';
import dynamic from 'next/dynamic'
import {addNewWidget, deleteWidgets, getMultipleWidgetWithData, getPagesData, updateWidgets} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from "../../../../_variables/_variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {languagesOptions} from "../../../../_variables/_variables";
import {faDollarSign, faEuroSign, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faClone, faSave} from "@fortawesome/free-regular-svg-icons";
import MonacoEditorComponent from "../../MonacoEditorComponent/MonacoEditorComponent";

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
import WidgetModelStyles from "./WidgetModelStyles";
import LogoTypeWidgetModelFields from "./LogoTypeWidgetModelFields/LogoTypeWidgetModelFields";

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
    const [positions,setPositions] = useState([
        'topBar',
        'header',
        'navigation',

        'home',
        'homePageLeftSidebar',
        'homePageRightSidebar',

        'postPageTop',
        'postPageLeftSidebar',
        'postPageBottom',
        'postPageRightSidebar',

        'underPost',

        'postsPageTop',
        'postsPageLeftSidebar',
        'postsPageBottom',
        'postsPageRightSidebar',

        'profilePageTop',
        'profilePageLeftSidebar',
        'profilePageBottom',
        'profilePageRightSidebar',

        'tagsPageTop',
        'tagsPageLeftSidebar',
        'tagsPageBottom',
        'tagsPageRightSidebar',

        'categoriesPageTop',
        'categoriesPageLeftSidebar',
        'categoriesPageBottom',
        'categoriesPageRightSidebar',

        'actorsPageTop',
        'actorsPageLeftSidebar',
        'actorsPageBottom',
        'actorsPageRightSidebar',

        'tagPageTop',
        'tagPageLeftSidebar',
        'tagPageBottom',
        'tagPageRightSidebar',

        'categoryPageTop',
        'categoryLeftSidebar',
        'categoryBottom',
        'categoryRightSidebar',

        'actorPageTop',
        'actorPageLeftSidebar',
        'actorPageBottom',
        'actorPageRightSidebar',

        'footer',

    ])
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

        const isChecked = e.target.checked
        const value = e.target.value
        setWidgetData({
            ...widgetData,
            [e.target.name]: value === 'true' ? true : value === 'false' ? false : value
        })
    };

    const onCheckboxChangeHandler = e => {
        setWidgetData({
            ...widgetData,
            [e.target.name]: e.target.checked
        })
    }

    const onChangeHandlerByName = (name, value) => {
        setWidgetData({
            ...widgetData,
            [name]: value
        })
    };

    const onOpenHandler = () => {
        widgetSettings.open ? setWidgetSettings({
            ...widgetSettings,
            open: false
        }) : setWidgetSettings({...widgetSettings, open: true})
    };
    const onLockHandler = () => {
        const dataToSave = {
            _id: props.widgetId,
            data: {
                ...widgetData,
                stayOpen: !widgetData.stayOpen,
                posts: [],
                metaData: []
            }
        }
        updateWidgets(dataToSave).then(() => {
            // setTimeout(() => {
            //
            // }, 0)
            props.getAndSetWidgetsData()
        })
    };

    const onCloneHandler = () => {
        addNewWidget({
            data: {
                ...widgetData,
                //  ...textInputsData
            }
        }).then(() => {
            getMultipleWidgetWithData({widgets: ['all']},  false).then(res => {
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
                getMultipleWidgetWithData({widgets: ['all']}, false).then(res => {
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
                    widgetIndex: valueToSet,
                    posts: [],
                    metaData: []
                }
            }
            updateWidgets(dataToSave).then(() => {
                // setTimeout(() => {
                //
                // }, 0)
                props.getAndSetWidgetsData()
            })
        }
    };

    const onSaveHandler = () => {
        const dataToSave = {
            _id: props.widgetId ? props.widgetId : '',
            data: {
                ...widgetData,
                posts: [],
                metaData: []
            }
        }
        updateWidgets(dataToSave).then(() => {
            props.getAndSetWidgetsData()
        })
    };




    const renderWidgetPositions = positions.map(position=>{
        return(
            <option key={_.uniqueId('position_')} value={position}>{convertVariableNameToName(position)}</option>
        )
    })




    if (widgetSettings.open || widgetData.stayOpen) {
        return (

            <div className='widget-model-open'>
                <WidgetModelStyles/>
                <WidgetHeaderControl setKey={false} widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} onLockHandler={onLockHandler}
                                     changeWidgetIndex={changeWidgetIndex}
                                     onOpenHandler={onOpenHandler}/>
                <div className='widgetModel'>

                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Edit Mode:</p>
                        <input type='checkbox' name='editMode' checked={widgetData.editMode} onChange={e => onCheckboxChangeHandler(e)}/>
                    </div>
                    <div className='widgetInfo widgetSection'>
                        <p className='widget-info-id'>ID :</p>
                        <p>{props.widgetId || props.state?.widgetId || 'XXX'}</p>
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
                            <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?? 'default'}</option>
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
                            <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL}</option>
                            {languagesOptions}
                        </select>
                    </div>

                    <div className='selectInputFieldForWidget widgetSection'>
                        <p>Position:</p>
                        <select name='position' value={widgetData.position} onChange={e => onChangeHandler(e)}>
                            {renderWidgetPositions}
                            {(props.customPages || []).map(customPage => {
                                return (
                                    <React.Fragment key={_.uniqueId('id_')}>
                                        <option value={customPage} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage)}</option>
                                        <option value={customPage + 'LeftSidebar'} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</option>
                                        <option value={customPage + 'RightSidebar'} key={_.uniqueId('id_')}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</option>
                                    </React.Fragment>
                                )
                            })}
                            <option value='deactivate'>Deactivate</option>
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
                            widgetData.type === 'metaWithImage' ||
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
                            widgetData.type === 'metaWithImage' ||
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

                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper'|| widgetData.type === 'metaWithImage' ?
                        <>
                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Sort By:</p>
                                <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                                    <option >select</option>
                                    <option value='updatedAt'>Updated At</option>
                                    <option value='createdAt'>Created At</option>
                                    <option value='views'>Views</option>
                                    <option value='likes'>Likes</option>
                                    <option value='random'>Random</option>
                                </select>
                            </div>

                            <div className='selectInputFieldForWidget widgetSection'>
                                <p>Post Type:</p>
                                <select name='postType' value={widgetData.postType} onChange={e => onChangeHandler(e)}>
                                    <option >select</option>
                                    <option value='standard'>Standard</option>
                                    <option value='video'>Video</option>
                                    <option value='product'>Product</option>
                                    <option value='food'>Food</option>
                                    <option value='article'>Article</option>
                                    <option value='promotion'>Promotion</option>
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

                    {widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ?
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
                        <LogoTypeWidgetModelFields widgetSettings={widgetSettings} onChangeHandler={onChangeHandler}   widgetData={widgetData} onTextInputsDataChangeHandler={onTextInputsDataChangeHandler} />: null
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
                    <MenuWidgetModelFields widgetData={widgetData}
                                           setWidgetData={setWidgetData}
                                           onChangeHandler={onChangeHandler}
                                           mobileNavigation={widgetData.mobileNavigation}
                                           rendering={widgetData.type === 'menu'}
                                           widgetSettings={widgetSettings}

                    />
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
                            widgetData.type === 'metaWithImage' ||
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

                    {/*<TextInputFieldForWidget inputTitle='Logo image URL :' name='LogoUrl' type='text' value={widgetData.LogoUrl} classNameValue='logoUrl'*/}
                    {/*                         placeHolder='Logo image URL' onChangeHandler={onChangeHandler} rendering={widgetData.type === 'logo'}/>*/}

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

                </div>
            </div>

        );
    } else {
        return (
            <WidgetHeaderControl widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} onLockHandler={onLockHandler} changeWidgetIndex={changeWidgetIndex}
                                 onOpenHandler={onOpenHandler}/>
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

// <option value='topBar'>Top Bar</option>
// <option value='navigation'>Navigation</option>
// <option value='header'>Header</option>
// <option value='home'>Home</option>
// <option value='homePageLeftSidebar'>Home Page Left Sidebar</option>
// <option value='homePageRightSidebar'>Home Page Right Sidebar</option>
//
// <option value='postPageLeftSidebar'>Post Page Left SideBar</option>
// <option value='postPageRightSidebar'>Post Page Right SideBar</option>
//
// <option value='postsPageLeftSidebar'>Posts Page Left SideBar</option>
// <option value='postsPageRightSidebar'>Posts Page Right SideBar</option>
//
// <option value='metaPageLeftSidebar'>Meta Page Left SideBar</option>
// <option value='metaPageRightSidebar'>Meta Page Right SideBar</option>
// <option value='underPost'>Under Post</option>
//
// <option value='footer'>Footer</option>