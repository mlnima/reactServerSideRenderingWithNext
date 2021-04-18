import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";

const MultipleLinkTo = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const renderLinks = (props.multipleLinks ?? []).sort((a,b)=>a.linkIndex - b.linkIndex).map(linkData=>{
        const linkTitle = router.locale === process.env.REACT_APP_DEFAULT_LOCAL ?  linkData.linkTitle : linkData.translations?.[router.locale || contextData.state.activeLanguage]?.linkTitle ?? '';
        const linkDescription = router.locale === process.env.REACT_APP_DEFAULT_LOCAL ?  linkData.linkDescription : linkData.translations?.[router.locale || contextData.state.activeLanguage]?.linkDescription ?? '';
        if (linkData.linkToType === 'internal'){
            return (
                <li key={_.uniqueId('id_')}>
                    {linkDescription?<p>{linkDescription}</p>:null}
                     <Link href={linkData.linkTo} as={linkData.linkToAs}><a>{linkTitle}</a></Link>

                </li>
            )
        }else return (
            <li key={_.uniqueId('id_')}>
                {linkDescription?<p>{linkDescription}</p>:null}
                 <a href={linkData.linkTo} target={linkData.linkToWindowType}>{linkTitle}</a>
            </li>
        )
    })
    return (
        <ul>

            {renderLinks}
        </ul>
    );
};
export default MultipleLinkTo;
