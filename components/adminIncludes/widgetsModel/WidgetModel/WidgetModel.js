import React, {useEffect, useState, useRef, useMemo} from 'react';
import styled from "styled-components";
import dynamic from 'next/dynamic'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faClone, faSave} from "@fortawesome/free-regular-svg-icons";
import SearchTypeInputFields from "./SearchTypeInputFields/SearchTypeInputFields";
import MultipleLinkWidgetModelFields from "./MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields";
import _ from "lodash";
import LogoTypeWidgetModelFields from "./LogoTypeWidgetModelFields/LogoTypeWidgetModelFields";
import {useDispatch, useSelector} from "react-redux";
import {
    adminAddNewWidget,
    adminDeleteWidget,
    adminUpdateWidget
} from "@store/adminActions/adminWidgetsActions";
import SelectFieldForWidget from "./SelectFieldForWidget/SelectFieldForWidget";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";
import staticPositions from '../staticPositions';
import postTypes from "../../../global/postTypes";
import DayModeNightModeFields
    from "@components/adminIncludes/widgetsModel/WidgetModel/DayModeNightModeFields/DayModeNightModeFields";

const AdvertiseWidgetModelFields = dynamic(() => import('./AdvertiseWidgetModelFields'));
const SliderWidgetTypeFields = dynamic(() => import('./SliderWidgetTypeFields/SliderWidgetTypeFields'));
const RenderTitleAndRedirectLink = dynamic(() => import('./RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'));
const WidgetPreview = dynamic(() => import('./WidgetPreview/WidgetPreview'));
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), {ssr: false});
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'));
const ImageSwiperTypeWidgetModelFields = dynamic(() => import('./ImageSwiperTypeWidgetModelFields/ImageSwiperTypeWidgetModelFields'));
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'));
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'));
const ExportWidget = dynamic(() => import('./ExportWidget/ExportWidget'));
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'));
const WidgetHeaderControl = dynamic(() => import('./WidgetHeaderControl/WidgetHeaderControl'));


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
  
  .objectEditingModeEditor{
    min-height: 1024px;
  }
  
  .widgetModel{
    overflow-y: auto;
  }

  .widgetInfo {
    margin: auto;
    width: 95%;
  }

  .customStylesTextarea {
    width: 95%;
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

  .monaco-editor-section {
    .editor-section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;
      p {
        margin: 10px;
      }
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
    //const widgets = useSelector(store => store?.widgets?.widgets)
    const widgets = useSelector(store => store?.adminPanelWidgets?.adminPanelWidgets)

    const currentWidgetData = useSelector(store =>
        store?.adminPanelWidgets?.adminPanelWidgets?.[props.position]?.find(widget => widget._id === props.widgetId)
    )

    const customPages = useSelector(store => store?.adminPanelGlobalState?.customPages)

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        textBox: false,
        customStyleBox: false,
        customScriptBox: false,
        objectEditingMode: false,
        // preview: false,
        renderDeleteBtn: false,
        activeEditingLanguage: 'default'
    })

    const [widgetData, setWidgetData] = useState({
        translations: {},


    })
    const positions = useMemo(() => {
        return [
            ...staticPositions,
            ..._.flatMap(customPages, (customPage => [customPage, customPage + 'LeftSidebar', customPage + 'RightSidebar']))
        ]
    }, [customPages])

    const languageElement = useRef(null)


    useEffect(() => {
        if (currentWidgetData) {
            setWidgetData({
                ...widgetData,
                ...currentWidgetData?.data,
            })
        }
    }, [currentWidgetData]);

    const onObjectModeHandler = ()=>{
        widgetSettings.objectEditingMode ?
            setWidgetSettings({...widgetSettings,objectEditingMode:false}):
            setWidgetSettings({...widgetSettings,objectEditingMode:true})
    }

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

    const onObjectEditingModeChangeHandler = e =>{
        console.log(e.target.value)
         setWidgetData(JSON.parse(e.target.value))
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
                                 onObjectModeHandler={onObjectModeHandler}
                                 onLockHandler={onLockHandler}
                                 changeWidgetIndex={changeWidgetIndex}
            />


            { widgetData.stayOpen && widgetSettings.objectEditingMode?

                <MonacoEditor
                    language={'json'}
                    name={'widgetData'}
                    height={1024}
                    width={800}
                    defaultValue={ JSON.stringify(widgetData,null,'\t')}
                    value={JSON.stringify(widgetData,null,'\t') }
                    className={'objectEditingModeEditor'}
                    onChange={onObjectEditingModeChangeHandler}
                />
                : null
            }









            {widgetData.stayOpen && !widgetSettings.objectEditingMode?

                <div className='widgetModel'>

                    <div className='checkInputFieldForWidget widgetSection'>
                        <p>Edit Mode:</p>
                        <input type='checkbox' name='editMode' checked={widgetData.editMode}
                               onChange={e => onCheckboxChangeHandler(e)}/>
                    </div>
                    <div className='checkInputFieldForWidget widgetSection'>
                        <p>No SSR:</p>
                        <input type='checkbox' name='noSSR' checked={widgetData.noSSR}
                               onChange={e => onCheckboxChangeHandler(e)}/>
                    </div>
                    <div className='widgetInfo widgetSection'>
                        <p className='widget-info-id'>ID :</p>
                        <p>{props.widgetId || props.state?.widgetId || 'XXX'}</p>
                    </div>
                    <TextInputFieldForWidget inputTitle='Name:' name='name' type='text' value={widgetData.name}
                                             placeHolder='name' onChangeHandler={e => onChangeHandler(e)}/>
                    <TextInputFieldForWidget inputTitle='index:' name='widgetIndex' type='number'
                                             value={widgetData.widgetIndex} placeHolder='widgetIndex'
                                             onChangeHandler={e => onChangeHandler(e)}/>
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
                    <SelectFieldForWidget title={'Specific Day Type To Render:'}
                                          name={'specificDayToRender'}
                                          ref={null}
                                          value={widgetData.specificDayToRender}
                                          options={['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
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
                    {widgetData.type === 'dayModeNightMode'?
                         <DayModeNightModeFields onChangeHandler={onUniqueDataChangeHandler}
                                                 dayNightModeData={widgetData?.uniqueData?.dayNightModeData || ''}
                         />
                        :null
                    }

                    <div className={'monaco-editor-section'}>
                        <div className={'editor-section'}>
                            <p>Widget Text or HTML</p>
                            <button className={'btn btn-primary'} onClick={() => setWidgetSettings({
                                ...widgetSettings,
                                textBox: !widgetSettings.textBox
                            })}
                            >
                                open
                            </button>
                        </div>
                        {widgetSettings.textBox ?
                            <MonacoEditor
                                language={'html'}
                                name={'text'}
                                defaultValue={
                                    widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                        widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                                }
                                value={
                                    widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                        widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                                }
                                className={'widgetTextTextarea'}
                                onChange={onTextInputsDataChangeHandler}
                            />
                            : null
                        }
                    </div>



                    {widgetData.type === 'advertise' ?
                        <AdvertiseWidgetModelFields adCode={widgetData.adCode} onChangeHandler={onChangeHandler}/>
                        : null
                    }

                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider' ?
                        <SelectFieldForWidget title={'Sort By:'}
                                              name={'sortBy'}
                                              ref={null}
                                              value={widgetData.sortBy}
                                              options={widgetData.type === 'metaWithImage' || widgetData.type === 'meta' ? ['updatedAt', 'createdAt', 'count', 'index'] : ['updatedAt', 'createdAt', 'views', 'likes', 'random']}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }

                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper'  || widgetData.type === 'postsSlider' ?
                        <SelectFieldForWidget title={'Post Type:'}
                                              name={'postType'}
                                              ref={null}
                                              value={widgetData.postType}
                                              options={postTypes}
                                              onChangeHandler={onChangeHandler}
                        /> : null
                    }
                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider' ?
                        <>
                            <SelectFieldForWidget title={'Post Element Size:'}
                                                  name={'postElementSize'}
                                                  ref={null}
                                                  value={widgetData.postElementSize}
                                                  options={['listSmall', 'list', 'smaller', 'small', 'medium', 'large', 'larger']}
                                                  onChangeHandler={onChangeHandler}
                            />
                            <div className='checkInputFieldForWidget widgetSection'>
                                <p>Pagination:</p>
                                <input type='checkbox' name='pagination' checked={widgetData.pagination}
                                       onChange={e => onCheckboxChangeHandler(e)}/>
                            </div>
                        </>
                        : null

                    }

                    {/*{widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ?*/}
                    {/*    <SelectFieldForWidget title={'Sort By:'}*/}
                    {/*                          name={'sortBy'}*/}
                    {/*                          ref={null}*/}
                    {/*                          value={widgetData.sortBy}*/}
                    {/*                          options={['_id', 'count']}*/}
                    {/*                          onChangeHandler={onChangeHandler}*/}
                    {/*    /> : null*/}
                    {/*}*/}
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


                    {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider' ?
                        <TextInputFieldForWidget inputTitle='Selected Meta For PostsRenderer:' name='selectedMetaForPosts'
                                                 type='text' value={widgetData.selectedMetaForPosts}
                                                 classNameValue='selectedMetaForPosts'
                                                 placeHolder='selectedMetaForPosts'
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

                    <TextInputFieldForWidget inputTitle='Extra ClassName:' name='extraClassName' type='text'
                                             value={widgetData.extraClassName}
                                             placeHolder='Extra ClassName'
                                             onChangeHandler={onChangeHandler}/>

                    <TextInputFieldForWidget inputTitle='Extra Id:' name='extraId' type='text'
                                             value={widgetData.extraId}
                                             placeHolder='Extra Id'
                                             onChangeHandler={onChangeHandler}/>


                    <div className={'monaco-editor-section'}>
                        <div className={'editor-section'}>
                            <p>Custom Styles:</p>
                            <button className={'btn btn-primary'} onClick={() => setWidgetSettings({
                                ...widgetSettings,
                                customStyleBox: !widgetSettings.customStyleBox
                            })}>open
                            </button>
                        </div>
                        {widgetSettings.customStyleBox ?
                            <MonacoEditor
                                language={'scss'}
                                name={'customStyles'}
                                defaultValue={widgetData.customStyles}
                                value={widgetData.customStyles}
                                className={'customStylesTextarea'}
                                onChange={onChangeHandler}
                            />
                            : null
                        }
                    </div>


                    <SelectFieldForWidget title={'Custom Script Strategy:'}
                                          name={'customScriptStrategy'}
                                          ref={null}
                                          value={widgetData.customScriptStrategy}
                                          options={['lazyOnload', 'afterInteractive', 'beforeInteractive']}
                                          onChangeHandler={onChangeHandler}
                    />
                    <div className={'monaco-editor-section'}>

                        <div className={'editor-section'}>
                            <p>Custom Script:</p>
                            <button className={'btn btn-primary'} onClick={() => setWidgetSettings({
                                ...widgetSettings,
                                customScriptBox: !widgetSettings.customScriptBox
                            })}>open
                            </button>
                        </div>
                        {widgetSettings.customScriptBox ?
                            <MonacoEditor
                                language={'javascript'}
                                name={'customScript'}
                                defaultValue={widgetData.customScript}
                                value={widgetData.customScript}
                                className={'customScriptTextarea'}
                                onChange={onChangeHandler}
                            />
                            : null
                        }

                    </div>
                    {/*<button className={'btn btn-success'} onClick={() => {*/}
                    {/*    widgetSettings.preview ? setWidgetSettings({*/}
                    {/*        ...widgetSettings,*/}
                    {/*        preview: false*/}
                    {/*    }) : setWidgetSettings({...widgetSettings, preview: true})*/}
                    {/*}}>Preview the Widget*/}
                    {/*</button>*/}
                    {/*<div className='control-buttons'>*/}
                    {/*    <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}><FontAwesomeIcon icon={faSave} style={{*/}
                    {/*        width: '15px',*/}
                    {/*        height: '15px'*/}
                    {/*    }}/></button>*/}
                    {/*    <ExportWidget data={{...widgetData}}/>*/}
                    {/*    <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}><FontAwesomeIcon icon={faClone} style={{*/}
                    {/*        width: '15px',*/}
                    {/*        height: '15px'*/}
                    {/*    }}/></button>*/}
                    {/*    <button className={'btn btn-primary'} title="delete" onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({*/}
                    {/*        ...widgetSettings,*/}
                    {/*        renderDeleteBtn: false*/}
                    {/*    }) : setWidgetSettings({*/}
                    {/*        ...widgetSettings,*/}
                    {/*        renderDeleteBtn: true*/}
                    {/*    })}>*/}
                    {/*        <FontAwesomeIcon icon={faTrash} style={{width: '15px', height: '15px'}}/>*/}
                    {/*    </button>*/}
                    {/*    {widgetSettings.renderDeleteBtn ?*/}
                    {/*        <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>Delete</button> : null}*/}
                    {/*</div>*/}
                </div>
                : null
            }

            {widgetData.stayOpen?
                <>
                {/*<button className={'btn btn-success'} onClick={() => {*/}
                {/*    widgetSettings.preview ? setWidgetSettings({*/}
                {/*        ...widgetSettings,*/}
                {/*        preview: false*/}
                {/*    }) : setWidgetSettings({...widgetSettings, preview: true})*/}
                {/*}}>Preview the Widget*/}
                {/*</button>*/}
                <div className='control-buttons'>
                    <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}><FontAwesomeIcon icon={faSave} style={{
                        width: '15px',
                        height: '15px'
                    }}/></button>
                    <ExportWidget data={{...widgetData}}/>
                    <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}><FontAwesomeIcon icon={faClone} style={{
                        width: '15px',
                        height: '15px'
                    }}/></button>
                    <button className={'btn btn-primary'} title="delete" onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: false
                    }) : setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: true
                    })}>
                        <FontAwesomeIcon icon={faTrash} style={{width: '15px', height: '15px'}}/>
                    </button>
                    {widgetSettings.renderDeleteBtn ?
                        <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>Delete</button> : null}
                </div>
                </>
                :null
            }
            </WidgetModelStyledDiv>

    );

};
export default WidgetModel;

// const onWidgetTextChangeHandler = value => {
//     if (languageElement?.current?.value === 'default') {
//         setWidgetData({
//             ...widgetData,
//             text: value
//         })
//
//     } else {
//         setWidgetData({
//             ...widgetData,
//             translations: {
//                 ...(widgetData?.translations || {}),
//                 [languageElement?.current?.value]: {
//                     ...(widgetData?.translations?.[languageElement?.current?.value] || {}),
//                     text: value
//                 }
//             }
//         })
//     }
// }

// const onChangeHandlerByName = (name, value) => {
//     setWidgetData({
//         ...widgetData,
//         [name]: value
//     })
// };