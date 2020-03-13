import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import { deleteWidgets, updateWidgets } from '../../../../_variables/ajaxVariables'

const VideoWidgetModel = props => {
    const contextData = useContext(AppContext);
    const title = useRef(null)
    const categories = useRef(null)
    const tags = useRef(null)
    const count = useRef(null)
    const pagination = useRef(null)
    const redirectLink = useRef(null)
    const [ state, setState ] = useState({
        title: props.data.title || '',
        categories: props.data.category || [],
        tags: props.data.tags || [],
        count: props.data.count || 6,
        pagination: props.data.pagination || false,
        redirectLink: props.data.redirectLink || '',
        type: props.data.type || 'videoBlocks',
        // id:props.data._id || undefined
    });
    useEffect(() => {
        console.log(state)
    }, [ state ]);

    const onDeleteHandler = () => {
        contextData.dispatchWidgetsSettings({
            homeWidgets: contextData.widgetsSettings.homeWidgets.filter(w => contextData.widgetsSettings.homeWidgets.indexOf(w) !== contextData.widgetsSettings.homeWidgets.indexOf(props.data))
        })
        deleteWidgets(props.data._id)
    }

    const onSaveHandler = () => {
        updateWidgets(props.data._id, state).then(res => {
            console.log(res.data.updatedWidgets)
            let newData = res.data.updatedWidgets
            delete newData._id
            setState({ ...state, ...newData })
        })
        // contextData.dispatchWidgetsSettings({
        //     homeWidgets: contextData.widgetsSettings.homeWidgets.splice(contextData.widgetsSettings.homeWidgets.indexOf(props.data),1,state)
        // })
    }
    const onChangeHandler = e => {
        console.log(e.target)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onAddSubmitHandler = e => {
        e.preventDefault()
        console.log()
    }
    const onNewCategoryAddHandler = () => {
        setState({
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
    return (
        <div className='VideoWidgetModel'>
            <div className='widgetInfo'>
                <label className='widgetId'>{ props.data._id }</label>
                <label className='widgetPosition'>{ props.data.position }</label>
            </div>

            <input name='title' ref={ title } className='title' value={ state.title } onChange={ e => onChangeHandler(e) }/>

            <input ref={ categories } name='category' className='category' placeholder='Categories' />
            { state.categories }
            <button onClick={ () => onNewCategoryAddHandler() }>add</button>

            <input ref={tags} className='tags' name='tags' placeholder='Tags' />
            { state.tags + ',' }
            <button onClick={ () => onNewTagAddHandler() }>add</button>
            <input name='count' type='number' className='count' placeholder='count' value={ state.count }/>
            <span>Pagination:</span>
            <select name='pagination' value={ state.pagination }>
                <option value={ false }>false</option>
                <option value={ true }>true</option>
            </select>
            <input className='redirectLink' name='redirectLink' placeholder='Redirect' value={ state.redirectLink } onChange={ e => onChangeHandler(e) }/>
            <div className='control'>
                <button onClick={ () => onSaveHandler() }>save</button>
                <button onClick={ () => onDeleteHandler() }>delete</button>
            </div>
        </div>
    );
};
export default VideoWidgetModel;
