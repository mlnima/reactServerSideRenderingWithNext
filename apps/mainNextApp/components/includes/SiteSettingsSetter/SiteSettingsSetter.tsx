import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import SiteHeadSetter from "../../global/SiteHeadSetter";
import {Store} from "typescript-types";

const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter: FC = () => {

    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const settings = useSelector(({settings}: Store) => settings)

    useEffect(() => {
        if (localStorage?.wt) {
            setRenderAutoLogin(true)
        }
    }, []);

    return (
        <>
            <SiteHeadSetter/>
            {!!settings.identity.googleAnalyticsId &&
            <GoogleAnalytics googleAnalyticsId={settings.identity.googleAnalyticsId}/>}
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

