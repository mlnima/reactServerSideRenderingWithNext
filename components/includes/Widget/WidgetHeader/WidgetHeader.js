import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link'
import {AppContext} from '../../../../context/AppContext'
import withRouter from "next/dist/client/with-router";
import './WidgetHeader.scss'
const WidgetHeader = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        style: {}
    });

    useEffect(() => {
        setState({
            ...state,
            style: {
                widgetHead: {
                    backgroundColor: contextData.siteDesign.widgetHeaderBackgroundColor,
                    color: contextData.siteDesign.widgetHeaderTextColor,
                    borderLeft: contextData.siteDesign.widgetHeaderBorder ? `5px solid ${contextData.siteDesign.widgetHeaderBorder}` : '5px solid gray '
                },
                redirectLink: {
                    backgroundColor: contextData.siteDesign.widgetHeaderRedirectLinkBackgroundColor,
                    color: contextData.siteDesign.widgetHeaderRedirectLinkTextColor,
                    fontWeight: 'bold'
                }
            }
        })
    }, [contextData.siteDesign]);


    const RenderTitle = () => {
        if (props.title) {
            return (
                <h2 className='widget-header-title'>{ props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].title || props.title : props.title : props.title }</h2>
            )
        } else return null
    }

    const RenderRedirectLink = () => {
        if (props.redirectLink && props.redirectToTitle) {
            return (
                <Link href={props.redirectLink}><a style={state.style.redirectLink}>{props.redirectToTitle}</a></Link>
            )
        } else return null
    }

    if (props.title) {
        return (
            <div className='widget-Header' style={state.style.widgetHead}>
                <RenderTitle/>
                <RenderRedirectLink/>
            </div>
        );
    } else return null

};

export default withRouter(WidgetHeader);
