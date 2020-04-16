import React, { useEffect, useState, useContext } from 'react';
import FA from "react-fontawesome";
import BarsSvg from '../../../static/images/fontawesome/bars-solid.svg'

const NavigationItem = props => {
    const [ state, setState ] = useState({
        isOpen: false
    });

    const [ data, setData ] = useState({
        title: '',
        url: '',
        as: '',
        query:''
    })

    useEffect(() => {
        setData({
            ...data,
            title: props.title,
            url: props.url,
            as: props.as,
            query:props.query
        })
    }, [ props ]);

    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);

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


    if (!state.isOpen) {
        return (
            <div className='items-preview-item'>
                <div className="item-title" onClick={ () => onOpenHandler() }>
                    <p>{ props.title }</p>
                    {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/ }
                </div>
            </div>
        )
    } else return (
        <div className='items-preview-item'>
            <div className="item-title" onClick={ () => onOpenHandler() }>
                <p>{ props.title }</p>
                {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/ }
            </div>
            <div className="editItem">
                <input type="text" name='title' value={ data.title } onChange={ e => onChaneHandler(e) }/>
                <input type="text" name='url' value={ data.url } onChange={ e => onChaneHandler(e) }/>
                <input type="text" name='as' value={ data.as } onChange={ e => onChaneHandler(e) }/>
                <input type="text" name='query' value={ data.query } onChange={ e => onChaneHandler(e) }/>
                <button name={ data.title } onClick={ (e) => props.onDeleteItemHandler(e) }>Del</button>
                <button name={ data.title } onClick={ (e) => props.onSaveHandler(data,props.itemIndex) }>save</button>
            </div>
        </div>
    )

};
export default NavigationItem;