import React, { useEffect } from 'react';
import Link from 'next/link'

const WidgetHeader = props => {



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
                <Link href={ props.redirectLink }><a>{ props.redirectToTitle }</a></Link>
            )
        } else return null
    }

    if (props.title) {
        return (
            <div className='WidgetHeader'>
                <RenderTitle/>
                <RenderRedirectLink/>
            </div>
        );
    } else return null

};

export default WidgetHeader;
