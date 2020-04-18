import React, { useEffect, useState, useContext, useRef } from 'react';
import FA from "react-fontawesome";
import BarsSvg from '../../../static/images/fontawesome/bars-solid.svg'


const NavigationItem = props => {
    const addQueryInputElKey = useRef(null)
    const addQueryInputElValue = useRef(null)
    const [ state, setState ] = useState({
        isOpen: false
    });

    const [ data, setData ] = useState({
        title: '',
        url: '',
        as: '',
        query: []
    })

    useEffect(() => {
        console.log(props)
    }, [ props ]);
    useEffect(() => {
        setData({
            ...data,
            title: props.title,
            url: props.url,
            as: props.as,
            query: props.query ||[]
        })
    }, [ props ]);

    const onOpenHandler = () => {
        state.isOpen ?
            setState({
                ...state,
                isOpen: false
            }) :
            setState({
                ...state,
                isOpen: true
            })
    };

    const onChaneHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onAddQueryHandler = e => {
        e.preventDefault()
        setData({
            ...data,
            query: [ ...data.query, {[addQueryInputElKey.current.value]:addQueryInputElValue.current.value} ]
        })

    }

    const renderQueries = (data.query || []).map(i => {
        return (
            <div className='query-item-admin-panel'>
                <p>{ Object.keys(i)[0] }</p>
                <button onClick={ () => {
                    setData({
                        ...data,
                        query: data.query.filter(q => Object.keys(q)[0] !== Object.keys(i)[0])
                    })
                } }>X
                </button>
            </div>
        )
    })

    if (!state.isOpen) {
        return (
            <div className='navigation-items-preview-item'>
                <div className="item-title" onClick={ () => onOpenHandler() }>
                    <p>{ props.title }</p>
                    {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/ }
                </div>
            </div>
        )
    } else return (
        <div className='navigation-items-preview-item'>
            <div className="item-title" onClick={ () => onOpenHandler() }>
                <p>{ props.title }</p>
                {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/ }
            </div>
            <div className="navigation-items-preview-item-edit">
                <div  className="navigation-items-preview-item-edit-section">
                    <p>Title:</p>
                    <input type="text" name='title' value={ data.title } onChange={ e => onChaneHandler(e) }/>
                </div>
                <div className="navigation-items-preview-item-edit-section">
                    <p>Url:</p>
                    <input type="text" name='url' value={ data.url } onChange={ e => onChaneHandler(e) }/>
                </div>

                <div className="navigation-items-preview-item-edit-section">
                    <p>As:</p>
                    <input type="text" name='as' value={ data.as } onChange={ e => onChaneHandler(e) }/>
                </div>


                <form className='add-query-editing-navigation' onSubmit={ e => onAddQueryHandler(e) }>
                    <h4>Adding query To the Url</h4>
                    <div className="navigation-items-preview-item-edit-section">
                        <p>QueryKey:</p>
                        <input  ref={ addQueryInputElKey } type="text" name='query' />
                    </div>
                    <div className="navigation-items-preview-item-edit-section">
                        <p>QueryValue:</p>
                        <input  ref={ addQueryInputElValue } type="text" name='query' />
                    </div>
                    { renderQueries }
                    <button type='submit'>Add Query</button>
                </form>
                <button name={ data.title } onClick={ (e) => props.onDeleteItemHandler(e) }>Del</button>
                <button name={ data.title } onClick={ (e) => props.onSaveHandler(data, props.itemIndex) }>save</button>
            </div>
        </div>
    )

};
export default NavigationItem;