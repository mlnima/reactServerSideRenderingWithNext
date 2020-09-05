import React, { useEffect, useState, useContext } from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import './Widget.scss'
// import _JSXStyle from 'styled-jsx/style'

const Widget = props => {

    const [ state, setState ] = useState({
        extraClassName: '',
        isMobile: true,
    })

    useEffect(() => {
        window.innerWidth > 1024?
            setState({
                ...state,
                isMobile: false
            }):
            setState({
                ...state,
                isMobile: true
            })
    }, [props]);



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



    const RenderCustomStyles = () => {
        if (props.data.customStyles) {
            return (
                <style jsx >{ `
                  ${props.data.customStyles}
                ` }</style>
            )
        } else return null
    }


    if (!props.data.deviceTypeToRender || props.data.deviceTypeToRender ==='all' || (state.isMobile && props.data.deviceTypeToRender === 'mobile') ||(!state.isMobile && props.data.deviceTypeToRender === 'desktop')  ){
        return (
            <>
                <RenderCustomStyles/>
                <div className={ 'widget ' + state.extraClassName }>
                    <WidgetHeader { ...props.data }/>
                    <WidgetText { ...props.data }/>
                    <RenderComponent/>
                    <WidgetFooter  { ...props.data }/>
                </div>

            </>
        );
    }else return null


};
export default Widget;

// ${ props.data.customStyles }

