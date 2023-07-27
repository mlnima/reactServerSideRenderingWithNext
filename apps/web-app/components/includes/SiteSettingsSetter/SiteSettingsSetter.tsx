import {FC, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useAppSelector} from "@store_toolkit/hooks";

// const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {ssr: false})
const UserAutoLogin = dynamic(() => import('./UserAutoLogin'), {ssr: false})

const SiteSettingSetter: FC = () => {

    const [renderAutoLogin, setRenderAutoLogin] = useState(false)
    const headDataSettings = useAppSelector(({settings}) => settings?.initialSettings?.headDataSettings)

    useEffect(() => {
        if (typeof window !== 'undefined' &&localStorage?.wt) {
            setTimeout(()=>{
                setRenderAutoLogin(true)
            },1000)
        }
    }, []);

    return (
        <>
            {/*{!!headDataSettings?.googleAnalyticsId &&*/}
            {/*<GoogleAnalytics googleAnalyticsId={headDataSettings.googleAnalyticsId}/>}*/}
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

