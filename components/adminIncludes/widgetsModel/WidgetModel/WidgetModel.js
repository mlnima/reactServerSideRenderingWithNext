import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { deleteWidgets, getWidgets, updateWidgets } from '../../../../_variables/ajaxVariables'
import { generateAbsolutePath } from '../../../../_variables/_variables'
import WidgetsRenderer from '../../../includes/WidgetsRenderer/WidgetsRenderer'
import 'array.prototype.move';
import SortUpSvg from '../../../../static/images/fontawesome/sort-up-solid.svg'
import SortDownSvg from '../../../../static/images/fontawesome/sort-down-solid.svg'
import { DelayInput } from 'react-delay-input'

const WidgetModel = props => {
    const contextData = useContext(AppContext);
    const title = useRef(null)
    const categories = useRef(null)
    const tags = useRef(null)
    const count = useRef(null)
    const pagination = useRef(null)
    const redirectLink = useRef(null)

    const [ state, setState ] = useState({
        title: props.data.title || '',
        categories: props.data.categories || [],
        tags: props.data.tags || [],
        count: props.data.count || 6,
        pagination: props.data.pagination || false,
        redirectLink: props.data.redirectLink || '',
        redirectToTitle: props.data.redirectToTitle || '',
        type: props.data.type || 'posts',
        metaData: props.data.metaData || [],
        posts: props.data.posts || [],
        comments: props.data.comments || [],
        position: props.data.position || 'home',
        sortBy: props.data.sortBy || '-id',
        text: props.data.text || '',
        textAlign: props.data.textAlign || 'center',
        customHtml: props.data.customHtml || '',
        metaType: props.data.metaType || '',
        pathURL: props.data.pathURL || '',
        LogoUrl: props.data.LogoUrl || '',
        LogoText: props.data.LogoText || '',
        headLine: props.data.headLine || '',
        viewType: props.data.viewType || '',
        positionIndex: props.data.positionIndex || 0
    });

    const [ widgetSettings, setWidgetSettings ] = useState({
        open: false,
        preview:false
    })

    useEffect(() => {
        if (props.data){
            const thisTypeWidgets = contextData.widgetsSettings.widgets.filter(widget=> widget.position === props.data.position)
            const indexOfThisWidget = thisTypeWidgets.findIndex(widget=>widget._id === props.data._id)
            setState({
                ...state,
                positionIndex:indexOfThisWidget
            })
        }
    }, []);

    const onOpenHandler = () => {
        widgetSettings.open ? setWidgetSettings({ ...widgetSettings, open: false }) : setWidgetSettings({ ...widgetSettings, open: true })
    }

    const onDeleteHandler = () => {
        deleteWidgets(props.data._id, contextData.absolutePath).then(() => {
            getWidgets('all', false, window.location.origin).then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        })
    }

    const onSaveHandler = () => {
        updateWidgets(props.data._id, state).then(res => {
            getWidgets('all', false, window.location.origin).then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        })
    }

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onNewCategoryAddHandler = () => {
        setState({
            ...state,
            categories: [ ...state.categories, categories.current.value ]
        })
        categories.current.value = ''
    }
    const onNewTagAddHandler = () => {
        setState({
            ...state,
            tags: [ ...state.tags, tags.current.value ]
        })
        tags.current.value = ''
    }
    const deleteTagHandler = e => {
        setState({
            ...state,
            tags: state.tags.filter(tag => tag !== e.target.name)
        })
    }
    const deleteCategoryHandler = e => {
        setState({
            ...state,
            categories: state.categories.filter(category => category !== e.target.name)
        })
    }

    const renderTags = state.tags.map(tag => {
        return (
            <button name={ tag } onClick={ e => deleteTagHandler(e) }>{ tag }X</button>
        )
    })
    const renderCategories = state.categories.map(category => {
        return (
            <button name={ category } onClick={ e => deleteCategoryHandler(e) }>{ category }X</button>
        )
    })

    useEffect(() => {

        setTimeout(() => {
            let items = [ 'count' ]
            items.forEach(item => {
                if ([ item ].current) {
                    [ item ].current.value = state[item]
                }
            })
        }, 2000)

    }, [])

    const RenderOptionByFormat = () => {
        switch ( state.type ) {
            case 'posts':
                // console.log(props)
                return (
                    <>
                        <p>Sort By:</p>
                        <select name='sortBy' value={ state.sortBy } onChange={ e => onChangeHandler(e) }>
                            <option value='_id'>ID</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
                        </select>
                        <p>View Type:</p>
                        <select name='viewType' value={ state.viewType } onChange={ e => onChangeHandler(e) }>
                            <option value='standard'>Standard</option>
                            <option value='small'>Small</option>
                            <option value='list'>List</option>
                        </select>
                        <p>Categories:</p>
                        <div className='inputWithAddBtn'>
                            <input ref={ categories } name='category' className='category' placeholder='Categories'/>
                            <button onClick={ () => onNewCategoryAddHandler() }>add</button>
                        </div>

                        <div className='categoriesTags'>
                            { renderCategories }
                        </div>

                        <p>Tags:</p>
                        <div className='inputWithAddBtn'>
                            <input ref={ tags } className='tags' name='tags' placeholder='Tags'/>
                            <button onClick={ () => onNewTagAddHandler() }>add</button>
                        </div>

                        <div className='categoriesTags'>
                            { renderTags }
                        </div>
                        <p>Count:</p>
                        {/*<input ref={ count } name='count' type='number' className='count' placeholder='count' value={ state.count } onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput inputRef={ count } name='count' type='number'  value={state.count } placeholder='count' className='count'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <span>Pagination:</span>
                        <select name='pagination' value={ state.pagination } onChange={ e => onChangeHandler(e) }>
                            <option value={ false }>false</option>
                            <option value={ true }>true</option>
                        </select>
                    </>
                )
                break
            case 'meta':
                return (
                    <>
                        <p>Sort By:</p>
                        <select name='sortBy' value={ state.sortBy } onChange={ e => onChangeHandler(e) }>
                            <option value='_id'>ID</option>
                            <option value='count'>Count</option>
                        </select>
                        <p>Meta Type:</p>
                        <select name='metaType' value={ state.metaType } onChange={ e => onChangeHandler(e) }>
                            <option value='tag'>Tag</option>
                            <option value='category'>Category</option>
                            <option value='actor'>Actor</option>
                        </select>
                        <p>Count:</p>
                        {/*<input ref={ count } name='count' type='number' className='count' placeholder='count' value={ state.count } onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput inputRef={ count } name='count' type='number'  value={state.count } placeholder='count' className='count'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>

                    </>
                )
                break
            case 'searchBar':
                return (
                    <>
                        <p>path URL</p>
                        {/*<input name='pathURL' value={ state.pathURL } className='pathURL' onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput name='pathURL'  value={state.pathURL } className='pathURL'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    </>
                )
                break
            case 'logo':
                return (
                    <>
                        <p>Logo image URL</p>
                        {/*<input name='LogoUrl' value={ state.LogoUrl } className='LogoUrl' onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput name='LogoUrl'  value={state.LogoUrl } className='LogoUrl'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <p>Logo Text</p>
                        {/*<input name='LogoText' value={ state.LogoText } className='LogoText' onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput name='LogoText'  value={state.LogoText } className='LogoText'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                        <p>Under Logo Headline Text</p>
                        {/*<input name='headLine' value={ state.headLine } className='headLine' onChange={ e => onChangeHandler(e) }/>*/}
                        <DelayInput name='headLine'  value={state.headLine } className='headLine'  delayTimeout={ 1000 } onChange={ e => onChangeHandler(e) }/>
                    </>
                )
                break
            default:
                return null
                break

        }
    }



    const RenderPreview = ()=>{
        if (widgetSettings.preview){
            return(

                    <WidgetsRenderer widgets={ [ state ] } position={ state.position }/>

            )
        }else return null
    }






    if (widgetSettings.open) {
        return (
            <>
                <div className='widget-open-control'>
                    <p>{state.positionIndex} : { props.data.title || props.data.type }</p>
                    <button onClick={ () => onOpenHandler() }>{ widgetSettings.open ? 'close' : 'open' }</button>
                </div>
                <div className='widgetModel'>
                    <div className='widgetInfo'>
                        <label className='widgetId'><p>ID :</p> <p>{ props.data._id }</p></label>
                    </div>
                    <p>Title:</p>
                    <input name='title' ref={ title } className='title' placeholder='Title' value={ state.title } onChange={ e => onChangeHandler(e) }/>
                    <p>Type:</p>
                    <select name='type' value={ state.type } onChange={ e => onChangeHandler(e) }>
                        <option value='posts'>Posts</option>
                        <option value='text'>Text</option>
                        <option value='logo'>Logo</option>
                        <option value='recentComments'>Recent Comments</option>
                        <option value='search'>Search</option>
                        <option value='meta'>Meta</option>
                        <option value='video'>Video</option>
                        <option value='navigationMenu'>Navigation Menu</option>
                    </select>
                    <p>Position:</p>
                    <select name='position' value={ state.position } onChange={ e => onChangeHandler(e) }>
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
                    <p>Text:</p>
                    <textarea name='text' value={ state.text } onChange={ e => onChangeHandler(e) }/>
                    <p>Text Align:</p>
                    <select name='textAlign' value={ state.textAlign } onChange={ e => onChangeHandler(e) }>
                        <option value='left'>Left</option>
                        <option value='center'>Center</option>
                        <option value='right'>Right</option>
                    </select>

                    <p>Redirect Link Title</p>
                    <input className='redirectToTitle' name='redirectToTitle' placeholder='Title for Redirect Link' value={ state.redirectToTitle } onChange={ e => onChangeHandler(e) }/>
                    <p>Redirect Link URL:</p>
                    <input className='redirectLink' name='redirectLink' placeholder='Redirect' value={ state.redirectLink } onChange={ e => onChangeHandler(e) }/>

                    <RenderOptionByFormat/>
                    <button onClick={()=>{widgetSettings.preview?setWidgetSettings({...widgetSettings,preview: false}):setWidgetSettings({...widgetSettings,preview: true})}}>Preview the Widget</button>
                   <RenderPreview/>
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
                <p>{state.positionIndex} : { props.data.title || props.data.type }</p>
                <div>
                    <button className='changeWidgetIndexBtn'><img className='fontawesomeSvgVerySmall' src={ SortUpSvg } alt=""/></button>
                    <button className='changeWidgetIndexBtn'><img className='fontawesomeSvgVerySmall' src={ SortDownSvg } alt=""/></button>
                    <button onClick={ () => onOpenHandler() }>{ widgetSettings.open ? 'close' : 'open' }</button>
                </div>
            </div>
        )
    }

};
export default WidgetModel;
