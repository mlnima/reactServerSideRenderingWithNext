import React, { useEffect, useState, useContext } from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import _JSXStyle from 'styled-jsx/style'

const Widget = props => {

    const [ state, setState ] = useState({
        extraClassName: ''
    })

    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  { ...props.data } widget={ true }/>
            )
        } else return null
    }

    useEffect(() => {
        if (props.data.extraClassName) {
            setState({
                ...state,
                extraClassName: props.data.extraClassName
            })
        }
    }, [ props ]);

    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);

    const RenderCustomStyles = () => {
        if (props.data.customStyles) {
            return (
                <style jsx >{ `
                  ${props.data.customStyles}
                ` }</style>
            )
        } else return null
    }

    return (
        <>
            <RenderCustomStyles/>
            <div className={ 'Widget ' + state.extraClassName }>
                <WidgetHeader { ...props.data }/>
                <WidgetText { ...props.data }/>
                <RenderComponent/>
                <WidgetFooter  { ...props.data }/>
            </div>

        </>
    );
};
export default Widget;

// ${ props.data.customStyles }

