import React, { useEffect, useState, useContext } from 'react';
import FA from "react-fontawesome";
import BarsSvg from '../../../static/images/fontawesome/bars-solid.svg'

const NavigationItem = props => {
    const [ state, setState ] = useState({
        isOpen: false
    });
    useEffect(() => {
    }, []);

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

    if (!state.isOpen){
        return (
            <div className='items-preview-item'>
                <div className="item-title" onClick={ () => onOpenHandler() }>
                    <p>{ props.title }</p>
                    {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/}
                </div>
            </div>
        )
    }else return (
        <div className='items-preview-item'>
            <div className="item-title" onClick={ () => onOpenHandler() }>
                <p>{ props.title }</p>
                {/*<button onClick={ () => onOpenHandler() }> <img className='fontawesomeSvgSmall' src={ BarsSvg }/></button>*/}
            </div>
            <div className="editItem">
                <input type="text" name='title' value={props.title}/>
                <input type="text" name='url' value={props.url}/>
                <button name={ props.title } onClick={ (e) => props.onDeleteItemHandler(e) }>Del</button>
            </div>
        </div>
    )



};
export default NavigationItem;