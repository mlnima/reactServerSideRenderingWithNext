import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext'
import {addNewWidget, deleteWidgets, getMultipleWidgetWithData, getPagesData, updateWidgets} from '../../../../_variables/ajaxVariables'
import 'array.prototype.move';
import {DelayInput} from 'react-delay-input'
import RenderTitleAndRedirectLink from "./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink";
import WidgetPreview from "./WidgetPreview/WidgetPreview";
import SelectedMetaIdForPostWidget from "./SelectedMetaIdForPostWidget/SelectedMetaIdForPostWidget";
import TextInputFieldForWidget from "./TextInputFieldForWidget/TextInputFieldForWidget";
import LinkTypeWidgetModelFields from "./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields";
import ImageSwiperTypeWidgetModelFields from "./ImageSwiperTypeWidgetModelFields/ImageSwiperTypeWidgetModelFields";
import PostSwiperTypeWidgetModelFields from "./PostSwiperTypeWidgetModelFields/PostSwiperTypeWidgetModelFields";
import MenuWidgetModelFields from "./MenuWidgetModelFields/MenuWidgetModelFields";
import TextWidgetTypeFields from "./TextWidgetTypeFields/TextWidgetTypeFields";
import MediaWidgetType from "./MediaWidgetType/MediaWidgetType";
import ExportWidget from "./ExportWidget/ExportWidget";
import FormTypeWiddgetModelFields from "./FormTypeWidgetModelFields/FormTypeWidgetModelFields";
import WidgetHeaderControl from "./WidgetHeaderControl/WidgetHeaderControl";
import {convertVariableNameToName} from "../../../../_variables/_variables";

