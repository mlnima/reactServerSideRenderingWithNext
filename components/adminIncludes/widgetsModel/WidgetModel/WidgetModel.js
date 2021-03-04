import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext';
import dynamic from 'next/dynamic'
import {addNewWidget, deleteWidgets, getMultipleWidgetWithData, getPagesData, updateWidgets} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from "../../../../_variables/_variables";
// import 'array.prototype.move';
import {DelayInput} from 'react-delay-input'
import {languagesOptions} from "../../../../_variables/_variables";

const SliderWidgetTypeFields = dynamic(() => import('./SliderWidgetTypeFields/SliderWidgetTypeFields'));
const RenderTitleAndRedirectLink = dynamic(() => import('./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'));
const WidgetPreview = dynamic(() => import('./WidgetPreview/WidgetPreview'))
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), { ssr: false })
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'))
const ImageSwiperTypeWidgetModelFields = dynamic(() => import('./ImageSwiperTypeWidgetModelFields/ImageSwiperTypeWidgetModelFields'))
const PostSwiperTypeWidgetModelFields = dynamic(() => import('./PostSwiperTypeWidgetModelFields/PostSwiperTypeWidgetModelFields'))
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'))
const TextWidgetTypeFields = dynamic(() => import('./TextWidgetTypeFields/TextWidgetTypeFields'))
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'))
const ExportWidget = dynamic(() => import('./ExportWidget/ExportWidget'))
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'))
const WidgetHeaderControl = dynamic(() => import('./WidgetHeaderControl/WidgetHeaderControl'))
const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'), { ssr: false })


