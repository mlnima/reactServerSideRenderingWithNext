import React, {useEffect, useState, useRef} from 'react';
import dynamic from 'next/dynamic'
import {convertVariableNameToName} from "../../../../_variables/_variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {languagesOptions} from "../../../../_variables/_variables";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faClone, faSave} from "@fortawesome/free-regular-svg-icons";
import MonacoEditorComponent from "../../MonacoEditorComponent/MonacoEditorComponent";
import SearchTypeInputFields from "./SearchTypeInputFields/SearchTypeInputFields";
import MultipleLinkWidgetModelFields from "./MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields";
import _ from "lodash";
import LogoTypeWidgetModelFields from "./LogoTypeWidgetModelFields/LogoTypeWidgetModelFields";
import {useDispatch, useSelector} from "react-redux";
import {adminAddNewWidget,adminDeleteWidget,adminUpdateWidget} from "../../../../store/adminActions/adminWidgetsActions";
import staticPositions from '../staticPositions';
import postTypes from "../../../global/postTypes";
import styled from "styled-components";
import SelectFieldForWidget from "./SelectFieldForWidget/SelectFieldForWidget";

const SliderWidgetTypeFields = dynamic(() => import('./SliderWidgetTypeFields/SliderWidgetTypeFields'));
const RenderTitleAndRedirectLink = dynamic(() => import('./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'));
const WidgetPreview = dynamic(() => import('./WidgetPreview/WidgetPreview'));
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), {ssr: false});
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'));
const ImageSwiperTypeWidgetModelFields = dynamic(() => import('./ImageSwiperTypeWidgetModelFields/ImageSwiperTypeWidgetModelFields'));
const PostSwiperTypeWidgetModelFields = dynamic(() => import('./PostSwiperTypeWidgetModelFields/PostSwiperTypeWidgetModelFields'));
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'));
const TextWidgetTypeFields = dynamic(() => import('./TextWidgetTypeFields/TextWidgetTypeFields'));
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'));
const ExportWidget = dynamic(() => import('./ExportWidget/ExportWidget'));
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'));
const WidgetHeaderControl = dynamic(() => import('./WidgetHeaderControl/WidgetHeaderControl'));
const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'), {ssr: false});


const WidgetModelStyledDiv = styled.div`
  z-index: 3;
  background-color: var(--admin-color-8);
  display: flex;
  flex-direction: column;
  color: var(--admin-text-color);
  position: initial;
  top: 100px;
  width: 100%;
  resize: both;
  overflow: hidden;


  .widgetInfo {
    margin: auto;
    width: 95%;

  }

  .customStylesTextarea {
    width: 95%;
    min-height: 250px;
    margin: auto;
  }

  .widgetSection, .selectFieldForWidget, .TextInputFieldForWidget {
    margin: 10px auto;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      width: 40%;
      margin: 0;
    }
  }

  textarea {
    min-height: 250px;
  }

  .media-widget {
    display: flex;
    justify-content: center;
  }

  .control-buttons {
    display: flex;
    justify-content: space-evenly;

    button {
      padding: 5px 5%;
    }
  }
`

