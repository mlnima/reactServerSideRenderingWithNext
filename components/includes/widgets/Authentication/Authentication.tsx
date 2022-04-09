import React, {FC} from 'react';
import dynamic from "next/dynamic";
import {useSelector} from 'react-redux';
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const MobileAuthentication = dynamic(
    () => import('./MobileAuthentication/MobileAuthentication'), {ssr: false});
const DesktopAuthentication = dynamic(
    () => import('./DesktopAuthentication/DesktopAuthentication'), {ssr: false});

const Authentication: FC = () => {

    const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

    if (isMobile) {
        return <MobileAuthentication/>
    } else {
        return <DesktopAuthentication/>
    }

};

export default Authentication;
