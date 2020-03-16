import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { deleteWidgets, getWidgets, updateWidgets } from '../../../../_variables/ajaxVariables'

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
        type: props.data.type || 'posts',
        position: props.data.position || 'home',
        sortBy: props.data.position || '-id',
        text: props.data.text || '',
        textAlign:props.data.text || 'center',
        customHtml: props.data.customHtml || ''
    });

    const onDeleteHandler = () => {
        deleteWidgets(props.data._id).then(() => {
            contextData.dispatchWidgetsSettings({
                widgets: contextData.widgetsSettings.widgets.filter(w => w._id !== props.data._id)
            })
        })
    }
    const onSaveHandler = () => {
        updateWidgets(props.data._id, state).then(res => {
            // let newData = res.data.updatedWidgets
            // setState({ ...state, ...newData })
            getWidgets('all').then(res => {
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

    const RenderOptionByFormat = () => {
        switch ( state.type ) {
            case 'posts':
                return (
                    <>
                        <p>Sort By:</p>
                        <select name='sortBy' value={ state.sortBy } onChange={ e => onChangeHandler(e) }>
                            <option value='id'>ID</option>
                            <option value='views'>Views</option>
                            <option value='likes'>Likes</option>
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
                        <input name='count' type='number' className='count' placeholder='count' value={ state.count } onChange={ e => onChangeHandler(e) }/>
                        <span>Pagination:</span>
                        <select name='pagination' value={ state.pagination } onChange={ e => onChangeHandler(e) }>
                            <option value={ false }>false</option>
                            <option value={ true }>true</option>
                        </select>
                    </>
                )
                break
            case 'text':
                return (
                    <>

                    </>
                )
                break
            default:
                return null
                break

        }
    }

    return (
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
            </select>
            <p>Position:</p>
            <select name='position' value={ state.position } onChange={ e => onChangeHandler(e) }>
                <option value='home'>Home</option>
                <option value='sidebar'>Sidebar</option>
                <option value='postPageSideBar'>postPageSideBar</option>
                <option value='footer'>footer</option>
            </select>
            <p>Text:</p>
            <textarea name='text' value={state.text} onChange={e=>onChangeHandler(e)}/>
            <p>Text Align:</p>
            <select name='textAlign' value={ state.textAlign } onChange={ e => onChangeHandler(e) }>
                <option value='left'>Left</option>
                <option value='center'>Center</option>
                <option value='right'>Right</option>
            </select>
            <RenderOptionByFormat/>
            <p>Redirect Link:</p>
            <input className='redirectLink' name='redirectLink' placeholder='Redirect' value={ state.redirectLink } onChange={ e => onChangeHandler(e) }/>
            <div className='control'>
                <button onClick={ () => onSaveHandler() }>Save</button>
                <button onClick={ () => onDeleteHandler() }>Delete</button>
            </div>
        </div>
    );
};
export default WidgetModel;
