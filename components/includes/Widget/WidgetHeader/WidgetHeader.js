import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import { AppContext } from '../../../../context/AppContext'

const WidgetHeader = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style:{}
    });

    useEffect(() => {
        setState({
            ...state,
            style:{
                widgetHead:{
                    backgroundColor:contextData.siteDesign.widgetHeaderBackgroundColor,
                    color:contextData.siteDesign.widgetHeaderTextColor
                },
                redirectLink:{
                    backgroundColor:contextData.siteDesign.widgetHeaderRedirectLinkBackgroundColor,
                    color:contextData.siteDesign.widgetHeaderRedirectLinkTextColor
                }
            }
        })
    }, [contextData.siteDesign]);


    const RenderTitle = () => {
        if (props.title) {
            return (
                <p className='WidgetHeaderTitle'>{ props.title }</p>
            )
        } else return null
    }

    const RenderRedirectLink = () => {
        if (props.redirectLink && props.redirectToTitle) {
            return (
                <Link href={ props.redirectLink }><a style={state.style.redirectLink}>{ props.redirectToTitle }</a></Link>
            )
        } else return null
    }

    if (props.title) {
        return (
            <div className='WidgetHeader' style={state.style.widgetHead}>
                <RenderTitle/>
                <RenderRedirectLink/>
            </div>
        );
    } else return null

};

export default WidgetHeader;
