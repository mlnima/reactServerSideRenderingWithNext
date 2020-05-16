import React, { useEffect, useState, useContext } from 'react';
import FA from "react-fontawesome";

const DropDownWidget = props => {

    const [ state, setState ] = useState({
        open: true,
        icon: 'sort-up'
    });
    useEffect(() => {
        state.open ?
            setState({
                ...state,
                icon: 'sort-up'
            }) :
            setState({
                ...state,
                icon: 'sort-down'
            })
    }, [ state.open ]);

    const openCloseHandler = () => {
        state.open ?
            setState({
                ...state,
                open: false
            }) :
            setState({
                ...state,
                open: true
            })
    };
    const RenderTheComponent = () => {
        if (state.open) {
            return <props.component { ...props }/>
        } else return null
    };

    if (props.postData.postType !== 'video' && props.type === 'actors') {
        return null
    } else if (props.postData.postType === props.renderFor || props.renderFor === 'all') {
        return (
            <div className='DropDownWidget'>
                <div className="DropDownWidgetHead">
                    <p className='DropDownWidgetHeadTitle'>{ props.title }</p>
                    <button className='DropDownWidgetHeadOpenCloseBtn' onClick={ () => openCloseHandler() }><FA className='fontawesomeMedium' name={ state.icon }/></button>
                </div>
                <div className="DropDownWidgetComponent">
                    <RenderTheComponent/>
                </div>
            </div>
        );
    } else return null

};
export default DropDownWidget;