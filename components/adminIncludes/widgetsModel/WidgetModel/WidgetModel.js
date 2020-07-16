import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { deleteWidgets, getMultipleWidgetWithData, updateWidgets } from '../../../../_variables/ajaxVariables'
import { convertVariableNameToName, generateAbsolutePath } from '../../../../_variables/_variables'
import WidgetsRenderer from '../../../includes/WidgetsRenderer/WidgetsRenderer'
import 'array.prototype.move';
import SortUpSvg from '../../../../static/images/fontawesome/sort-up-solid.svg'
import SortDownSvg from '../../../../static/images/fontawesome/sort-down-solid.svg'
import { DelayInput } from 'react-delay-input'

const WidgetModel = props => {
    const contextData = useContext(AppContext);
    // const title = useRef(null)
    // const count = useRef(null)

    const [ widgetData, setWidgetData ] = useState({
        data: {}
    })

    useEffect(() => {
        setWidgetData({
            ...widgetData,
            ...props.data,
        })
    }, [ props ]);


    const [ widgetSettings, setWidgetSettings ] = useState({
        open: false,
        preview: false
    })

    const onOpenHandler = () => {
        widgetSettings.open ? setWidgetSettings({ ...widgetSettings, open: false }) : setWidgetSettings({ ...widgetSettings, open: true })
    }

    const onDeleteHandler = () => {
        deleteWidgets(props.data._id, window.location.origin).then(() => {
            getMultipleWidgetWithData({ widgets: [ 'all' ] }, false, window.location.origin, Date.now()).then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        })
    }

    const onSaveHandler = () => {
        const dataToSave = widgetData
        dataToSave.data.posts = []
        dataToSave.data.metaData = []

        updateWidgets(dataToSave).then(() => {
            getMultipleWidgetWithData({ widgets: [ 'all' ] }, false, window.location.origin, Date.now()).then(res => {
                console.log(res.data)
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
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

    const RenderPreview = () => {
        if (widgetSettings.preview) {
            return (
                <WidgetsRenderer widgets={ [ widgetData ] } position={ widgetData.data.position }/>
            )
        } else return null
    }

    const RenderTitleAndRedirect = () => {
        return (
            <>
                <p>Title:</p>
                <DelayInput name='title' className='title' placeholder='Title' value={ widgetData.data.title } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                <p>Redirect Link Title</p>
                <DelayInput className='redirectToTitle' name='redirectToTitle' placeholder='Title for Redirect Link' delayTimeout={ 1000 } value={ widgetData.data.redirectToTitle } onChange={ e => onChangeHandler(e) }/>
                <p>Redirect Link URL:</p>
                <DelayInput className='redirectLink' name='redirectLink' placeholder='Redirect' value={ widgetData.data.redirectLink } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
            </>
        )
    }
    const RenderRedirect = () => {
        return (
            <>
                <p>Redirect Link URL:</p>
                <DelayInput className='redirectLink' name='redirectLink' placeholder='Redirect' value={ widgetData.data.redirectLink } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
            </>
        )
    }

    const RenderCount = () => {
        return (
            <>
                <p>Count:</p>
                <DelayInput name='count' type='number' value={ widgetData.data.count } placeholder='count' className='count' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
            </>
        )
    }
    const RenderText = () => {
        return (
            <>
                <p>Text:</p>
                <DelayInput element="textarea" name='text' value={ widgetData.data.text } delayTimeout={ 10000 } onChange={ e => onChangeHandler(e) }/>
                <p>Text Align:</p>
                <select name='textAlign' value={ widgetData.data.textAlign } onChange={ e => onChangeHandler(e) }>
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
                <DelayInput name='extraClassName' value={ widgetData.data.extraClassName || '' } delayTimeout={ 4000 } onChange={ e => onChangeHandler(e) }/>
                <p>Custom Styles:</p>
                <DelayInput element="textarea" className='customStylesTextarea' name='customStyles' value={ widgetData.data.customStyles || '' } delayTimeout={ 4000 } onChange={ e => onChangeHandler(e) }/>
            </>
        )
    }

    const RenderOptionByFormat = () => {
        switch ( widgetData.data.type ) {
            case 'posts':
                return (
                    <>
                        <RenderTitleAndRedirect/>
                        <RenderText/>
                        <p>Sort By:</p>
                        <select name='sortBy' value={ widgetData.data.sortBy } onChange={ e => onChangeHandler(e) }>
                            <option value='_id'>Newest</option>
                            <option value='-_id'>Oldest</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        <p>View Type:</p>
                        <select name='viewType' value={ widgetData.data.viewType } onChange={ e => onChangeHandler(e) }>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                        <RenderCount/>
                    </>
                )

            case 'media':
                return (
                    <>
                        <RenderTitleAndRedirect/>
                        <RenderText/>
                        <p>Media Type:</p>
                        <select name='mediaType' value={ widgetData.data.mediaType || '' } onChange={ e => onChangeHandler(e) }>
                            <option value='video'>Video</option>
                            <option value='image'>Image</option>
                            <option value='audio'>Audio</option>
                            <option value='iframe'>Iframe</option>
                        </select>
                        <p>Media Url:</p>
                        <DelayInput name='mediaUrl' value={ widgetData.data.mediaUrl || '' } placeholder='Media URL' className='mediaUrl' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    </>
                )

            case 'meta':
                return (
                    <>
                        <RenderTitleAndRedirect/>
                        <RenderText/>
                        <p>Sort By:</p>
                        <select name='sortBy' value={ widgetData.data.sortBy } onChange={ e => onChangeHandler(e) }>
                            <option value='_id'>ID</option>
                            <option value='count'>Count</option>
                        </select>
                        <p>Meta Type:</p>
                        <select name='metaType' value={ widgetData.data.metaType } onChange={ e => onChangeHandler(e) }>
                            <option value=''>Select The Meta Type</option>
                            <option value='tag'>Tag</option>
                            <option value='category'>Category</option>
                            <option value='actor'>Actor</option>
                        </select>
                        <p>Meta background Color:</p>
                        <DelayInput name='metaBackgroundColor' value={ widgetData.data.metaBackgroundColor || 'red' } placeholder='Meta background Color' className='metaBackgroundColor' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <p>Meta Text Color:</p>
                        <DelayInput name='metaTextColor' value={ widgetData.data.metaTextColor || 'white' } placeholder='Meta background Color' className='metaTextColor' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <p>Count:</p>
                        <RenderCount/>
                    </>
                )

            case 'searchBar':
                console.log(widgetData)
                return (
                    <>
                        <p>path URL</p>
                        <DelayInput name='pathURL' value={ widgetData.data.pathURL } className='pathURL' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    </>
                )

            case 'logo':
                return (
                    <>
                        <RenderRedirect/>
                        <p>Logo image URL</p>
                        {/*<input name='LogoUrl' value={ state.LogoUrl } className='LogoUrl' onChange={ e => onChangeHandler(e) }/>*/ }
                        <DelayInput name='LogoUrl' value={ widgetData.data.LogoUrl } className='LogoUrl' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <p>Logo Text</p>
                        {/*<input name='LogoText' value={ state.LogoText } className='LogoText' onChange={ e => onChangeHandler(e) }/>*/ }
                        <DelayInput name='LogoText' value={ widgetData.data.LogoText } className='LogoText' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <div className='color-section-widget'>
                            <p>Logo Text Color</p>
                            <DelayInput name='logoTextColor' value={ widgetData.data.logoTextColor } className='logoTextColor' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                            <p>Logo Text Font Size</p>
                            <DelayInput type='number' name='logoTextFontSize' value={ widgetData.data.logoTextFontSize } className='logoTextFontSize' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        </div>

                        <p>Under Logo Headline Text</p>
                        {/*<input name='headLine' value={ state.headLine } className='headLine' onChange={ e => onChangeHandler(e) }/>*/ }
                        <DelayInput name='headLine' value={ widgetData.data.headLine } className='headLine' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <div className='color-section-widget'>
                            <p>Head Line Color</p>
                            <DelayInput name='logoHeadLineColor' value={ widgetData.data.logoHeadLineColor } className='logoHeadLineColor' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                            <p>Head Line Font Size</p>
                            <DelayInput type='number' name='logoHeadLineFontSize' value={ widgetData.data.logoHeadLineFontSize } className='logoHeadLineFontSize' delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        </div>
                    </>
                )

            case 'alphabeticalNumericalRange':
                return (
                    <>
                        <RenderTitleAndRedirect/>
                    </>
                )
            case 'text':
                return (
                    <>
                        <RenderTitleAndRedirect/>
                        <RenderText/>
                    </>
                )

            default:
                return null

        }
    }


    const changeWidgetIndex = (more)=>{
        const valueToSet = more ? widgetData.data.widgetIndex +1: widgetData.data.widgetIndex -1
        const dataToSave = {
            ...widgetData,
            data:{
                ...widgetData.data,
                widgetIndex: valueToSet
            }
        }
        updateWidgets(dataToSave).then(() => {
            getMultipleWidgetWithData({ widgets: [ 'all' ] }, false, window.location.origin, Date.now()).then(res => {
                console.log(res.data)
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        })
    }





    if (widgetSettings.open) {
        return (
            <>
                <div className='widget-open-control'>
                    <p>{ props.data.data.title || convertVariableNameToName(props.data.data.type) } index: { widgetData.data.widgetIndex }</p>
                    <button onClick={ () => onOpenHandler() }>{ widgetSettings.open ? 'close' : 'open' }</button>
                </div>
                <div className='widgetModel'>
                    <div className='widgetInfo'>
                        <label className='widgetId'><p>ID :</p> <p>{ props.data._id }</p></label>
                    </div>

                    <p>Type:</p>
                    <select name='type' value={ widgetData.data.type } onChange={ e => onChangeHandler(e) }>
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
                    <p>Widget Index:</p>
                    <DelayInput type='number' name='widgetIndex' className='widgetIndex' placeholder='widgetIndex' value={ widgetData.data.widgetIndex } delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    <p>Position:</p>
                    <select name='position' value={ widgetData.data.position } onChange={ e => onChangeHandler(e) }>
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
                    <button onClick={ () => {
                        widgetSettings.preview ? setWidgetSettings({ ...widgetSettings, preview: false }) : setWidgetSettings({ ...widgetSettings, preview: true })
                    } }>Preview the Widget
                    </button>
                    <RenderPreview/>
                    <RenderWidgetCustomStyle/>
                    <div className='control'>
                        <button onClick={ () => onSaveHandler() }>Save</button>
                        <button onClick={ () => onDeleteHandler() }>Delete</button>
                    </div>

                </div>
            </>
        );
    } else {
        return (
            <div className='widget-open-control'>
                <p> { props.data.data.title || convertVariableNameToName(props.data.data.type) } index: { widgetData.data.widgetIndex }</p>
                <div>
                    <button className='changeWidgetIndexBtn' onClick={()=>changeWidgetIndex(false)}><img className='fontawesomeSvgVerySmall' src={ SortUpSvg } alt=""/></button>
                    <button className='changeWidgetIndexBtn' onClick={()=>changeWidgetIndex(true)}><img className='fontawesomeSvgVerySmall' src={ SortDownSvg } alt=""/></button>
                    <button onClick={ () => onOpenHandler() }>{ widgetSettings.open ? 'close' : 'open' }</button>
                </div>
            </div>
        )
    }

};
export default WidgetModel;
