import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import SiteHeadSetter from "@components/global/SiteHeadSetter";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter : FC = () => {

    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const googleAnalyticsId = useSelector(({settings}:Store)=>settings?.identity?.googleAnalyticsId)

    useEffect(() => {
        if (localStorage?.wt) {
            setRenderAutoLogin(true)
        }
    }, []);

    return (
        <>
            <SiteHeadSetter/>
            {googleAnalyticsId ? <GoogleAnalytics googleAnalyticsId={googleAnalyticsId}/> : null}
            {renderAutoLogin ? <UserAutoLogin renderAutoLogin={renderAutoLogin}/> : null}
        </>
    )
};
export default SiteSettingSetter;


//
// {identity?.siteMode === 'eCommerce' ?
//     <script src={`https://www.paypal.com/sdk/js?client-id=${settings.eCommerce?.payPalId}&currency=${settings.eCommerce?.currency}`}/>
//     : null
// }