const WidgetModel = props => {
    const contextData = useContext(AppContext);
    const languageElement = useRef(null)
    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        preview: false,
        activeEditingLanguage: 'default'
    })
    const [widgetData, setWidgetData] = useState({
        translations: {},
    })


    const [customPages, setCustomPages] = useState([])


    // useEffect(() => {
    //     console.log(props)
    // }, [props]);


    useEffect(() => {

        if (!props.isPost) {
            setWidgetData({
                ...widgetData,
                ...props.data,
            })
        }

    }, [props]);

    // useEffect(() => {
    //     console.log(props)
    // }, [props]);

    const onChangeLanguageHandler = e => {
        setWidgetSettings({
            ...widgetSettings,
            activeEditingLanguage: e.target.value
        })
    }
    const onTextInputsDataChangeHandler = (e) => {
        //    let langObject = widgetData.translations[widgetSettings.activeEditingLanguage] ? widgetData.translations[widgetSettings.activeEditingLanguage] : {}
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


            console.log(currentData)

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
        console.log(value)
        if (languageElement?.current?.value === 'default') {
            setWidgetData({
                ...widgetData,
                text: value
            })

        } else {
            setWidgetData({
                ...widgetData,
                translations: {
                    ...(widgetData?.translations||{}),
                    [languageElement?.current?.value]: {
                        ...(widgetData?.translations?.[languageElement?.current?.value]||{}),
                        text: value
                    }
                }
            })
        }
    }
    const onChangeHandler = e => {
        setWidgetData({
            ...widgetData,
            [e.target.name]: e.target.value
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

    const changeWidgetIndex = (more) => {

        const valueToSet = more ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1

        if (props.isPost) {
            const findIndexOfTheWidget = props.state.widgets.findIndex(w => {
                return ((w.widgetIndex === props.data.widgetIndex) && (w.type === props.data.type) && (w.widgetId === props.data.widgetId))
            })
            // console.log({...widgetData,widgetIndex:valueToSet})
            const updatedWidget = {...widgetData, widgetIndex: valueToSet}
            // const updatedWidgets = [
            //     ...props.state.widgets.slice(0, findIndexOfTheWidget),
            //     updatedWidget,
            //     ...props.state.widgets.slice(findIndexOfTheWidget + 1),
            // ];

            // const newWidgetsData = props.state.widgets.map(w=>{
            //     if (w.widgetId ===props.data.widgetId ){
            //         return {...widgetData,widgetIndex:valueToSet}
            //     }else {
            //         return w
            //     }
            // })
            //console.log(newWidgetsData)
            let widgets = props.state.widgets
            widgets[findIndexOfTheWidget] = updatedWidget
            // console.log(widgets)
            // props.setState( currentState=>({
            //     ...props.state,
            //     widgets:widgets
            // }))
        } else {
            const dataToSave = {
                _id: props.widgetId ? props.widgetId : '',
                data: {
                    ...widgetData,
                    widgetIndex: valueToSet
                }
            }
            console.log(valueToSet, dataToSave)
            updateWidgets(dataToSave).then(() => {
                props.getAndSetWidgetsData()
                // getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                //     // console.log(res.data)
                //     contextData.dispatchWidgetsSettings({
                //         widgets: [...res.data.widgets]
                //     })
                // })
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
            // console.log(dataToSave)
            updateWidgets(dataToSave).then(() => {
                props.getAndSetWidgetsData()
                // getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                //     // console.log(res.data)
                //     contextData.dispatchWidgetsSettings({
                //         widgets: [...res.data.widgets]
                //     })
                //
                // })
            })
        }
    };


    const renderCustomPagesPosition = props.customPages.map(customPage => {
        return (
            <>
                <option value={customPage} key={customPage + '1'}>{convertVariableNameToName(customPage)}</option>
                <option value={customPage + 'Sidebar'} key={customPage + '2'}>{convertVariableNameToName(customPage) + ' Sidebar'}</option>
            </>
        )
    })


    const RenderOptionByFormat = () => {
        switch (widgetData.type) {
            case 'posts':
                return (
                    <>
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                            <option value='random'>Random</option>
                        </select>
                        <p>View Type:</p>
                        <select name='viewType' value={widgetData.viewType} onChange={e => onChangeHandler(e)}>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>

                    </>
                )
            case 'postsSwiper':
                return (
                    <>
                        {/*<PostSwiperTypeWidgetModelFields*/}
                        {/*    onChangeHandler={onChangeHandler}*/}
                        {/*    postSwiperAmountMobile={widgetData.postSwiperAmountMobile}*/}
                        {/*    postSwiperAmountDesktop={widgetData.postSwiperAmountDesktop}*/}
                        {/*    postSwiperSpaceBetweenMobile={widgetData.postSwiperSpaceBetweenMobile}*/}
                        {/*    postSwiperSpaceBetweenDesktop={widgetData.postSwiperSpaceBetweenDesktop}*/}
                        {/*    rendering={true}*/}
                        {/*/>*/}


                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        <p>View Type:</p>
                        <select name='viewType' value={widgetData.viewType} onChange={e => onChangeHandler(e)}>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                    </>
                )

            case 'meta':
                return (
                    <>
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>ID</option>
                            <option value='count'>Count</option>
                        </select>
                        <p>Meta Type:</p>
                        <select name='metaType' value={widgetData.metaType} onChange={e => onChangeHandler(e)}>
                            <option value=''>Select The Meta Type</option>
                            <option value='tags'>Tags</option>
                            <option value='categories'>Categories</option>
                            <option value='actors'>Actors</option>
                        </select>
                    </>
                )
            case 'logo':
                return (
                    <>
                        <p>Logo Text</p>
                        <DelayInput name='LogoText'
                                    value={
                                        widgetSettings.activeEditingLanguage === 'default' ? widgetData.LogoText :
                                            widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.LogoText || ''
                                    }
                                    className='LogoText'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>

                        <p>Under Logo Headline Text</p>
                        <DelayInput name='headLine'
                                    value={
                                        widgetSettings.activeEditingLanguage === 'default' ? widgetData.headLine :
                                            widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.headLine || ''

                                    }
                                    className='headLine'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>
                    </>
                )

            case 'textMedia':
                return (
                    <>
                        <MediaWidgetType
                            widgetSettings={widgetSettings}
                            onChangeHandler={onChangeHandler}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            widgetData={widgetData}
                        />
                    </>
                )
            case 'language':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text'
                                                 value={widgetData.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage'
                                                 placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler}/>

                        <p>Language To Show Beside Drop Down:</p>
                        <DelayInput name='languageToShowBesideDropDown'
                                    value={
                                        widgetSettings.activeEditingLanguage === 'default' ? widgetData.languageToShowBesideDropDown :
                                            widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.languageToShowBesideDropDown || ''
                                    }
                                    delayTimeout={2000}
                                    onChange={e => onTextInputsDataChangeHandler(e)}/>
                    </>
                )

            case 'imageSwiper':
                return (
                    <>
                        <ImageSwiperTypeWidgetModelFields imageSwiperData={widgetData.imageSwiperData || []}
                                                          onChangeHandler={onChangeHandler}
                        />
                    </>
                )
            // case 'form':
            //     return (
            //         <>
            //             <FormTypeWidgetModelFields widgetSettings={widgetSettings} widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler}
            //                                        mobileNavigation={widgetData.mobileNavigation}/>
            //         </>
            //     )
            default:
                return null

        }
    };


    if (widgetSettings.open) {
        return (
            <>
                <WidgetHeaderControl widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} changeWidgetIndex={changeWidgetIndex} onOpenHandler={onOpenHandler}/>
                <div className='widgetModel'>
                    <div className='widgetInfo'>
                        <label className='widgetId'><p>ID :</p> <p>{props.widgetId || props.state.widgetId || 'XXX'}</p></label>
                    </div>
                    <TextInputFieldForWidget inputTitle='Name:' name='name' type='text' value={widgetData.name} classNameValue='name' placeHolder='name'
                                             onChangeHandler={onChangeHandler}
                                             rendering={true}
                    />
                    <p>Translations:</p>
                    <select ref={languageElement} name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                        <option value='default'>{process.env.REACT_APP_DEFAULT_LOCAL ?? ''}</option>
                        {languagesOptions}
                    </select>
                    <p>Device Type To Render:</p>
                    <select name='deviceTypeToRender' value={widgetData.deviceTypeToRender} onChange={e => onChangeHandler(e)}>
                        <option value='all'>All</option>
                        <option value='mobile'>Mobile</option>
                        <option value='desktop'>Desktop ( >= 768px)</option>
                    </select>
                    <p>Language To Render:</p>
                    <select name='languageToRender' value={widgetData.languageToRender} onChange={e => onChangeHandler(e)}>
                        <option value='all'>All</option>
                        <option value='default'>Default</option>
                        {languagesOptions}
                    </select>
                    <p>Type:</p>
                    <select name='type' value={widgetData.type} onChange={e => onChangeHandler(e)}>
                        <option value='posts'>Posts</option>
                        <option value='menu'>Menu</option>
                        <option value='media'>Media</option>
                        <option value='linkTo'>Media</option>
                        <option value='text'>Text</option>
                        <option value='textEditor'>Text Editor</option>
                        <option value='logo'>Logo</option>
                        <option value='shoppingCart'>basket</option>
                        <option value='recentComments'>Recent Comments</option>
                        <option value='searchBar'>Search</option>
                        <option value='meta'>Meta</option>
                        <option value='video'>Video</option>
                        <option value='navigationMenu'>Navigation Menu</option>
                        <option value='alphabeticalNumericalRange'>Alphabetical Numerical Range</option>
                        <option value='language'>Language</option>
                        <option value='authentication'>Authentication</option>
                        <option value='imageSwiper'>Image Swiper</option>
                        <option value='postsSwiper'>Posts Swiper</option>
                    </select>

                    <TextInputFieldForWidget inputTitle='Widget Index :' name='widgetIndex' type='number' value={widgetData.widgetIndex} classNameValue='widgetIndex'
                                             placeHolder='Widget Index' onChangeHandler={onChangeHandler}/>

                    <p>Position:</p>
                    <select name='position' value={widgetData.position} onChange={e => onChangeHandler(e)}>
                        <option value='topBar'>Top Bar</option>
                        <option value='navigation'>Navigation</option>
                        <option value='header'>Header</option>
                        <option value='home'>Home</option>
                        <option value='homePageSidebar'>Home Page Sidebar</option>
                        <option value='postPageSidebar'>Post Page SideBar</option>
                        <option value='postsPageSidebar'>Posts Page SideBar</option>
                        <option value='categoriesPageSidebar'>Categories Page SideBar</option>
                        <option value='tagsPagesSidebar'>Tags Page SideBar</option>
                        <option value='actorsPagesSidebar'>Actors Page SideBar</option>
                        <option value='footer'>Footer</option>
                        <option value='deactivate'>Deactivate</option>
                        {renderCustomPagesPosition}
                    </select>

                    <RenderTitleAndRedirectLink
                        widgetData={widgetData}
                        widgetSettings={widgetSettings}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
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
                        onChangeHandler={onChangeHandler}
                        rendering={
                            widgetData.type === 'posts' ||
                            widgetData.type === 'postsSwiper' ||
                            widgetData.type === 'imageSwiper' ||
                            widgetData.type === 'meta' ||
                            widgetData.type === 'media' ||
                            widgetData.type === 'alphabeticalNumericalRange' ||
                            widgetData.type === 'text' ||
                            widgetData.type === 'recentComments'}
                    />
                    <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text'
                                             value={widgetData.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage'
                                             placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler} rendering={widgetData.type === 'language'}/>
                    <RenderOptionByFormat/>
                    <FormTypeWidgetModelFields widgetSettings={widgetSettings} widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler}
                                               mobileNavigation={widgetData.mobileNavigation} rendering={widgetData.type === 'form'}/>
                    <MenuWidgetModelFields widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler} mobileNavigation={widgetData.mobileNavigation} rendering={widgetData.type === 'menu'}/>
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
                           ( languageElement?.current?.value === 'default' || !languageElement?.current?.value ) ? widgetData.text :
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
                        rendering={widgetData.type === 'imageSwiper'||widgetData.type === 'postsSwiper'}
                        onChangeHandler={onChangeHandler}
                        widgetData={widgetData}
                    />

                    <button onClick={() => {
                        widgetSettings.preview ? setWidgetSettings({
                            ...widgetSettings,
                            preview: false
                        }) : setWidgetSettings({...widgetSettings, preview: true})
                    }}>Preview the Widget
                    </button>

                    <WidgetPreview widgetData={widgetData} position={widgetData.position} preview={widgetSettings.preview}/>
                    <p>Extra ClassName:</p>
                    <input type='text' name='extraClassName' value={widgetData.extraClassName || ''}
                           onChange={e => onChangeHandler(e)}/>
                    <p>Extra Id:</p>
                    <input type='text' name='extraId' value={widgetData.extraId || ''}
                           onChange={e => onChangeHandler(e)}/>
                    <p>Custom Styles:</p>
                    <textarea className='customStylesTextarea' name='customStyles'
                              value={widgetData.customStyles || ''}
                              onChange={e => onChangeHandler(e)}/>
                    <div className=' '>
                        <button onClick={() => onSaveHandler()}>Save</button>
                        <ExportWidget data={{...widgetData}}/>
                        <button onClick={() => onCloneHandler()}>Clone</button>
                        <button onClick={() => onDeleteHandler()}>Delete</button>
                    </div>

                </div>
            </>
        );
    } else {
        return (
            <WidgetHeaderControl widgetSettings={widgetSettings} widgetId={props.widgetId} widgetData={widgetData} changeWidgetIndex={changeWidgetIndex} onOpenHandler={onOpenHandler}/>
        )
    }

};
export default WidgetModel;