const WidgetModel = props => {
    const contextData = useContext(AppContext);

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        preview: false,
        activeEditingLanguage: 'default'
    })
    const [widgetData, setWidgetData] = useState({
        data: {}
    })

    //duplicate code , getting pages for widget position
    const [customPages, setCustomPages] = useState([])
    //


    // useEffect(() => {
    //     console.log(widgetData)
    // }, [widgetData]);


    useEffect(() => {
        setWidgetData({
            ...widgetData,
            ...props.data,

        })
        //duplicate code , getting pages for widget position
        if (!props.isPost) {
            getPagesData().then(res => {
                if (res.data) {
                    if (res.data.pages) {
                        const pagesNames = res.data.pages.map(page => page.pageName)
                        setCustomPages(pagesNames)
                    }
                }
            })
        }

        //
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
            setWidgetData({
                ...widgetData,
                translations: {
                    ...widgetData.translations,
                    [widgetSettings.activeEditingLanguage]: {
                        ...widgetData.translations[widgetSettings.activeEditingLanguage],
                        [e.target.name]: e.target.value
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
    const languagesOptions = props.translationLanguages.map(lang => {
        return (
            <option key={lang} value={lang}>{lang}</option>
        )
    });
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
        if (props.isPost){
            props.setState({
                ...props.state,
                widgets:props.state.widgets.filter(i=> i.widgetIndex    !== props.widgetIndex)
            })
        }else {
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



    const onSaveHandler = () => {
        const dataToSave = {
            _id: props.widgetId ? props.widgetId : '',
            data: {
                ...widgetData,
                // ...textInputsData,
            }
        }

        dataToSave.data.posts = []
        dataToSave.data.metaData = []

        if (props.isPost) {

        } else {
            console.log(dataToSave)
            updateWidgets(dataToSave).then(() => {
                getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
                    console.log(res.data)
                    contextData.dispatchWidgetsSettings({
                        widgets: [...res.data.widgets]
                    })

                })
            })
        }
    };
    const RenderWidgetCustomStyle = () => {
        return (
            <>
                <p>Extra ClassName for Custom Style:</p>
                <DelayInput name='extraClassName' value={widgetData.extraClassName || ''} delayTimeout={4000}
                            onChange={e => onChangeHandler(e)}/>
                <p>Custom Styles:</p>
                <DelayInput element="textarea" className='customStylesTextarea' name='customStyles'
                            value={widgetData.customStyles || ''} delayTimeout={4000}
                            onChange={e => onChangeHandler(e)}/>
            </>
        )
    };

    const renderCustomPagesPosition = customPages.map(customPage => {
        return (
            <>
                <option value={customPage}>{convertVariableNameToName(customPage)}</option>
                <option value={customPage + 'Sidebar'}>{convertVariableNameToName(customPage) + ' Sidebar'}</option>
            </>
        )
    })


    const RenderOptionByFormat = () => {
        switch (widgetData.type) {
            case 'posts':
                return (
                    <>

                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <TextWidgetTypeFields
                            widgetSettings={widgetSettings}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            //textInputsData={textInputsData}
                            widgetData={widgetData}
                            onChangeHandler={onChangeHandler}
                        />
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        {/*<RenderSelectedMetaForPosts/>*/}
                        <SelectedMetaIdForPostWidget onChangeHandler={onChangeHandler} widgetData={widgetData}/>
                        <p>View Type:</p>
                        <select name='viewType' value={widgetData.viewType} onChange={e => onChangeHandler(e)}>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                        <TextInputFieldForWidget element='input' inputTitle='count :' name='count' type='number' value={widgetData.count} classNameValue='count' placeHolder='count'
                                                 onChangeHandler={onChangeHandler}/>
                    </>
                )
            case 'postsSwiper':
                return (
                    <>
                        <PostSwiperTypeWidgetModelFields
                            onChangeHandler={onChangeHandler}
                            postSwiperAmountMobile={widgetData.postSwiperAmountMobile}
                            postSwiperAmountDesktop={widgetData.postSwiperAmountDesktop}
                            postSwiperSpaceBetweenMobile={widgetData.postSwiperSpaceBetweenMobile}
                            postSwiperSpaceBetweenDesktop={widgetData.postSwiperSpaceBetweenDesktop}
                        />
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <TextWidgetTypeFields
                            widgetSettings={widgetSettings}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            //textInputsData={textInputsData}
                            widgetData={widgetData}
                            onChangeHandler={onChangeHandler}
                        />
                        <p>Sort By:</p>
                        <select name='sortBy' value={widgetData.sortBy} onChange={e => onChangeHandler(e)}>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        {/*<RenderSelectedMetaForPosts/>*/}
                        <SelectedMetaIdForPostWidget onChangeHandler={onChangeHandler} widgetData={widgetData}/>
                        <p>View Type:</p>
                        <select name='viewType' value={widgetData.viewType} onChange={e => onChangeHandler(e)}>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                        <TextInputFieldForWidget element='input' inputTitle='count :' name='count' type='number' value={widgetData.count} classNameValue='count' placeHolder='count'
                                                 onChangeHandler={onChangeHandler}/>
                    </>
                )
            case 'media':
                return (

                    <MediaWidgetType
                        widgetSettings={widgetSettings}
                        onChangeHandler={onChangeHandler}
                        onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                        widgetData={widgetData}
                    />

                )
            case 'meta':
                return (
                    <>
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <TextWidgetTypeFields
                            widgetSettings={widgetSettings}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            //textInputsData={textInputsData}
                            widgetData={widgetData}
                            onChangeHandler={onChangeHandler}
                        />
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
                        <TextInputFieldForWidget element='input' inputTitle='Meta background Color :' name='metaBackgroundColor' type='text' value={widgetData.metaBackgroundColor}
                                                 classNameValue='metaBackgroundColor' placeHolder='Meta background Color' onChangeHandler={onChangeHandler}/>
                        <TextInputFieldForWidget element='input' inputTitle='Meta Text Color :' name='metaTextColor' type='text' value={widgetData.metaTextColor} classNameValue='metaTextColor'
                                                 placeHolder='Meta Text Color' onChangeHandler={onChangeHandler}/>
                        <TextInputFieldForWidget element='input' inputTitle='Count :' name='count' type='number' value={widgetData.count} classNameValue='count' placeHolder='count'
                                                 onChangeHandler={onChangeHandler}/>
                    </>
                )
            case 'searchBar':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Search Button Background Color :' name='searchBtnBackgroundColor' type='text'
                                                 value={widgetData.searchBtnBackgroundColor || '#222222'} classNameValue='searchBtnBackgroundColor' placeHolder='Search Button Background Color'
                                                 onChangeHandler={onChangeHandler}/>
                        <TextInputFieldForWidget element='input' inputTitle='Search Button Color :' name='searchBtnColor' type='text' value={widgetData.searchBtnColor || 'white'}
                                                 classNameValue='searchBtnColor' placeHolder='Search Button Color' onChangeHandler={onChangeHandler}/>

                    </>
                )
            case 'logo':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Logo image URL :' name='LogoUrl' type='text' value={widgetData.LogoUrl} classNameValue='logoUrl'
                                                 placeHolder='Logo image URL' onChangeHandler={onChangeHandler}/>
                        <p>Logo Text</p>
                        <DelayInput name='LogoText' value={
                            widgetSettings.activeEditingLanguage === 'default' ? widgetData.LogoText :
                                widgetData.translations ?
                                    widgetData.translations[widgetSettings.activeEditingLanguage] ?
                                        widgetData.translations[widgetSettings.activeEditingLanguage].LogoText || '' :
                                        '' : ''
                        } className='LogoText'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>

                        <div className='color-section-widget'>
                            <TextInputFieldForWidget element='input' inputTitle='Logo Text Color :' name='logoTextColor' type='text' value={widgetData.logoTextColor}
                                                     classNameValue='logoTextColor' placeHolder='Logo Text Color' onChangeHandler={onChangeHandler}/>
                            <TextInputFieldForWidget element='input' inputTitle='Logo Text Font Size :' name='logoTextFontSize' type='number' value={widgetData.logoTextFontSize}
                                                     classNameValue='logoTextFontSize' placeHolder='Logo Text Font Size' onChangeHandler={onChangeHandler}/>
                        </div>
                        <p>Under Logo Headline Text</p>
                        <DelayInput name='headLine' value={
                            widgetSettings.activeEditingLanguage === 'default' ? widgetData.headLine :
                                widgetData.translations ?
                                    widgetData.translations[widgetSettings.activeEditingLanguage] ?
                                        widgetData.translations[widgetSettings.activeEditingLanguage].headLine || '' :
                                        '' : ''
                        } className='headLine'
                                    delayTimeout={2000} onChange={e => onTextInputsDataChangeHandler(e)}/>
                        <div className='color-section-widget'>
                            <TextInputFieldForWidget element='input' inputTitle='Head Line Color :' name='logoHeadLineColor' type='text' value={widgetData.logoHeadLineColor}
                                                     classNameValue='logoHeadLineColor' placeHolder='Head Line Color' onChangeHandler={onChangeHandler}/>
                            <TextInputFieldForWidget element='input' inputTitle='Head Line Font Size :' name='logoHeadLineFontSize' type='number' value={widgetData.logoHeadLineFontSize}
                                                     classNameValue='logoHeadLineFontSize' placeHolder='Head Line Font Size' onChangeHandler={onChangeHandler}/>
                            <TextInputFieldForWidget element='input' inputTitle='Head Line Font Weight:' name='logoHeadLineFontWeight' value={widgetData.logoHeadLineFontWeight}
                                                     classNameValue='logoHeadLineFontWeight' placeHolder='Head Line Font Weight' onChangeHandler={onChangeHandler}/>
                        </div>
                    </>
                )
            case 'alphabeticalNumericalRange':
                return (
                    <>
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                    </>
                )
            case 'text':
                return (
                    <>
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <TextWidgetTypeFields
                            widgetSettings={widgetSettings}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            widgetData={widgetData}
                            onChangeHandler={onChangeHandler}
                        />

                    </>
                )
            case 'textMedia':
                return (
                    <>
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        <TextWidgetTypeFields
                            widgetSettings={widgetSettings}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            widgetData={widgetData}
                            onChangeHandler={onChangeHandler}
                        />
                        <MediaWidgetType
                            // textInputsData={textInputsData}
                            widgetSettings={widgetSettings}
                            onChangeHandler={onChangeHandler}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            widgetData={widgetData}
                        />
                    </>
                )
            case 'linkTo':
                return (
                    <>
                        <LinkTypeWidgetModelFields
                            widgetSettings={widgetSettings}
                            // textInputsData={textInputsData}
                            widgetData={widgetData}
                            onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                            onChangeHandler={onChangeHandler}
                            linkToText={widgetData.linkToText}
                            linkToWindowType={widgetData.linkToWindowType}
                            linkTo={widgetData.linkTo}
                            linkToType={widgetData.linkToType}
                            linkToAs={widgetData.linkToAs}/>
                    </>
                )
            case 'language':
                return (
                    <>
                        <TextInputFieldForWidget element='input' inputTitle='Language Text As Default Language :' name='languageTextAsDefaultLanguage' type='text'
                                                 value={widgetData.languageTextAsDefaultLanguage || 'default'} classNameValue='languageTextAsDefaultLanguage'
                                                 placeHolder='Language Text As Default Language' onChangeHandler={onChangeHandler}/>

                        <p>Language To Show Beside Drop Down:</p>
                        <DelayInput name='languageToShowBesideDropDown' value={
                            widgetSettings.activeEditingLanguage === 'default' ? widgetData.languageToShowBesideDropDown :
                                widgetData.translations ?
                                    widgetData.translations[widgetSettings.activeEditingLanguage] ?
                                        widgetData.translations[widgetSettings.activeEditingLanguage].languageToShowBesideDropDown || '' :
                                        '' : ''
                        } delayTimeout={2000}
                                    onChange={e => onTextInputsDataChangeHandler(e)}/>
                    </>
                )
            case 'recentComments':
                return (
                    <>
                        <RenderTitleAndRedirectLink widgetData={widgetData} widgetSettings={widgetSettings}
                                                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>                    </>
                )
            case 'imageSwiper':
                return (
                    <>
                        <ImageSwiperTypeWidgetModelFields imageSwiperData={widgetData.imageSwiperData || []}
                                                          imageSwiperAmountMobile={widgetData.imageSwiperAmountMobile}
                                                          imageSwiperAmountDesktop={widgetData.imageSwiperAmountDesktop}
                                                          imageSwiperSpaceBetweenMobile={widgetData.imageSwiperSpaceBetweenMobile}
                                                          imageSwiperSpaceBetweenDesktop={widgetData.imageSwiperSpaceBetweenDesktop}
                                                          onChangeHandler={onChangeHandler}
                        />
                    </>
                )
            case 'menu':
                return (
                    <>
                        <MenuWidgetModelFields widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler} mobileNavigation={widgetData.mobileNavigation}/>
                    </>
                )
            case 'form':
                return (
                    <>
                        <FormTypeWiddgetModelFields widgetSettings={widgetSettings} widgetData={widgetData} setWidgetData={setWidgetData} onChangeHandler={onChangeHandler}
                                                    mobileNavigation={widgetData.mobileNavigation}/>
                    </>
                )
            default:
                return null

        }
    };
    const changeWidgetIndex = (more) => {

        const valueToSet = more ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1
        const dataToSave = {
            ...widgetData,
            _id: props.widgetId ? props.widgetId : '',
            data: {
                ...widgetData,
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
    };

    if (widgetSettings.open) {
        return (
            <>
                <WidgetHeaderControl widgetSettings={widgetSettings} widgetData={widgetData} changeWidgetIndex={changeWidgetIndex} onOpenHandler={onOpenHandler}/>
                <div className='widgetModel'>
                    <div className='widgetInfo'>
                        <label className='widgetId'><p>ID :</p> <p>{props.data._id}</p></label>
                    </div>
                    <TextInputFieldForWidget element='input' inputTitle='Name:' name='name' type='text' value={widgetData.name} classNameValue='name' placeHolder='name'
                                             onChangeHandler={onChangeHandler}/>
                    <p>Translations:</p>
                    <select name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)}>
                        <option value='default'>Default</option>
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
                        <option value='text'>Text</option>
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

                    <TextInputFieldForWidget element='input' inputTitle='Widget Index :' name='widgetIndex' type='number' value={widgetData.widgetIndex} classNameValue='widgetIndex'
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


                    <RenderOptionByFormat/>
                    <button onClick={() => {
                        widgetSettings.preview ? setWidgetSettings({
                            ...widgetSettings,
                            preview: false
                        }) : setWidgetSettings({...widgetSettings, preview: true})
                    }}>Preview the Widget
                    </button>

                    <WidgetPreview widgetData={widgetData} position={widgetData.position} preview={widgetSettings.preview}/>
                    <RenderWidgetCustomStyle/>
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
