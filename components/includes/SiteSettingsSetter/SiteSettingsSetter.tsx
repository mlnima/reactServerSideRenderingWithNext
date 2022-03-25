import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import SiteHeadSetter from "@components/global/SiteHeadSetter";
const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter : FC = () => {

    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const googleAnalyticsId = useSelector(({settings}:StoreTypes)=>settings?.identity?.googleAnalyticsId)

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