const WidgetModel = props => {
    const dispatch = useDispatch()
    const widgets = useSelector(store => store?.widgets?.widgets)
    const customPages = useSelector(store => store?.adminPanelGlobalState?.customPages)

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        preview: false,
        renderDeleteBtn: false,
        activeEditingLanguage: 'default'
    })

    const [widgetData, setWidgetData] = useState({
        translations: {},
    })
    const [positions, setPositions] = useState(() => staticPositions)


    useEffect(() => {
        setPositions((prevPositions) => [
            ...prevPositions,
            ..._.flatMap(customPages, (customPage => [customPage, customPage + 'LeftSidebar', customPage + 'RightSidebar']))
        ])
    }, [customPages]);

    const languageElement = useRef(null)


    useEffect(() => {
        const currentWidgetData = widgets.find(widget => widget._id === props.widgetId)
        if (currentWidgetData) {
            setWidgetData({
                ...widgetData,
                ...currentWidgetData?.data,
            })
        }
    }, [widgets]);

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

    const onUniqueDataChangeHandler = (e) => {
        setWidgetData({
            ...widgetData,
            uniqueData: {
                ...(widgetData.uniqueData || {}),
                [e.target.name]: e.target.value
            }
        })
    }


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
    // actions on widget
    const onCloneHandler = () => {
        const widgetsInTheSamePosition = widgets.filter(widget => widget?.data?.position === widgetData.position)
        const highestIndexInTheSamePosition = Math.max(...widgetsInTheSamePosition.map(widget => widgetData.widgetIndex), 0)

        dispatch(adminAddNewWidget({
            ...widgetData,
            widgetIndex: highestIndexInTheSamePosition + 1,
            posts: [],
            metaData: []
        }))
    }
    const onDeleteHandler = () => {
        if (props.widgetId) {
            dispatch(adminDeleteWidget(props.widgetId))
        }
    };
    const changeWidgetIndex = (action) => {
        const valueToSet = action ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1;
        dispatch(adminUpdateWidget({
            _id: props?.widgetId,
            data: {
                ...widgetData,
                widgetIndex: valueToSet,
                posts: [],
                metaData: []
            }
        }))
        setWidgetData({
            ...widgetData,
            widgetIndex: valueToSet,
        })

    };
    const onSaveHandler = () => {
        dispatch(adminUpdateWidget({
            _id: props?.widgetId,
            data: {
                ...widgetData,
                posts: [],
                metaData: []
            }
        }))
    };
    const onLockHandler = () => {
        dispatch(adminUpdateWidget({
            _id: props?.widgetId,
            data: {
                ...widgetData,
                stayOpen: !widgetData.stayOpen,
                posts: [],
                metaData: []
            }
        }))
        setWidgetData({
            ...widgetData,
            stayOpen: !widgetData.stayOpen,
        })
    };

    return (
        <WidgetModelStyledDiv className='widget-model'>

            <WidgetHeaderControl setKey={false}
                                 widgetSettings={widgetSettings}
                                 widgetId={props.widgetId}
                                 widgetData={widgetData}
                                 onLockHandler={onLockHandler}
                                 changeWidgetIndex={changeWidgetIndex}
            />
            {widgetData.stayOpen ?

                <div className='widgetModel'>

                    <div className='checkInputFieldForWidget widgetSection'>
                        <p>Edit Mode:</p>
                        <input type='checkbox' name='editMode' checked={widgetData.editMode} onChange={e => onCheckboxChangeHandler(e)}/>
                    </div>
                    <div className='widgetInfo widgetSection'>
                        <p className='widget-info-id'>ID :</p>
                        <p>{props.widgetId || props.state?.widgetId || 'XXX'}</p>
                    </div>
                    <TextInputFieldForWidget inputTitle='Name:' name='name' type='text' value={widgetData.name} placeHolder='name' onChangeHandler={e => onChangeHandler(e)}/>
                    <TextInputFieldForWidget inputTitle='index:' name='widgetIndex' type='number' value={widgetData.widgetIndex} placeHolder='widgetIndex' onChangeHandler={e => onChangeHandler(e)}/>
                    {/*<div className='selectFieldForWidget widgetSection'>*/}
                    {/*    <p>Translations:</p>*/}
                    {/*    <select ref={languageElement} name='activeEditingLanguage' onChange={e => onChangeLanguageHandler(e)} value={widgetSettings.activeEditingLanguage}>*/}
                    {/*        <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?? 'default'}</option>*/}
                    {/*        {languagesOptions}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <SelectFieldForWidget title={'Translations:'}
                                          name={'activeEditingLanguage'}
                                          ref={languageElement}
                                          value={widgetSettings.activeEditingLanguage}
                                          options={['default', ...process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL)]}
                                          onChangeHandler={onChangeLanguageHandler}
                    />

                    <SelectFieldForWidget title={'Device Type To Render:'}
                                          name={'deviceTypeToRender'}
                                          ref={null}
                                          value={widgetData.deviceTypeToRender}
                                          options={['all', 'mobile', 'desktop']}
                                          onChangeHandler={onChangeHandler}
                    />

                    <SelectFieldForWidget title={'Language To Render:'}
                                          name={'languageToRender'}
                                          ref={null}
                                          value={widgetData.languageToRender}
                                          options={['all', 'default', ...process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL)]}
                                          onChangeHandler={onChangeHandler}
                    />

                    <SelectFieldForWidget title={'Position:'}
                                          name={'position'}
                                          ref={null}
                                          value={widgetData.position}
                                          options={positions}
                                          onChangeHandler={onChangeHandler}
                    />

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


                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider' ?
                        <SelectFieldForWidget title={'Sort By:'}
                                              name={'sortBy'}
                                              ref={null}
                                              value={widgetData.sortBy}
                                              options={['updatedAt', 'createdAt', 'views', 'likes', 'random']}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }

                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider' ?
                        <SelectFieldForWidget title={'Post Type:'}
                                              name={'postType'}
                                              ref={null}
                                              value={widgetData.postType}
                                              options={postTypes}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }
                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider' ?
                        <SelectFieldForWidget title={'Post Element Size:'}
                                              name={'postElementSize'}
                                              ref={null}
                                              value={widgetData.postElementSize}
                                              options={['listSmall', 'list', 'smaller', 'small', 'medium', 'large', 'larger']}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }

                    {widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ?
                        <SelectFieldForWidget title={'Sort By:'}
                                              name={'sortBy'}
                                              ref={null}
                                              value={widgetData.sortBy}
                                              options={['_id', 'count']}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }
                    {widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ?
                        <SelectFieldForWidget title={'Meta Type:'}
                                              name={'metaType'}
                                              ref={null}
                                              value={widgetData.metaType}
                                              options={['tags', 'categories', 'actors']}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }

                    {widgetData.type === 'logo' ?
                        <LogoTypeWidgetModelFields widgetSettings={widgetSettings}
                                                   onChangeHandler={onChangeHandler}
                                                   widgetData={widgetData}
                                                   onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}/>
                        : null
                    }

                    {widgetData.type === 'imageSwiper' ?
                        <ImageSwiperTypeWidgetModelFields imageSwiperData={widgetData.imageSwiperData || []}
                                                          onChangeHandler={onChangeHandler}
                        />
                        : null
                    }


                    <FormTypeWidgetModelFields widgetSettings={widgetSettings}
                                               widgetData={widgetData}
                                               setWidgetData={setWidgetData}
                                               onChangeHandler={onChangeHandler}
                                               onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                               mobileNavigation={widgetData.mobileNavigation}
                                               rendering={widgetData.type === 'form'}
                    />
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

                    {widgetData.type === 'media' ?
                        <TextInputFieldForWidget
                            inputTitle='Media Url:'
                            name='mediaUrl'
                            value={widgetData.mediaUrl}
                            classNameValue='mediaUrl'
                            type='text'
                            placeHolder='mediaUrl'
                            onChangeHandler={onChangeHandler}
                        /> : null
                    }


                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider' ?
                        <TextInputFieldForWidget
                            inputTitle='count :'
                            name='count'
                            type='number'
                            value={widgetData.count}
                            classNameValue='count'
                            placeHolder='count'
                            onChangeHandler={onChangeHandler}
                        /> : null
                    }

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
                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider' ?
                        <TextInputFieldForWidget inputTitle='Selected Meta For Posts:' name='selectedMetaForPosts' type='text' value={widgetData.selectedMetaForPosts}
                                                 classNameValue='selectedMetaForPosts' placeHolder='selectedMetaForPosts'
                                                 onChangeHandler={onChangeHandler}/> : null
                    }

                    {widgetData.type === 'postsSwiper' || widgetData.type === 'imageSwiper' ?
                        <SliderWidgetTypeFields
                            onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                            widgetData={widgetData}
                        /> : null
                    }


                    {widgetData.type === 'searchBar' ?
                        <SearchTypeInputFields widgetData={widgetData}
                                               widgetSettings={widgetSettings}
                                               onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                                               onChangeHandler={onChangeHandler}/> : null
                    }

                    {widgetData.type === 'multipleLinkTo' ?
                        <MultipleLinkWidgetModelFields widgetSettings={widgetSettings}
                                                       widgetData={widgetData}
                                                       setWidgetData={setWidgetData}/> : null
                    }

                    <TextInputFieldForWidget inputTitle='Extra ClassName:' name='extraClassName' type='text' value={widgetData.extraClassName}
                                             placeHolder='Extra ClassName'
                                             onChangeHandler={onChangeHandler}/>

                    <TextInputFieldForWidget inputTitle='Extra Id:' name='extraId' type='text' value={widgetData.extraId}
                                             placeHolder='Extra Id'
                                             onChangeHandler={onChangeHandler}/>

                    <button className={'btn btn-success'} onClick={() => {
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

                    <SelectFieldForWidget title={'Custom Script Strategy:'}
                                          name={'customScriptStrategy'}
                                          ref={null}
                                          value={widgetData.customScriptStrategy}
                                          options={['lazyOnload', 'afterInteractive', 'beforeInteractive']}
                                          onChangeHandler={onChangeHandler}
                    />
                    <p>Custom Script:</p>
                    <MonacoEditorComponent
                        language='javascript'
                        nameValue='customScript'
                        defaultValue={widgetData.customScript || ''}
                        value={widgetData.customScript || ''}
                        setWidgetData={setWidgetData}
                        widgetData={widgetData}
                        classNameValue='customStylesTextarea'
                    />

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
                : null
            }
        </WidgetModelStyledDiv>

    );

};
export default WidgetModel;

