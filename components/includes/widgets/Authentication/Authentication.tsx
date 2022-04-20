import React, {FC, useMemo} from 'react';
import dynamic from "next/dynamic";
import {useSelector} from 'react-redux';
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const MobileAuthentication = dynamic(
    () => import('./MobileAuthentication/MobileAuthentication'));
const DesktopAuthentication = dynamic(
    () => import('./DesktopAuthentication/DesktopAuthentication'));

const Authentication: FC = () => {

    const isMobile = useMemo(()=>useSelector((store: StoreTypes) => store.settings?.isMobile),[])

    if (isMobile) {
        return <MobileAuthentication/>
    } else {
        return <DesktopAuthentication/>
    }

};

export default Authentication;
